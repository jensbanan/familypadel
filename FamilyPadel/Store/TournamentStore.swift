import Foundation
import SwiftUI

final class TournamentStore: ObservableObject {

    @Published var tournament: Tournament {
        didSet { save() }
    }

    /// Kommentatorboksens feed – nyeste øverst. Kun for den aktuelle session.
    @Published private(set) var feed: [BanterLine] = []

    /// Sættes når en kamp har nået pointmålet, så resultatarket kan vises.
    @Published var matchAwaitingConfirmation: PadelMatch?

    /// Sættes når hele turneringen er afgjort.
    @Published var showChampionScreen: Bool = false

    private let saveURL: URL = {
        let base = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        return base.appendingPathComponent("vestergaard-padel.json")
    }()

    init() {
        if let data = try? Data(contentsOf: saveURL),
           let decoded = try? JSONDecoder().decode(Tournament.self, from: data) {
            self.tournament = decoded
        } else {
            self.tournament = Tournament()
        }
    }

    // MARK: - Persistering

    private func save() {
        guard let data = try? JSONEncoder().encode(tournament) else { return }
        try? data.write(to: saveURL, options: .atomic)
    }

    // MARK: - Spillere og fremmøde

    /// Tilføjer en gæst til stammen og sætter vedkommende på som fremmødt.
    func addGuest(named name: String) {
        let trimmed = name.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }
        guard !tournament.roster.contains(where: { $0.name.caseInsensitiveCompare(trimmed) == .orderedSame }) else { return }
        let guest = Player(name: trimmed, isGuest: true)
        tournament.roster.append(guest)
        tournament.presentIDs.append(guest.id)
        clampSettings()
    }

    /// Fjerner en gæst helt. Familien bliver – dem markerer man bare som fraværende.
    func removeGuest(_ player: Player) {
        guard player.isGuest else { return }
        guard !tournament.matches.contains(where: { $0.contains(player.id) }) else { return }
        tournament.roster.removeAll { $0.id == player.id }
        tournament.presentIDs.removeAll { $0 == player.id }
        clampSettings()
    }

    func isPresent(_ player: Player) -> Bool {
        tournament.presentIDs.contains(player.id)
    }

    /// Slår fremmøde til og fra. Man kan ikke melde nogen fra, der allerede har spillet.
    func togglePresence(_ player: Player) {
        if isPresent(player) {
            guard !tournament.matches.contains(where: { $0.contains(player.id) }) else { return }
            tournament.presentIDs.removeAll { $0 == player.id }
        } else {
            tournament.presentIDs.append(player.id)
        }
        clampSettings()
    }

    func setAllPresent(_ present: Bool) {
        if present {
            tournament.presentIDs = tournament.roster.map(\.id)
        } else {
            let alreadyPlaying = Set(tournament.matches.flatMap(\.allPlayerIDs))
            tournament.presentIDs = tournament.presentIDs.filter { alreadyPlaying.contains($0) }
        }
        clampSettings()
    }

    func restoreFamily() {
        guard !tournament.hasStarted else { return }
        let family = Player.familien
        tournament.roster = family
        tournament.presentIDs = family.map(\.id)
        clampSettings()
    }

    private func clampSettings() {
        let maxCourts = AmericanoScheduler.maxCourts(playerCount: tournament.players.count)
        tournament.courts = min(max(1, tournament.courts), maxCourts)
        tournament.rounds = max(1, min(tournament.rounds, 40))
    }

    var suggestedRounds: Int {
        AmericanoScheduler.suggestedRounds(
            playerCount: tournament.players.count,
            courts: tournament.courts
        )
    }

    // MARK: - Turneringens forløb

    var canStart: Bool { tournament.players.count >= 4 }

    /// Starter turneringen med tomme hold i første runde – holdene sættes
    /// undervejs, mens kampen kører.
    func start() {
        guard canStart else { return }
        clampSettings()
        tournament.rounds = max(tournament.rounds, 1)

        let courtsInPlay = max(1, min(tournament.courts, tournament.players.count / 4))
        tournament.matches = (1...courtsInPlay).map { court in
            PadelMatch(round: 1, court: court)
        }
        tournament.scheduleGenerated = false
        tournament.hasStarted = true
        feed = []
        pushLine(BanterLine(
            text: "Velkommen til \(tournament.title)! Sæt holdet på banen – I kan sagtens gøre det, mens kampen kører. 🎾",
            persona: .gaest,
            emoji: "🏆"
        ))
    }

    /// Fylder den aktuelle kamps tomme pladser med spillere der har spillet mindst.
    func autoFillCurrentLineup() {
        guard let match = tournament.currentMatch else { return }
        let taken = Set(match.allPlayerIDs)
        let played = playedCounts()
        let candidates = tournament.players
            .filter { !taken.contains($0.id) }
            .sorted { (played[$0.id] ?? 0, $0.name) < (played[$1.id] ?? 0, $1.name) }

        var queue = candidates.map(\.id)
        var updated = match
        while updated.teamA.count < 2, !queue.isEmpty { updated.teamA.append(queue.removeFirst()) }
        while updated.teamB.count < 2, !queue.isEmpty { updated.teamB.append(queue.removeFirst()) }
        replace(updated)
    }

    /// Sætter en spiller på en bestemt plads. Spilleren fjernes automatisk fra
    /// sin gamle plads i samme kamp, så ingen kommer til at spille mod sig selv.
    func setPlayer(_ newID: UUID, team: TeamSide, index: Int, in matchID: UUID) {
        guard var match = tournament.matches.first(where: { $0.id == matchID }), !match.isFinished else { return }

        let existing = match.ids(for: team)
        let replaced: UUID? = existing.indices.contains(index) ? existing[index] : nil

        match.teamA.removeAll { $0 == newID }
        match.teamB.removeAll { $0 == newID }

        var target = match.ids(for: team)
        if let replaced, let position = target.firstIndex(of: replaced) {
            target[position] = newID
        } else if target.count < 2 {
            target.append(newID)
        } else {
            target[min(max(index, 0), 1)] = newID
        }

        if team == .a { match.teamA = target } else { match.teamB = target }
        replace(match)
    }

    func clearSlot(team: TeamSide, index: Int, in matchID: UUID) {
        guard var match = tournament.matches.first(where: { $0.id == matchID }), !match.isFinished else { return }
        var target = match.ids(for: team)
        guard target.indices.contains(index) else { return }
        target.remove(at: index)
        if team == .a { match.teamA = target } else { match.teamB = target }
        replace(match)
    }

    // MARK: - Point

    func addPoint(to team: TeamSide) {
        guard var match = tournament.currentMatch, !match.isFinished else { return }
        if team == .a { match.scoreA += 1 } else { match.scoreB += 1 }
        replace(match)

        commentOnPoint(match: match, scoringTeam: team)

        if match.totalPoints >= tournament.pointsPerMatch {
            matchAwaitingConfirmation = match
        }
    }

    func removePoint(from team: TeamSide) {
        guard var match = tournament.currentMatch, !match.isFinished else { return }
        if team == .a {
            guard match.scoreA > 0 else { return }
            match.scoreA -= 1
        } else {
            guard match.scoreB > 0 else { return }
            match.scoreB -= 1
        }
        replace(match)
        if match.totalPoints < tournament.pointsPerMatch {
            matchAwaitingConfirmation = nil
        }
    }

    private func commentOnPoint(match: PadelMatch, scoringTeam: TeamSide) {
        let scorers = tournament.players(match.ids(for: scoringTeam))
        guard let scorer = scorers.randomElement() else {
            pushLine(BanterLine(
                text: "Point til \(scoringTeam.displayName)! Nogen skulle måske sættes på banen. 🎾",
                persona: .gaest,
                emoji: "🎾"
            ))
            return
        }

        let situation: BanterSituation
        if let leader = match.leadingTeam {
            situation = (leader == scoringTeam) ? .scoredWhileAhead : .scoredWhileBehind
        } else {
            situation = .scoredLevel
        }

        let opponents = tournament.players(match.ids(for: scoringTeam.other))
        if let rival = Banter.rivalLine(for: scorer, opponents: opponents), Int.random(in: 0..<10) < 4 {
            pushLine(rival)
        } else {
            pushLine(Banter.line(for: scorer, situation))
        }

        // En gang imellem får en af de andre på banen også en kommentar med.
        if Int.random(in: 0..<4) == 0 {
            if let victim = opponents.randomElement() {
                pushLine(Banter.line(for: victim, .scoredWhileBehind))
            }
        }
    }

    // MARK: - Afslut kamp

    func confirmCurrentMatch() {
        guard var match = tournament.currentMatch else { return }
        match.isFinished = true
        replace(match)
        matchAwaitingConfirmation = nil

        commentOnResult(match)

        if !tournament.scheduleGenerated, isFirstRoundComplete {
            generateRemainingSchedule()
        }

        if tournament.isFinished {
            crownChampion()
        } else if let next = tournament.currentMatch {
            for player in tournament.players(next.allPlayerIDs) {
                pushLine(Banter.line(for: player, .matchStart))
            }
            if next.allPlayerIDs.isEmpty {
                pushLine(BanterLine(text: "Næste kamp er klar – sæt holdet! 🎾", persona: .gaest, emoji: "🎾"))
            }
        }
    }

    private func commentOnResult(_ match: PadelMatch) {
        guard let winningSide = match.leadingTeam else {
            pushLine(BanterLine(text: "Uafgjort! Ingen tabte. Alle er lidt utilfredse. 🤝", persona: .gaest, emoji: "🤝"))
            return
        }
        for player in tournament.players(match.ids(for: winningSide)) {
            pushLine(Banter.line(for: player, .wonMatch))
        }
        for player in tournament.players(match.ids(for: winningSide.other)) {
            pushLine(Banter.line(for: player, .lostMatch))
        }
    }

    private func crownChampion() {
        let table = standings
        if let winner = table.first {
            pushLine(Banter.line(for: winner.player, .champion))
        }
        if let last = table.last, table.count > 1 {
            pushLine(Banter.line(for: last.player, .lastPlace))
        }
        showChampionScreen = true
    }

    /// Er alle baner i den første runde spillet færdig?
    private var isFirstRoundComplete: Bool {
        guard let firstRound = tournament.matches.map(\.round).min() else { return false }
        return tournament.matches
            .filter { $0.round == firstRound }
            .allSatisfy(\.isFinished)
    }

    /// Lægger resten af programmet, når første runde er i hus.
    private func generateRemainingSchedule() {
        let played = tournament.matches.filter(\.isFinished)
        let firstRound = tournament.matches.map(\.round).max() ?? 1
        guard tournament.rounds > firstRound else {
            tournament.scheduleGenerated = true
            return
        }

        let rest = AmericanoScheduler.generate(
            players: tournament.players,
            rounds: tournament.rounds,
            courts: tournament.courts,
            startRound: firstRound + 1,
            alreadyPlayed: played
        )
        tournament.matches.append(contentsOf: rest)
        tournament.scheduleGenerated = true
    }

    /// Lægger programmet forfra for alle endnu ikke spillede runder.
    func regenerateUpcomingSchedule() {
        let played = tournament.matches.filter(\.isFinished)
        let lastPlayedRound = played.map(\.round).max() ?? 0
        tournament.matches.removeAll { !$0.isFinished }

        guard tournament.rounds > lastPlayedRound else {
            tournament.scheduleGenerated = true
            return
        }

        let rest = AmericanoScheduler.generate(
            players: tournament.players,
            rounds: tournament.rounds,
            courts: tournament.courts,
            startRound: lastPlayedRound + 1,
            alreadyPlayed: played
        )
        tournament.matches.append(contentsOf: rest)
        tournament.scheduleGenerated = true
        showChampionScreen = false
    }

    // MARK: - Stilling

    var standings: [Standing] {
        var table: [UUID: Standing] = [:]
        for player in tournament.players {
            table[player.id] = Standing(player: player)
        }

        for match in tournament.matches where match.isFinished {
            for side in TeamSide.allCases {
                let own = match.score(for: side)
                let against = match.score(for: side.other)
                for id in match.ids(for: side) {
                    guard var row = table[id] else { continue }
                    row.points += own
                    row.conceded += against
                    row.played += 1
                    if own > against { row.wins += 1 }
                    else if own == against { row.draws += 1 }
                    else { row.losses += 1 }
                    table[id] = row
                }
            }
        }

        return table.values.sorted { lhs, rhs in
            if lhs.points != rhs.points { return lhs.points > rhs.points }
            if lhs.difference != rhs.difference { return lhs.difference > rhs.difference }
            if lhs.wins != rhs.wins { return lhs.wins > rhs.wins }
            return lhs.player.name < rhs.player.name
        }
    }

    func playedCounts() -> [UUID: Int] {
        var counts: [UUID: Int] = [:]
        for match in tournament.matches {
            for id in match.allPlayerIDs { counts[id, default: 0] += 1 }
        }
        return counts
    }

    /// Spillere der holder pause i den aktuelle runde.
    var restingPlayers: [Player] {
        guard let match = tournament.currentMatch else { return [] }
        let playingThisRound = Set(
            tournament.matches.filter { $0.round == match.round }.flatMap(\.allPlayerIDs)
        )
        return tournament.players.filter { !playingThisRound.contains($0.id) }
    }

    // MARK: - Nulstilling

    func resetTournament() {
        var fresh = Tournament()
        fresh.roster = tournament.roster
        fresh.presentIDs = tournament.presentIDs
        fresh.pointsPerMatch = tournament.pointsPerMatch
        fresh.courts = tournament.courts
        fresh.rounds = tournament.rounds
        tournament = fresh
        feed = []
        matchAwaitingConfirmation = nil
        showChampionScreen = false
    }

    func resetEverything() {
        tournament = Tournament()
        feed = []
        matchAwaitingConfirmation = nil
        showChampionScreen = false
    }

    // MARK: - Hjælpere

    private func replace(_ match: PadelMatch) {
        guard let index = tournament.matches.firstIndex(where: { $0.id == match.id }) else { return }
        tournament.matches[index] = match
    }

    private func pushLine(_ line: BanterLine) {
        feed.insert(line, at: 0)
        if feed.count > 60 { feed.removeLast(feed.count - 60) }
    }
}

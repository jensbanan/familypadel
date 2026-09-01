import Foundation

/// Deterministisk pseudo-tilfældig generator (SplitMix64), så et program
/// genereret med de samme spillere altid ser ens ud.
struct SeededGenerator: RandomNumberGenerator {
    private var state: UInt64

    init(seed: UInt64) {
        self.state = seed &+ 0x9E3779B97F4A7C15
    }

    mutating func next() -> UInt64 {
        state = state &+ 0x9E3779B97F4A7C15
        var z = state
        z = (z ^ (z >> 30)) &* 0xBF58476D1CE4E5B9
        z = (z ^ (z >> 27)) &* 0x94D049BB133111EB
        return z ^ (z >> 31)
    }
}

/// Nøgle for et uordnet par af spillere.
private struct PairKey: Hashable {
    let low: UUID
    let high: UUID

    init(_ a: UUID, _ b: UUID) {
        if a.uuidString <= b.uuidString {
            low = a; high = b
        } else {
            low = b; high = a
        }
    }
}

/// Lægger et Americano-program: alle spiller med og mod alle, så vidt det
/// overhovedet kan lade sig gøre, og pauserne fordeles ligeligt.
enum AmericanoScheduler {

    /// Et fornuftigt forslag til antal runder.
    static func suggestedRounds(playerCount: Int, courts: Int) -> Int {
        guard playerCount >= 4 else { return 0 }
        let courtsInPlay = max(1, min(courts, playerCount / 4))
        let allPairings = playerCount * (playerCount - 1) / 2
        let roundsForAllPartners = Int(ceil(Double(allPairings) / Double(2 * courtsInPlay)))
        return max(playerCount - 1, roundsForAllPartners)
    }

    static func maxCourts(playerCount: Int) -> Int {
        max(1, playerCount / 4)
    }

    /// Genererer kampe for runderne `startRound...rounds`.
    ///
    /// - Parameter alreadyPlayed: kampe der allerede er spillet (fx den første
    ///   kamp, hvor holdet blev sat undervejs). De tæller med i statistikken,
    ///   så resten af programmet bliver retfærdigt.
    static func generate(
        players: [Player],
        rounds: Int,
        courts: Int,
        startRound: Int = 1,
        alreadyPlayed: [PadelMatch] = []
    ) -> [PadelMatch] {
        let ids = players.map(\.id)
        guard ids.count >= 4, rounds >= startRound else { return [] }

        var bestSchedule: [PadelMatch] = []
        var bestCost = Int.max

        for attempt in 0..<300 {
            var rng = SeededGenerator(seed: UInt64(attempt) &* 0x2545F4914F6CDD1D &+ 7)
            let (schedule, cost) = buildAttempt(
                ids: ids,
                rounds: rounds,
                courts: courts,
                startRound: startRound,
                alreadyPlayed: alreadyPlayed,
                rng: &rng
            )
            if cost < bestCost {
                bestCost = cost
                bestSchedule = schedule
                if cost == 0 { break }
            }
        }

        return bestSchedule
    }

    // MARK: - Grådig opbygning af ét forsøg

    private static func buildAttempt(
        ids: [UUID],
        rounds: Int,
        courts: Int,
        startRound: Int,
        alreadyPlayed: [PadelMatch],
        rng: inout SeededGenerator
    ) -> ([PadelMatch], Int) {
        var gamesPlayed: [UUID: Int] = Dictionary(uniqueKeysWithValues: ids.map { ($0, 0) })
        var partnerCount: [PairKey: Int] = [:]
        var opponentCount: [PairKey: Int] = [:]

        func register(teamA: [UUID], teamB: [UUID]) {
            for id in teamA + teamB where gamesPlayed[id] != nil {
                gamesPlayed[id, default: 0] += 1
            }
            if teamA.count == 2 { partnerCount[PairKey(teamA[0], teamA[1]), default: 0] += 1 }
            if teamB.count == 2 { partnerCount[PairKey(teamB[0], teamB[1]), default: 0] += 1 }
            for a in teamA {
                for b in teamB {
                    opponentCount[PairKey(a, b), default: 0] += 1
                }
            }
        }

        for match in alreadyPlayed {
            register(teamA: match.teamA, teamB: match.teamB)
        }

        var schedule: [PadelMatch] = []
        var cost = 0
        let courtsInPlay = max(1, min(courts, ids.count / 4))
        let playersPerRound = courtsInPlay * 4

        for round in startRound...rounds {
            // Tilfældigt tiebreak, så vi ikke altid vælger de samme spillere.
            var tiebreak: [UUID: UInt64] = [:]
            for id in ids { tiebreak[id] = rng.next() }

            let queue = ids.sorted { lhs, rhs in
                let lg = gamesPlayed[lhs] ?? 0
                let rg = gamesPlayed[rhs] ?? 0
                if lg != rg { return lg < rg }
                return (tiebreak[lhs] ?? 0) < (tiebreak[rhs] ?? 0)
            }

            let onCourt = Array(queue.prefix(playersPerRound))

            for court in 0..<courtsInPlay {
                let group = Array(onCourt[(court * 4)..<(court * 4 + 4)])
                let (teamA, teamB, pairingCost) = bestPairing(
                    group: group,
                    partnerCount: partnerCount,
                    opponentCount: opponentCount
                )
                cost += pairingCost
                register(teamA: teamA, teamB: teamB)
                schedule.append(
                    PadelMatch(round: round, court: court + 1, teamA: teamA, teamB: teamB)
                )
            }
        }

        // Straf hvis nogen har spillet markant mere end andre.
        let counts = gamesPlayed.values
        if let maxGames = counts.max(), let minGames = counts.min() {
            cost += (maxGames - minGames) * 25
        }

        return (schedule, cost)
    }

    /// Prøver alle tre måder at dele fire spillere i to hold, og vælger den
    /// kombination der giver færrest gentagelser.
    private static func bestPairing(
        group: [UUID],
        partnerCount: [PairKey: Int],
        opponentCount: [PairKey: Int]
    ) -> ([UUID], [UUID], Int) {
        precondition(group.count == 4, "Et Americano-hold kræver præcis fire spillere")

        let options: [([UUID], [UUID])] = [
            ([group[0], group[1]], [group[2], group[3]]),
            ([group[0], group[2]], [group[1], group[3]]),
            ([group[0], group[3]], [group[1], group[2]])
        ]

        var bestOption = options[0]
        var bestCost = Int.max

        for (teamA, teamB) in options {
            var optionCost = 0
            optionCost += (partnerCount[PairKey(teamA[0], teamA[1])] ?? 0) * 40
            optionCost += (partnerCount[PairKey(teamB[0], teamB[1])] ?? 0) * 40
            for a in teamA {
                for b in teamB {
                    optionCost += (opponentCount[PairKey(a, b)] ?? 0) * 6
                }
            }
            if optionCost < bestCost {
                bestCost = optionCost
                bestOption = (teamA, teamB)
            }
        }

        return (bestOption.0, bestOption.1, bestCost)
    }
}

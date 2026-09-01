import Foundation

/// En enkelt Americano-kamp. Holdene kan være delvist udfyldte – man må gerne
/// sætte holdet, mens kampen kører.
struct PadelMatch: Identifiable, Codable, Hashable {
    var id: UUID = UUID()
    var round: Int
    var court: Int
    var teamA: [UUID] = []
    var teamB: [UUID] = []
    var scoreA: Int = 0
    var scoreB: Int = 0
    var isFinished: Bool = false

    var allPlayerIDs: [UUID] { teamA + teamB }
    var totalPoints: Int { scoreA + scoreB }
    var isLineupComplete: Bool { teamA.count == 2 && teamB.count == 2 }

    func score(for team: TeamSide) -> Int {
        team == .a ? scoreA : scoreB
    }

    func ids(for team: TeamSide) -> [UUID] {
        team == .a ? teamA : teamB
    }

    /// Hvilket hold fører lige nu? `nil` ved uafgjort.
    var leadingTeam: TeamSide? {
        if scoreA == scoreB { return nil }
        return scoreA > scoreB ? .a : .b
    }

    func contains(_ playerID: UUID) -> Bool {
        allPlayerIDs.contains(playerID)
    }
}

enum TeamSide: String, Codable, Hashable, CaseIterable {
    case a
    case b

    var other: TeamSide { self == .a ? .b : .a }

    var displayName: String { self == .a ? "Hold Gul" : "Hold Blå" }
}

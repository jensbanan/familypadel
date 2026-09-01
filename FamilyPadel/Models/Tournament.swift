import Foundation

struct Tournament: Codable {
    var title: String = "Familien Vestergaard Padel Championship"
    var players: [Player] = Player.familien
    var matches: [PadelMatch] = []
    /// Americano: kampen er slut når de to holds point tilsammen når hertil.
    var pointsPerMatch: Int = 21
    var courts: Int = 1
    var rounds: Int = 8
    var hasStarted: Bool = false
    /// Sættes når resten af programmet er lagt efter første kamp.
    var scheduleGenerated: Bool = false

    func player(_ id: UUID) -> Player? {
        players.first { $0.id == id }
    }

    func players(_ ids: [UUID]) -> [Player] {
        ids.compactMap { player($0) }
    }

    /// Første kamp der ikke er spillet færdig.
    var currentMatch: PadelMatch? {
        matches.first { !$0.isFinished }
    }

    var isFinished: Bool {
        hasStarted && scheduleGenerated && !matches.isEmpty && matches.allSatisfy(\.isFinished)
    }

    var finishedMatchCount: Int {
        matches.filter(\.isFinished).count
    }
}

/// En række i stillingen.
struct Standing: Identifiable, Hashable {
    var player: Player
    var points: Int = 0
    var conceded: Int = 0
    var played: Int = 0
    var wins: Int = 0
    var draws: Int = 0
    var losses: Int = 0

    var id: UUID { player.id }
    var difference: Int { points - conceded }
    var averagePoints: Double { played == 0 ? 0 : Double(points) / Double(played) }
}

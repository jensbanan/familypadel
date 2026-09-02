import Foundation

struct Tournament: Codable {
    var title: String = "Familien Vestergaard Padel Championship"
    /// Alle kendte spillere – familien plus tilføjede gæster.
    var roster: [Player]
    /// Hvem der er mødt op i dag. Vælges før hvert spil.
    var presentIDs: [UUID]
    var matches: [PadelMatch] = []
    /// Americano: kampen er slut når de to holds point tilsammen når hertil.
    /// 16 point = fire serve hver, 8 point = to serve hver.
    var pointsPerMatch: Int = 16
    var courts: Int = 1
    var rounds: Int = 8
    var hasStarted: Bool = false
    /// Sættes når resten af programmet er lagt efter første runde.
    var scheduleGenerated: Bool = false

    init() {
        let family = Player.familien
        self.roster = family
        self.presentIDs = family.map(\.id)
    }

    /// De spillere der rent faktisk er med i turneringen.
    var players: [Player] {
        roster.filter { presentIDs.contains($0.id) }
    }

    /// Slår op i hele stammen, så gamle resultater stadig kan vises,
    /// selvom en spiller ikke er med i dag.
    func player(_ id: UUID) -> Player? {
        roster.first { $0.id == id }
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

    /// Antal serve pr. spiller ved den valgte kamplængde.
    var servesEach: Int { pointsPerMatch / 4 }
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

import Foundation

struct Player: Identifiable, Codable, Hashable {
    var id: UUID
    var name: String
    var emoji: String
    var persona: Persona

    init(id: UUID = UUID(), name: String, emoji: String? = nil) {
        let persona = Persona.detect(from: name)
        self.id = id
        self.name = name
        self.persona = persona
        self.emoji = emoji ?? persona.defaultEmoji
    }

    /// Standardopstillingen: Familien Vestergaard.
    static var familien: [Player] {
        ["Henrik", "Maria", "Thomas", "Majbritt", "Jens", "Casper"].map { Player(name: $0) }
    }

    var shortName: String {
        name.split(separator: " ").first.map(String.init) ?? name
    }
}

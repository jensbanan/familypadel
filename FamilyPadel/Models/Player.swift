import Foundation

struct Player: Identifiable, Codable, Hashable {
    var id: UUID
    var name: String
    var emoji: String
    var persona: Persona
    /// Gæster kan fjernes igen – familien bliver.
    var isGuest: Bool

    init(id: UUID = UUID(), name: String, emoji: String? = nil, isGuest: Bool = false) {
        let persona = Persona.detect(from: name)
        self.id = id
        self.name = name
        self.persona = persona
        self.emoji = emoji ?? persona.defaultEmoji
        self.isGuest = isGuest
    }

    /// Familien Vestergaard – alle otte.
    static var familien: [Player] {
        ["Henrik", "Majbritt", "Maria", "Thomas", "Therese", "Jens", "Casper", "Lykke"]
            .map { Player(name: $0) }
    }

    var shortName: String {
        name.split(separator: " ").first.map(String.init) ?? name
    }
}

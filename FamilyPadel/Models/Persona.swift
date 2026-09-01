import Foundation

/// Hver spiller i familien har sin helt egen personlighed – og dermed sin helt
/// egen behandling fra kommentatorboksen.
enum Persona: String, Codable, CaseIterable, Hashable {
    case henrik
    case maria
    case thomas
    case majbritt
    case jens
    case casper
    case gaest

    /// Genkender familiemedlemmer ud fra navnet. Alle andre bliver "gæst".
    static func detect(from name: String) -> Persona {
        let normalized = name
            .folding(options: .diacriticInsensitive, locale: Locale(identifier: "da_DK"))
            .lowercased()
            .trimmingCharacters(in: .whitespacesAndNewlines)

        for persona in Persona.allCases where persona != .gaest {
            if normalized.contains(persona.rawValue) { return persona }
        }
        return .gaest
    }

    var defaultEmoji: String {
        switch self {
        case .henrik:   return "🔵"
        case .maria:    return "🌸"
        case .thomas:   return "😤"
        case .majbritt: return "🎯"
        case .jens:     return "👨‍💻"
        case .casper:   return "😇"
        case .gaest:    return "🎾"
        }
    }

    /// Den lille undertekst der står under navnet rundt omkring i appen.
    var tagline: String {
        switch self {
        case .henrik:   return "Chelsea & Vejle Boldklub. Lidelsen er en livsstil."
        case .maria:    return "Familiens solstråle. Skal have ros hvert 30. sekund."
        case .thomas:   return "Bedst. Altid. Irriterende."
        case .majbritt: return "\"Jeg er ellers ikke så god...\" (hun er bedst)"
        case .jens:     return "Koder bedre, end han spiller. Venstrehånds-noob."
        case .casper:   return "For god. For sød. Begge dele er urimeligt."
        case .gaest:    return "Gæstespiller med point at bevise."
        }
    }
}

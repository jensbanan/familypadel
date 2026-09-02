import Foundation

/// Hver spiller i familien har sin helt egen personlighed – og dermed sin helt
/// egen behandling fra kommentatorboksen.
enum Persona: String, Codable, CaseIterable, Hashable {
    case henrik
    case maria
    case thomas
    case majbritt
    case therese
    case jens
    case casper
    case lykke
    case gaest

    /// Genkender familiemedlemmer ud fra navnet. Alle andre bliver gæster.
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
        case .therese:  return "🔥"
        case .jens:     return "👨‍💻"
        case .casper:   return "😇"
        case .lykke:    return "🍀"
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
        case .therese:  return "Søsteropgør med Maria siden tennisbanen. Temperament og elendig taber."
        case .jens:     return "Koder bedre, end han spiller. Venstrehånds-noob."
        case .casper:   return "For god. For sød. Begge dele er urimeligt."
        case .lykke:    return "Familiens nyeste. Børnene elsker hende – og hun lærer for hver bold."
        case .gaest:    return "Gæstespiller med point at bevise."
        }
    }

    /// Hvem er man i familien på kant med? Bruges til ekstra stikpiller.
    var rival: Persona? {
        switch self {
        case .therese: return .maria
        case .maria:   return .therese
        default:       return nil
        }
    }
}

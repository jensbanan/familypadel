import SwiftUI

#if canImport(UIKit)
import UIKit
#endif

extension Color {
    init(hex: UInt32) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255,
            opacity: 1
        )
    }
}

/// Farverne på "banen".
enum Theme {
    static let courtDeep = Color(hex: 0x07222B)
    static let courtMid = Color(hex: 0x0E3A45)
    static let card = Color(hex: 0x11414E)
    static let cardRaised = Color(hex: 0x175265)

    static let lime = Color(hex: 0xC8F560)
    static let gold = Color(hex: 0xFFC94A)
    static let sky = Color(hex: 0x4FC3F7)
    static let coral = Color(hex: 0xFF6B5B)

    static let ink = Color(hex: 0xF2FAF8)
    static let inkSoft = Color(hex: 0x9FBFC8)

    static var background: LinearGradient {
        LinearGradient(
            colors: [courtMid, courtDeep],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    }

    static func color(for team: TeamSide) -> Color {
        team == .a ? gold : sky
    }
}

extension Persona {
    var accent: Color {
        switch self {
        case .henrik:   return Color(hex: 0x3D6BE8)
        case .maria:    return Color(hex: 0xFF8FB1)
        case .thomas:   return Color(hex: 0xFF6B5B)
        case .majbritt: return Color(hex: 0xC8F560)
        case .therese:  return Color(hex: 0xFF7A45)
        case .jens:     return Color(hex: 0x8E7BFF)
        case .casper:   return Color(hex: 0x4FE0C1)
        case .lykke:    return Color(hex: 0xFFD166)
        case .gaest:    return Color(hex: 0x9FBFC8)
        }
    }
}

/// Standardbaggrund til alle skærme.
struct CourtBackground: ViewModifier {
    func body(content: Content) -> some View {
        ZStack {
            Theme.background.ignoresSafeArea()
            content
        }
    }
}

extension View {
    func courtBackground() -> some View { modifier(CourtBackground()) }

    func cardStyle(_ fill: Color = Theme.card) -> some View {
        self
            .background(
                RoundedRectangle(cornerRadius: 20, style: .continuous)
                    .fill(fill)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 20, style: .continuous)
                    .stroke(Color.white.opacity(0.06), lineWidth: 1)
            )
    }
}

/// Lille haptisk klap på skulderen.
enum Haptics {
    static func tap() {
        #if canImport(UIKit)
        UIImpactFeedbackGenerator(style: .medium).impactOccurred()
        #endif
    }

    static func success() {
        #if canImport(UIKit)
        UINotificationFeedbackGenerator().notificationOccurred(.success)
        #endif
    }
}

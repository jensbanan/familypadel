import SwiftUI

struct ChampionView: View {
    @EnvironmentObject private var store: TournamentStore
    @Environment(\.dismiss) private var dismiss

    /// Replikkerne trækkes én gang, så teksten ikke skifter ved hver gentegning.
    @State private var championLine = ""
    @State private var lastPlaceLine = ""

    private var standings: [Standing] { store.standings }

    var body: some View {
        ZStack {
            Theme.background.ignoresSafeArea()
            ConfettiView()

            ScrollView {
                VStack(spacing: 18) {
                    Text("🏆")
                        .font(.system(size: 76))
                        .padding(.top, 40)

                    Text("MESTER")
                        .font(.system(size: 15, weight: .heavy, design: .rounded))
                        .tracking(5)
                        .foregroundStyle(Theme.gold)

                    if let champion = standings.first {
                        Text(champion.player.emoji).font(.system(size: 54))
                        Text(champion.player.name)
                            .font(.system(size: 34, weight: .heavy, design: .rounded))
                            .foregroundStyle(Theme.ink)
                        Text("\(champion.points) point · \(champion.wins) sejre")
                            .font(.system(size: 15, weight: .semibold, design: .rounded))
                            .foregroundStyle(Theme.lime)

                        Text(championLine)
                            .font(.system(size: 15, weight: .medium, design: .rounded))
                            .multilineTextAlignment(.center)
                            .foregroundStyle(Theme.ink)
                            .padding(16)
                            .cardStyle(Theme.cardRaised)
                            .padding(.horizontal, 4)
                    }

                    if standings.count > 1, let last = standings.last {
                        VStack(spacing: 6) {
                            Text("SIDSTEPLADSEN")
                                .font(.system(size: 11, weight: .bold, design: .rounded))
                                .tracking(2)
                                .foregroundStyle(Theme.inkSoft)
                            Text("\(last.player.emoji) \(last.player.name)")
                                .font(.system(size: 17, weight: .bold, design: .rounded))
                                .foregroundStyle(Theme.ink)
                            Text(lastPlaceLine)
                                .font(.footnote)
                                .multilineTextAlignment(.center)
                                .foregroundStyle(Theme.inkSoft)
                        }
                        .padding(16)
                        .frame(maxWidth: .infinity)
                        .cardStyle()
                    }

                    VStack(spacing: 0) {
                        ForEach(Array(standings.enumerated()), id: \.element.id) { index, standing in
                            HStack {
                                Text("\(index + 1).")
                                    .font(.system(size: 14, weight: .heavy, design: .rounded))
                                    .foregroundStyle(Theme.inkSoft)
                                    .frame(width: 26, alignment: .leading)
                                Text("\(standing.player.emoji) \(standing.player.name)")
                                    .font(.system(size: 15, weight: .semibold, design: .rounded))
                                    .foregroundStyle(Theme.ink)
                                Spacer()
                                Text("\(standing.points)")
                                    .font(.system(size: 17, weight: .heavy, design: .rounded))
                                    .foregroundStyle(Theme.lime)
                            }
                            .padding(.horizontal, 14)
                            .padding(.vertical, 10)
                            if index < standings.count - 1 {
                                Divider().overlay(Color.white.opacity(0.06))
                            }
                        }
                    }
                    .cardStyle()

                    VStack(spacing: 10) {
                        Button {
                            store.showChampionScreen = false
                            dismiss()
                        } label: {
                            Text("Luk")
                                .font(.system(size: 17, weight: .heavy, design: .rounded))
                                .foregroundStyle(Theme.courtDeep)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 15)
                                .background(RoundedRectangle(cornerRadius: 18, style: .continuous).fill(Theme.lime))
                        }

                        Button {
                            store.resetTournament()
                            dismiss()
                        } label: {
                            Text("Ny turnering – revanche!")
                                .font(.footnote.weight(.semibold))
                                .foregroundStyle(Theme.inkSoft)
                        }
                    }
                    .padding(.top, 4)
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 40)
            }
        }
        .onAppear {
            Haptics.success()
            let table = standings
            if championLine.isEmpty, let champion = table.first {
                championLine = Banter.line(for: champion.player, .champion).text
            }
            if lastPlaceLine.isEmpty, table.count > 1, let last = table.last {
                lastPlaceLine = Banter.line(for: last.player, .lastPlace).text
            }
        }
    }
}

/// Konfetti. Fordi en familiepokal skal fejres ordentligt.
private struct ConfettiPiece: Identifiable {
    let id = UUID()
    let emoji: String
    let x: CGFloat
    let size: CGFloat
    let duration: Double
    let delay: Double
    let rotation: Double

    init() {
        emoji = ["🎾", "🎉", "🏆", "✨", "🥇", "🎊"].randomElement() ?? "🎾"
        x = CGFloat.random(in: 0.03...0.97)
        size = CGFloat.random(in: 16...30)
        duration = Double.random(in: 3.2...6.0)
        delay = Double.random(in: 0...3.5)
        rotation = Double.random(in: -540...540)
    }
}

private struct ConfettiView: View {
    @State private var animate = false
    private let pieces: [ConfettiPiece] = (0..<38).map { _ in ConfettiPiece() }

    var body: some View {
        GeometryReader { geo in
            ZStack {
                ForEach(pieces) { piece in
                    Text(piece.emoji)
                        .font(.system(size: piece.size))
                        .rotationEffect(.degrees(animate ? piece.rotation : 0))
                        .position(
                            x: piece.x * geo.size.width,
                            y: animate ? geo.size.height + 80 : -80
                        )
                        .animation(
                            .linear(duration: piece.duration)
                            .repeatForever(autoreverses: false)
                            .delay(piece.delay),
                            value: animate
                        )
                }
            }
            .onAppear { animate = true }
        }
        .allowsHitTesting(false)
        .ignoresSafeArea()
    }
}

#Preview {
    ChampionView().environmentObject(TournamentStore())
}

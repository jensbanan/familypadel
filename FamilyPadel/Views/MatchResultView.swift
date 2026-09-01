import SwiftUI

/// Resultatarket der dukker op, når kampen har nået pointmålet.
struct MatchResultView: View {
    @EnvironmentObject private var store: TournamentStore
    @Environment(\.dismiss) private var dismiss

    let match: PadelMatch

    private var winner: TeamSide? { match.leadingTeam }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    Text(winner == nil ? "🤝" : "🎉")
                        .font(.system(size: 56))
                        .padding(.top, 12)

                    Text(winner == nil ? "Uafgjort!" : "\(winner!.displayName) vinder!")
                        .font(.system(size: 26, weight: .heavy, design: .rounded))
                        .foregroundStyle(Theme.ink)

                    HStack(spacing: 14) {
                        resultColumn(.a)
                        Text("–")
                            .font(.system(size: 28, weight: .heavy, design: .rounded))
                            .foregroundStyle(Theme.inkSoft)
                        resultColumn(.b)
                    }

                    if !match.isLineupComplete {
                        Text("Bemærk: der stod ikke fire spillere på banen. Pointene fordeles kun til dem, der var sat på.")
                            .font(.caption)
                            .multilineTextAlignment(.center)
                            .foregroundStyle(Theme.gold)
                            .padding(14)
                            .cardStyle(Theme.cardRaised)
                    }

                    VStack(alignment: .leading, spacing: 10) {
                        Label("Fra kommentatorboksen", systemImage: "megaphone.fill")
                            .font(.headline)
                            .foregroundStyle(Theme.ink)
                        ForEach(store.feed.prefix(4)) { line in
                            HStack(alignment: .top, spacing: 10) {
                                Text(line.emoji)
                                    .frame(width: 28, height: 28)
                                    .background(Circle().fill(line.persona.accent.opacity(0.22)))
                                Text(line.text)
                                    .font(.system(size: 14, weight: .medium, design: .rounded))
                                    .foregroundStyle(Theme.ink)
                                    .fixedSize(horizontal: false, vertical: true)
                                Spacer(minLength: 0)
                            }
                        }
                    }
                    .padding(16)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .cardStyle()

                    Button {
                        Haptics.success()
                        store.confirmCurrentMatch()
                        dismiss()
                    } label: {
                        Text("Godkend og gå videre")
                            .font(.system(size: 18, weight: .heavy, design: .rounded))
                            .foregroundStyle(Theme.courtDeep)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 16)
                            .background(RoundedRectangle(cornerRadius: 20, style: .continuous).fill(Theme.lime))
                    }

                    Button("Tilbage – vi spiller videre") {
                        store.matchAwaitingConfirmation = nil
                        dismiss()
                    }
                    .font(.footnote.weight(.semibold))
                    .foregroundStyle(Theme.inkSoft)
                }
                .padding(.horizontal, 18)
                .padding(.bottom, 30)
            }
            .courtBackground()
            .navigationTitle("Runde \(match.round) · Bane \(match.court)")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarBackground(Theme.courtMid, for: .navigationBar)
        }
        .interactiveDismissDisabled()
    }

    private func resultColumn(_ team: TeamSide) -> some View {
        let color = Theme.color(for: team)
        return VStack(spacing: 8) {
            Text("\(match.score(for: team))")
                .font(.system(size: 54, weight: .heavy, design: .rounded))
                .monospacedDigit()
                .foregroundStyle(color)
            ForEach(store.tournament.players(match.ids(for: team))) { player in
                HStack(spacing: 5) {
                    Text(player.emoji).font(.caption)
                    Text(player.shortName)
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(Theme.ink)
                }
            }
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 16)
        .cardStyle()
    }
}

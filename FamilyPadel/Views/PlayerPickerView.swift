import SwiftUI

/// Vælg hvem der skal stå på en bestemt plads – også midt i en kamp.
struct PlayerPickerView: View {
    @EnvironmentObject private var store: TournamentStore
    @Environment(\.dismiss) private var dismiss

    let match: PadelMatch
    let target: SlotTarget

    private var playedCounts: [UUID: Int] { store.playedCounts() }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 10) {
                    Text("Hvem skal på \(target.team.displayName.lowercased())?")
                        .font(.system(size: 15, weight: .semibold, design: .rounded))
                        .foregroundStyle(Theme.inkSoft)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.top, 6)

                    ForEach(store.tournament.players) { player in
                        row(for: player)
                    }

                    if match.ids(for: target.team).indices.contains(target.index) {
                        Button(role: .destructive) {
                            store.clearSlot(team: target.team, index: target.index, in: match.id)
                            dismiss()
                        } label: {
                            Label("Ryd pladsen", systemImage: "xmark.circle")
                                .font(.system(size: 16, weight: .semibold, design: .rounded))
                                .foregroundStyle(Theme.coral)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 14)
                                .cardStyle()
                        }
                        .padding(.top, 6)
                    }
                }
                .padding(.horizontal, 16)
                .padding(.bottom, 30)
            }
            .courtBackground()
            .navigationTitle("Vælg spiller")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarBackground(Theme.courtMid, for: .navigationBar)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Luk") { dismiss() }
                        .foregroundStyle(Theme.lime)
                }
            }
        }
        .presentationDetents([.medium, .large])
    }

    private func row(for player: Player) -> some View {
        let isOnThisSlot = match.ids(for: target.team).indices.contains(target.index)
            && match.ids(for: target.team)[target.index] == player.id
        let isElsewhereInMatch = match.contains(player.id) && !isOnThisSlot

        return Button {
            Haptics.tap()
            store.setPlayer(player.id, team: target.team, index: target.index, in: match.id)
            dismiss()
        } label: {
            HStack(spacing: 13) {
                Text(player.emoji)
                    .font(.system(size: 24))
                    .frame(width: 44, height: 44)
                    .background(Circle().fill(player.persona.accent.opacity(0.22)))

                VStack(alignment: .leading, spacing: 2) {
                    Text(player.name)
                        .font(.system(size: 17, weight: .semibold, design: .rounded))
                        .foregroundStyle(Theme.ink)
                    Text(isElsewhereInMatch
                         ? "Står allerede på banen – flyttes hertil"
                         : "\(playedCounts[player.id] ?? 0) kampe i programmet")
                        .font(.caption)
                        .foregroundStyle(isElsewhereInMatch ? Theme.gold : Theme.inkSoft)
                }

                Spacer(minLength: 0)

                if isOnThisSlot {
                    Image(systemName: "checkmark.circle.fill")
                        .font(.title3)
                        .foregroundStyle(Theme.lime)
                }
            }
            .padding(14)
            .frame(maxWidth: .infinity)
            .cardStyle(isOnThisSlot ? Theme.cardRaised : Theme.card)
        }
        .buttonStyle(.plain)
    }
}

import SwiftUI

struct StandingsView: View {
    @EnvironmentObject private var store: TournamentStore

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 18) {
                    if store.tournament.finishedMatchCount == 0 {
                        emptyState
                    } else {
                        podium
                        table
                    }
                }
                .padding(.horizontal, 16)
                .padding(.bottom, 32)
            }
            .courtBackground()
            .navigationTitle("Stilling")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarBackground(Theme.courtMid, for: .navigationBar)
        }
    }

    private var standings: [Standing] { store.standings }

    private var emptyState: some View {
        VStack(spacing: 12) {
            Text("📋").font(.system(size: 50))
            Text("Ingen kampe er spillet endnu")
                .font(.system(size: 19, weight: .heavy, design: .rounded))
                .foregroundStyle(Theme.ink)
            Text("Så snart første kamp er godkendt, begynder tallene at tale. Og de kommer til at tale om Thomas.")
                .font(.subheadline)
                .multilineTextAlignment(.center)
                .foregroundStyle(Theme.inkSoft)
        }
        .padding(28)
        .frame(maxWidth: .infinity)
        .cardStyle()
        .padding(.top, 40)
    }

    private var podium: some View {
        let top = Array(standings.prefix(3))
        return HStack(alignment: .bottom, spacing: 10) {
            if top.count > 1 { podiumColumn(top[1], place: 2, height: 92) }
            if !top.isEmpty { podiumColumn(top[0], place: 1, height: 118) }
            if top.count > 2 { podiumColumn(top[2], place: 3, height: 74) }
        }
        .padding(.top, 8)
    }

    private func podiumColumn(_ standing: Standing, place: Int, height: CGFloat) -> some View {
        let medal = ["🥇", "🥈", "🥉"][place - 1]
        return VStack(spacing: 6) {
            Text(standing.player.emoji).font(.system(size: 28))
            Text(standing.player.shortName)
                .font(.system(size: 14, weight: .bold, design: .rounded))
                .foregroundStyle(Theme.ink)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
            Text("\(standing.points)")
                .font(.system(size: 20, weight: .heavy, design: .rounded))
                .foregroundStyle(Theme.lime)
            ZStack {
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .fill(standing.player.persona.accent.opacity(0.32))
                Text(medal).font(.system(size: 26))
            }
            .frame(height: height)
        }
        .frame(maxWidth: .infinity)
    }

    private var table: some View {
        VStack(spacing: 0) {
            HStack {
                Text("#").frame(width: 22, alignment: .leading)
                Text("Spiller").frame(maxWidth: .infinity, alignment: .leading)
                Text("K").frame(width: 26)
                Text("+/−").frame(width: 46)
                Text("Point").frame(width: 46, alignment: .trailing)
            }
            .font(.system(size: 11, weight: .bold, design: .rounded))
            .tracking(1.1)
            .foregroundStyle(Theme.inkSoft)
            .padding(.horizontal, 14)
            .padding(.vertical, 10)

            ForEach(Array(standings.enumerated()), id: \.element.id) { index, standing in
                VStack(spacing: 0) {
                    Divider().overlay(Color.white.opacity(0.06))
                    HStack {
                        Text("\(index + 1)")
                            .font(.system(size: 14, weight: .heavy, design: .rounded))
                            .foregroundStyle(index == 0 ? Theme.gold : Theme.inkSoft)
                            .frame(width: 22, alignment: .leading)

                        HStack(spacing: 8) {
                            Text(standing.player.emoji).font(.system(size: 17))
                            VStack(alignment: .leading, spacing: 1) {
                                Text(standing.player.name)
                                    .font(.system(size: 15, weight: .semibold, design: .rounded))
                                    .foregroundStyle(Theme.ink)
                                Text("\(standing.wins) sejre · \(standing.losses) nederlag")
                                    .font(.system(size: 10))
                                    .foregroundStyle(Theme.inkSoft)
                            }
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)

                        Text("\(standing.played)")
                            .font(.system(size: 14, design: .rounded))
                            .foregroundStyle(Theme.inkSoft)
                            .frame(width: 26)

                        Text(standing.difference > 0 ? "+\(standing.difference)" : "\(standing.difference)")
                            .font(.system(size: 14, weight: .semibold, design: .rounded))
                            .foregroundStyle(standing.difference >= 0 ? Theme.lime : Theme.coral)
                            .frame(width: 46)

                        Text("\(standing.points)")
                            .font(.system(size: 18, weight: .heavy, design: .rounded))
                            .foregroundStyle(Theme.ink)
                            .frame(width: 46, alignment: .trailing)
                    }
                    .padding(.horizontal, 14)
                    .padding(.vertical, 11)
                }
            }
        }
        .cardStyle()
    }
}

#Preview {
    StandingsView().environmentObject(TournamentStore())
}

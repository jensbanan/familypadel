import SwiftUI

struct ScheduleView: View {
    @EnvironmentObject private var store: TournamentStore

    private var rounds: [Int] {
        Array(Set(store.tournament.matches.map(\.round))).sorted()
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    if !store.tournament.scheduleGenerated {
                        notice
                    }

                    ForEach(rounds, id: \.self) { round in
                        roundCard(round)
                    }
                }
                .padding(.horizontal, 16)
                .padding(.bottom, 32)
                .padding(.top, 8)
            }
            .courtBackground()
            .navigationTitle("Program")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarBackground(Theme.courtMid, for: .navigationBar)
        }
    }

    private var notice: some View {
        HStack(spacing: 12) {
            Text("🗓️").font(.system(size: 26))
            Text("Resten af programmet lægges, så snart første runde er godkendt – så tæller den faktiske opstilling med i fordelingen.")
                .font(.footnote)
                .foregroundStyle(Theme.inkSoft)
                .fixedSize(horizontal: false, vertical: true)
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle(Theme.cardRaised)
    }

    private func roundCard(_ round: Int) -> some View {
        let matches = store.tournament.matches.filter { $0.round == round }.sorted { $0.court < $1.court }
        let isCurrent = store.tournament.currentMatch?.round == round

        return VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("RUNDE \(round)")
                    .font(.system(size: 12, weight: .bold, design: .rounded))
                    .tracking(2)
                    .foregroundStyle(isCurrent ? Theme.lime : Theme.inkSoft)
                Spacer()
                if isCurrent {
                    Text("SPILLES NU")
                        .font(.system(size: 10, weight: .bold, design: .rounded))
                        .foregroundStyle(Theme.courtDeep)
                        .padding(.horizontal, 9)
                        .padding(.vertical, 4)
                        .background(Capsule().fill(Theme.lime))
                }
            }

            ForEach(matches) { match in
                matchRow(match)
            }
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle(isCurrent ? Theme.cardRaised : Theme.card)
    }

    private func matchRow(_ match: PadelMatch) -> some View {
        HStack(spacing: 10) {
            teamLabel(match, .a)

            VStack(spacing: 2) {
                if match.isFinished {
                    Text("\(match.scoreA)–\(match.scoreB)")
                        .font(.system(size: 15, weight: .heavy, design: .rounded))
                        .monospacedDigit()
                        .foregroundStyle(Theme.ink)
                } else {
                    Text("vs")
                        .font(.system(size: 12, weight: .bold, design: .rounded))
                        .foregroundStyle(Theme.inkSoft)
                }
                Text("Bane \(match.court)")
                    .font(.system(size: 9))
                    .foregroundStyle(Theme.inkSoft)
            }
            .frame(width: 58)

            teamLabel(match, .b)
        }
        .padding(.vertical, 8)
        .padding(.horizontal, 10)
        .background(
            RoundedRectangle(cornerRadius: 12, style: .continuous)
                .fill(Theme.courtDeep.opacity(match.isFinished ? 0.35 : 0.6))
        )
        .opacity(match.isFinished ? 0.75 : 1)
    }

    private func teamLabel(_ match: PadelMatch, _ team: TeamSide) -> some View {
        let players = store.tournament.players(match.ids(for: team))
        let isWinner = match.isFinished && match.leadingTeam == team

        return VStack(alignment: team == .a ? .leading : .trailing, spacing: 2) {
            if players.isEmpty {
                Text("Ikke sat endnu")
                    .font(.system(size: 12, weight: .medium, design: .rounded))
                    .foregroundStyle(Theme.inkSoft)
            } else {
                ForEach(players) { player in
                    Text("\(player.emoji) \(player.shortName)")
                        .font(.system(size: 12, weight: isWinner ? .bold : .medium, design: .rounded))
                        .foregroundStyle(isWinner ? Theme.lime : Theme.ink)
                        .lineLimit(1)
                        .minimumScaleFactor(0.75)
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: team == .a ? .leading : .trailing)
    }
}

#Preview {
    ScheduleView().environmentObject(TournamentStore())
}

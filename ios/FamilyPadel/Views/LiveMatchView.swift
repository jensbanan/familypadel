import SwiftUI

/// Hvilken plads på banen brugeren er ved at besætte.
struct SlotTarget: Identifiable {
    let id = UUID()
    let team: TeamSide
    let index: Int
}

struct LiveMatchView: View {
    @EnvironmentObject private var store: TournamentStore
    @State private var slotTarget: SlotTarget?

    private var match: PadelMatch? { store.tournament.currentMatch }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 18) {
                    if let match {
                        matchHeader(match)
                        if !match.isLineupComplete { lineupHint }
                        scoreboard(match)
                        progress(match)
                        restingRow
                        feedCard
                    } else {
                        emptyState
                    }
                }
                .padding(.horizontal, 16)
                .padding(.bottom, 32)
            }
            .courtBackground()
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Text("Familien Vestergaard")
                        .font(.headline)
                        .foregroundStyle(Theme.ink)
                }
            }
            .toolbarBackground(Theme.courtMid, for: .navigationBar)
        }
        .sheet(item: $slotTarget) { target in
            if let match {
                PlayerPickerView(match: match, target: target)
                    .environmentObject(store)
            }
        }
        .sheet(item: $store.matchAwaitingConfirmation) { finished in
            MatchResultView(match: finished)
                .environmentObject(store)
        }
    }

    // MARK: - Header

    private func matchHeader(_ match: PadelMatch) -> some View {
        VStack(spacing: 6) {
            Text("RUNDE \(match.round) · BANE \(match.court)")
                .font(.system(size: 13, weight: .bold, design: .rounded))
                .tracking(2.4)
                .foregroundStyle(Theme.lime)
            Text("Kamp \(store.tournament.finishedMatchCount + 1) af \(max(store.tournament.matches.count, store.tournament.finishedMatchCount + 1))")
                .font(.caption)
                .foregroundStyle(Theme.inkSoft)
        }
        .padding(.top, 6)
    }

    private var lineupHint: some View {
        HStack(spacing: 12) {
            Image(systemName: "hand.tap.fill")
                .font(.title3)
                .foregroundStyle(Theme.courtDeep)
                .frame(width: 38, height: 38)
                .background(Circle().fill(Theme.lime))

            VStack(alignment: .leading, spacing: 2) {
                Text("Sæt holdet mens kampen kører")
                    .font(.system(size: 15, weight: .bold, design: .rounded))
                    .foregroundStyle(Theme.ink)
                Text("Tryk på en tom plads for at vælge en spiller.")
                    .font(.caption)
                    .foregroundStyle(Theme.inkSoft)
            }

            Spacer(minLength: 0)

            Button {
                Haptics.tap()
                withAnimation { store.autoFillCurrentLineup() }
            } label: {
                Text("Auto")
                    .font(.footnote.bold())
                    .foregroundStyle(Theme.courtDeep)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 8)
                    .background(Capsule().fill(Theme.gold))
            }
        }
        .padding(14)
        .cardStyle(Theme.cardRaised)
    }

    // MARK: - Scoreboard

    private func scoreboard(_ match: PadelMatch) -> some View {
        HStack(spacing: 12) {
            teamPanel(match: match, team: .a)
            teamPanel(match: match, team: .b)
        }
    }

    private func teamPanel(match: PadelMatch, team: TeamSide) -> some View {
        let color = Theme.color(for: team)
        let players = match.ids(for: team)

        return VStack(spacing: 12) {
            Text(team.displayName.uppercased())
                .font(.system(size: 12, weight: .bold, design: .rounded))
                .tracking(1.8)
                .foregroundStyle(color)

            VStack(spacing: 6) {
                ForEach(0..<2, id: \.self) { index in
                    slotButton(
                        player: players.indices.contains(index) ? store.tournament.player(players[index]) : nil,
                        team: team,
                        index: index,
                        color: color
                    )
                }
            }

            Text("\(match.score(for: team))")
                .font(.system(size: 68, weight: .heavy, design: .rounded))
                .monospacedDigit()
                .foregroundStyle(Theme.ink)
                .contentTransition(.numericText())

            Button {
                Haptics.tap()
                withAnimation(.snappy) { store.addPoint(to: team) }
            } label: {
                Label("Point", systemImage: "plus")
                    .font(.system(size: 17, weight: .heavy, design: .rounded))
                    .foregroundStyle(Theme.courtDeep)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 14)
                    .background(
                        RoundedRectangle(cornerRadius: 16, style: .continuous).fill(color)
                    )
            }

            Button {
                withAnimation(.snappy) { store.removePoint(from: team) }
            } label: {
                Label("Fortryd", systemImage: "arrow.uturn.backward")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(Theme.inkSoft)
            }
            .disabled(match.score(for: team) == 0)
            .opacity(match.score(for: team) == 0 ? 0.35 : 1)
        }
        .padding(14)
        .frame(maxWidth: .infinity)
        .cardStyle()
        .overlay(
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .stroke(color.opacity(match.leadingTeam == team ? 0.9 : 0), lineWidth: 2)
        )
    }

    private func slotButton(player: Player?, team: TeamSide, index: Int, color: Color) -> some View {
        Button {
            slotTarget = SlotTarget(team: team, index: index)
        } label: {
            HStack(spacing: 7) {
                if let player {
                    Text(player.emoji).font(.system(size: 15))
                    Text(player.shortName)
                        .font(.system(size: 14, weight: .semibold, design: .rounded))
                        .foregroundStyle(Theme.ink)
                        .lineLimit(1)
                        .minimumScaleFactor(0.7)
                } else {
                    Image(systemName: "plus.circle.dashed")
                        .font(.system(size: 14))
                        .foregroundStyle(color)
                    Text("Vælg")
                        .font(.system(size: 14, weight: .semibold, design: .rounded))
                        .foregroundStyle(Theme.inkSoft)
                }
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 9)
            .background(
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .fill(player == nil ? Theme.courtDeep.opacity(0.55) : color.opacity(0.18))
            )
            .overlay(
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .strokeBorder(
                        player == nil ? color.opacity(0.5) : Color.clear,
                        style: StrokeStyle(lineWidth: 1.2, dash: [4, 3])
                    )
            )
        }
        .buttonStyle(.plain)
    }

    // MARK: - Fremdrift

    private func progress(_ match: PadelMatch) -> some View {
        let target = max(store.tournament.pointsPerMatch, 1)
        let fraction = min(Double(match.totalPoints) / Double(target), 1)

        return VStack(spacing: 8) {
            HStack {
                Text("\(match.totalPoints) / \(target) point spillet")
                    .font(.footnote.weight(.semibold))
                    .foregroundStyle(Theme.inkSoft)
                Spacer()
                if match.totalPoints >= target {
                    Text("Kampen er slut!")
                        .font(.footnote.bold())
                        .foregroundStyle(Theme.lime)
                }
            }

            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule().fill(Theme.courtDeep.opacity(0.7))
                    Capsule()
                        .fill(LinearGradient(colors: [Theme.gold, Theme.lime], startPoint: .leading, endPoint: .trailing))
                        .frame(width: max(geo.size.width * fraction, fraction > 0 ? 8 : 0))
                }
            }
            .frame(height: 10)

            if match.totalPoints >= target {
                Button {
                    store.matchAwaitingConfirmation = match
                } label: {
                    Text("Se resultatet")
                        .font(.system(size: 16, weight: .heavy, design: .rounded))
                        .foregroundStyle(Theme.courtDeep)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 13)
                        .background(RoundedRectangle(cornerRadius: 16, style: .continuous).fill(Theme.lime))
                }
            }
        }
        .padding(14)
        .cardStyle()
    }

    private var restingRow: some View {
        Group {
            if !store.restingPlayers.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("PÅ BÆNKEN")
                        .font(.system(size: 11, weight: .bold, design: .rounded))
                        .tracking(1.8)
                        .foregroundStyle(Theme.inkSoft)
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            ForEach(store.restingPlayers) { player in
                                HStack(spacing: 5) {
                                    Text(player.emoji).font(.caption)
                                    Text(player.shortName)
                                        .font(.caption.weight(.semibold))
                                        .foregroundStyle(Theme.ink)
                                }
                                .padding(.horizontal, 11)
                                .padding(.vertical, 6)
                                .background(Capsule().fill(player.persona.accent.opacity(0.22)))
                            }
                        }
                    }
                }
                .padding(14)
                .frame(maxWidth: .infinity, alignment: .leading)
                .cardStyle()
            }
        }
    }

    // MARK: - Kommentatorboksen

    private var feedCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label("Kommentatorboksen", systemImage: "megaphone.fill")
                .font(.headline)
                .foregroundStyle(Theme.ink)

            if store.feed.isEmpty {
                Text("Her kommer der kommentarer, så snart der bliver scoret. Ingen bliver skånet. Undtagen Maria.")
                    .font(.footnote)
                    .foregroundStyle(Theme.inkSoft)
            } else {
                ForEach(store.feed.prefix(12)) { line in
                    HStack(alignment: .top, spacing: 10) {
                        Text(line.emoji)
                            .font(.system(size: 17))
                            .frame(width: 32, height: 32)
                            .background(Circle().fill(line.persona.accent.opacity(0.22)))
                        Text(line.text)
                            .font(.system(size: 14, weight: .medium, design: .rounded))
                            .foregroundStyle(Theme.ink)
                            .fixedSize(horizontal: false, vertical: true)
                        Spacer(minLength: 0)
                    }
                    .transition(.move(edge: .top).combined(with: .opacity))
                }
            }
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle()
        .animation(.snappy, value: store.feed.count)
    }

    private var emptyState: some View {
        VStack(spacing: 14) {
            Text("🏆").font(.system(size: 60))
            Text("Alle kampe er spillet!")
                .font(.system(size: 22, weight: .heavy, design: .rounded))
                .foregroundStyle(Theme.ink)
            Text("Kig i Stilling for at se, hvem der løb med æren – og hvem der skal høre for det til jul.")
                .font(.subheadline)
                .multilineTextAlignment(.center)
                .foregroundStyle(Theme.inkSoft)

            Button {
                store.showChampionScreen = true
            } label: {
                Text("Kår mesteren")
                    .font(.system(size: 17, weight: .heavy, design: .rounded))
                    .foregroundStyle(Theme.courtDeep)
                    .padding(.horizontal, 26)
                    .padding(.vertical, 13)
                    .background(Capsule().fill(Theme.lime))
            }
        }
        .padding(30)
        .frame(maxWidth: .infinity)
        .cardStyle()
        .padding(.top, 40)
    }
}

#Preview {
    LiveMatchView().environmentObject(TournamentStore())
}

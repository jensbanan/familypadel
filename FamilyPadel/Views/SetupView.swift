import SwiftUI

struct SetupView: View {
    @EnvironmentObject private var store: TournamentStore
    @State private var newPlayerName = ""
    @FocusState private var nameFieldFocused: Bool

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 22) {
                    header
                    playersCard
                    rulesCard
                    startButton
                }
                .padding(.horizontal, 18)
                .padding(.bottom, 40)
            }
            .courtBackground()
            .scrollDismissesKeyboard(.interactively)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Text("Opsætning")
                        .font(.headline)
                        .foregroundStyle(Theme.ink)
                }
            }
            .toolbarBackground(Theme.courtMid, for: .navigationBar)
        }
    }

    // MARK: - Dele

    private var header: some View {
        VStack(spacing: 10) {
            Text("🎾🏆")
                .font(.system(size: 46))
            Text("Familien Vestergaard")
                .font(.system(size: 30, weight: .heavy, design: .rounded))
                .foregroundStyle(Theme.ink)
            Text("PADEL CHAMPIONSHIP")
                .font(.system(size: 15, weight: .bold, design: .rounded))
                .tracking(3.4)
                .foregroundStyle(Theme.lime)
            Text("Americano. Alle spiller med alle. Kun én kan vinde – og vi ved godt hvem der tror, det bliver ham.")
                .font(.subheadline)
                .multilineTextAlignment(.center)
                .foregroundStyle(Theme.inkSoft)
                .padding(.horizontal, 8)
        }
        .padding(.top, 8)
    }

    private var playersCard: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack {
                Label("Spillere", systemImage: "person.3.fill")
                    .font(.headline)
                    .foregroundStyle(Theme.ink)
                Spacer()
                Text("\(store.tournament.players.count)")
                    .font(.subheadline.bold())
                    .foregroundStyle(Theme.lime)
            }

            ForEach(store.tournament.players) { player in
                HStack(spacing: 12) {
                    Text(player.emoji)
                        .font(.system(size: 26))
                        .frame(width: 42, height: 42)
                        .background(Circle().fill(player.persona.accent.opacity(0.22)))

                    VStack(alignment: .leading, spacing: 2) {
                        Text(player.name)
                            .font(.system(size: 17, weight: .semibold, design: .rounded))
                            .foregroundStyle(Theme.ink)
                        Text(player.persona.tagline)
                            .font(.caption)
                            .foregroundStyle(Theme.inkSoft)
                            .lineLimit(2)
                    }

                    Spacer(minLength: 4)

                    Button {
                        withAnimation { store.removePlayer(player) }
                    } label: {
                        Image(systemName: "minus.circle.fill")
                            .font(.title3)
                            .foregroundStyle(Theme.coral.opacity(0.8))
                    }
                    .buttonStyle(.plain)
                }
                .padding(.vertical, 4)
            }

            HStack(spacing: 10) {
                TextField("Tilføj spiller", text: $newPlayerName)
                    .textInputAutocapitalization(.words)
                    .autocorrectionDisabled()
                    .focused($nameFieldFocused)
                    .submitLabel(.done)
                    .onSubmit(addPlayer)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 11)
                    .background(
                        RoundedRectangle(cornerRadius: 14, style: .continuous)
                            .fill(Theme.courtDeep.opacity(0.6))
                    )
                    .foregroundStyle(Theme.ink)

                Button(action: addPlayer) {
                    Image(systemName: "plus")
                        .font(.headline)
                        .foregroundStyle(Theme.courtDeep)
                        .frame(width: 44, height: 44)
                        .background(Circle().fill(Theme.lime))
                }
                .disabled(newPlayerName.trimmingCharacters(in: .whitespaces).isEmpty)
                .opacity(newPlayerName.trimmingCharacters(in: .whitespaces).isEmpty ? 0.4 : 1)
            }

            Button {
                withAnimation { store.restoreFamily() }
            } label: {
                Label("Hent familien tilbage", systemImage: "arrow.counterclockwise")
                    .font(.footnote.weight(.semibold))
                    .foregroundStyle(Theme.inkSoft)
            }
        }
        .padding(18)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle()
    }

    private var rulesCard: some View {
        VStack(alignment: .leading, spacing: 18) {
            Label("Regler", systemImage: "slider.horizontal.3")
                .font(.headline)
                .foregroundStyle(Theme.ink)

            stepperRow(
                title: "Point pr. kamp",
                subtitle: "Kampen slutter, når de to hold tilsammen har scoret så mange point.",
                value: Binding(
                    get: { store.tournament.pointsPerMatch },
                    set: { store.tournament.pointsPerMatch = $0 }
                ),
                range: 8...48,
                step: 1
            )

            stepperRow(
                title: "Antal baner",
                subtitle: "Hvor mange kampe der spilles samtidig.",
                value: Binding(
                    get: { store.tournament.courts },
                    set: { store.tournament.courts = $0 }
                ),
                range: 1...max(1, AmericanoScheduler.maxCourts(playerCount: store.tournament.players.count)),
                step: 1
            )

            stepperRow(
                title: "Antal runder",
                subtitle: "Foreslået til \(store.tournament.players.count) spillere: \(store.suggestedRounds) runder.",
                value: Binding(
                    get: { store.tournament.rounds },
                    set: { store.tournament.rounds = $0 }
                ),
                range: 1...40,
                step: 1
            )

            Button {
                store.tournament.rounds = store.suggestedRounds
            } label: {
                Label("Brug foreslået antal runder", systemImage: "wand.and.stars")
                    .font(.footnote.weight(.semibold))
                    .foregroundStyle(Theme.lime)
            }
        }
        .padding(18)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle()
    }

    private func stepperRow(
        title: String,
        subtitle: String,
        value: Binding<Int>,
        range: ClosedRange<Int>,
        step: Int
    ) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Stepper(value: value, in: range, step: step) {
                HStack {
                    Text(title)
                        .font(.system(size: 16, weight: .semibold, design: .rounded))
                        .foregroundStyle(Theme.ink)
                    Spacer()
                    Text("\(value.wrappedValue)")
                        .font(.system(size: 20, weight: .heavy, design: .rounded))
                        .foregroundStyle(Theme.lime)
                }
            }
            Text(subtitle)
                .font(.caption)
                .foregroundStyle(Theme.inkSoft)
        }
    }

    private var startButton: some View {
        VStack(spacing: 10) {
            Button {
                Haptics.success()
                withAnimation { store.start() }
            } label: {
                Text("Start turneringen 🎾")
                    .font(.system(size: 19, weight: .heavy, design: .rounded))
                    .foregroundStyle(Theme.courtDeep)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 17)
                    .background(
                        RoundedRectangle(cornerRadius: 20, style: .continuous)
                            .fill(Theme.lime)
                    )
            }
            .disabled(!store.canStart)
            .opacity(store.canStart ? 1 : 0.4)

            Text(store.canStart
                 ? "Første kamp starter med tomme hold – I sætter selv spillerne, mens kampen kører."
                 : "Der skal mindst være 4 spillere.")
                .font(.caption)
                .multilineTextAlignment(.center)
                .foregroundStyle(Theme.inkSoft)
        }
    }

    private func addPlayer() {
        store.addPlayer(named: newPlayerName)
        newPlayerName = ""
        nameFieldFocused = false
    }
}

#Preview {
    SetupView().environmentObject(TournamentStore())
}

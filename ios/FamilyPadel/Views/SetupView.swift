import SwiftUI

private enum SetupStep {
    case attendance
    case length
}

struct SetupView: View {
    @EnvironmentObject private var store: TournamentStore
    @State private var step: SetupStep = .attendance

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 22) {
                    header
                    stepIndicator
                    switch step {
                    case .attendance:
                        AttendanceCard()
                        continueButton
                    case .length:
                        MatchLengthCard()
                        CourtsAndRoundsCard()
                        startButton
                    }
                }
                .padding(.horizontal, 18)
                .padding(.bottom, 40)
            }
            .courtBackground()
            .scrollDismissesKeyboard(.interactively)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Text(step == .attendance ? "Hvem er med?" : "Kamplængde")
                        .font(.headline)
                        .foregroundStyle(Theme.ink)
                }
                if step == .length {
                    ToolbarItem(placement: .navigationBarLeading) {
                        Button {
                            withAnimation { step = .attendance }
                        } label: {
                            Label("Tilbage", systemImage: "chevron.left")
                                .foregroundStyle(Theme.lime)
                        }
                    }
                }
            }
            .toolbarBackground(Theme.courtMid, for: .navigationBar)
        }
    }

    // MARK: - Dele

    private var header: some View {
        VStack(spacing: 10) {
            Text("🎾🏆").font(.system(size: 42))
            Text("Familien Vestergaard")
                .font(.system(size: 28, weight: .heavy, design: .rounded))
                .foregroundStyle(Theme.ink)
            Text("PADEL CHAMPIONSHIP")
                .font(.system(size: 14, weight: .bold, design: .rounded))
                .tracking(3.2)
                .foregroundStyle(Theme.lime)
        }
        .padding(.top, 6)
    }

    private var stepIndicator: some View {
        HStack(spacing: 8) {
            stepDot(number: 1, title: "Fremmøde", active: true)
            Rectangle()
                .fill(step == .length ? Theme.lime : Color.white.opacity(0.14))
                .frame(height: 2)
            stepDot(number: 2, title: "Kamplængde", active: step == .length)
        }
    }

    private func stepDot(number: Int, title: String, active: Bool) -> some View {
        HStack(spacing: 7) {
            Text("\(number)")
                .font(.system(size: 12, weight: .heavy, design: .rounded))
                .foregroundStyle(active ? Theme.courtDeep : Theme.inkSoft)
                .frame(width: 22, height: 22)
                .background(Circle().fill(active ? Theme.lime : Color.white.opacity(0.12)))
            Text(title)
                .font(.system(size: 12, weight: .semibold, design: .rounded))
                .foregroundStyle(active ? Theme.ink : Theme.inkSoft)
        }
    }

    private var continueButton: some View {
        VStack(spacing: 10) {
            Button {
                Haptics.tap()
                store.tournament.rounds = store.suggestedRounds
                withAnimation { step = .length }
            } label: {
                Text("Videre til kamplængde")
                    .font(.system(size: 18, weight: .heavy, design: .rounded))
                    .foregroundStyle(Theme.courtDeep)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .background(RoundedRectangle(cornerRadius: 20, style: .continuous).fill(Theme.lime))
            }
            .disabled(!store.canStart)
            .opacity(store.canStart ? 1 : 0.4)

            if !store.canStart {
                Text("Der skal være mindst 4 spillere til stede.")
                    .font(.caption)
                    .foregroundStyle(Theme.gold)
            }
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
                    .background(RoundedRectangle(cornerRadius: 20, style: .continuous).fill(Theme.lime))
            }
            .disabled(!store.canStart)
            .opacity(store.canStart ? 1 : 0.4)

            Text("Første kamp starter med tomme pladser – I sætter selv holdet, mens kampen kører.")
                .font(.caption)
                .multilineTextAlignment(.center)
                .foregroundStyle(Theme.inkSoft)
        }
    }
}

// MARK: - Trin 1: Hvem er mødt op?

struct AttendanceCard: View {
    @EnvironmentObject private var store: TournamentStore
    @State private var guestName = ""
    @FocusState private var guestFieldFocused: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack {
                Label("Hvem er med i dag?", systemImage: "person.3.fill")
                    .font(.headline)
                    .foregroundStyle(Theme.ink)
                Spacer()
                Text("\(store.tournament.players.count)")
                    .font(.system(size: 20, weight: .heavy, design: .rounded))
                    .foregroundStyle(store.canStart ? Theme.lime : Theme.gold)
            }

            Text("Tryk spillerne til og fra. Alle er slået til som standard.")
                .font(.caption)
                .foregroundStyle(Theme.inkSoft)

            ForEach(store.tournament.roster) { player in
                row(for: player)
            }

            HStack(spacing: 10) {
                TextField("Navn på gæst", text: $guestName)
                    .textInputAutocapitalization(.words)
                    .autocorrectionDisabled()
                    .focused($guestFieldFocused)
                    .submitLabel(.done)
                    .onSubmit(addGuest)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 11)
                    .background(RoundedRectangle(cornerRadius: 14, style: .continuous).fill(Theme.courtDeep.opacity(0.6)))
                    .foregroundStyle(Theme.ink)

                Button(action: addGuest) {
                    Image(systemName: "plus")
                        .font(.headline)
                        .foregroundStyle(Theme.courtDeep)
                        .frame(width: 44, height: 44)
                        .background(Circle().fill(Theme.gold))
                }
                .disabled(trimmedGuest.isEmpty)
                .opacity(trimmedGuest.isEmpty ? 0.4 : 1)
            }

            HStack(spacing: 16) {
                Button("Vælg alle") { withAnimation { store.setAllPresent(true) } }
                Button("Fravælg alle") { withAnimation { store.setAllPresent(false) } }
                Spacer()
            }
            .font(.footnote.weight(.semibold))
            .foregroundStyle(Theme.inkSoft)
        }
        .padding(18)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle()
    }

    private var trimmedGuest: String {
        guestName.trimmingCharacters(in: .whitespaces)
    }

    private func addGuest() {
        store.addGuest(named: guestName)
        guestName = ""
        guestFieldFocused = false
    }

    private func row(for player: Player) -> some View {
        let present = store.isPresent(player)
        return HStack(spacing: 12) {
            Button {
                Haptics.tap()
                withAnimation { store.togglePresence(player) }
            } label: {
                HStack(spacing: 12) {
                    ZStack {
                        Circle()
                            .fill(present ? player.persona.accent.opacity(0.3) : Color.white.opacity(0.06))
                            .frame(width: 42, height: 42)
                        Text(player.emoji).font(.system(size: 24))
                    }
                    .overlay(alignment: .bottomTrailing) {
                        Image(systemName: present ? "checkmark.circle.fill" : "circle")
                            .font(.system(size: 15))
                            .foregroundStyle(present ? Theme.lime : Theme.inkSoft)
                            .background(Circle().fill(Theme.card))
                    }

                    VStack(alignment: .leading, spacing: 2) {
                        Text(player.name)
                            .font(.system(size: 17, weight: .semibold, design: .rounded))
                            .foregroundStyle(present ? Theme.ink : Theme.inkSoft)
                        Text(player.persona.tagline)
                            .font(.caption)
                            .foregroundStyle(Theme.inkSoft)
                            .lineLimit(2)
                    }

                    Spacer(minLength: 4)
                }
            }
            .buttonStyle(.plain)

            if player.isGuest {
                Button {
                    withAnimation { store.removeGuest(player) }
                } label: {
                    Image(systemName: "trash")
                        .font(.footnote)
                        .foregroundStyle(Theme.coral.opacity(0.8))
                }
                .buttonStyle(.plain)
            }
        }
        .padding(.vertical, 4)
        .opacity(present ? 1 : 0.55)
    }
}

// MARK: - Trin 2: Hvor lange kampe?

struct MatchLengthCard: View {
    @EnvironmentObject private var store: TournamentStore

    private let presets = [8, 16]

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            Label("Point pr. kamp", systemImage: "timer")
                .font(.headline)
                .foregroundStyle(Theme.ink)

            Text("Kampen slutter, når de to hold tilsammen har scoret så mange point. Det er kamplængden.")
                .font(.caption)
                .foregroundStyle(Theme.inkSoft)

            HStack(spacing: 11) {
                ForEach(presets, id: \.self) { points in
                    presetCard(points)
                }
            }

            Divider().overlay(Color.white.opacity(0.08))

            Stepper(
                value: Binding(
                    get: { store.tournament.pointsPerMatch },
                    set: { store.tournament.pointsPerMatch = $0 }
                ),
                in: 4...48,
                step: 4
            ) {
                HStack {
                    Text("Andet")
                        .font(.system(size: 16, weight: .semibold, design: .rounded))
                        .foregroundStyle(Theme.ink)
                    Spacer()
                    Text("\(store.tournament.pointsPerMatch) point")
                        .font(.system(size: 18, weight: .heavy, design: .rounded))
                        .foregroundStyle(Theme.lime)
                }
            }

            Text("\(store.tournament.servesEach) serve til hver spiller. Det er sikkert ikke de officielle regler – men det er Familien Vestergaards.")
                .font(.caption)
                .foregroundStyle(Theme.inkSoft)
        }
        .padding(18)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle()
    }

    private func presetCard(_ points: Int) -> some View {
        let selected = store.tournament.pointsPerMatch == points
        return Button {
            Haptics.tap()
            withAnimation(.snappy) { store.tournament.pointsPerMatch = points }
        } label: {
            VStack(spacing: 5) {
                Text("\(points)")
                    .font(.system(size: 36, weight: .heavy, design: .rounded))
                    .foregroundStyle(selected ? Theme.courtDeep : Theme.ink)
                Text("POINT")
                    .font(.system(size: 10, weight: .bold, design: .rounded))
                    .tracking(1.6)
                    .foregroundStyle(selected ? Theme.courtDeep.opacity(0.7) : Theme.inkSoft)
                Text("\(points / 4) serve hver")
                    .font(.system(size: 12, weight: .semibold, design: .rounded))
                    .foregroundStyle(selected ? Theme.courtDeep.opacity(0.75) : Theme.inkSoft)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .fill(selected ? Theme.lime : Theme.courtDeep.opacity(0.5))
            )
            .overlay(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .stroke(Color.white.opacity(selected ? 0 : 0.09), lineWidth: 1)
            )
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Baner og runder

struct CourtsAndRoundsCard: View {
    @EnvironmentObject private var store: TournamentStore

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Label("Baner og runder", systemImage: "slider.horizontal.3")
                .font(.headline)
                .foregroundStyle(Theme.ink)

            Stepper(
                value: Binding(
                    get: { store.tournament.courts },
                    set: { store.tournament.courts = $0 }
                ),
                in: 1...max(1, AmericanoScheduler.maxCourts(playerCount: store.tournament.players.count))
            ) {
                row("Antal baner", "\(store.tournament.courts)")
            }

            Stepper(
                value: Binding(
                    get: { store.tournament.rounds },
                    set: { store.tournament.rounds = $0 }
                ),
                in: 1...40
            ) {
                row("Antal runder", "\(store.tournament.rounds)")
            }

            Button {
                store.tournament.rounds = store.suggestedRounds
            } label: {
                Label("Foreslået: \(store.suggestedRounds) runder til \(store.tournament.players.count) spillere",
                      systemImage: "wand.and.stars")
                    .font(.footnote.weight(.semibold))
                    .foregroundStyle(Theme.lime)
            }
        }
        .padding(18)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle()
    }

    private func row(_ title: String, _ value: String) -> some View {
        HStack {
            Text(title)
                .font(.system(size: 16, weight: .semibold, design: .rounded))
                .foregroundStyle(Theme.ink)
            Spacer()
            Text(value)
                .font(.system(size: 20, weight: .heavy, design: .rounded))
                .foregroundStyle(Theme.lime)
        }
    }
}

#Preview {
    SetupView().environmentObject(TournamentStore())
}

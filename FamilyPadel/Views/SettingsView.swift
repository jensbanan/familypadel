import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var store: TournamentStore
    @State private var newPlayerName = ""
    @State private var showResetConfirm = false
    @State private var showFullResetConfirm = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 18) {
                    rulesCard
                    presenceCard
                    playersCard
                    whoIsWhoCard
                    dangerCard
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
            }
            .courtBackground()
            .scrollDismissesKeyboard(.interactively)
            .navigationTitle("Indstillinger")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarBackground(Theme.courtMid, for: .navigationBar)
            .confirmationDialog(
                "Nulstil turneringen? Alle resultater slettes, men spillerne bliver.",
                isPresented: $showResetConfirm,
                titleVisibility: .visible
            ) {
                Button("Nulstil turneringen", role: .destructive) { store.resetTournament() }
                Button("Fortryd", role: .cancel) {}
            }
            .confirmationDialog(
                "Start helt forfra? Både spillere og resultater nulstilles.",
                isPresented: $showFullResetConfirm,
                titleVisibility: .visible
            ) {
                Button("Slet det hele", role: .destructive) { store.resetEverything() }
                Button("Fortryd", role: .cancel) {}
            }
        }
    }

    private var rulesCard: some View {
        VStack(alignment: .leading, spacing: 16) {
            Label("Regler", systemImage: "slider.horizontal.3")
                .font(.headline)
                .foregroundStyle(Theme.ink)

            Stepper(value: Binding(
                get: { store.tournament.pointsPerMatch },
                set: { store.tournament.pointsPerMatch = $0 }
            ), in: 8...48) {
                row("Point pr. kamp", "\(store.tournament.pointsPerMatch)")
            }

            Stepper(value: Binding(
                get: { store.tournament.rounds },
                set: { store.tournament.rounds = $0 }
            ), in: 1...40) {
                row("Antal runder", "\(store.tournament.rounds)")
            }

            Stepper(value: Binding(
                get: { store.tournament.courts },
                set: { store.tournament.courts = $0 }
            ), in: 1...max(1, AmericanoScheduler.maxCourts(playerCount: store.tournament.players.count))) {
                row("Antal baner", "\(store.tournament.courts)")
            }

            Button {
                Haptics.tap()
                withAnimation { store.regenerateUpcomingSchedule() }
            } label: {
                Label("Læg programmet om", systemImage: "arrow.triangle.2.circlepath")
                    .font(.system(size: 15, weight: .bold, design: .rounded))
                    .foregroundStyle(Theme.courtDeep)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 13)
                    .background(RoundedRectangle(cornerRadius: 16, style: .continuous).fill(Theme.lime))
            }

            Text("Spillede kampe bevares. Kun de resterende runder lægges om.")
                .font(.caption)
                .foregroundStyle(Theme.inkSoft)
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

    private var presenceCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Label("Fremmøde", systemImage: "person.crop.circle.badge.checkmark")
                    .font(.headline)
                    .foregroundStyle(Theme.ink)
                Spacer()
                Text("\(store.tournament.players.count) med")
                    .font(.footnote.weight(.semibold))
                    .foregroundStyle(Theme.lime)
            }

            ForEach(store.tournament.roster) { player in
                let present = store.isPresent(player)
                let locked = store.tournament.matches.contains { $0.contains(player.id) }
                Button {
                    Haptics.tap()
                    withAnimation { store.togglePresence(player) }
                } label: {
                    HStack(spacing: 11) {
                        Text(player.emoji)
                            .font(.system(size: 19))
                            .frame(width: 34, height: 34)
                            .background(Circle().fill(present ? player.persona.accent.opacity(0.26) : Color.white.opacity(0.06)))
                        Text(player.name)
                            .font(.system(size: 15, weight: .semibold, design: .rounded))
                            .foregroundStyle(present ? Theme.ink : Theme.inkSoft)
                        Spacer()
                        if locked && present {
                            Text("har spillet")
                                .font(.system(size: 10, weight: .semibold, design: .rounded))
                                .foregroundStyle(Theme.inkSoft)
                        }
                        Image(systemName: present ? "checkmark.circle.fill" : "circle")
                            .font(.system(size: 18))
                            .foregroundStyle(present ? Theme.lime : Theme.inkSoft)
                    }
                }
                .buttonStyle(.plain)
                .opacity(locked && present ? 0.7 : 1)
            }

            Text("Melder du nogen til undervejs, kommer de med, når du lægger programmet om.")
                .font(.caption)
                .foregroundStyle(Theme.inkSoft)
        }
        .padding(18)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle()
    }

    private var playersCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label("Tilføj en gæst", systemImage: "person.badge.plus")
                .font(.headline)
                .foregroundStyle(Theme.ink)

            HStack(spacing: 10) {
                TextField("Navn", text: $newPlayerName)
                    .textInputAutocapitalization(.words)
                    .autocorrectionDisabled()
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
                .disabled(newPlayerName.trimmingCharacters(in: .whitespaces).isEmpty)
                .opacity(newPlayerName.trimmingCharacters(in: .whitespaces).isEmpty ? 0.4 : 1)
            }

            Text("En sen tilføjelse kommer med i resten af programmet, når du lægger det om. Spillere der allerede har spillet, kan ikke meldes fra – det ville være for nemt at slippe for en sidsteplads.")
                .font(.caption)
                .foregroundStyle(Theme.inkSoft)
        }
        .padding(18)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle()
    }

    private var whoIsWhoCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label("Hvem er hvem", systemImage: "theatermasks.fill")
                .font(.headline)
                .foregroundStyle(Theme.ink)

            ForEach(store.tournament.roster) { player in
                HStack(alignment: .top, spacing: 12) {
                    Text(player.emoji)
                        .font(.system(size: 20))
                        .frame(width: 36, height: 36)
                        .background(Circle().fill(player.persona.accent.opacity(0.22)))
                    VStack(alignment: .leading, spacing: 2) {
                        Text(player.name)
                            .font(.system(size: 15, weight: .bold, design: .rounded))
                            .foregroundStyle(Theme.ink)
                        Text(player.persona.tagline)
                            .font(.caption)
                            .foregroundStyle(Theme.inkSoft)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    Spacer(minLength: 0)
                }
            }
        }
        .padding(18)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle()
    }

    private var dangerCard: some View {
        VStack(spacing: 12) {
            Button(role: .destructive) {
                showResetConfirm = true
            } label: {
                Label("Nulstil turneringen", systemImage: "arrow.counterclockwise")
                    .font(.system(size: 15, weight: .semibold, design: .rounded))
                    .foregroundStyle(Theme.coral)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 13)
            }

            Divider().overlay(Color.white.opacity(0.08))

            Button(role: .destructive) {
                showFullResetConfirm = true
            } label: {
                Label("Start helt forfra", systemImage: "trash")
                    .font(.system(size: 15, weight: .semibold, design: .rounded))
                    .foregroundStyle(Theme.coral)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 13)
            }
        }
        .padding(6)
        .cardStyle()
    }

    private func addGuest() {
        store.addGuest(named: newPlayerName)
        newPlayerName = ""
    }
}

#Preview {
    SettingsView().environmentObject(TournamentStore())
}

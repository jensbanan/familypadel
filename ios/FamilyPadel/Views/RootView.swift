import SwiftUI

struct RootView: View {
    @EnvironmentObject private var store: TournamentStore
    @State private var selectedTab = 0

    var body: some View {
        Group {
            if store.tournament.hasStarted {
                tabs
            } else {
                SetupView()
            }
        }
        .tint(Theme.lime)
        .fullScreenCover(isPresented: $store.showChampionScreen) {
            ChampionView()
                .environmentObject(store)
        }
    }

    private var tabs: some View {
        TabView(selection: $selectedTab) {
            LiveMatchView()
                .tabItem { Label("Kamp", systemImage: "figure.tennis") }
                .tag(0)

            StandingsView()
                .tabItem { Label("Stilling", systemImage: "list.number") }
                .tag(1)

            ScheduleView()
                .tabItem { Label("Program", systemImage: "calendar") }
                .tag(2)

            SettingsView()
                .tabItem { Label("Indstillinger", systemImage: "gearshape") }
                .tag(3)
        }
    }
}

#Preview {
    RootView().environmentObject(TournamentStore())
}

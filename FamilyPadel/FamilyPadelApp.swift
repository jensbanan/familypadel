import SwiftUI

@main
struct FamilyPadelApp: App {
    @StateObject private var store = TournamentStore()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(store)
                .preferredColorScheme(.dark)
        }
    }
}

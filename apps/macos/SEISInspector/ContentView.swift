// SEIS Inspector — SwiftUI scaffold for the macOS lane.
// Reads local SEIS JSON records directly; view shapes follow
// apps/macos/inspector-contract.json. Read-only by design: no
// destructive repo or archive actions are exposed.
import SwiftUI

struct InspectorView: Identifiable {
    let id: String
    let title: String
    let systemImage: String
}

let inspectorViews: [InspectorView] = [
    .init(id: "branch_status", title: "Branch Status", systemImage: "arrow.triangle.branch"),
    .init(id: "plugin_status", title: "Plugin Status", systemImage: "puzzlepiece.extension"),
    .init(id: "zip_audit", title: "Zip Audit", systemImage: "archivebox"),
    .init(id: "workspace_links", title: "Workspace", systemImage: "link"),
]

struct ContentView: View {
    @State private var selection: String? = inspectorViews.first?.id

    var body: some View {
        NavigationSplitView {
            List(inspectorViews, selection: $selection) { view in
                Label(view.title, systemImage: view.systemImage)
            }
            .navigationTitle("SEIS Inspector")
        } detail: {
            // Each detail view renders the matching entity records from the
            // local SEIS checkout (apps/web/src/data/cockpit-status.js shapes).
            Text(selection.flatMap { id in inspectorViews.first { $0.id == id }?.title } ?? "Select a view")
                .font(.title3)
                .foregroundStyle(.secondary)
        }
    }
}

#Preview {
    ContentView()
}

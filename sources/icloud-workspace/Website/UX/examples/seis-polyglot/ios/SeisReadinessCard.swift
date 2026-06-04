import SwiftUI

struct SeisReadinessCard: View {
    let title: String
    let status: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title).font(.headline)
            Text(status).font(.caption).foregroundStyle(.secondary)
        }
        .padding()
        .accessibilityElement(children: .combine)
    }
}


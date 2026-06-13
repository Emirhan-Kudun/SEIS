// Status screen — shell-contract.json: entities repositories, governance_gates.
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { status } from "../data/status";
import { gateTone, theme } from "../theme";

export default function StatusScreen() {
  const { branch, safety, gates } = status;
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.h2}>Repository</Text>
      <View style={styles.card}>
        <Row label="Canonical" value={branch.canonicalRepository} />
        <Row label="Branch" value={`${branch.defaultBranch} ↔ ${branch.mirrorBranch}`} />
        <Row label="Branches" value={String(branch.seisBranchCount)} />
        <Row label="Sources" value={`${safety.consolidatedSources.length} consolidated`} />
        <Row label="History refs" value={`${safety.fullHistoryBranches} branches`} />
      </View>

      <Text style={styles.h2}>Governance gates</Text>
      <View style={styles.card}>
        {gates.map((gate) => (
          <View key={gate.id} style={styles.gateRow}>
            <Text style={styles.gateLabel}>{gate.label}</Text>
            <Text style={[styles.badge, { color: gateTone[gate.state] ?? theme.muted }]}>
              {gate.state}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  content: { padding: 16 },
  h2: { color: theme.muted, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, marginTop: 8 },
  card: { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4, borderBottomColor: theme.border, borderBottomWidth: StyleSheet.hairlineWidth },
  rowLabel: { color: theme.muted, fontSize: 13 },
  rowValue: { color: theme.text, fontSize: 13, fontVariant: ["tabular-nums"] },
  gateRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 5 },
  gateLabel: { color: theme.text, fontSize: 13, flexShrink: 1, paddingRight: 8 },
  badge: { fontSize: 12, fontWeight: "600" },
});

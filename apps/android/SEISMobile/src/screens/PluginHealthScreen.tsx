// Plugin health screen — shell-contract.json: entities plugin_registry, plugin_lanes.
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { status } from "../data/status";
import { theme } from "../theme";

export default function PluginHealthScreen() {
  const { plugins } = status;
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.summary}>
        <Text style={styles.bigNumber}>{plugins.installedEnabled}</Text>
        <Text style={styles.muted}>active · {plugins.notInstalled} missing</Text>
      </View>

      <Text style={styles.h2}>Lanes</Text>
      <View style={styles.card}>
        {plugins.lanes.map((lane) => (
          <View key={lane.id} style={styles.row}>
            <Text style={styles.rowLabel}>{lane.label}</Text>
            <Text style={styles.count}>
              {lane.missing ? `${lane.active} (+${lane.missing})` : String(lane.active)}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.policy}>{plugins.policy}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  content: { padding: 16 },
  summary: { alignItems: "center", paddingVertical: 12 },
  bigNumber: { color: theme.accent, fontSize: 44, fontWeight: "700" },
  muted: { color: theme.muted, fontSize: 13 },
  h2: { color: theme.muted, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 },
  card: { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: 8, padding: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4, borderBottomColor: theme.border, borderBottomWidth: StyleSheet.hairlineWidth },
  rowLabel: { color: theme.text, fontSize: 13, flexShrink: 1, paddingRight: 8 },
  count: { color: theme.accent, fontSize: 13, fontVariant: ["tabular-nums"] },
  policy: { color: theme.muted, fontSize: 12, marginTop: 10, lineHeight: 18 },
});

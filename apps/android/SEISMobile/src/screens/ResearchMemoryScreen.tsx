// Research memory screen — shell-contract.json: entity research_memory.
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { status } from "../data/status";
import { theme } from "../theme";

export default function ResearchMemoryScreen() {
  const { research } = status;
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.h2}>Research lane</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Lane</Text>
          <Text style={styles.rowValue}>{research.lane}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Notes</Text>
          <Text style={styles.rowValue}>{research.notes.length}</Text>
        </View>
      </View>

      <Text style={styles.h2}>Notes</Text>
      <View style={styles.card}>
        {research.notes.map((note) => (
          <Text key={note} style={styles.note}>
            {note}
          </Text>
        ))}
      </View>

      <Text style={styles.policy}>
        Source-backed notes only; decision-affecting notes link a record in
        docs/decisions.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  content: { padding: 16 },
  h2: { color: theme.muted, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, marginTop: 8 },
  card: { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4, borderBottomColor: theme.border, borderBottomWidth: StyleSheet.hairlineWidth },
  rowLabel: { color: theme.muted, fontSize: 13 },
  rowValue: { color: theme.text, fontSize: 13 },
  note: { color: theme.text, fontSize: 12, fontVariant: ["tabular-nums"], paddingVertical: 4 },
  policy: { color: theme.muted, fontSize: 12, marginTop: 10, lineHeight: 18 },
});

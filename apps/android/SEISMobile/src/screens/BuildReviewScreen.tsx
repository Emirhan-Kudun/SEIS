// Build review screen — shell-contract.json: entities workspace_links,
// build_workbench.
import React from "react";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { status, WorkbenchModule } from "../data/status";
import { theme } from "../theme";

export default function BuildReviewScreen() {
  const { workspace, workbench } = status;
  const moduleById = new Map<string, WorkbenchModule>(
    workbench.modules.map((m): [string, WorkbenchModule] => [m.id, m]),
  );
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.h2}>Weekly build review</Text>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => Linking.openURL(workspace.calendar.url)}>
          <Text style={styles.link}>{workspace.calendar.title}</Text>
        </TouchableOpacity>
        <Text style={styles.muted}>{workspace.calendar.recurrence}</Text>
      </View>

      <Text style={styles.h2}>Operating docs</Text>
      <View style={styles.card}>
        {workspace.drive.map((doc) => (
          <TouchableOpacity key={doc.id} onPress={() => Linking.openURL(doc.url)}>
            <Text style={styles.link}>{doc.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.h2}>Build workbench</Text>
      <View style={styles.card}>
        <Text style={styles.body}>{workbench.goal}</Text>
        <View style={styles.moduleList}>
          {workbench.buildOrder.map((id, index) => {
            const module = moduleById.get(id);
            return (
              <View key={id} style={styles.moduleRow}>
                <Text style={styles.moduleName}>
                  {index + 1}. {id.replace(/_/g, " ")}
                </Text>
                <Text style={styles.moduleStatus}>
                  {module ? module.status.replace(/_/g, " ") : "unknown"}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  content: { padding: 16 },
  h2: { color: theme.muted, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, marginTop: 8 },
  card: { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 8 },
  link: { color: theme.accent, fontSize: 14, paddingVertical: 5 },
  muted: { color: theme.muted, fontSize: 12, marginTop: 2 },
  body: { color: theme.text, fontSize: 13, lineHeight: 19, marginBottom: 8 },
  moduleList: { borderTopColor: theme.border, borderTopWidth: StyleSheet.hairlineWidth, paddingTop: 6 },
  moduleRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  moduleName: { color: theme.text, fontSize: 12, flexShrink: 1, paddingRight: 8 },
  moduleStatus: { color: theme.accent, fontSize: 12 },
});

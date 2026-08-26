// SEIS Mobile root — bottom tabs over the four screens declared in
// apps/android/shell-contract.json. Renders from the generated status
// snapshot; no mobile-only state.
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import StatusScreen from "./src/screens/StatusScreen";
import BuildReviewScreen from "./src/screens/BuildReviewScreen";
import PluginHealthScreen from "./src/screens/PluginHealthScreen";
import ResearchMemoryScreen from "./src/screens/ResearchMemoryScreen";
import { theme } from "./src/theme";

const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: theme.bg,
    card: theme.surface,
    text: theme.text,
    border: theme.border,
    primary: theme.accent,
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.surface },
          headerTitleStyle: { color: theme.text },
          tabBarActiveTintColor: theme.accent,
          tabBarInactiveTintColor: theme.muted,
          tabBarStyle: { backgroundColor: theme.surface, borderTopColor: theme.border },
        }}
      >
        <Tab.Screen name="Status" component={StatusScreen} />
        <Tab.Screen name="Build Review" component={BuildReviewScreen} />
        <Tab.Screen name="Plugin Health" component={PluginHealthScreen} />
        <Tab.Screen name="Research" component={ResearchMemoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

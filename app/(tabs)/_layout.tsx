import React from "react";
import { Tabs } from "expo-router";
import { Home, Map, AlertTriangle, Settings } from "lucide-react-native";
import { colors } from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: colors.card,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        },
        headerTitleStyle: {
          color: colors.text,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color, size }) => <Map size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="control"
        options={{
          title: "Control",
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="diagnostics"
        options={{
          title: "Diagnostics",
          tabBarIcon: ({ color, size }) => <AlertTriangle size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
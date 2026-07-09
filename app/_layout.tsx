import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Providers } from "@/providers/Providers";
import { colors } from "@/theme/tokens";

export default function RootLayout() {
  return (
    <Providers>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.cream },
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="recipe/[id]" />
        <Stack.Screen name="ai-import" />
        <Stack.Screen name="admin" />
      </Stack>
    </Providers>
  );
}

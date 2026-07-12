import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuthStore } from "@/features/auth/useAuthStore";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 3,
            retry: 1,
          },
        },
      }),
  );

  useEffect(() => {
    const stopAuthListener = useAuthStore.getState().initialize();
    const stopCacheListener = useAuthStore.subscribe((state, previousState) => {
      if (state.user?.id !== previousState.user?.id) {
        queryClient.clear();
      }
    });

    return () => {
      stopAuthListener?.();
      stopCacheListener();
    };
  }, [queryClient]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

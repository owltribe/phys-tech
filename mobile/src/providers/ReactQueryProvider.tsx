import { useEffect, useState } from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";
// import NetInfo from "@react-native-community/netinfo";
import {
  // onlineManager,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { focusManager } from "@tanstack/react-query";

// onlineManager.setEventListener((setOnline) => {
//   return NetInfo.addEventListener((state) => {
//     setOnline(!!state.isConnected);
//   });
// });

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export const ReactQueryClientProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  const [queryClient] = useState(
    new QueryClient({
      // native query config
    })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

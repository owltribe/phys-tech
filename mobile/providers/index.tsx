import React from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import config from "tamagui.config";

import { AuthProvider } from "./AuthProvider";
import { ReactQueryClientProvider } from "./ReactQueryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TamaguiProvider
      config={config}
      defaultTheme="light"
    >
      {/*<Theme name={colorScheme}>*/}
      <ReactQueryClientProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReactQueryClientProvider>
      {/*</Theme>*/}
    </TamaguiProvider>
  );
}

// const Providers = compose([
//   UniversalThemeProvider,
//   SafeAreaProvider,
//   TamaguiProvider,
//   ToastProvider,
//   QueryClientProvider,
// ])

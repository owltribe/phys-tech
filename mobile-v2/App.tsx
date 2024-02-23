import "./src/components/sheets";

import { useCallback } from "react";
import { LogBox, StatusBar } from "react-native";
import { SheetProvider } from "react-native-actions-sheet";
import { PaperProvider } from "react-native-paper";
import { registerTranslation, ru } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "providers/AuthProvider";
import { ReactQueryClientProvider } from "providers/ReactQueryProvider";

import theme from "./src/styles/theme";
import Router from "./Router";
registerTranslation("ru", ru);

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "GoogleSans-Regular": require("./assets/fonts/GoogleSans-Regular.ttf"),
    "GoogleSans-Medium": require("./assets/fonts/GoogleSans-Medium.ttf"),
    "GoogleSans-MediumItalic": require("./assets/fonts/GoogleSans-MediumItalic.ttf"),
    "GoogleSans-Bold": require("./assets/fonts/GoogleSans-Bold.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ReactQueryClientProvider>
      <AuthProvider>
        <SafeAreaProvider
          style={{ flex: 1 }}
          onLayout={onLayoutRootView}
        >
          <SheetProvider>
            <PaperProvider theme={theme}>
              <Router />
            </PaperProvider>
          </SheetProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
}

LogBox.ignoreAllLogs(); //Ignore all log notifications

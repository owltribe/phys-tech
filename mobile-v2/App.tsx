import "./src/components/sheets";

import { useCallback, useState } from "react";
import { LogBox } from "react-native";
import { SheetProvider } from "react-native-actions-sheet";
import { PaperProvider } from "react-native-paper";
import { registerTranslation, ru } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "providers/AuthProvider";
import { ReactQueryClientProvider } from "providers/ReactQueryProvider";

import theme from "./src/styles/theme";
import Router from "./Router";
registerTranslation("ru", ru);

SplashScreen.preventAutoHideAsync();

const STORAGE_ACCESS_TOKEN_KEY = "accessToken";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "GoogleSans-Regular": require("./assets/fonts/GoogleSans-Regular.ttf"),
    "GoogleSans-Medium": require("./assets/fonts/GoogleSans-Medium.ttf"),
    "GoogleSans-MediumItalic": require("./assets/fonts/GoogleSans-MediumItalic.ttf"),
    "GoogleSans-Bold": require("./assets/fonts/GoogleSans-Bold.ttf")
  });

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleSetAccessToken = async (token: string | null) => {
    if (token !== null) {
      AsyncStorage.setItem(STORAGE_ACCESS_TOKEN_KEY, token);
    } else {
      AsyncStorage.removeItem(STORAGE_ACCESS_TOKEN_KEY);
    }
    setAccessToken(token);
  };

  const onLayoutRootView = useCallback(async () => {
    const storedAccessToken = await AsyncStorage.getItem(
      STORAGE_ACCESS_TOKEN_KEY
    );
    setAccessToken(storedAccessToken);

    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ReactQueryClientProvider>
      <AuthProvider
        accessToken={accessToken}
        setAccessToken={handleSetAccessToken}
      >
        <SafeAreaProvider
          style={{ flex: 1 }}
          onLayout={onLayoutRootView}
        >
          <PaperProvider theme={theme}>
            <SheetProvider>
              <Router />
            </SheetProvider>
          </PaperProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
}

LogBox.ignoreAllLogs(); //Ignore all log notifications

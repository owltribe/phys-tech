import { useCallback } from "react";
import { LogBox } from "react-native";
import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "providers/AuthProvider";
import { ReactQueryClientProvider } from "providers/ReactQueryProvider";

// import theme from "./src/styles/theme";
import Router from "./Router";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "GoogleSans-Regular": require("./assets/fonts/GoogleSans-Regular.ttf"),
    "GoogleSans-Medium": require("./assets/fonts/GoogleSans-Medium.ttf"),
    "GoogleSans-Bold": require("./assets/fonts/GoogleSans-Bold.ttf")
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded || fontError) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ReactQueryClientProvider>
      <AuthProvider>
        <PaperProvider settings={{ rippleEffectEnabled: true }}>
          <Router />
        </PaperProvider>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
}

LogBox.ignoreAllLogs(); //Ignore all log notifications

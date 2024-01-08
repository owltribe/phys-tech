import { Suspense, useCallback, useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { TamaguiProvider, Text, Theme } from "tamagui";

import { MySafeAreaView } from "../components/MySafeAreaView";
import config from "../tamagui.config";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Raleway_400Regular: require("node_modules/@expo-google-fonts/raleway/Raleway_400Regular.ttf"),
    Raleway_500Medium: require("node_modules/@expo-google-fonts/raleway/Raleway_500Medium.ttf"),
    Raleway_600SemiBold: require("node_modules/@expo-google-fonts/raleway/Raleway_600SemiBold.ttf"),
    Raleway_700Bold: require("node_modules/@expo-google-fonts/raleway/Raleway_700Bold.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Theme name={colorScheme}>
          <ThemeProvider
            value={colorScheme === "light" ? DefaultTheme : DarkTheme}
          >
            <MySafeAreaView onLayout={onLayoutRootView}>
              <Stack>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="users/[user]"
                  options={{
                    headerShown: false,
                    animation: "slide_from_bottom"
                  }}
                />
                <Stack.Screen
                  name="service/[id]"
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="events"
                  options={{
                    headerTitle: ""
                  }}
                />
                <Stack.Screen
                  name="organizations"
                  options={{
                    headerTitle: ""
                  }}
                />
                <Stack.Screen
                  name="organization/[id]"
                  options={{
                    headerShown: false
                  }}
                />
              </Stack>
            </MySafeAreaView>
          </ThemeProvider>
        </Theme>
      </Suspense>
    </TamaguiProvider>
  );
}

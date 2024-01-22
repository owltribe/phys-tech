import { Suspense, useCallback } from "react";
import { LogBox, useColorScheme } from "react-native";
import Toast from "react-native-toast-message";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { MySafeAreaView } from "components/tamagui/MySafeAreaView";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { AuthProvider } from "providers/AuthProvider";
import { ReactQueryClientProvider } from "providers/ReactQueryProvider";
import { TamaguiProvider, Text, Theme } from "tamagui";

import config from "../tamagui.config";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Raleway_400Regular: require("@expo-google-fonts/raleway/Raleway_400Regular.ttf"),
    Raleway_500Medium: require("@expo-google-fonts/raleway/Raleway_500Medium.ttf"),
    Raleway_600SemiBold: require("@expo-google-fonts/raleway/Raleway_600SemiBold.ttf"),
    Raleway_700Bold: require("@expo-google-fonts/raleway/Raleway_700Bold.ttf")
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
            <ReactQueryClientProvider>
              <AuthProvider>
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
                    <Stack.Screen
                      name="onboarding"
                      options={{
                        headerShown: false
                      }}
                    />
                    <Stack.Screen
                      name="authorization"
                      options={{
                        headerShown: false
                      }}
                    />
                    <Stack.Screen
                      name="register"
                      options={{
                        headerTitle: "Войти",
                        headerTitleAlign: "left"
                      }}
                    />
                  </Stack>
                  <Toast visibilityTime={3500} />
                </MySafeAreaView>
              </AuthProvider>
            </ReactQueryClientProvider>
          </ThemeProvider>
        </Theme>
      </Suspense>
    </TamaguiProvider>
  );
}

LogBox.ignoreAllLogs();

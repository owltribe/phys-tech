import { Suspense, useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { MySafeAreaView } from "components/MySafeAreaView";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import Providers from "providers";
import { TamaguiProvider, Text, Theme } from "tamagui";

import config from "../tamagui.config";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    unset: require("@tamagui/font-inter/otf/Inter-Medium.otf") // default
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Providers>
      <MySafeAreaView>
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
            name="register"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
              animation: "slide_from_bottom"
            }}
          />
        </Stack>
      </MySafeAreaView>
    </Providers>
  );
}

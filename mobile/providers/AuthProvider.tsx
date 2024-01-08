import React, { createContext, useEffect } from "react";
import { Platform } from "react-native";
import { router } from "expo-router";
import useProfile from "hooks/user/useProfile";
import { UserProfile } from "types/generated";

export const AuthContext = createContext({
  user: null,
  isLoading: false
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useProfile();

  useProtectedRoute(data?.data ?? null);

  return (
    <AuthContext.Provider
      value={{
        user: data?.data || null,
        isLoading: isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useProtectedRoute(user: UserProfile | null) {
  useEffect(() => {
    if (user) {
      replaceRoute("/");
    } else {
      replaceRoute("/onboarding");
    }
  }, [user]);
}

/**
 * temporary fix
 *
 * see https://github.com/expo/router/issues/740
 * see https://github.com/expo/router/issues/745
 *  */
const replaceRoute = (href: string) => {
  if (Platform.OS === "ios") {
    setTimeout(() => {
      router.replace(href);
    }, 1);
  } else {
    setImmediate(() => {
      router.replace(href);
    });
  }
};

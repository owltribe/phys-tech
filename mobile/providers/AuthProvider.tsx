import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import useLogin from "hooks/auth/useLogin";
import useLogout from "hooks/auth/useLogout";
import useMe from "hooks/auth/useMe";
import useRegister from "hooks/auth/useRegister";
import {
  Body_auth_jwt_login_auth_login_post,
  UserCreate,
  UserRead
} from "types/generated";
import axiosInstance from "utils/axios-instance";

interface AuthProps {
  user?: any | null;
  isLoading?: boolean;
  isLoginLoading?: boolean;
  onLogin?: (formValues: Body_auth_jwt_login_auth_login_post) => void;
  onLogout?: () => void;
  token?: string | null;
}

/**
 * temporary fix
 *
 * see https://github.com/expo/router/issues/740
 * see https://github.com/expo/router/issues/745
 *  */
const replaceRoute = (href: string) => {
  setImmediate(() => {
    router.replace(href);
  });
  // if (Platform.OS === "ios") {
  //   setTimeout(() => {
  //     router.replace(href);
  //   }, 1);
  // } else {
  //   setImmediate(() => {
  //     router.replace(href);
  //   });
  // }
};

export const AuthContext = createContext<AuthProps>({});

export function useAuth(): any {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const [token, setToken] = useState<string | null>(null);

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const { data, isLoading } = useMe({
    token: token
  });

  const onLogin = (formValues: Body_auth_jwt_login_auth_login_post) => {
    loginMutation.mutate(formValues, {
      onError: (e) => {
        console.error("Error", e);
      },
      onSuccess: async (response) => {
        const accessToken = response.data.access_token;
        await AsyncStorage.setItem("accessToken", accessToken);
        setToken(accessToken);

        queryClient.invalidateQueries({
          queryKey: ["me"]
        });

        replaceRoute("/");
      }
    });
  };

  const onRegister = (formValues: UserCreate) => {
    registerMutation.mutate(formValues, {
      onSuccess: () => {
        replaceRoute("/authorization");
      }
    });
  };

  const onLogout = () => {
    logoutMutation.mutate(null, {
      onError: (e) => {
        console.error("Error during logout", e);
      },
      onSuccess: async () => {
        await AsyncStorage.removeItem("accessToken");
        setToken(null);
        queryClient.invalidateQueries({
          queryKey: ["me"]
        });
        router.replace("/authorization");
      }
    });
  };

  useEffect(() => {
    const loadToken = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");

      if (accessToken) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        setToken(accessToken);
      }
    };

    loadToken();
  }, []);

  useProtectedRoute(data?.data ?? null);

  const value = {
    user: data?.data || null,
    isLoading: isLoading,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    onLogin: onLogin,
    onRegister: onRegister,
    onLogout,
    token: token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useProtectedRoute(user: UserRead | null) {
  useEffect(() => {
    if (user) {
      replaceRoute("/");
    } else {
      replaceRoute("/onboarding");
    }
  }, [user]);
}

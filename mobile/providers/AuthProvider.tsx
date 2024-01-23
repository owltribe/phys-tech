import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useQuery,
  useQueryClient,
  UseQueryResult
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { router } from "expo-router";
import useLogin from "hooks/auth/useLogin";
import useLogout from "hooks/auth/useLogout";
import useRegister from "hooks/auth/useRegister";
import {
  Body_auth_jwt_login_auth_login_post,
  ErrorModel,
  UserRead,
  UserWithOrganizationCreate
} from "types/generated";
import axiosInstance from "utils/axios-instance";

import useClient from "../hooks/useClient";

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
  const client = useClient();

  const [user, setUser] = useState<UserRead>(null);
  const [token, setToken] = useState<string | null>(null);

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const fetchProfile = () => {
    return client
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch(async (e) => {
        await AsyncStorage.removeItem("accessToken");
      });
  };

  const {
    data,
    isLoading,
    refetch
  }: UseQueryResult<AxiosResponse<UserRead>, AxiosError<ErrorModel>> = useQuery(
    {
      queryKey: ["auth"],
      queryFn: fetchProfile,
      enabled: !!token
    }
  );

  const onLogin = (formValues: Body_auth_jwt_login_auth_login_post) => {
    loginMutation.mutate(formValues, {
      onError: async (e) => {
        await AsyncStorage.removeItem("accessToken");
        setToken(null);
      },
      onSuccess: async (response) => {
        const accessToken = response.data.access_token;
        const userData = await refetch();
        setUser(userData?.data?.data || null);

        if (accessToken) {
          AsyncStorage.setItem("accessToken", accessToken);
          setToken(accessToken);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        }

        queryClient.invalidateQueries({
          queryKey: ["auth"]
        });
      }
    });
  };

  const onRegister = (formValues: UserWithOrganizationCreate) => {
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
          queryKey: ["auth"]
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

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      setToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (data?.data) {
      console.log(data?.data);
      setUser(data?.data);
    }
  }, [data?.data]);

  useProtectedRoute(user);

  const value = {
    user: user,
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

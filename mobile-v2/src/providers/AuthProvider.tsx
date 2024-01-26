import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MutationOptions,
  useQuery,
  useQueryClient,
  UseQueryResult
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useLogin from "hooks/auth/useLogin";
import useLogout from "hooks/auth/useLogout";
import useRegister from "hooks/auth/useRegister";
import {
  Body_auth_jwt_login_auth_login_post,
  ErrorModel,
  UserReadWithOrganization,
  UserWithOrganizationCreate
} from "types/generated";
import axiosInstance from "utils/axios-instance";

import { showToastWithGravityAndOffset } from "../utils/notifications";

interface AuthProps {
  user: UserReadWithOrganization | null;
  isLoading: boolean;
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
  onLogin: (formValues: Body_auth_jwt_login_auth_login_post) => void;
  onLogout: () => void;
  onRegister: (
    formValues: UserWithOrganizationCreate,
    mutateOptions: MutationOptions
  ) => void;
  loginError: Record<string, string> | string | undefined;
  loginReset: () => void;
  token: string | null;
}

export const AuthContext = createContext<AuthProps>({} as AuthProps);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const [user, setUser] = useState<UserReadWithOrganization | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const fetchProfile = () => {
    return axiosInstance
      .get("/auth/me/profile", {
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
    isFetching,
    isSuccess,
    refetch
  }: UseQueryResult<
    AxiosResponse<UserReadWithOrganization>,
    AxiosError<ErrorModel>
  > = useQuery({
    queryKey: ["auth"],
    queryFn: fetchProfile,
    enabled: !!token
  });

  const onLogin = (formValues: Body_auth_jwt_login_auth_login_post) => {
    loginMutation.mutate(formValues, {
      onError: async (e) => {
        await AsyncStorage.removeItem("accessToken");
        setToken(null);
      },
      onSuccess: async (response) => {
        const accessToken = response.data.access_token;
        const userData = await refetch();
        setUser((userData?.data?.data as UserReadWithOrganization) || null);

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

  const onRegister = (
    formValues: UserWithOrganizationCreate,
    mutateOptions: MutationOptions
  ) => {
    registerMutation.mutate(formValues, mutateOptions);
  };

  const onLogout = () => {
    logoutMutation.mutate(undefined, {
      onError: () => {
        showToastWithGravityAndOffset("Ошибка выхода из аккаунта");
      },
      onSuccess: async () => {
        await AsyncStorage.removeItem("accessToken");
        setToken(null);
        setUser(null);
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
    if (!isLoading && !isFetching && isSuccess && !!data?.data) {
      setUser(data?.data);
    }
  }, [isLoading, isFetching, isSuccess, data?.data]);

  const value = {
    user: user,
    isLoading: isLoading,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    onLogin: onLogin,
    onRegister: onRegister,
    onLogout,
    loginError: loginMutation.error?.response?.data.detail,
    loginReset: loginMutation.reset,
    token: token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

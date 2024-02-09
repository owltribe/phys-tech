import React, { createContext, useContext, useState } from "react";
import { MutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useLogin from "hooks/auth/useLogin";
import useLogout from "hooks/auth/useLogout";
import useMeProfile from "hooks/auth/useMeProfile";
import useRegister from "hooks/auth/useRegister";
import {
  Body_auth_jwt_login_auth_login_post,
  ErrorModel,
  UserRead,
  UserReadWithOrganization,
  UserWithOrganizationCreate
} from "types/generated";
import axiosInstance from "utils/axios-instance";
import { getFormattedError } from "utils/error-helper";
import { showToastWithGravityAndOffset } from "utils/notifications";

interface AuthProps {
  user: UserReadWithOrganization | null;
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
  onLogin: (formValues: Body_auth_jwt_login_auth_login_post) => void;
  onLogout: () => void;
  onRegister: (
    formValues: UserWithOrganizationCreate,
    mutateOptions: MutationOptions<
      AxiosResponse<UserRead>,
      AxiosError<ErrorModel>,
      UserWithOrganizationCreate
    >
  ) => void;
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
  const [user, setUser] = useState<UserReadWithOrganization | null>(null);

  const profileMutation = useMeProfile();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const onLogin = (formValues: Body_auth_jwt_login_auth_login_post) => {
    loginMutation.mutate(formValues, {
      onError: async (e) => {
        showToastWithGravityAndOffset(
          getFormattedError(e.response?.data.detail || "Ошибка авторизации")
        );
      },
      onSuccess: (res) => {
        const accessToken = res.data.access_token;

        profileMutation.mutate(accessToken, {
          onError: (error) => {
            showToastWithGravityAndOffset(
              getFormattedError(
                error.response?.data.detail || "Ошибка авторизации"
              )
            );
          },
          onSuccess: (profileData) => {
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            setUser(profileData.data);
          }
        });
      }
    });
  };

  const onRegister = (
    formValues: UserWithOrganizationCreate,
    mutateOptions: MutationOptions<
      AxiosResponse<UserRead>,
      AxiosError<ErrorModel>,
      UserWithOrganizationCreate
    >
  ) => {
    registerMutation.mutate(formValues, mutateOptions);
  };

  const onLogout = () => {
    logoutMutation.mutate(undefined, {
      onError: () => {
        showToastWithGravityAndOffset("Ошибка выхода из аккаунта");
      },
      onSuccess: async () => {
        axiosInstance.defaults.headers.common["Authorization"] = null;
        setUser(null);
      }
    });
  };

  const value = {
    user: user,
    isLoginLoading: loginMutation.isPending || profileMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    onLogin: onLogin,
    onRegister: onRegister,
    onLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

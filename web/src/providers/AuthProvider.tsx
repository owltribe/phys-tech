"use client";

import React, { createContext, useContext, useState } from "react";
import {
  MutationOptions,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useCookiesLogin from "@/hooks/auth/useCookiesLogin";
import useCookiesLogout from "@/hooks/auth/useCookiesLogout";
import useRegister from "@/hooks/auth/useRegister";
import {
  Body_auth_jwt_cookie_login_auth_cookies_login_post,
  ErrorModel,
  UserRead,
  UserReadWithOrganization,
  UserWithOrganizationCreate
} from "@/types/generated";
import toast from "react-hot-toast";
import {getFormattedError} from "@/lib/error-helper";
import LoginDialog from "@/components/dialogs/login-dialog";
import useProfile from "@/hooks/auth/useProfile";

interface AuthProps {
  user: UserReadWithOrganization | undefined;
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
  refetchProfile: () => void;
  onLogin: (formValues: Body_auth_jwt_cookie_login_auth_cookies_login_post) => void;
  onLogout: () => void;
  onRegister: (
    formValues: UserWithOrganizationCreate,
    mutateOptions: MutationOptions<
      UserRead,
      AxiosError<ErrorModel>,
      UserWithOrganizationCreate
    >
  ) => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const AuthContext = createContext<AuthProps>({} as AuthProps);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoginModalOpened, setIsLoginModalOpened] = useState(false)

  const {
    data: profile,
    isLoading: profileIsLoading,
    refetch: refetchProfile
  } = useProfile();

  const loginMutation = useCookiesLogin();
  const registerMutation = useRegister();
  const logoutMutation = useCookiesLogout();

  const onLogin = (formValues: Body_auth_jwt_cookie_login_auth_cookies_login_post) => {
    loginMutation.mutate(formValues, {
      onError: (e) => {
        toast.error(getFormattedError(
            e.response?.data.detail ||
              "Ошибка авторизации. Проверьте подключение к интернету"
          ));
      },
      onSuccess: async (res) => {
        const accessToken = res.access_token;
        // await setToken(accessToken);
        toast.success("Вы успешно авторизовались.")
      }
    });
  };

  const onRegister = (
    formValues: UserWithOrganizationCreate,
    mutateOptions: MutationOptions<
      UserRead,
      AxiosError<ErrorModel>,
      UserWithOrganizationCreate
    >
  ) => {
    registerMutation.mutate(formValues, mutateOptions);
  };

  const onLogout = () => {
    logoutMutation.mutate(undefined, {
      onError: () => {
        toast.error('Ошибка выхода из аккаунта')
      },
      onSuccess: async () => {
        window.location.reload()
      }
    });
  };

  const value = {
    user: profile,
    isLoginLoading: loginMutation.isPending || profileIsLoading,
    isRegisterLoading: registerMutation.isPending,
    refetchProfile: refetchProfile,
    onLogin: onLogin,
    onRegister: onRegister,
    onLogout,
    openLoginModal: () => setIsLoginModalOpened(true),
    closeLoginModal: () => setIsLoginModalOpened(true),
  };

  return (
    <AuthContext.Provider value={value}>
      <LoginDialog
        open={isLoginModalOpened}
        onOpenChange={setIsLoginModalOpened}
      />
      {children}
    </AuthContext.Provider>
  );
};

"use client";

import React, { createContext, useContext, useState } from "react";
import {
  MutationOptions,
  useQuery,
  UseQueryResult
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useLogin from "@/hooks/auth/useLogin";
import useLogout from "@/hooks/auth/useLogout";
import useRegister from "@/hooks/auth/useRegister";
import {
  Body_auth_jwt_login_auth_login_post,
  ErrorModel,
  UserRead,
  UserReadWithOrganization,
  UserWithOrganizationCreate
} from "@/types/generated";
import {authAxiosInstance, axiosInstance} from "@/lib/axios-instances";
import useLocalStorage from "@/hooks/useLocalStorage";
import toast from "react-hot-toast";
import {getFormattedError} from "@/lib/error-helper";
import LoginDialog from "@/components/dialogs/LoginDialog";

interface AuthProps {
  user: UserReadWithOrganization | null;
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
  refetchProfile: () => void;
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
  const [user, setUser] = useState<UserReadWithOrganization | null>(null);

  const [token, setToken] = useLocalStorage<string | null>('physTechAccessToken', null)
  const [isLoginModalOpened, setIsLoginModalOpened] = useState(false)


  function useProfile(
    accessToken: string | null
  ): UseQueryResult<UserRead, AxiosError<ErrorModel>> {
    const fetchProfile = () => {
      return authAxiosInstance
        .get("/auth/me/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res: any) => {
          authAxiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          setUser(res as UserRead);
        })
        .catch(async (error) => {
          await setToken(null);
          setUser(null);
          // toast.error("Не удалось загрузить профиль пользователя.")
        });
    };

    return useQuery({
      queryKey: ["auth", accessToken],
      queryFn: fetchProfile,
      enabled: !!accessToken
    });
  }

  const { isLoading: profileIsLoading, refetch: refetchProfile } = useProfile(token);
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const onLogin = (formValues: Body_auth_jwt_login_auth_login_post) => {
    loginMutation.mutate(formValues, {
      onError: (e) => {
        toast.error(getFormattedError(
            e.response?.data.detail ||
              "Ошибка авторизации. Проверьте подключение к интернету"
          ));
      },
      onSuccess: async (res) => {
        const accessToken = res.access_token;
        await setToken(accessToken);
        toast.success("Вы успешно авторизовались.")
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
      },
      onSuccess: async () => {
        await setToken(null);
        authAxiosInstance.defaults.headers.common["Authorization"] = null;
        setUser(null);
        window.location.reload()
      }
    });
  };

  const value = {
    user: user,
    isLoginLoading: loginMutation.isPending || profileIsLoading,
    isRegisterLoading: registerMutation.isPending,
    refetchProfile: refetchProfile,
    onLogin: onLogin,
    onRegister: onRegister,
    onLogout,
    openLoginModal: () => setIsLoginModalOpened(true),
    closeLoginModal: () => setIsLoginModalOpened(true),
  };

  return <AuthContext.Provider value={value}>
    <LoginDialog
      open={isLoginModalOpened}
      onOpenChange={setIsLoginModalOpened}
    />
    {children}
  </AuthContext.Provider>;
};

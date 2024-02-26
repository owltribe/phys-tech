import React, { createContext, useContext, useState } from "react";
import {
  MutationOptions,
  useQuery,
  UseQueryResult
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useLogin from "hooks/auth/useLogin";
import useLogout from "hooks/auth/useLogout";
import useRegister from "hooks/auth/useRegister";
import {
  Body_auth_jwt_login_auth_login_post,
  ErrorModel,
  UserRead,
  UserReadWithOrganization,
  UserWithOrganizationCreate
} from "types/generated";
import axiosInstance, { authAxiosInstance } from "utils/axios-instance";
import { getFormattedError } from "utils/error-helper";
import { showToastWithGravityAndOffset } from "utils/notifications";

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
  accessToken,
  setAccessToken
}: {
  children: React.ReactNode;
  accessToken: string | null;
  setAccessToken: (token: string | null) => Promise<void>;
}) => {
  const [user, setUser] = useState<UserReadWithOrganization | null>(null);

  function useProfile(
    accessToken: string | null
  ): UseQueryResult<AxiosResponse<UserRead>, AxiosError<ErrorModel>> {
    const fetchProfile = () => {
      return authAxiosInstance
        .get("/auth/me/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res: AxiosResponse<UserRead>) => {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          setUser(res.data);
        })
        .catch(async (error) => {
          await setAccessToken(null);
          showToastWithGravityAndOffset(
            getFormattedError(
              error.response?.data.detail || "Ошибка авторизации"
            )
          );
          setUser(null);
        });
    };

    return useQuery({
      queryKey: ["auth", accessToken],
      queryFn: fetchProfile,
      enabled: !!accessToken
    });
  }

  const { isLoading: profileIsLoading, refetch: refetchProfile } =
    useProfile(accessToken);
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
      onSuccess: async (res) => {
        const accessToken = res.data.access_token;
        await setAccessToken(accessToken);
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
        await setAccessToken(null);
        axiosInstance.defaults.headers.common["Authorization"] = null;
        setUser(null);
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
    onLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

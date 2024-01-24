import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MutationOptions,
  useQuery,
  useQueryClient,
  UseQueryResult
} from "@tanstack/react-query";
import {
  useMutation,
  UseMutationResult
} from "@tanstack/react-query/build/modern";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import useLogin from "hooks/auth/useLogin";
import {
  Body_auth_jwt_login_auth_login_post,
  ErrorModel,
  UserRead,
  UserWithOrganizationCreate
} from "types/generated";
import axiosInstance from "utils/axios-instance";

interface AuthProps {
  user: UserRead | null;
  isLoading: boolean;
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
  const client = useClient();

  const [user, setUser] = useState<UserRead | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const loginMutation = useLogin();

  const fetchProfile = () => {
    return axiosInstance
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
    isSuccess,
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
        setUser((userData?.data?.data as UserRead) || null);

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

  const registerMutation: UseMutationResult<
    AxiosResponse<UserRead>,
    AxiosError<ErrorModel>,
    UserWithOrganizationCreate
  > = useMutation({
    mutationFn: (payload: UserWithOrganizationCreate) =>
      axiosInstance.post("/auth/register", payload)
  });
  const logoutMutation = useMutation({
    mutationFn: () => client.post("/auth/logout")
  });

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
      onError: (e) => {
        console.error("Error during logout", e);
      },
      onSuccess: async () => {
        await AsyncStorage.removeItem("accessToken");
        setToken(null);
        setUser(null);
        queryClient.invalidateQueries({
          queryKey: ["auth"]
        });
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
    if (isSuccess && !!data?.data) {
      setUser(data?.data);
    }
  }, [isSuccess, data?.data]);

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

export function useClient(): AxiosInstance {
  const { token } = useAuth();

  return useCallback(() => {
    const cl = axiosInstance;

    cl.interceptors.request.use((config) => {
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
    });

    // cl.interceptors.response.use(
    //   (response) => response,
    //   async (error) => {
    //     const conf = error.config;
    //     if (error.response.status === 401 && !conf.token_retry) {
    //       conf.token_retry = true;
    //
    //       return Promise.reject(error);
    //     }
    //
    //     return Promise.reject(error);
    //   }
    // );

    return cl;
  }, [token])();
}

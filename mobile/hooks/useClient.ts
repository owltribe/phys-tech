import { useCallback } from "react";
import { AxiosInstance } from "axios";
import { useAuth } from "providers/AuthProvider";
import axiosInstance from "utils/axios-instance";

export default function useClient(): AxiosInstance {
  const { token } = useAuth();

  return useCallback(() => {
    const cl = axiosInstance;

    console.log(token, "token");
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

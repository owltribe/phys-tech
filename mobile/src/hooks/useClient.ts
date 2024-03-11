import { useCallback } from "react";
import { AxiosInstance } from "axios";
import axiosInstance from "utils/axios-instance";

export default function useClient(): AxiosInstance {
  return useCallback(() => {
    const cl = axiosInstance;

    // cl.interceptors.request.use((config) => {
    //   config.headers.set("Authorization", token ? `Bearer ${token}` : null);
    //
    //   return config;
    // });

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
  }, [])();
}

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import {
  Body_auth_jwt_login_auth_login_post,
  ErrorModel,
  UserRead
} from "types/generated";
import axiosInstance from "utils/axios-instance";

export default function useLogin(): UseMutationResult<
  AxiosResponse<UserRead>,
  AxiosError<ErrorModel>,
  Body_auth_jwt_login_auth_login_post
> {
  return useMutation({
    mutationFn: (payload) => {
      return axiosInstance.post("/auth/login", payload);
    }
  });
}

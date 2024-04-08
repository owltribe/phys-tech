import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import {
  BearerResponse,
  Body_auth_jwt_login_auth_login_post,
  ErrorModel
} from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useLogin(): UseMutationResult<
  AxiosResponse<BearerResponse>,
  AxiosError<ErrorModel>,
  Body_auth_jwt_login_auth_login_post
> {
  const mutationFn = (payload: Body_auth_jwt_login_auth_login_post) => {
    const formData = new FormData();
    formData.append("username", payload.username);
    formData.append("password", payload.password);

    return axiosInstance.post("/auth/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  };

  return useMutation({
    mutationFn,
  });
}

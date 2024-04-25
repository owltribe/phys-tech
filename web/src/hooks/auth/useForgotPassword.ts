import {useMutation, UseMutationResult} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  Body_reset_forgot_password_auth_forgot_password_post,
  HTTPValidationError
} from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useForgotPassword(): UseMutationResult<
  string,
  AxiosError<HTTPValidationError>,
  Body_reset_forgot_password_auth_forgot_password_post
> {
  const mutationFn = (payload: Body_reset_forgot_password_auth_forgot_password_post): Promise<string> => {
    return axiosInstance.post("/auth/forgot-password", payload);
  };

  return useMutation({
    mutationFn,
  });
}

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  Body_reset_reset_password_auth_reset_password_post,
  HTTPValidationError
} from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useResetPassword(): UseMutationResult<
  string,
  AxiosError<HTTPValidationError>,
  Body_reset_reset_password_auth_reset_password_post
> {
  const mutationFn = (payload: Body_reset_reset_password_auth_reset_password_post): Promise<string> => {
    return axiosInstance.post("/auth/reset-password", payload);
  };

  return useMutation({
    mutationFn,
  });
}

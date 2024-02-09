import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorModel, UserRead } from "types/generated";
import { authAxiosInstance } from "utils/axios-instance";

export default function useMeProfile(): UseMutationResult<
  AxiosResponse<UserRead>,
  AxiosError<ErrorModel>,
  string
> {
  const fetchProfile = (accessToken: string) => {
    return authAxiosInstance.get("/auth/me/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  };

  return useMutation({
    mutationFn: fetchProfile
  });
}

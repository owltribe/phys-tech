import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorModel } from "@/types/generated";
import {authAxiosInstance} from "@/lib/axios-instances";

export default function useLogout(): UseMutationResult<
  AxiosResponse<void>,
  AxiosError<ErrorModel>,
  void
> {
  const mutationFn = async () => {
    return authAxiosInstance.post("/auth/logout");
  };

  return useMutation({
    mutationFn,
  });
}

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorModel } from "@/types/generated";
import {authAxiosInstance} from "@/lib/axios-instances";

export default function useCookiesLogout(): UseMutationResult<
  AxiosResponse<void>,
  AxiosError<ErrorModel>,
  void
> {
  const queryClient = useQueryClient()

  const mutationFn = async () => {
    return authAxiosInstance.post("/auth/cookies/logout");
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"]
      })
    }
  });
}

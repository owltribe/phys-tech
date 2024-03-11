import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel } from "types/generated";

export default function useLogout(): UseMutationResult<
  AxiosResponse<void>,
  AxiosError<ErrorModel>,
  void
> {
  const client = useClient();
  const logout = async () => {
    return client.post("/auth/logout");
  };

  return useMutation({
    mutationFn: logout
  });
}

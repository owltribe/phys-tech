import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, UserRead, UserUpdate } from "types/generated";

export default function useEditUser(): UseMutationResult<
  AxiosResponse<UserRead>,
  AxiosError<ErrorModel>,
  UserUpdate
> {
  const queryClient = useQueryClient();
  const client = useClient();

  const editUser = (payload: UserUpdate) => {
    return client.patch("/auth/me", payload);
  };

  return useMutation({
    mutationFn: editUser,
    onError: (e) => {
      console.error("Error updating user", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    }
  });
}

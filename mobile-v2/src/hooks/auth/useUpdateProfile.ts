import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, UserRead, UserUpdate } from "types/generated";

export default function useUpdateProfile(): UseMutationResult<
  AxiosResponse<UserRead>,
  AxiosError<ErrorModel>,
  UserUpdate
> {
  const queryClient = useQueryClient();
  const client = useClient();

  const updateOrganization = (payload: UserUpdate) => {
    return client.patch(`/auth/me`, payload);
  };

  return useMutation({
    mutationFn: updateOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });
}

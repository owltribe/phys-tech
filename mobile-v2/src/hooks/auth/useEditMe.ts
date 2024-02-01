import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, UserRead, UserUpdate } from "types/generated";

import { getFormattedError } from "../../utils/error-helper";
import { showToastWithGravityAndOffset } from "../../utils/notifications";

export default function useEditMe(): UseMutationResult<
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
      showToastWithGravityAndOffset(
        getFormattedError(
          e.response?.data.detail || "Ошибка обновления профиля"
        )
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });
}

import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, OrganizationRead } from "types/generated";

export default function useUploadAvatar(): UseMutationResult<
  AxiosResponse<OrganizationRead>,
  AxiosError<ErrorModel>,
  FormData
> {
  const queryClient = useQueryClient();
  const client = useClient();

  const uploadAvatar = (formData: FormData) => {
    return client.post(`/auth/me/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  };

  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });
}

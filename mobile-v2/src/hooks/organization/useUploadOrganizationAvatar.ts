import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, OrganizationRead } from "types/generated";

export default function useUploadOrganizationAvatar(): UseMutationResult<
  AxiosResponse<OrganizationRead>,
  AxiosError<ErrorModel>,
  FormData
> {
  const queryClient = useQueryClient();
  const client = useClient();

  const uploadOrganizationAvatar = (formData: FormData) => {
    return client.post(`/organizations/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  };

  return useMutation({
    mutationFn: uploadOrganizationAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });
}

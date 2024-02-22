import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, ServiceRead } from "types/generated";

export default function useUploadServiceImage(
  serviceId: string
): UseMutationResult<
  AxiosResponse<ServiceRead>,
  AxiosError<ErrorModel>,
  FormData
> {
  const queryClient = useQueryClient();
  const client = useClient();

  const uploadOrganizationAvatar = (formData: FormData) => {
    return client.post(`/services/${serviceId}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  };

  return useMutation({
    mutationFn: uploadOrganizationAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services", serviceId] });
      queryClient.invalidateQueries({ queryKey: ["serviceImages", serviceId] });
    }
  });
}

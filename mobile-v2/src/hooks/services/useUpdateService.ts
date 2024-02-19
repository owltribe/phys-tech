import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, ServiceRead, ServiceUpdate } from "types/generated";

export default function useUpdateService(
  serviceId: string
): UseMutationResult<
  AxiosResponse<ServiceRead>,
  AxiosError<ErrorModel>,
  ServiceUpdate
> {
  const queryClient = useQueryClient();
  const client = useClient();

  const updateOrganization = (payload: ServiceUpdate) => {
    return client.put(`/services/${serviceId}`, payload);
  };

  return useMutation({
    mutationFn: updateOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    }
  });
}

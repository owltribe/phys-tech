import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, ServiceRead } from "types/generated";

export default function useDestroyService(
  serviceId: string
): UseMutationResult<AxiosResponse<ServiceRead>, AxiosError<ErrorModel>> {
  const queryClient = useQueryClient();
  const client = useClient();

  const destroyService = () => {
    return client.delete(`/services/${serviceId}`);
  };

  return useMutation({
    mutationFn: destroyService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    }
  });
}

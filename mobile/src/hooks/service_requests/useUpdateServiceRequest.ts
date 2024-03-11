import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import {
  ErrorModel,
  ServiceRequestRead,
  ServiceRequestUpdate
} from "types/generated";

export default function useUpdateServiceRequest(
  serviceRequestId: string
): UseMutationResult<
  AxiosResponse<ServiceRequestRead>,
  AxiosError<ErrorModel>,
  ServiceRequestUpdate
> {
  const queryClient = useQueryClient();
  const client = useClient();

  const createServiceRequest = (payload: ServiceRequestUpdate) => {
    return client.put(`/service-requests/${serviceRequestId}`, payload);
  };

  return useMutation({
    mutationFn: createServiceRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["serviceRequests", serviceRequestId]
      });
    }
  });
}

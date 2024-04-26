import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  ErrorModel,
  ServiceRequestRead,
  ServiceRequestUpdate
} from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useUpdateServiceRequest(
  serviceRequestId: string
): UseMutationResult<
  ServiceRequestRead,
  AxiosError<ErrorModel>,
  ServiceRequestUpdate
> {
  const queryClient = useQueryClient();

  const mutationFn = (payload: ServiceRequestUpdate): Promise<ServiceRequestRead> => {
    return axiosInstance.put(`/service-requests/${serviceRequestId}`, payload);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["serviceRequests"]
      });
      queryClient.invalidateQueries({
        queryKey: ["serviceRequests", serviceRequestId]
      });
    }
  });
}

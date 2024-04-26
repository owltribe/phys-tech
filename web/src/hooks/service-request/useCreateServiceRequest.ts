import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  ErrorModel,
  ServiceRequestCreate,
  ServiceRequestRead
} from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useCreateServiceRequest(): UseMutationResult<
  ServiceRequestRead,
  AxiosError<ErrorModel>,
  ServiceRequestCreate
> {
  const queryClient = useQueryClient();

  const mutationFn = (payload: ServiceRequestCreate): Promise<ServiceRequestRead> => {
    return axiosInstance.post("/service-requests", payload);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceRequests"] });
    }
  });
}

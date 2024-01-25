import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import {
  ErrorModel,
  ServiceRequestCreate,
  ServiceRequestRead
} from "types/generated";

export default function useCreateServiceRequest(): UseMutationResult<
  AxiosResponse<ServiceRequestRead>,
  AxiosError<ErrorModel>,
  ServiceRequestCreate
> {
  const queryClient = useQueryClient();
  const client = useClient();

  const createServiceRequest = (payload: ServiceRequestCreate) => {
    return client.post("/service-requests", payload);
  };

  return useMutation({
    mutationFn: createServiceRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    }
  });
}

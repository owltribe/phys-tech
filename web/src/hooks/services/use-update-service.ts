import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorModel, ServiceRead, ServiceUpdate } from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useUpdateService(
  serviceId: string
): UseMutationResult<
  ServiceRead,
  AxiosError<ErrorModel>,
  ServiceUpdate
> {
  const queryClient = useQueryClient();

  const updateOrganization = (payload: ServiceUpdate): Promise<ServiceRead> => {
    return axiosInstance.put(`/services/${serviceId}`, payload);
  };

  return useMutation({
    mutationFn: updateOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    }
  });
}

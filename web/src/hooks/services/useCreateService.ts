import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorModel, ServiceCreate, ServiceRead } from "@/types/generated";
import { axiosInstance } from "@/lib/axios-instances";

export default function useCreateService(): UseMutationResult<
  ServiceRead,
  AxiosError<ErrorModel>,
  ServiceCreate
> {
  const queryClient = useQueryClient();

  const mutationFn = (payload: ServiceCreate): Promise<ServiceRead> => {
    return axiosInstance.post("/services", payload);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    }
  });
}

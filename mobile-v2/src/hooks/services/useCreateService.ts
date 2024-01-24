import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, ServiceCreate, ServiceRead } from "types/generated";

export default function useCreateService(): UseMutationResult<
  AxiosResponse<ServiceRead>,
  AxiosError<ErrorModel>,
  ServiceCreate
> {
  const queryClient = useQueryClient();
  const client = useClient();

  const editUser = (payload: ServiceCreate) => {
    return client.post("/services", payload);
  };

  return useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    }
  });
}

import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, ServiceRead } from "types/generated";
import { string } from "yup";

export default function useDestroyServiceImage(): UseMutationResult<
  AxiosResponse<ServiceRead>,
  AxiosError<ErrorModel>,
  string
> {
  const queryClient = useQueryClient();
  const client = useClient();

  const destroyService = (serviceImageId: string) => {
    return client.delete(`/service-images/${serviceImageId}`);
  };

  return useMutation({
    mutationFn: destroyService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["serviceImages"] });
    }
  });
}

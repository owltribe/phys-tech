import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  ErrorModel,
  OrganizationRead,
  OrganizationUpdate
} from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useUpdateOrganization(
  organizationId: string
): UseMutationResult<
  OrganizationRead,
  AxiosError<ErrorModel>,
  OrganizationUpdate
> {
  const queryClient = useQueryClient();

  const mutationFn = (payload: OrganizationUpdate): Promise<OrganizationRead> => {
    return axiosInstance.put(`/organizations/${organizationId}`, payload);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });
}

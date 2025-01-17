import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import {
  ErrorModel,
  OrganizationRead,
  OrganizationUpdate
} from "types/generated";

export default function useUpdateOrganization(
  organizationId?: string
): UseMutationResult<
  AxiosResponse<OrganizationRead>,
  AxiosError<ErrorModel>,
  OrganizationUpdate
> {
  const queryClient = useQueryClient();
  const client = useClient();

  const updateOrganization = (payload: OrganizationUpdate) => {
    return client.put(`/organizations/${organizationId}`, payload);
  };

  return useMutation({
    mutationFn: updateOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });
}

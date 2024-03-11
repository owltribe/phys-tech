import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { useRefreshOnFocus } from "hooks/useRefreshOnFocus";
import { ErrorModel, OrganizationRetrieve } from "types/generated";

export default function useOrganization(
  organizationId: string
): UseQueryResult<AxiosResponse<OrganizationRetrieve>, AxiosError<ErrorModel>> {
  const client = useClient();

  const fetchOrganizations = () => {
    return client.get(`/organizations/${organizationId}`);
  };

  useRefreshOnFocus(fetchOrganizations);

  return useQuery({
    queryKey: ["organizations", organizationId],
    queryFn: fetchOrganizations
  });
}

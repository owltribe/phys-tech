import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, OrganizationRead } from "types/generated";

export default function useOrganization(
  organizationId: string
): UseQueryResult<AxiosResponse<OrganizationRead>, AxiosError<ErrorModel>> {
  const client = useClient();

  const fetchOrganizations = () => {
    return client.get(`/organizations/${organizationId}`);
  };

  return useQuery({
    queryKey: ["organizations", organizationId],
    queryFn: fetchOrganizations
  });
}

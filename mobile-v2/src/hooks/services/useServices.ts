import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, Page_ServiceRead_ } from "types/generated";

export default function useServices({
  search,
  organizationId,
  enabled = true
}: {
  search?: string;
  organizationId?: string;
  enabled?: boolean;
} = {}): UseQueryResult<
  AxiosResponse<Page_ServiceRead_>,
  AxiosError<ErrorModel>
> {
  const client = useClient();

  const fetchServices = () => {
    const params = {} as Record<string, string>;

    if (search) {
      params.search = search;
    }
    if (organizationId) {
      params.organization_id = organizationId;
    }
    return client.get("/services", { params: params });
  };

  return useQuery({
    queryKey: ["services", search, organizationId, enabled],
    queryFn: fetchServices,
    enabled: enabled
  });
}

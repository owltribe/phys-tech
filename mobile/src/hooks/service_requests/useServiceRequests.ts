import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { useRefreshOnFocus } from "hooks/useRefreshOnFocus";
import { ErrorModel, Page_ServiceRequestRead_ } from "types/generated";

export default function useServiceRequests({
  search,
  organizationId,
  requestedById
}: {
  search?: string;
  organizationId?: string;
  requestedById?: string;
} = {}): UseQueryResult<
  AxiosResponse<Page_ServiceRequestRead_>,
  AxiosError<ErrorModel>
> {
  const client = useClient();

  const fetchServiceRequests = () => {
    const params = {} as Record<string, string>;

    if (search) {
      params.search = search;
    }
    if (organizationId) {
      params.service__organization_id = organizationId;
    }
    if (requestedById) {
      params.requested_by_id = requestedById;
    }

    return client.get("/service-requests", { params });
  };

  useRefreshOnFocus(fetchServiceRequests);

  return useQuery({
    queryKey: ["serviceRequests"],
    queryFn: fetchServiceRequests
  });
}

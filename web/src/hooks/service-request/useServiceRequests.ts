import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorModel, Page_ServiceRequestRead_ } from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useServiceRequests({
  search,
  organizationId,
  requestedById
}: {
  search?: string | null;
  organizationId?: string;
  requestedById?: string;
} = {}): UseQueryResult<
  Page_ServiceRequestRead_,
  AxiosError<ErrorModel>
> {
  const queryFn = () => {
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

    return axiosInstance.get("/service-requests", { params });
  };

  return useQuery({
    queryKey: ["serviceRequests", search, organizationId, requestedById],
    queryFn,
  });
}

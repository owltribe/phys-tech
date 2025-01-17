import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, ServiceRequestRetrieve } from "types/generated";

export default function useServiceRequest(
  serviceRequestId: string
): UseQueryResult<
  AxiosResponse<ServiceRequestRetrieve>,
  AxiosError<ErrorModel>
> {
  const client = useClient();

  const fetchServiceRequests = () => {
    return client.get(`/service-requests/${serviceRequestId}`);
  };

  return useQuery({
    queryKey: ["serviceRequests", serviceRequestId],
    queryFn: fetchServiceRequests,
    enabled: !!serviceRequestId
  });
}

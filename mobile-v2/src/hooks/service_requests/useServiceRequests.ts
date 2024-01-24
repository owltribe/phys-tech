import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useClient } from "providers/AuthProvider";
import { ErrorModel, Page_ServiceRequestRead_ } from "types/generated";

export default function useServiceRequests(): UseQueryResult<
  AxiosResponse<Page_ServiceRequestRead_>,
  AxiosError<ErrorModel>
> {
  const client = useClient();

  const fetchServiceRequests = () => {
    return client.get("/service-requests");
  };

  return useQuery({
    queryKey: ["serviceRequests"],
    queryFn: fetchServiceRequests
  });
}

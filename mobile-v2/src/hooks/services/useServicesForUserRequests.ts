import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, Page_ServiceRead_ } from "types/generated";

export default function useServicesForUserRequests({
  enabled = true
}: {
  enabled?: boolean;
}): UseQueryResult<AxiosResponse<Page_ServiceRead_>, AxiosError<ErrorModel>> {
  const client = useClient();

  const fetchServices = () => {
    return client.get("/services/for-user-requests");
  };

  return useQuery({
    queryKey: ["services", enabled],
    queryFn: fetchServices,
    enabled: enabled
  });
}

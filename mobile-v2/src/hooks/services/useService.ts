import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { useRefreshOnFocus } from "hooks/useRefreshOnFocus";
import { ErrorModel, ServiceRetrieve } from "types/generated";

export default function useService(
  serviceId: string
): UseQueryResult<AxiosResponse<ServiceRetrieve>, AxiosError<ErrorModel>> {
  const client = useClient();

  const fetchServices = () => {
    return client.get(`/services/${serviceId}`);
  };

  useRefreshOnFocus(fetchServices);

  return useQuery({
    queryKey: ["services", serviceId],
    queryFn: fetchServices
  });
}

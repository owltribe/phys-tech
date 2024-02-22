import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { useRefreshOnFocus } from "hooks/useRefreshOnFocus";
import { ErrorModel, ServiceImageRead } from "types/generated";

export default function useServiceImages(
  serviceId: string
): UseQueryResult<
  AxiosResponse<Array<ServiceImageRead>>,
  AxiosError<ErrorModel>
> {
  const client = useClient();

  const fetchServices = () => {
    return client.get(`/services/${serviceId}/images`);
  };

  useRefreshOnFocus(fetchServices);

  return useQuery({
    queryKey: ["serviceImages", serviceId],
    queryFn: fetchServices
  });
}

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, ServiceRead } from "types/generated";

export default function useService(
  serviceId: string
): UseQueryResult<AxiosResponse<ServiceRead>, AxiosError<ErrorModel>> {
  const client = useClient();

  const fetchServices = () => {
    return client.get(`/services/${serviceId}`);
  };

  return useQuery({
    queryKey: ["services", serviceId],
    queryFn: fetchServices
  });
}

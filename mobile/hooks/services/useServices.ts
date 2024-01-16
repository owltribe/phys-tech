import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, Page_ServiceRead_ } from "types/generated";

export default function useServices(): UseQueryResult<
  AxiosResponse<Page_ServiceRead_>,
  AxiosError<ErrorModel>
> {
  const client = useClient();

  const fetchServices = () => {
    return client.get("/services");
  };

  return useQuery({
    queryKey: ["services"],
    queryFn: fetchServices
  });
}

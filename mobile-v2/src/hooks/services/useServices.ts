import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useClient } from "providers/AuthProvider";
import { ErrorModel, Page_ServiceRead_ } from "types/generated";

export default function useServices({
  search
}: {
  search?: string;
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
    return client.get("/services", { params: params });
  };

  return useQuery({
    queryKey: ["services", search],
    queryFn: fetchServices
  });
}

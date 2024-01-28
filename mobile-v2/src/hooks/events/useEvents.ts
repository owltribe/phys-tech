import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, Page_EventRead_ } from "types/generated";

export default function useEvents({
  search,
  start_date
}: {
  search?: string;
  start_date?: string[];
}): UseQueryResult<
  AxiosResponse<Page_EventRead_>,
  AxiosError<ErrorModel>
> {
  const client = useClient();

  const fetchEvents = () => {
    const params = {} as Record<string, string>;

    if (search) {
      params.search = search;
    }
    if (!!start_date && !!start_date.length) {
      params.start_date = start_date.join(",");
    }

    return client.get(`/events`, { params: params });
  };

  return useQuery({
    queryKey: ["event", search, start_date],
    queryFn: fetchEvents
  });
}

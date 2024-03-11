import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { useRefreshOnFocus } from "hooks/useRefreshOnFocus";
import { ErrorModel, Page_EventRead_ } from "types/generated";

export default function useEvents({
  search,
  startDate,
  eventName
}: {
  search?: string;
  startDate?: string;
  eventName?: string;
}): UseQueryResult<AxiosResponse<Page_EventRead_>, AxiosError<ErrorModel>> {
  const client = useClient();

  const fetchEvents = () => {
    const params = {} as Record<string, string>;

    if (search) {
      params.search = search;
    }
    if (startDate) {
      params.start_date = startDate;
    }
    if (eventName) {
      params.name = eventName;
    }
    return client.get(`/events`, { params: params });
  };

  useRefreshOnFocus(fetchEvents);

  return useQuery({
    queryKey: ["events", search, startDate, eventName],
    queryFn: fetchEvents
  });
}

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, EventRead } from "types/generated";

export default function useEvent(
  eventId: string
): UseQueryResult<AxiosResponse<EventRead>, AxiosError<ErrorModel>> {
  const client = useClient();

  const fetchEvents = () => {
    return client.get(`/events/${eventId}`);
  };

  return useQuery({
    queryKey: ["events", eventId],
    queryFn: fetchEvents
  });
}

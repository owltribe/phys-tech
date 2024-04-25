import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorModel, EventRead } from "@/types/generated";
import { axiosInstance } from "@/lib/axios-instances";

export const fetchEvent = (eventId: string): Promise<EventRead> => {
  return axiosInstance.get(`/events/${eventId}`);
};

export default function useEvent(
  eventId: string
): UseQueryResult<EventRead, AxiosError<ErrorModel>> {
  const queryFn = () => fetchEvent(eventId);

  return useQuery({
    queryKey: ["events", eventId],
    queryFn,
    enabled: !!eventId,
  });
}

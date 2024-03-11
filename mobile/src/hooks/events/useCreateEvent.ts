import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, EventCreate, EventRead } from "types/generated";

export default function useCreateEvent(): UseMutationResult<
  AxiosResponse<EventRead>,
  AxiosError<ErrorModel>,
  EventCreate
> {
  const queryClient = useQueryClient();
  const client = useClient();

  const createServiceRequest = (payload: EventCreate) => {
    return client.post("/events", payload);
  };

  return useMutation({
    mutationFn: createServiceRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    }
  });
}

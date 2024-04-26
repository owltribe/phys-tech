import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorModel, EventCreate, EventRead } from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useCreateEvent(): UseMutationResult<
  EventRead,
  AxiosError<ErrorModel>,
  EventCreate
> {
  const queryClient = useQueryClient();

  const createServiceRequest = (payload: EventCreate): Promise<EventRead> => {
    return axiosInstance.post("/events", payload);
  };

  return useMutation({
    mutationFn: createServiceRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    }
  });
}

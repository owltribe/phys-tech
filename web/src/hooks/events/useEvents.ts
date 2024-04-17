import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorModel, Page_EventRead_ } from "@/types/generated";
import { axiosInstance } from "@/lib/axios-instances";

export default function useEvents({
  search,
}: {
  search?: string | null;
}): UseQueryResult<Page_EventRead_, AxiosError<ErrorModel>> {
  const queryFn = () => {
    const params = {} as Record<string, string>;

    if (search) {
      params.search = search;
    }

    return axiosInstance.get(`/events`, { params: params });
  };

  return useQuery({
    queryKey: ["events", search],
    queryFn,
  });
}

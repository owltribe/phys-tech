import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorModel, ServiceRequestRetrieve } from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useServiceRequest(
  serviceRequestId: string
): UseQueryResult<
  ServiceRequestRetrieve,
  AxiosError<ErrorModel>
> {

  const queryFn = (): Promise<ServiceRequestRetrieve> => {
    return axiosInstance.get(`/service-requests/${serviceRequestId}`);
  };

  return useQuery({
    queryKey: ["serviceRequests", serviceRequestId],
    queryFn,
    enabled: !!serviceRequestId
  });
}

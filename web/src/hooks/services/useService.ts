import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorModel, ServiceRead } from "@/types/generated";
import { axiosInstance } from "@/lib/axios-instances";

export const fetchService = (serviceId: string): Promise<ServiceRead> => {
  return axiosInstance.get(`/services/${serviceId}`,);
};

export default function useService(serviceId: string): UseQueryResult<
  ServiceRead,
  AxiosError<ErrorModel>
> {
  const queryFn = () => {
    return axiosInstance.get(`/services/${serviceId}`,);
  };

  return useQuery({
    queryKey: ["services", serviceId],
    queryFn,
    enabled: !!serviceId,
  });
}

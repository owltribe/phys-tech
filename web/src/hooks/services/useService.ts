import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {AxiosError, AxiosRequestConfig} from "axios";
import { ErrorModel, ServiceRead } from "@/types/generated";
import { axiosInstance } from "@/lib/axios-instances";

export const fetchService = (serviceId: string, axiosRequestConfig: AxiosRequestConfig<any> | undefined = undefined): Promise<ServiceRead> => {
  return axiosInstance.get(`/services/${serviceId}`, axiosRequestConfig);
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

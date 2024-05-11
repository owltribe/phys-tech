import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorModel, Page_ServiceRead_ } from "@/types/generated";
import { axiosInstance } from "@/lib/axios-instances";

export default function useServices({
  search,
  organizationId,
  page,
}: {
  search?: string | null;
  organizationId?: string | null;
  page?: string
} = {}): UseQueryResult<
  Page_ServiceRead_,
  AxiosError<ErrorModel>
> {
  const queryFn = () => {
    const params = {
      size: '20'
    } as Record<string, string>;

    if (search) {
      params.search = search;
    }
    if (organizationId) {
      params.organization_id = organizationId;
    }
    if (page) {
      params.page = page
    }
    return axiosInstance.get("/services", { params: params });
  };

  return useQuery({
    queryKey: ["services", search, organizationId, page],
    queryFn,
  });
}

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorModel, Page_OrganizationRead_ } from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useOrganizations({
  search,
  category__in
}: {
  search?: string | null;
  category__in?: string[];
}): UseQueryResult<
  Page_OrganizationRead_,
  AxiosError<ErrorModel>
> {
  const queryFn = () => {
    const params = {} as Record<string, string>;

    if (search) {
      params.search = search;
    }
    if (!!category__in && !!category__in.length) {
      params.category__in = category__in.join(",");
    }

    return axiosInstance.get(`/organizations`, { params: params });
  };

  return useQuery({
    queryKey: ["organizations", search, category__in],
    queryFn,
  });
}

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorModel, Page_OrganizationRead_ } from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useOrganizations({
  search,
  category__in,
  category,
}: {
  search?: string | null;
  category__in?: string[];
  category?: string | null;
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
    if (category) {
      params.category = category;
    }

    return axiosInstance.get(`/organizations`, { params: params });
  };

  return useQuery({
    queryKey: ["organizations", search, category__in, category],
    queryFn,
  });
}

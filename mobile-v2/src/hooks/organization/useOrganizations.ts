import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, Page_OrganizationRead_ } from "types/generated";

export default function useOrganizations({
  search,
  category__in
}: {
  search?: string;
  category__in?: string[];
}): UseQueryResult<
  AxiosResponse<Page_OrganizationRead_>,
  AxiosError<ErrorModel>
> {
  const client = useClient();

  const fetchOrganizations = () => {
    const params = {} as Record<string, string>;

    if (search) {
      params.search = search;
    }
    if (!!category__in && !!category__in.length) {
      params.category__in = category__in.join(",");
    }

    return client.get(`/organizations`, { params: params });
  };

  return useQuery({
    queryKey: ["organization", search, category__in],
    queryFn: fetchOrganizations
  });
}

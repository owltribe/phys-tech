import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useClient } from "providers/AuthProvider";
import { ErrorModel, Page_OrganizationRead_ } from "types/generated";

export default function useOrganization({
  nameLike
}: {
  nameLike?: string;
}): UseQueryResult<
  AxiosResponse<Page_OrganizationRead_>,
  AxiosError<ErrorModel>
> {
  const client = useClient();

  const fetchOrganizations = (params = {} as any) => {
    if (nameLike) {
      params.name__like = nameLike;
    }

    return client.get(`/organizations`, { params: params });
  };

  return useQuery({
    queryKey: ["organization"],
    queryFn: fetchOrganizations
  });
}

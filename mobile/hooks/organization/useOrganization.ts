import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import {ErrorModel, OrganizationRead} from "types/generated";

export default function useOrganization({
  nameLike
}: {
  nameLike?: string;
}): UseQueryResult<AxiosResponse<Array<OrganizationRead>>, AxiosError<ErrorModel>> {
  const client = useClient();

  const fetchOrganizations = () => {
    let queryString = "";
    if (nameLike) {
      queryString = `?name__like=${encodeURIComponent(nameLike)}`;
    }

    return client.get(`/organizations${queryString}`);
  };

  return useQuery({
    queryKey: ["organization"],
    queryFn: fetchOrganizations,
  });
}

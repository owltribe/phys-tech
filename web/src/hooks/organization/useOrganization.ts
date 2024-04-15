import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorModel, OrganizationRetrieve } from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useOrganization(
  organizationId: string
): UseQueryResult<OrganizationRetrieve, AxiosError<ErrorModel>> {

  const queryFn = () => {
    return axiosInstance.get(`/organizations/${organizationId}`);
  };

  return useQuery({
    queryKey: ["organizations", organizationId],
    queryFn,
  });
}

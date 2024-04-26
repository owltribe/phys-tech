import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorModel, OrganizationRetrieve } from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export const fetchOrganization = (organizationId: string): Promise<OrganizationRetrieve> => {
  return axiosInstance.get(`/organizations/${organizationId}`);
};

export default function useOrganization(
  organizationId: string
): UseQueryResult<OrganizationRetrieve, AxiosError<ErrorModel>> {
  return useQuery({
    queryKey: ["organizations", organizationId],
    queryFn: () => fetchOrganization(organizationId),
  });
}

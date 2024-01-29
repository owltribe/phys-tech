import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, OrganizationRead } from "types/generated";

export default function useUpdateOrganization(): UseMutationResult<
    AxiosResponse<OrganizationRead>,
    AxiosError<ErrorModel>,
    OrganizationRead
> {
    const queryClient = useQueryClient();
    const client = useClient();

    const updateOrganization = (payload: OrganizationRead) => {
        return client.put(`/organizations/${payload.id}`, payload);
    };

    return useMutation({
        mutationFn: updateOrganization,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["organizations"] });
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        }
    });
}

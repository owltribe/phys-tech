import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, OrganizationRead } from "types/generated";

export default function useUpdateOrganization(): UseMutationResult<
    AxiosResponse<OrganizationRead>,
    AxiosError<ErrorModel>,
    { organizationId: string, updatedOrganization: OrganizationRead, photo?: any }
> {
    const queryClient = useQueryClient();
    const client = useClient();

    const updateOrganization = ({ organizationId, updatedOrganization, photo }:
                                    { organizationId: string, updatedOrganization: OrganizationRead, photo?: File }) => {
        const formData = new FormData();
        Object.keys(updatedOrganization).forEach(key => {
            const value = updatedOrganization[key as keyof OrganizationRead];
            if (value !== null) {
                formData.append(key, value);
            }
        });
        if (photo) {
            formData.append('photo', photo);
        }

        console.log('formData', formData);
        for (var pair of (formData as any).entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

        return client.put(`/organizations/${organizationId}`, formData);
    };

    return useMutation({
        mutationFn: updateOrganization,
        onSuccess: () => {
            // Invalidate and refetch data related to organizations
            queryClient.invalidateQueries({ queryKey: ["organizations"] });
        }
    });
}

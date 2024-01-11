import {useMutation, UseMutationResult, useQueryClient} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { UserProfile, ErrorModel } from 'types/generated';
import axiosInstance from 'utils/axios-instance';

export type Body_auth_me_patch = {
    username: string;
};

export default function useEditUser(): UseMutationResult<
    AxiosResponse<UserProfile>,
    AxiosError<ErrorModel>,
    Body_auth_me_patch
> {
    const queryClient = useQueryClient();

    const editUser = (payload: Body_auth_me_patch) => {
        return axiosInstance.patch('/auth/me', payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    return useMutation({
        mutationFn: editUser,
        onError: (e) => {
            console.error("Error updating user", e);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    })
}

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorModel } from "types/generated";
import axiosInstance from "utils/axios-instance";

export default function useLogout(): UseMutationResult<
    AxiosResponse<void>,
    AxiosError<ErrorModel>,
    void
> {
    const logout = async () => {
        return axiosInstance.post("/auth/logout", null, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    };

    return useMutation({
        mutationFn: logout
    });
}

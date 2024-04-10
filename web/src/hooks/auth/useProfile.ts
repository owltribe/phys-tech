import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {ErrorModel, UserRead} from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";
import {AxiosError} from "axios";

export default function useProfile(): UseQueryResult<UserRead, AxiosError<ErrorModel>> {
    const queryFn = () => {
      return axiosInstance
        .get("/auth/me/profile")
    };

    return useQuery({
      queryKey: ["auth"],
      queryFn,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });
}

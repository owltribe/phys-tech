import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { ErrorModel, UserProfile } from "../../types/generated";
import axiosInstance from "../../utils/axios-instance";

export default function useProfile(): UseQueryResult<
  AxiosResponse<UserProfile>,
  AxiosError<ErrorModel>
> {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => {
      return axiosInstance.get("/users/me/profile");
    }
  });
}

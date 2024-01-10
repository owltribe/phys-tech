import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorModel, UserProfile } from "types/generated";
import axiosInstance from "utils/axios-instance";

import useClient from "../useClient";

export default function useProfile({
  enabled
}: {
  enabled: boolean;
}): UseQueryResult<AxiosResponse<UserProfile>, AxiosError<ErrorModel>> {
  const client = useClient();

  const fetchProfile = () => {
    return client.get("/users/me/profile");
  };

  return useQuery({
    queryKey: ["me"],
    queryFn: fetchProfile,
    enabled: enabled
  });
}

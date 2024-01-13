import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useClient from "hooks/useClient";
import { ErrorModel, UserRead } from "types/generated";

export default function useProfile({
  token
}: {
  token: string | null;
}): UseQueryResult<AxiosResponse<UserRead>, AxiosError<ErrorModel>> {
  const client = useClient();

  const fetchProfile = () => {
    return client.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  return useQuery({
    queryKey: ["me"],
    queryFn: fetchProfile,
    enabled: !!token
  });
}

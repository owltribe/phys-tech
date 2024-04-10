import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  ErrorModel,
  UserRead,
  UserWithOrganizationCreate
} from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useRegister(): UseMutationResult<
  UserRead,
  AxiosError<ErrorModel>,
  UserWithOrganizationCreate
> {
  const register = (payload: UserWithOrganizationCreate): Promise<UserRead> => {
    return axiosInstance.post("/auth/register", payload);
  };

  return useMutation({
    mutationFn: register
  });
}

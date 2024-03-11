import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import {
  ErrorModel,
  UserRead,
  UserWithOrganizationCreate
} from "types/generated";
import axiosInstance from "utils/axios-instance";

export default function useRegister(): UseMutationResult<
  AxiosResponse<UserRead>,
  AxiosError<ErrorModel>,
  UserWithOrganizationCreate
> {
  const register = (payload: UserWithOrganizationCreate) => {
    return axiosInstance.post("/auth/register", payload);
  };

  return useMutation({
    mutationFn: register
  });
}

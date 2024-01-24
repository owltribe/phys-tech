import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorModel, UserCreate, UserRead } from "types/generated";
import axiosInstance from "utils/axios-instance";

export default function useRegister(): UseMutationResult<
  AxiosResponse<UserRead>,
  AxiosError<ErrorModel>,
  UserCreate
> {
  const register = (payload: UserCreate) => {
    return axiosInstance.post("/auth/register", payload);
  };

  return useMutation({
    mutationFn: register
  });
}

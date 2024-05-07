import {
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface CreateContactRequest {
  fullName: string;
  phone: string;
  email: string;
}

export default function useCreateContactRequest(): UseMutationResult<
  void,
  AxiosError,
  CreateContactRequest
> {
  const mutationFn = (payload: CreateContactRequest): Promise<void> => {
    return axios.post("/api/contact", payload);
  };

  return useMutation({
    mutationFn,
  });
}

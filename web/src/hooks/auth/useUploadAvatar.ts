import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorModel, OrganizationRead } from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useUploadAvatar(): UseMutationResult<
  OrganizationRead,
  AxiosError<ErrorModel>,
  FormData
> {
  const queryClient = useQueryClient();

  const mutationFn = (formData: FormData) => {
    return axiosInstance.post(`/auth/me/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });
}

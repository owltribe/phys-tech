import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorModel, OrganizationRead } from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useUploadOrganizationAvatar(): UseMutationResult<
  OrganizationRead,
  AxiosError<ErrorModel>,
  FormData
> {
  const queryClient = useQueryClient();

  const mutationFn = (formData: FormData): Promise<OrganizationRead> => {
    return axiosInstance.post(`/organizations/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });
}

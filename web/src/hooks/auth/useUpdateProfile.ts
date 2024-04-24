import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorModel, UserRead, UserUpdate } from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useUpdateProfile(): UseMutationResult<
  UserRead,
  AxiosError<ErrorModel>,
  UserUpdate
> {
  const queryClient = useQueryClient();

  const mutationFn = (payload: UserUpdate): Promise<UserRead> => {
    return axiosInstance.patch(`/auth/me`, payload);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });
}

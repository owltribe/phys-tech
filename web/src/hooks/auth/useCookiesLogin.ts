import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import {
  BearerResponse,
  Body_auth_jwt_cookie_login_auth_cookies_login_post,
  ErrorModel
} from "@/types/generated";
import {axiosInstance} from "@/lib/axios-instances";

export default function useCookiesLogin(): UseMutationResult<
  BearerResponse,
  AxiosError<ErrorModel>,
  Body_auth_jwt_cookie_login_auth_cookies_login_post
> {
  const queryClient = useQueryClient()

  const mutationFn = (payload: Body_auth_jwt_cookie_login_auth_cookies_login_post): Promise<BearerResponse> => {
    const formData = new FormData();
    formData.append("username", payload.username);
    formData.append("password", payload.password);

    return axiosInstance.post("/auth/cookies/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"]
      })
    }
  });
}

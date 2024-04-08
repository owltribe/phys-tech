import axios from "axios";

export const authAxiosInstance = (() => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  });

  instance.interceptors.response.use(response => response.data)

  return instance
})()

export const axiosInstance = (() => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  });

  instance.interceptors.response.use(response => response.data)

  return instance
})()
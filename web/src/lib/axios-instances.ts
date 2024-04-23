import axios from "axios";

export const axiosInstance = (() => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://science-services-fastapi-zki4d.ondigitalocean.app",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  });

  instance.interceptors.response.use(response => response.data)

  return instance
})()
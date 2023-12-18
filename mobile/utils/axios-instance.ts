import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});

export default axiosInstance;

import axios from "axios";
import { API } from "../config/api";

const axiosInstance = axios.create({
  baseURL: API.BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" }
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        type: "NETWORK_ERROR",
        message: "Server not reachable"
      });
    }
    if (error.response?.status === 403) {
      window.location.href = "/not-authorized";
    }

    if (error.response.status === 401) {
      localStorage.removeItem("authToken");
    }

    return Promise.reject({
      type: "API_ERROR",
      status: error.response.status,
      message: error.response.data?.message || "Request failed"
    });
  }
);

export default axiosInstance;
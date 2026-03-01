import apiConfig from "/src/config/api.json";

// Vite environment variable
const ENV = import.meta.env.VITE_ENV || "production";

// Get base URL
const BASE_URL = apiConfig.baseUrl[ENV];

if (!BASE_URL) {
  throw new Error(`Base URL not defined for env: ${ENV}`);
}

export const API = {
  BASE_URL,
  ...apiConfig,
};
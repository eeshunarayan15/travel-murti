import axios from "./axiosInstance";
import { API } from "../config/api";

export const login = async (credentials) => {
  const { data } = await axios.post(API.auth.login, credentials);
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await axios.post(API.auth.forgotPassword, { email });
  return data;
};

export const resetPassword = async (payload) => {
  const { data } = await axios.post(API.auth.resetPassword, payload);
  return data;
};

export const verifyOtp = async (data) => {
  const { data: response } = await axios.post(API.auth.verifyOtp, data);
  return response;
};
import axios from "./axiosInstance";
import { API } from "../config/api";

export const submitContact = (payload) => {
  return axios.post(API.contacts.create, payload);
};
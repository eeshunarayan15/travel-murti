import axiosInstance from "./axiosInstance";
import API from "../config/api.json";

export const getEnquiries = () => {
  return axiosInstance.get(API.enquiries.list);
};

export const deleteEnquiry = (id) => {
  return axiosInstance.delete(
    API.enquiries.delete.replace("{id}", id)
  );
};
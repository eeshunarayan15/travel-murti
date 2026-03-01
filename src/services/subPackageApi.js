import axiosInstance from "./axiosInstance";

export const getSubPackageById = (id) =>
  axiosInstance.get(`/subpackages/${id}`);

export const submitEnquiry = (data) =>
  axiosInstance.post("/enquiry", data);
import API from "../config/api.json";
import axiosInstance from "./axiosInstance";
import buildUrl from "../utils/buildUrl";

export const getPackages = () =>
  axiosInstance.get(API.packages.list);

export const createPackage = (data) =>
  axiosInstance.post(API.packages.create, data);

export const updatePackage = (id, data) =>
  axiosInstance.put(
    buildUrl(API.packages.update, { id }),
    data
  );

export const deletePackage = (id) =>
  axiosInstance.delete(
    buildUrl(API.packages.delete, { id })
  );
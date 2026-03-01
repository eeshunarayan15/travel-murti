import axios from "./axiosInstance";
import { API } from "../config/api";

export const getDealOfTheDay = () => {
  return axios.get(API.subPackages.dealOfTheDay);
};

export const getLatestTourPackages = () => {
  return axios.get(API.subPackages.latest);
};

export const getSpiritualSubPackages = (packageId) => {
  return axios.get(API.subPackages.byPackage.replace("{packageId}", packageId));
};
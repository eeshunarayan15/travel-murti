import axiosInstance from "../../services/axiosInstance";
import { API } from "../../config/api";
import buildUrl from "../../utils/buildUrl";

export const getJobs = () =>
  axiosInstance.get(API.jobs.list).then((res) => {
    const d = res.data?.data ?? res.data;
    return Array.isArray(d) ? d : [];
  });

export const getJobById = (id) =>
  axiosInstance.get(buildUrl(API.jobs.details, { id })).then((res) => res.data?.data ?? res.data);

export const createJob = (data) =>
  axiosInstance.post(API.jobs.create, data).then((res) => res.data?.data ?? res.data);

export const updateJob = (id, data) =>
  axiosInstance.put(buildUrl(API.jobs.update, { id }), data).then((res) => res.data?.data ?? res.data);

export const deleteJob = (id) =>
  axiosInstance.delete(buildUrl(API.jobs.delete, { id })).then((r) => r.data);

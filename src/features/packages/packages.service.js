import axiosInstance from '../../services/axiosInstance';
import { API } from '../../config/api';
import resolvePath from '../../utils/resolvePath';

export const getPackages = () =>
  axiosInstance.get(API.packages.list).then(res => res.data);

export const createPackage = (data) =>
  axiosInstance.post(API.packages.create, data);

export const updatePackage = (id, data) =>
  axiosInstance.put(resolvePath(API.packages.update, { id }), data);

export const deletePackage = (id) =>
  axiosInstance.delete(resolvePath(API.packages.delete, { id }));
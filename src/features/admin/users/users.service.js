import axios from "../../../services/axiosInstance";
import { API } from "../../../config/api";
import { resolvePath } from "../../../utils/resolvePath";

export const getUsers = async () => {
  const { data } = await axios.get(API.users.list);
  return data;
};

export const deleteUser = async (id) => {
  await axios.delete(resolvePath(API.users.delete, { id }));
};

export const updateUser = async (id, payload) => {
  const { data } = await axios.put(
    resolvePath(API.users.update, { id }),
    payload
  );
  return data;
};

export const toggleUserActive = async (id) => {
  const { data } = await axios.put(resolvePath(API.users.toggleActive, { id }));
  return data;
};

export const unlockUser = async (id) => {
  const { data } = await axios.put(resolvePath(API.users.unlock, { id }));
  return data;
};
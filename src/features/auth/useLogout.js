// src/features/auth/useLogout.js
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  return () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    dispatch(clearUser());
  };
};
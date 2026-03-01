import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../redux/slices/userSlice";

/**
 * Restores user from localStorage on app load (e.g. after refresh)
 */
const AuthInit = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      const userStr = localStorage.getItem("user");
      if (token && userStr) {
        const user = JSON.parse(userStr);
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    } catch {
      dispatch(clearUser());
    }
  }, [dispatch]);

  return children;
};

export default AuthInit;

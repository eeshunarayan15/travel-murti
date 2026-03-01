import { useSelector } from "react-redux";

const useAuth = () => {
  const user = useSelector((state) => state.user?.user);

  const isSuperAdmin = user?.role === "super_admin";
  const isAdmin = user?.role === "admin" || isSuperAdmin;
  const isEmployee = user?.role === "employee";

  return { user, isSuperAdmin, isAdmin, isEmployee };
};

export default useAuth;
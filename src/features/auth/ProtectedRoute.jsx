import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ roles = [], children }) => {
  const location = useLocation();
  const { user, loading } = useSelector((state) => state.user);

  // While auth state is resolving
  if (loading) {
    return null; // or spinner
  }

  // Not logged in
  if (!user) {
    return (
      <Navigate
        to="/admin/login"
        state={{ from: location }}
        replace
      />
    );
  }

  const role = user?.role === "superadmin" ? "super_admin" : user?.role;

  // Role not allowed
  if (roles.length && !roles.includes(role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiPackage,
  FiUsers,
  FiInbox,
  FiLogOut,
  FiEdit,
  FiFileText,
  FiX,
  FiUserPlus,
  FiGrid,
} from "react-icons/fi";
import { useLogout } from "../auth/useLogout";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

const AdminSidebar = ({ isOpen, onClose }) => {
  const logout = useLogout();
  const navigate = useNavigate();
  const { user, isSuperAdmin, isAdmin, isEmployee } = useAuth();

  const navItems = [
    { to: "/admin", end: true, icon: FiGrid, label: "Overview" },
    { to: "/admin/packages", icon: FiPackage, label: "Packages" },
    { to: "/admin/subpackages", icon: FiInbox, label: "Sub-Packages" },
    !isEmployee && { to: "/admin/users", icon: FiUsers, label: "Users" },
    { to: "/admin/enquiries", icon: FiInbox, label: "Enquiries" },
    { to: "/admin/jobs", icon: FiEdit, label: "Jobs" },
    { to: "/admin/blogs", icon: FiFileText, label: "Blogs" },
  ].filter(Boolean);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/"); // redirect to home
  };

  const roleLabel =
    user?.role === "super_admin" ? "Super Admin" : user?.role === "admin" ? "Admin" : "Employee";

  return (
    <>
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-slate-800 text-white flex flex-col
          transform transition-transform duration-200 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight">Travel Murti</h1>
              <p className="text-slate-400 text-sm mt-0.5">Admin Panel</p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white"
              aria-label="Close menu"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(({ to, end, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </NavLink>
          ))}

          {isSuperAdmin && (
            <NavLink
              to="/admin/create-admin"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              <FiUserPlus className="w-5 h-5 shrink-0" />
              Create Admin / Employee
            </NavLink>
          )}

          {isAdmin && !isSuperAdmin && (
            <NavLink
              to="/admin/create-admin"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              <FiUserPlus className="w-5 h-5 shrink-0" />
              Create Employee
            </NavLink>
          )}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-slate-700 space-y-2">
          <div className="px-4 py-2 rounded-lg bg-slate-700/50">
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded bg-slate-600 text-slate-200">
              {roleLabel}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

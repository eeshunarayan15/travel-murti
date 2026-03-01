import { useLocation, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const pathToTitle = {
  "/admin": "Overview",
  "/admin/packages": "Packages",
  "/admin/subpackages": "Sub-Packages",
  "/admin/users": "Users",
  "/admin/enquiries": "Enquiries",
  "/admin/jobs": "Jobs",
  "/admin/blogs": "Blogs",
  "/admin/register": "Create Employee",
};

const AdminHeader = ({ onMenuClick }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const title = pathToTitle[pathname] || pathToTitle[pathname.replace(/\/[^/]+$/, "")] || "Admin";

  const linkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium ${
      isActive ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="flex items-center gap-4 px-4 md:px-6 py-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          <FiMenu className="w-6 h-6" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 truncate">
            {title}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage your travel packages and content
          </p>
        </div>
      </div>

      <div className="px-4 md:px-6 pb-3 border-t border-slate-200">
        <nav className="flex gap-2 pt-2">
          <NavLink to="/admin/packages" className={linkClass}>
            Packages
          </NavLink>
          <NavLink to="/admin/subpackages" className={linkClass}>
            Sub‑Packages
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;

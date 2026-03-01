import { Link } from "react-router-dom";
import { FiPackage, FiInbox, FiUsers, FiFileText, FiEdit, FiShield } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

const cards = [
  { to: "/admin/packages", icon: FiPackage, label: "Packages", desc: "Manage tour categories" },
  { to: "/admin/subpackages", icon: FiInbox, label: "Sub-Packages", desc: "Tours & itineraries" },
  { to: "/admin/users", icon: FiUsers, label: "Users", desc: "Team & permissions" },
  { to: "/admin/enquiries", icon: FiInbox, label: "Enquiries", desc: "Customer leads" },
  { to: "/admin/jobs", icon: FiEdit, label: "Jobs", desc: "Careers & openings" },
  { to: "/admin/blogs", icon: FiFileText, label: "Blogs", desc: "Posts & articles" },
];

const AdminOverview = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await axiosInstance.get("/users");
        const list = res.data?.data ?? res.data ?? [];
        setUsers(Array.isArray(list) ? list : []);
      } catch {
        setUsers([]);
      }
    };
    loadUsers();
  }, []);

  const counts = useMemo(() => {
    const total = users.length;
    const superAdmins = users.filter((u) => u.role === "super_admin").length;
    const admins = users.filter((u) => u.role === "admin").length;
    const employees = users.filter((u) => u.role === "employee").length;
    return { total, superAdmins, admins, employees };
  }, [users]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Welcome to Admin</h2>
        <p className="text-slate-600 mt-1">Quick access to manage your site.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-5">
          <div className="text-sm text-slate-500">Total Users</div>
          <div className="text-2xl font-bold">{counts.total}</div>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <div className="text-sm text-slate-500">Super Admins</div>
          <div className="text-2xl font-bold">{counts.superAdmins}</div>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <div className="text-sm text-slate-500">Admins</div>
          <div className="text-2xl font-bold">{counts.admins}</div>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <div className="text-sm text-slate-500">Employees</div>
          <div className="text-2xl font-bold">{counts.employees}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ to, icon: Icon, label, desc }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="p-3 rounded-lg bg-slate-100 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600">
              <Icon className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-800 group-hover:text-blue-700">{label}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;

import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { FiUserPlus } from "react-icons/fi";

const PERMISSION_LABELS = {
  canCreatePackages: "Create packages",
  canUpdatePackages: "Update packages",
  canDeletePackages: "Delete packages",
  canCreateSubPackages: "Create sub-packages",
  canUpdateSubPackages: "Update sub-packages",
  canDeleteSubPackages: "Delete sub-packages",
  canViewEnquiries: "View enquiries",
  canDeleteEnquiries: "Delete enquiries",
};

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    permissions: {
      canCreatePackages: false,
      canUpdatePackages: false,
      canDeletePackages: false,
      canCreateSubPackages: false,
      canUpdateSubPackages: false,
      canDeleteSubPackages: false,
      canViewEnquiries: false,
      canDeleteEnquiries: false,
    },
  });
  const [loading, setLoading] = useState(false);

  const isAllowed = user?.role === "admin" || user?.role === "super_admin";

  useEffect(() => {
    if (!isAllowed && user) {
      navigate("/not-authorized", { replace: true });
    }
  }, [isAllowed, user, navigate]);

  if (!isAllowed && user) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      permissions: { ...prev.permissions, [name]: checked },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/users/register", formData);
      toast.success("Employee created successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        permissions: Object.keys(formData.permissions).reduce((acc, k) => ({ ...acc, [k]: false }), {}),
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
          <FiUserPlus className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Create Employee</h2>
          <p className="text-sm text-slate-500">Add a new team member with optional permissions.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password *</label>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-w-md"
            />
            <p className="text-xs text-slate-500 mt-1">Minimum 8 characters</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Role</p>
            <p className="text-sm text-slate-500 bg-slate-100 inline-block px-3 py-2 rounded-lg">Employee</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-2">Permissions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4 bg-slate-50 rounded-lg">
              {Object.entries(formData.permissions).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name={key}
                    checked={value}
                    onChange={handlePermissionChange}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{PERMISSION_LABELS[key] || key}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
          >
            {loading ? "Creating..." : "Create Employee"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium"
          >
            Back to Users
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";

const CreateAdmin = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === "super_admin";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: isSuperAdmin ? "admin" : "employee",
  });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/users/create-user", form);
      toast.success("User created");
      setForm({
        name: "",
        email: "",
        password: "",
        role: isSuperAdmin ? "admin" : "employee",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {isSuperAdmin ? "Create Admin / Employee" : "Create Employee"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full border rounded-lg px-4 py-2" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full border rounded-lg px-4 py-2" />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="w-full border rounded-lg px-4 py-2" />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          disabled={!isSuperAdmin}
          className="w-full border rounded-lg px-4 py-2"
        >
          {isSuperAdmin && <option value="admin">Admin</option>}
          <option value="employee">Employee</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateAdmin;
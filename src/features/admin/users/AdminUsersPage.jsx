import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getUsers, deleteUser, updateUser, toggleUserActive, unlockUser } from "./users.service";
import UserEditModal from "./UserEditModal";
import { FiUsers, FiEdit2, FiTrash2 } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";

const roleLabel = (role) => (role === "super_admin" ? "Super Admin" : role === "admin" ? "Admin" : "Employee");

const canManageUser = (actor, target) =>
  actor.isSuperAdmin || (actor.isAdmin && target.role === "employee");

const AdminUsersPage = () => {
  const { isSuperAdmin, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this user? This cannot be undone.")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User removed");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setPermissions(user.permissions || {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = isSuperAdmin
        ? { ...formData, permissions }
        : { name: formData.name, email: formData.email };

      const updated = await updateUser(editUser._id, payload);
      setUsers((prev) => prev.map((u) => (u._id === editUser._id ? updated : u)));
      setEditUser(null);
      toast.success("User updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const updated = await toggleUserActive(id);
      setUsers((prev) => prev.map((u) => (u._id === id ? updated.data ?? updated : u)));
      toast.success("Status updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const handleUnlock = async (id) => {
    try {
      const updated = await unlockUser(id);
      setUsers((prev) => prev.map((u) => (u._id === id ? updated.data ?? updated : u)));
      toast.success("User unlocked");
    } catch {
      toast.error("Unlock failed");
    }
  };

  const visibleUsers = isSuperAdmin
    ? users
    : isAdmin
    ? users.filter((u) => u.role === "employee")
    : [];

  return (
    <div className="space-y-6">
      <p className="text-slate-600">Manage team members and their permissions.</p>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Users</h2>
          <p className="text-sm text-slate-500 mt-0.5">{visibleUsers.length} user(s)</p>
        </div>
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading...</div>
        ) : visibleUsers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <FiUsers className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>No users yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {visibleUsers.map((user) => {
              const manageAllowed = canManageUser({ isSuperAdmin, isAdmin }, user);

              return (
                <li
                  key={user._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 hover:bg-slate-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-800">{user.name}</p>
                    <p className="text-sm text-slate-500 truncate">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {roleLabel(user.role)}
                      </span>
                      <span
                        className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${
                          user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.isActive ? "Active" : "Disabled"}
                      </span>
                      {user.lockUntil && new Date(user.lockUntil) > Date.now() && (
                        <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-yellow-100 text-yellow-700">
                          Locked
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(user)}
                      disabled={!manageAllowed}
                      className="inline-flex items-center gap-2 px-3 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 font-medium text-sm disabled:opacity-50"
                    >
                      <FiEdit2 className="w-4 h-4" /> Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleActive(user._id)}
                      disabled={!manageAllowed}
                      className="inline-flex items-center gap-2 px-3 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 font-medium text-sm disabled:opacity-50"
                    >
                      {user.isActive ? "Disable" : "Enable"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUnlock(user._id)}
                      disabled={!manageAllowed}
                      className="inline-flex items-center gap-2 px-3 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 font-medium text-sm disabled:opacity-50"
                    >
                      Unlock
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(user._id)}
                      disabled={!manageAllowed}
                      className="inline-flex items-center gap-2 px-3 py-2 text-red-700 bg-red-50 rounded-lg hover:bg-red-100 font-medium text-sm disabled:opacity-50"
                    >
                      <FiTrash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <UserEditModal
        user={editUser}
        formData={formData}
        permissions={permissions}
        isSuperAdmin={isSuperAdmin}
        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        onPermissionChange={(key, value) => setPermissions({ ...permissions, [key]: value })}
        onCancel={() => setEditUser(null)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AdminUsersPage;

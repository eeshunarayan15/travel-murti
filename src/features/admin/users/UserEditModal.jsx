import { FiX } from "react-icons/fi";

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

const UserEditModal = ({
  user,
  formData,
  permissions,
  isSuperAdmin,
  onChange,
  onPermissionChange,
  onCancel,
  onSubmit,
}) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Edit User</h2>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-2">Permissions</h3>
            <div className="grid grid-cols-1 gap-2 p-3 bg-slate-50 rounded-lg">
              {Object.keys(permissions).map((key) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions[key]}
                    onChange={(e) => onPermissionChange(key, e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{PERMISSION_LABELS[key] || key}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;

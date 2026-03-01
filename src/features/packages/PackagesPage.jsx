import { useEffect, useState } from "react";
import { getPackages, deletePackage } from "./packages.service";
import PackageForm from "./PackageForm";
import { toast } from "react-hot-toast";
import {
  FiPackage,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
  FiPlus,
} from "react-icons/fi";
import { getListFromResponse } from "../../utils/helpers";
import useAuth from "../../hooks/useAuth";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

const PackagesPage = () => {
  const { user, isSuperAdmin, isAdmin } = useAuth();
  const canCreate =
    isSuperAdmin || isAdmin || user?.permissions?.canCreatePackages;
  const canUpdate =
    isSuperAdmin || isAdmin || user?.permissions?.canUpdatePackages;
  const canDelete =
    isSuperAdmin || isAdmin || user?.permissions?.canDeletePackages;

  const [packages, setPackages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPackages()
      .then((res) => setPackages(getListFromResponse(res)))
      .catch(() => setPackages([]))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (pkg) => {
    setEditing(pkg);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package? Sub-packages may be affected."))
      return;
    try {
      await deletePackage(id);
      setPackages((p) => p.filter((pkg) => pkg._id !== id));
      toast.success("Package deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-slate-600">
        Tour categories (e.g. Spiritual, Holiday). Add sub-packages under each.
      </p>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Packages</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {packages.length} package(s) total
            </p>
          </div>
          {canCreate && (
            <Button onClick={handleAdd} className="flex items-center gap-2">
              <FiPlus className="w-4 h-4" />
              Add Package
            </Button>
          )}
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading...</div>
        ) : packages.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <FiPackage className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>No packages yet. Click "Add Package" to create one.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                {(canUpdate || canDelete) && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg, index) => (
                <TableRow key={pkg._id}>
                  <TableCell className="text-slate-500 text-sm">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-800">
                    {pkg.category}
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm max-w-xs truncate">
                    {pkg.description || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {pkg.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  {(canUpdate || canDelete) && (
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <FiMoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {canUpdate && (
                            <DropdownMenuItem onClick={() => handleEdit(pkg)}>
                              <FiEdit2 className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {canUpdate && canDelete && <DropdownMenuSeparator />}
                          {canDelete && (
                            <DropdownMenuItem
                              onClick={() => handleDelete(pkg._id)}
                              className="text-red-600 hover:!text-red-600 hover:!bg-red-50"
                            >
                              <FiTrash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <PackageForm
        open={formOpen}
        onClose={handleClose}
        editing={editing}
        setPackages={setPackages}
      />
    </div>
  );
};

export default PackagesPage;

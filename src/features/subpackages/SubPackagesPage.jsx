import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";
import {
  deleteSubPackage,
  getSubPackagesByParent,
} from "./subpackages.service";
import SubPackageSlideOver from "./SubPackageSlideOver";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import useAuth from "../../hooks/useAuth";

const SubPackagesPage = () => {
  const { user, isSuperAdmin, isAdmin } = useAuth();
  const canCreate =
    isSuperAdmin || isAdmin || user?.permissions?.canCreateSubPackages;
  const canUpdate =
    isSuperAdmin || isAdmin || user?.permissions?.canUpdateSubPackages;
  const canDelete =
    isSuperAdmin || isAdmin || user?.permissions?.canDeleteSubPackages;

  const [packages, setPackages] = useState([]);
  const [subsByParent, setSubsByParent] = useState({});
  const [subSubsByParent, setSubSubsByParent] = useState({});
  const [openPackages, setOpenPackages] = useState({});
  const [openSubs, setOpenSubs] = useState({});
  const [loading, setLoading] = useState(false);

  const [slideOpen, setSlideOpen] = useState(false);
  const [slideParentId, setSlideParentId] = useState(null);
  const [slideParentType, setSlideParentType] = useState(null);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/packages?includeInactive=1");
        const list = res.data?.data ?? res.data ?? [];
        setPackages(Array.isArray(list) ? list : []);
      } catch {
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const togglePackage = async (pkgId) => {
    setOpenPackages((p) => ({ ...p, [pkgId]: !p[pkgId] }));
    if (!subsByParent[pkgId]) {
      try {
        const res = await getSubPackagesByParent(pkgId, "PACKAGE");
        setSubsByParent((p) => ({ ...p, [pkgId]: res.data ?? [] }));
      } catch {
        setSubsByParent((p) => ({ ...p, [pkgId]: [] }));
      }
    }
  };

  const toggleSub = async (subId) => {
    setOpenSubs((p) => ({ ...p, [subId]: !p[subId] }));
    if (!subSubsByParent[subId]) {
      try {
        const res = await getSubPackagesByParent(subId, "SUBPACKAGE");
        setSubSubsByParent((p) => ({ ...p, [subId]: res.data ?? [] }));
      } catch {
        setSubSubsByParent((p) => ({ ...p, [subId]: [] }));
      }
    }
  };

const openCreate = (parentId, parentType) => {
  console.log("openCreate called:", parentId, parentType); // ← add this
  setEditing(null);
  setSlideParentId(parentId);
  setSlideParentType(parentType);
  setSlideOpen(true);
};

  const openEdit = (subPkg) => {
    setEditing(subPkg);
    setSlideParentId(subPkg.parentId);
    setSlideParentType(subPkg.parentType);
    setSlideOpen(true);
  };

  const handleDelete = async (subPkg) => {
    if (!window.confirm(`Delete "${subPkg.name}"? This is permanent!`)) return;
    try {
      await deleteSubPackage(subPkg._id);
      toast.success("Deleted successfully");
      if (subPkg.parentType === "PACKAGE") {
        setSubsByParent((p) => ({
          ...p,
          [subPkg.parentId]: (p[subPkg.parentId] || []).filter(
            (s) => s._id !== subPkg._id,
          ),
        }));
      } else {
        setSubSubsByParent((p) => ({
          ...p,
          [subPkg.parentId]: (p[subPkg.parentId] || []).filter(
            (s) => s._id !== subPkg._id,
          ),
        }));
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSaved = (saved, isEdit) => {
    if (!saved) return;
    if (isEdit) {
      if (saved.parentType === "PACKAGE") {
        setSubsByParent((p) => ({
          ...p,
          [saved.parentId]: (p[saved.parentId] || []).map((s) =>
            s._id === saved._id ? saved : s,
          ),
        }));
      } else {
        setSubSubsByParent((p) => ({
          ...p,
          [saved.parentId]: (p[saved.parentId] || []).map((s) =>
            s._id === saved._id ? saved : s,
          ),
        }));
      }
    } else {
      if (saved.parentType === "PACKAGE") {
        setSubsByParent((p) => ({
          ...p,
          [saved.parentId]: [...(p[saved.parentId] || []), saved],
        }));
      } else {
        setSubSubsByParent((p) => ({
          ...p,
          [saved.parentId]: [...(p[saved.parentId] || []), saved],
        }));
      }
    }
  };

  const ActionsMenu = ({ item }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
          <FiMoreVertical className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {canUpdate && (
          <DropdownMenuItem onClick={() => openEdit(item)}>
            <FiEdit2 className="w-4 h-4 mr-2" /> Edit
          </DropdownMenuItem>
        )}
        {canUpdate && canDelete && <DropdownMenuSeparator />}
        {canDelete && (
          <DropdownMenuItem
            onClick={() => handleDelete(item)}
            className="text-red-600 hover:!text-red-600 hover:!bg-red-50"
          >
            <FiTrash2 className="w-4 h-4 mr-2" /> Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="space-y-6">
      <p className="text-slate-600">
        Manage sub-packages and tours under each package category.
      </p>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Sub-Packages</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {packages.length} package(s)
          </p>
        </div>

        <div className="p-4 space-y-2">
          {loading && (
            <p className="text-slate-500 text-sm p-4">Loading packages...</p>
          )}
          {!loading && packages.length === 0 && (
            <p className="text-slate-500 text-sm p-4">No packages found.</p>
          )}

          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100">
                <button
                  type="button"
                  onClick={() => togglePackage(pkg._id)}
                  className="flex items-center gap-3 flex-1 text-left"
                >
                  {openPackages[pkg._id] ? (
                    <FiChevronDown className="w-4 h-4 text-slate-500" />
                  ) : (
                    <FiChevronRight className="w-4 h-4 text-slate-500" />
                  )}
                  <div>
                    <p className="font-semibold text-slate-800">
                      {pkg.category}
                    </p>
                    {pkg.description && (
                      <p className="text-xs text-slate-500">
                        {pkg.description}
                      </p>
                    )}
                  </div>
                </button>
                {canCreate && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openCreate(pkg._id, "PACKAGE")}
                    className="flex items-center gap-1 text-xs"
                  >
                    <FiPlus className="w-3.5 h-3.5" /> Add Sub
                  </Button>
                )}
              </div>

              {openPackages[pkg._id] && (
                <div className="px-4 pb-3 pt-2 space-y-2 border-t border-slate-100">
                  {(subsByParent[pkg._id] || []).length === 0 && (
                    <p className="text-sm text-slate-400 pl-6">
                      No sub-packages yet.
                    </p>
                  )}
                  {(subsByParent[pkg._id] || []).map((sub) => (
                    <div
                      key={sub._id}
                      className="border border-slate-200 rounded-lg overflow-hidden ml-4"
                    >
                      <div className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50">
                        <button
                          type="button"
                          onClick={() => toggleSub(sub._id)}
                          className="flex items-center gap-3 flex-1 text-left"
                        >
                          {openSubs[sub._id] ? (
                            <FiChevronDown className="w-4 h-4 text-slate-400" />
                          ) : (
                            <FiChevronRight className="w-4 h-4 text-slate-400" />
                          )}
                          <img
                            src={sub.imageUrl}
                            alt={sub.name}
                            className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {sub.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-slate-500">
                                {sub.duration}
                              </span>
                              {sub.price && (
                                <span className="text-xs text-green-600 font-medium">
                                  ₹{sub.price}
                                </span>
                              )}
                              {sub.isDealOfTheDay && (
                                <Badge
                                  variant="default"
                                  className="text-xs px-1.5 py-0"
                                >
                                  Deal
                                </Badge>
                              )}
                            </div>
                          </div>
                        </button>
                        <div className="flex items-center gap-2">
                          {canCreate && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openCreate(sub._id, "SUBPACKAGE")}
                              className="flex items-center gap-1 text-xs"
                            >
                              <FiPlus className="w-3.5 h-3.5" /> Add Sub
                            </Button>
                          )}
                          {(canUpdate || canDelete) && (
                            <ActionsMenu item={sub} />
                          )}
                        </div>
                      </div>

                      {openSubs[sub._id] && (
                        <div className="px-4 pb-3 pt-2 space-y-1.5 border-t border-slate-100 bg-slate-50/50">
                          {(subSubsByParent[sub._id] || []).length === 0 && (
                            <p className="text-sm text-slate-400 pl-6">
                              No sub-sub-packages yet.
                            </p>
                          )}
                          {(subSubsByParent[sub._id] || []).map((ss) => (
                            <div
                              key={ss._id}
                              className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 ml-4"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={ss.imageUrl}
                                  alt={ss.name}
                                  className="w-8 h-8 rounded-md object-cover border border-slate-200"
                                />
                                <div>
                                  <p className="text-sm text-slate-700 font-medium">
                                    {ss.name}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500">
                                      {ss.duration}
                                    </span>
                                    {ss.price && (
                                      <span className="text-xs text-green-600 font-medium">
                                        ₹{ss.price}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {(canUpdate || canDelete) && (
                                <ActionsMenu item={ss} />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <SubPackageSlideOver
        open={slideOpen}
        onClose={() => {
          setSlideOpen(false);
          setEditing(null);
        }}
        editing={editing}
        parentId={slideParentId}
        parentType={slideParentType}
        onSaved={handleSaved}
      />
    </div>
  );
};

export default SubPackagesPage;

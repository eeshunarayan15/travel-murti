import React, { useState } from "react";
import SubPackageList from "./SubPackageList";
import SubPackageForm from "./SubPackageForm";
import { useSubPackages } from "./hooks";
import axiosInstance from "../../../services/axiosInstance";
import { toast } from "react-hot-toast";

const SubPackageManager = ({ packageId }) => {
  const { subPackages, refresh, loading } =
    useSubPackages(packageId);

  const [editingData, setEditingData] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const canEdit =
    user?.role === "admin" ||
    user?.permissions?.canUpdateSubPackages;

  const handleDelete = async (id) => {
    if (!canEdit) return toast.error("Permission denied");
    try {
      await axiosInstance.delete(`/subpackages/${id}`);
      toast.success("Deleted");
      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        SubPackage Manager
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <SubPackageList
          subPackages={subPackages}
          packageId={packageId}
          canEdit={canEdit}
          onEdit={setEditingData}
          onDelete={handleDelete}
          refresh={refresh}
        />
      )}

      {canEdit && (
        <SubPackageForm
          packageId={packageId}
          editingData={editingData}
          canEdit={canEdit}
          onSuccess={() => {
            setEditingData(null);
            refresh();
          }}
        />
      )}
    </div>
  );
};

export default SubPackageManager;
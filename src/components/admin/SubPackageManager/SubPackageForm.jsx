import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  name: "",
  description: "",
  price: "",
  duration: "",
  introduction: "",
  tourPlan: "",
  includeExclude: "",
  isDealOfTheDay: false,
  mainImage: null,
};

const SubPackageForm = ({
  packageId,
  editingData,
  onSuccess,
  canEdit,
}) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingData) setForm(editingData);
  }, [editingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canEdit) return toast.error("Permission denied");

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("packageId", packageId);

    try {
      setLoading(true);
      if (editingData?._id) {
        await axiosInstance.put(
          `/subpackages/${editingData._id}`,
          fd
        );
        toast.success("Updated successfully");
      } else {
        await axiosInstance.post("/subpackages", fd);
        toast.success("Created successfully");
      }
      setForm(initialState);
      onSuccess();
    } catch {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-lg shadow mt-6"
    >
      <h3 className="font-bold mb-4">
        {editingData ? "Edit SubPackage" : "Create SubPackage"}
      </h3>

      {[
        ["name", "Name"],
        ["description", "Description"],
        ["price", "Price"],
        ["duration", "Duration"],
      ].map(([key, label]) => (
        <input
          key={key}
          placeholder={label}
          value={form[key]}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
          className="w-full mb-3 border p-2 rounded"
          required
        />
      ))}

      <textarea
        placeholder="Introduction"
        value={form.introduction}
        onChange={(e) =>
          setForm({ ...form, introduction: e.target.value })
        }
        className="w-full mb-3 border p-2 rounded"
      />

      <input
        type="file"
        onChange={(e) =>
          setForm({ ...form, mainImage: e.target.files[0] })
        }
        className="mb-3"
      />

      <button
        disabled={loading}
        className="bg-green-600 text-white px-5 py-2 rounded"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default SubPackageForm;
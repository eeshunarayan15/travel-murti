import React, { useState, useEffect, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axiosInstance from "../../services/axiosInstance";
import api from "../../config/api.json";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { getListFromResponse } from "../../utils/helpers";

const ManageSubPackages = () => {
  const [packages, setPackages] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [selectedParentType, setSelectedParentType] = useState("PACKAGE");
  const [selectedParentLabel, setSelectedParentLabel] = useState("");
  const [subPackages, setSubPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const { isAdmin } = useAuth();

  /* ---------------- FETCH PACKAGES ---------------- */
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axiosInstance.get(api.packages.list);
      setPackages(getListFromResponse(res.data));
    } catch (error) {
      toast.error("Failed to load packages");
    }
  };

  /* ---------------- FETCH SUBPACKAGES ---------------- */
  const fetchSubPackages = async (parentId, parentType = "PACKAGE", label = "") => {
    setLoading(true);
    try {
      const byPackage = api?.subPackages?.byPackage ?? "/subpackages/package/{packageId}";
      const byParent = "/subpackages/parent/{parentId}";

      const url =
        parentType === "PACKAGE"
          ? byPackage.replace("{packageId}", parentId)
          : byParent.replace("{parentId}", parentId) + `?parentType=${parentType}`;

      const res = await axiosInstance.get(url);
      const list = getListFromResponse(res.data);
      const sorted = [...list].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      );

      setSubPackages(sorted);
      setSelectedParentId(parentId);
      setSelectedParentType(parentType);
      setSelectedParentLabel(label);
    } catch (error) {
      toast.error("Failed to load sub-packages");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DRAG END ---------------- */
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(subPackages);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setSubPackages(items);

    try {
      const payload = {
        parentId: selectedParentId,
        parentType: selectedParentType,
        subPackages: items.map((item, index) => ({
          id: item._id,
          order: index,
        })),
      };

      await axiosInstance.put(api.subPackages.reorder, payload);
      toast.success("Order updated successfully");
    } catch (error) {
      toast.error("Failed to update order");
      fetchSubPackages(selectedParentId, selectedParentType, selectedParentLabel);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const url = api.subPackages.delete.replace("{id}", id);
      await axiosInstance.delete(url);
      toast.success("Deleted successfully");
      fetchSubPackages(selectedParentId, selectedParentType, selectedParentLabel);
    } catch (error) {
      toast.error("Failed to delete sub-package");
    }
  };

  const filteredSubPackages = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subPackages;
    return subPackages.filter((sp) =>
      [sp.name, sp.location, sp.price, sp.designation, sp.department]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query, subPackages]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold">Manage Sub‑Package Order</h2>
          <div className="text-sm text-gray-600 mt-1">
            <span>Home</span> / <span>Admin</span> /{" "}
            <span className="font-medium">Sub‑Packages</span>
            {selectedParentLabel && (
              <>
                {" "} / <span className="font-medium">{selectedParentLabel}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded">
            Total: <span className="font-semibold">{subPackages.length}</span>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sub‑packages..."
            className="px-4 py-2 border rounded-lg w-full md:w-72"
          />
        </div>
      </div>

      {/* -------- PACKAGES -------- */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            onClick={() => fetchSubPackages(pkg._id, "PACKAGE", pkg.category)}
            className={`p-4 rounded-lg border cursor-pointer ${
              selectedParentId === pkg._id && selectedParentType === "PACKAGE"
                ? "border-blue-600 bg-blue-50"
                : "hover:border-blue-400"
            }`}
          >
            <h4 className="font-semibold">{pkg.category}</h4>
            <p className="text-sm text-gray-600">{pkg.description}</p>
          </div>
        ))}
      </div>

      {selectedParentId && (
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-gray-600">
            Viewing: <strong>{selectedParentLabel || "Parent"}</strong>
          </span>
          {selectedParentType === "SUBPACKAGE" && (
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => {
                setSubPackages([]);
                setSelectedParentId(null);
                setSelectedParentType("PACKAGE");
                setSelectedParentLabel("");
              }}
            >
              Back to packages
            </button>
          )}
        </div>
      )}

      {/* -------- SUBPACKAGES -------- */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : selectedParentId ? (
        <DragDropContext onDragEnd={isAdmin ? handleDragEnd : () => {}}>
          <Droppable droppableId="subpackages">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {filteredSubPackages.length ? (
                  filteredSubPackages.map((subPkg, index) => (
                    <Draggable
                      key={subPkg._id}
                      draggableId={subPkg._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...(isAdmin ? provided.dragHandleProps : {})}
                          className={`flex items-center justify-between p-4 mb-3 border rounded 
                            ${!isAdmin ? "cursor-not-allowed opacity-50" : ""}
                            ${snapshot.isDragging ? "bg-blue-50 shadow-lg" : "bg-white"}`}
                        >
                          <div className="flex items-center gap-4">
                            {subPkg.imageUrl && (
                              <img
                                src={subPkg.imageUrl}
                                alt={subPkg.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                            <div>
                              <p className="font-semibold">{subPkg.name}</p>
                              <p className="text-sm text-gray-600">₹{subPkg.price}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                fetchSubPackages(subPkg._id, "SUBPACKAGE", subPkg.name)
                              }
                              className="px-3 py-2 text-sm bg-slate-100 rounded hover:bg-slate-200"
                            >
                              View Sub‑Packages
                            </button>

                            <button
                              disabled={!isAdmin}
                              onClick={() => handleDelete(subPkg._id)}
                              className={`px-4 py-2 bg-red-500 text-white rounded 
                                ${isAdmin ? "hover:bg-red-600" : "bg-gray-400 cursor-not-allowed"}`}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No matching sub‑packages.
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <p className="text-center text-gray-500">
          Select a package to manage sub‑packages
        </p>
      )}
    </div>
  );
};

export default ManageSubPackages;

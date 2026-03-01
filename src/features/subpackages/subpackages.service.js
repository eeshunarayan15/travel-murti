import axiosInstance from "../../services/axiosInstance";

export const getAllSubPackages = () =>
  axiosInstance.get("/subpackages").then((r) => r.data);

export const getSubPackagesByParent = (parentId, parentType) =>
  axiosInstance
    .get(`/subpackages/parent/${parentId}?parentType=${parentType}`)
    .then((r) => r.data);

export const createSubPackage = (formData) =>
  axiosInstance.post("/subpackages", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateSubPackage = (id, formData) =>
  axiosInstance.put(`/subpackages/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteSubPackage = (id) =>
  axiosInstance.delete(`/subpackages/${id}`);

export const deleteGalleryImage = (subPackageId, imageId) =>
  axiosInstance.delete(
    `/subpackages/${subPackageId}/gallery-images/${imageId}`,
  );

import { useState, useEffect } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { toast } from "react-hot-toast";

export const useSubPackages = (packageId) => {
  const [subPackages, setSubPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubPackages = async () => {
    if (!packageId) return;
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/subpackages/package/${packageId}`
      );
      setSubPackages(res.data);
    } catch (err) {
      toast.error("Failed to load sub-packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubPackages();
  }, [packageId]);

  return {
    subPackages,
    setSubPackages,
    loading,
    refresh: fetchSubPackages,
  };
};
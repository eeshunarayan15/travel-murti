import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import API from "../config/api.json";
import buildUrl from "../utils/buildUrl";
import { getListFromResponse } from "../utils/helpers";
import Card from "./Card";

const PackageGrid = ({
  title,
  subtitle,
  apiKey,      // ex: "packages.list"
  maxItems = 6,
}) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);

        // resolve api path safely
        const [group, action] = apiKey.split(".");
        const endpoint = API[group][action];

        const res = await axiosInstance.get(endpoint);
        const data = getListFromResponse(res.data);

        setPackages(data.slice(0, maxItems));
      } catch (error) {
        console.error("PackageGrid error:", error);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [apiKey, maxItems]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-gray-600">{subtitle}</p>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} isLoading />
          ))}
        </div>
      ) : packages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg._id} data={pkg} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white p-10 rounded-xl shadow">
          <p className="text-gray-600">No packages available.</p>
        </div>
      )}
    </section>
  );
};

export default PackageGrid;
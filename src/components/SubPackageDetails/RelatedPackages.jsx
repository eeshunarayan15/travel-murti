import React from "react";
import Card from "../common/Card";

const RelatedSubPackages = ({
  subPackages = [],
  onNavigate,
  currentPackageSlug, // "holiday-tour"
  currentSubSlug, // "kashmir-tour-package"
}) => {
  const buildNestedUrl = (pkg) => {
    if (pkg.subPackageUrl) {
      // remove leading slash if present, then split into segments
      const segments = pkg.subPackageUrl.replace(/^\//, "").split("/");

      console.log("pkg.subPackageUrl =", pkg.subPackageUrl);
      console.log("segments =", segments);
      console.log("currentPackageSlug =", currentPackageSlug);
      console.log("currentSubSlug =", currentSubSlug);

      // already a full 3-segment path → use as-is
      // e.g. "holiday-tour/kashmir-tour-package/kashmir-trip-with-gulmarg"
      if (segments.length >= 3) {
        return `/${segments.join("/")}`;
      }

      // 2-segment path like "kashmir-tour-package/kashmir-trip-with-gulmarg"
      // prefix with just the packageSlug
      if (segments.length === 2 && currentPackageSlug) {
        return `/${currentPackageSlug}/${segments.join("/")}`;
      }

      // 1-segment path like "kashmir-trip-with-gulmarg"
      // prefix with both packageSlug and subSlug
      if (segments.length === 1 && currentPackageSlug && currentSubSlug) {
        return `/${currentPackageSlug}/${currentSubSlug}/${segments[0]}`;
      }
    }

    // no custom URL → fallback to ID based route
    return `/subpackages/${pkg._id}`;
  };

  return (
    <>
      <h2 className="text-xl font-bold text-center mb-2">
        Related Sub-Packages
      </h2>

      <hr className="border-2 border-blue-500 w-40 mx-auto mb-8" />

      {subPackages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-0">
          {subPackages.map((pkg) => (
            <Card
              key={pkg._id}
              imageUrl={pkg.imageUrl}
              title={pkg.name}
              description={pkg.description}
              price={pkg.price}
              duration={pkg.duration}
              onViewDetails={() => onNavigate(buildNestedUrl(pkg))}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No related sub-packages found.
        </p>
      )}
    </>
  );
};

export default RelatedSubPackages;

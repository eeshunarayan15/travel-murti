// import React from "react";

// const Description = ({ subPackage }) => {
//   return (
//     <p className="text-center max-w-4xl mx-auto text-gray-700 mb-12 px-4">
//       {subPackage.description}
//     </p>
//   );
// };

// export default Description;
const Description = ({ subPackage }) => {
  if (!subPackage.description) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-center">
      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-12 h-[2px] bg-blue-200 rounded" />
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <div className="w-12 h-[2px] bg-blue-200 rounded" />
      </div>

      <p className="text-slate-600 text-base md:text-lg leading-relaxed">
        {subPackage.description}
      </p>

      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="w-12 h-[2px] bg-blue-200 rounded" />
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <div className="w-12 h-[2px] bg-blue-200 rounded" />
      </div>
    </div>
  );
};

export default Description;
import React from "react";
import CardShimmer from "../../CardShimmer";


const Loading = () => {
  return (
    <div className="container mx-auto py-16">
      <div className="shimmer h-52 w-full rounded mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <CardShimmer key={i} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Card = ({ data, isLoading = false }) => {
//   const navigate = useNavigate();

//   if (isLoading) {
//     return (
//       <div className="animate-pulse bg-white p-4 rounded-xl shadow">
//         <div className="h-48 bg-gray-200 rounded mb-4" />
//         <div className="h-4 bg-gray-200 rounded mb-2" />
//         <div className="h-4 bg-gray-200 rounded w-2/3" />
//       </div>
//     );
//   }

//   const {
//     _id,
//     imageUrl,
//     name,
//     description,
//     price,
//     duration,
//   } = data;

//   return (
//     <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
//       <img
//         src={imageUrl || "/placeholder.jpg"}
//         alt={name}
//         className="h-48 w-full object-cover"
//       />

//       <div className="p-4">
//         <h3 className="text-lg font-semibold text-gray-800">
//           {name}
//         </h3>

//         {duration && (
//           <p className="text-sm text-gray-500 mt-1">
//             Duration: {duration}
//           </p>
//         )}

//         {description && (
//           <p className="text-sm text-gray-600 mt-2 line-clamp-2">
//             {description}
//           </p>
//         )}

//         <div className="flex items-center justify-between mt-4">
//           <p className="text-blue-600 font-semibold">
//             {price ? `₹${price}` : "Coming Soon"}
//           </p>

//           <button
//             onClick={() => navigate(`/subpackages/${_id}`)}
//             className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             View
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ArrowRight, Tag } from "lucide-react";

const Card = ({ data, isLoading = false }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
        <div className="h-52 bg-slate-200" />
        <div className="p-5 space-y-3">
          <div className="h-4 bg-slate-200 rounded-full w-3/4" />
          <div className="h-3 bg-slate-200 rounded-full w-1/2" />
          <div className="h-3 bg-slate-200 rounded-full w-full" />
          <div className="h-3 bg-slate-200 rounded-full w-2/3" />
          <div className="flex justify-between items-center pt-2">
            <div className="h-5 bg-slate-200 rounded-full w-1/4" />
            <div className="h-9 bg-slate-200 rounded-xl w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  const { _id, imageUrl, name, description, price, duration, isDealOfTheDay } =
    data;

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => navigate(`/subpackages/${_id}`)}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={imageUrl || "/placeholder.jpg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Deal badge */}
        {isDealOfTheDay && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
            <Tag className="w-3 h-3" />
            Deal of the Day
          </div>
        )}

        {/* Duration pill on image */}
        {duration && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3 text-blue-600" />
            {duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>

        {description && (
          <p className="text-sm text-slate-500 mt-2 line-clamp-2 flex-1 leading-relaxed">
            {description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <div>
            {price ? (
              <>
                <p className="text-xs text-slate-400">Starting from</p>
                <p className="text-lg font-bold text-blue-600">
                  ₹{Number(price).toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-sm font-medium text-slate-400">
                Price on request
              </p>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/subpackages/${_id}`);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700
              text-white text-sm font-semibold rounded-xl transition-all
              group-hover:gap-2.5 shadow-sm shadow-blue-200"
          >
            View
            <ArrowRight className="w-3.5 h-3.5 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
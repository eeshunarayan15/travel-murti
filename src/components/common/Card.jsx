// import { formatTitle } from "../../utils/formatters";

// const Card = ({
//   imageUrl,
//   title,
//   description,
//   price,
//   duration,
//   onViewDetails,
// }) => {
//   return (
//     <div className="relative mx-auto max-w-xs min-w-[300px] p-1 rounded-xl overflow-hidden hover:shadow-2xl mb-4">
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-red-600 to-purple-600 rounded-xl blur-sm -z-10" />

//       <div className="relative bg-white shadow-lg flex flex-col items-center rounded-xl w-full h-full overflow-hidden">
//         <img
//           src={imageUrl}
//           alt={title}
//           className="h-52 w-full object-cover rounded-t-lg"
//         />

//         <h2 className="text-lg font-semibold mt-2 px-4 text-center">
//           {formatTitle(title)}
//         </h2>

//         {description && (
//           <p className="text-gray-500 px-4 mt-1 text-sm text-center line-clamp-2">
//             {description}
//           </p>
//         )}

//         <p className="text-gray-500 px-4 mt-2">
//           Duration: {duration}
//         </p>

//         <p className="text-blue-600 mt-2 font-semibold text-lg px-4">
//           {typeof price === "number" && price > 0
//             ? `₹${price}/Person`
//             : "Coming soon"}
//         </p>

//         <button
//           className="bg-blue-500 text-white px-4 py-2 my-4 rounded hover:bg-blue-600 transition"
//           onClick={onViewDetails}
//         >
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Card;
import { formatTitle } from "../../utils/formatters";
import { Clock, ArrowRight, Tag } from "lucide-react";

const Card = ({
  imageUrl,
  title,
  description,
  price,
  duration,
  onViewDetails,
  isDealOfTheDay,
}) => {
  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer
        hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col"
      onClick={onViewDetails}
    >
      {/* Gradient border effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-red-400 to-purple-500 
  rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <div className="absolute inset-[1px] bg-white rounded-2xl -z-10" />

      {/* Image */}
      <div className="relative h-52 overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Deal badge */}
        {isDealOfTheDay && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            <Tag className="w-3 h-3" />
            Deal of the Day
          </div>
        )}

        {/* Duration pill */}
        {duration && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3 text-blue-600" />
            {duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-base font-bold text-slate-800 text-center line-clamp-1 group-hover:text-blue-600 transition-colors">
          {formatTitle(title)}
        </h2>

        {description && (
          <p className="text-sm text-slate-500 mt-2 text-center line-clamp-2 leading-relaxed flex-1">
            {description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <div>
            {typeof price === "number" && price > 0 ? (
              <>
                <p className="text-xs text-slate-400">Starting from</p>
                <p className="text-lg font-bold text-blue-600">
                  ₹{price.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400">
                    /Person
                  </span>
                </p>
              </>
            ) : (
              <p className="text-sm font-medium text-slate-400">Coming soon</p>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700
              text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-blue-200
              group-hover:gap-2.5"
          >
            View
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
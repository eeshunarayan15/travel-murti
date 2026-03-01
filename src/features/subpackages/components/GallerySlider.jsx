// import { useEffect, useState } from "react";

// const GallerySlider = ({ images = [] }) => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (!images.length) return;

//     const interval = setInterval(() => {
//       setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   if (!images.length) return null;

//   return (
//     <div className="mb-4">
//       <img
//         src={images[index]?.url}
//         alt="Gallery"
//         className="w-full h-96 object-contain rounded"
//         onError={(e) => (e.target.src = "/fallback.jpg")}
//       />

//       <div className="flex justify-between mt-2">
//         <button onClick={() => setIndex(index === 0 ? images.length - 1 : index - 1)}>
//           ‹ Back
//         </button>
//         <button onClick={() => setIndex(index === images.length - 1 ? 0 : index + 1)}>
//           Next ›
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GallerySlider;
import { useEffect, useState } from "react";

const GallerySlider = ({ images = [] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) return null;

  const prev = () => setIndex(index === 0 ? images.length - 1 : index - 1);
  const next = () => setIndex(index === images.length - 1 ? 0 : index + 1);

  return (
    <div className="mb-6 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      {/* Image */}
      <div className="relative w-full h-80 bg-slate-100">
        <img
          src={images[index]?.url}
          alt={`Gallery ${index + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = "/fallback.jpg")}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Counter */}
        <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          {index + 1} / {images.length}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <button
          onClick={prev}
          className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
        >
          ‹ Back
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === index ? "bg-blue-600 w-4" : "bg-slate-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
        >
          Next ›
        </button>
      </div>
    </div>
  );
};

export default GallerySlider;
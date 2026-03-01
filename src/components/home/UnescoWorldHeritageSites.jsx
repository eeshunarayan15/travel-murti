// import { useEffect, useState, useCallback } from "react";
// import { UNESCO_SITES } from "../../services/unescoSites";

// const UnescoWorldHeritageSites = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(2);

//   useEffect(() => {
//     const updateItems = () => {
//       setItemsPerPage(window.innerWidth <= 796 ? 1 : 2);
//     };

//     updateItems();
//     window.addEventListener("resize", updateItems);
//     return () => window.removeEventListener("resize", updateItems);
//   }, []);

//   const totalSlides = Math.ceil(UNESCO_SITES.length / itemsPerPage);

//   // removed misplaced import

//   const nextSlide = useCallback(
//     () => setCurrentSlide((prev) => (prev + 1) % totalSlides),
//     [totalSlides]
//   );

//   const prevSlide = useCallback(
//     () => setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1)),
//     [totalSlides]
//   );

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 3000);
//     return () => clearInterval(interval);
//   }, [itemsPerPage, nextSlide]);

//   const currentItems = UNESCO_SITES.slice(
//     currentSlide * itemsPerPage,
//     (currentSlide + 1) * itemsPerPage
//   );

//   return (
//     <section className="max-w-6xl mx-auto px-4 my-10">
//       <h2 className="text-2xl font-semibold text-center text-gray-700">
//         UNESCO World Heritage Sites in India
//       </h2>

//       <p className="text-center text-gray-600 mt-2">
//         Check out these amazing heritage sites
//       </p>

//       <hr className="border-2 w-40 mx-auto border-blue-500 my-6 rounded" />

//       <div className="relative">
//         <div className={`grid ${itemsPerPage === 1 ? "grid-cols-1" : "grid-cols-2"} gap-4`}>
//           {currentItems.map((site) => (
//             <div key={site._id} className="relative h-64 sm:h-96">
//               <img
//                 src={site.imageUrl}
//                 alt={site.name}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//               <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-2">
//                 {site.name}
//               </div>
//             </div>
//           ))}
//         </div>

//         <button onClick={prevSlide} className="absolute left-2 top-1/2 bg-gray-800 text-white p-2 rounded-full">
//           ❮
//         </button>
//         <button onClick={nextSlide} className="absolute right-2 top-1/2 bg-gray-800 text-white p-2 rounded-full">
//           ❯
//         </button>
//       </div>
//     </section>
//   );
// };

// export default UnescoWorldHeritageSites;
import { useEffect, useState, useCallback } from "react";
import { UNESCO_SITES } from "../../services/unescoSites";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const UnescoWorldHeritageSites = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateItems = () => {
      setItemsPerPage(window.innerWidth <= 768 ? 1 : 2);
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const totalSlides = Math.ceil(UNESCO_SITES.length / itemsPerPage);

  const nextSlide = useCallback(
    () => setCurrentSlide((prev) => (prev + 1) % totalSlides),
    [totalSlides],
  );

  const prevSlide = useCallback(
    () => setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1)),
    [totalSlides],
  );

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [itemsPerPage, nextSlide, isHovered]);

  const currentItems = UNESCO_SITES.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage,
  );

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
            India's Treasures
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            UNESCO World Heritage Sites
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Explore India's most iconic and historically significant heritage
            sites
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-8 h-[2px] bg-blue-500 rounded" />
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-8 h-[2px] bg-blue-500 rounded" />
          </div>
        </div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`grid ${itemsPerPage === 1 ? "grid-cols-1" : "grid-cols-2"} gap-5`}
          >
            {currentItems.map((site) => (
              <div
                key={site._id}
                className="group relative h-72 sm:h-[420px] rounded-2xl overflow-hidden shadow-lg"
              >
                {/* Image */}
                <img
                  src={site.imageUrl}
                  alt={site.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* UNESCO badge */}
                <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                  UNESCO
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight">
                        {site.name}
                      </h3>
                      {site.location && (
                        <p className="text-gray-300 text-sm mt-0.5">
                          {site.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nav Buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10
              w-11 h-11 rounded-full bg-white shadow-lg border border-slate-200
              flex items-center justify-center text-slate-700
              hover:bg-blue-600 hover:text-white hover:border-blue-600
              transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10
              w-11 h-11 rounded-full bg-white shadow-lg border border-slate-200
              flex items-center justify-center text-slate-700
              hover:bg-blue-600 hover:text-white hover:border-blue-600
              transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? "w-7 h-2 bg-blue-600"
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-center text-xs text-slate-400 mt-3">
          {currentSlide + 1} / {totalSlides}
        </p>
      </div>
    </section>
  );
};

export default UnescoWorldHeritageSites;
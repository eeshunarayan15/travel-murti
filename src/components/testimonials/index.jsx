// import React, { useEffect, useState } from "react";
// import testimonials from "./testimonials.data";
// import TestimonialCard from "./TestimonialCard";

// const TestimonialSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const slider = setInterval(() => {
//       setCurrentIndex((prev) =>
//         prev === testimonials.length - 1 ? 0 : prev + 1
//       );
//     }, 5000);

//     return () => clearInterval(slider);
//   }, []);

//   const prev = () =>
//     setCurrentIndex((prev) =>
//       prev === 0 ? testimonials.length - 1 : prev - 1
//     );

//   const next = () =>
//     setCurrentIndex((prev) =>
//       prev === testimonials.length - 1 ? 0 : prev + 1
//     );

//   return (
//     <section className="relative w-full bg-white mt-14 lg:mt-20 overflow-hidden">
//       <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
//         Testimonials
//       </h2>

//       <hr className="border max-w-28 mx-auto border-gray-300 mt-1 mb-8" />

//       <div className="relative h-[520px] flex items-center justify-center px-4">
//         {testimonials.map((testimonial, index) => (
//           <div
//             key={testimonial.id}
//             className={`absolute transition-opacity duration-700 ${
//               index === currentIndex ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <TestimonialCard testimonial={testimonial} />
//           </div>
//         ))}

//         {/* Desktop Arrows */}
//         <button
//           onClick={prev}
//           className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full"
//         >
//           ‹
//         </button>

//         <button
//           onClick={next}
//           className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full"
//         >
//           ›
//         </button>
//       </div>
//     </section>
//   );
// };

// export default TestimonialSlider;
import { useEffect, useState } from "react";
import testimonials from "./testimonials.data";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= Math.floor(rating)
              ? "text-amber-400"
              : star - 0.5 <= rating
                ? "text-amber-300"
                : "text-slate-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-slate-500 ml-1">{rating}/5</span>
    </div>
  );
};

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const prev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  const next = () =>
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );

  const t = testimonials[currentIndex];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50/50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
            What Travelers Say
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Real Stories, Real Experiences
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-8 h-[2px] bg-blue-500 rounded" />
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-8 h-[2px] bg-blue-500 rounded" />
          </div>
        </div>

        {/* Card */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-14 relative overflow-hidden">
            {/* Decorative quote icon */}
            <div className="absolute top-6 right-8 opacity-5">
              <Quote className="w-32 h-32 text-blue-600 fill-blue-600" />
            </div>

            {/* Decorative corner */}
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-blue-700 rounded-l-3xl" />

            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = "/fallback.jpg")}
                    />
                  </div>
                  {/* Rating badge */}
                  <div className="absolute -bottom-3 -right-3 bg-amber-400 text-white text-xs font-bold w-9 h-9 rounded-xl flex items-center justify-center shadow">
                    {t.rating}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <StarRating rating={t.rating} />

                <blockquote className="mt-4 text-slate-600 text-base md:text-lg leading-relaxed italic">
                  "{t.quote}"
                </blockquote>

                <div className="mt-5">
                  <p className="font-bold text-slate-800 text-lg">{t.name}</p>
                  <p className="text-sm text-blue-600 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nav buttons */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10
              w-11 h-11 rounded-full bg-white shadow-lg border border-slate-200
              flex items-center justify-center text-slate-600
              hover:bg-blue-600 hover:text-white hover:border-blue-600
              transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10
              w-11 h-11 rounded-full bg-white shadow-lg border border-slate-200
              flex items-center justify-center text-slate-600
              hover:bg-blue-600 hover:text-white hover:border-blue-600
              transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-7 h-2 bg-blue-600"
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* Avatar strip */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-full overflow-hidden border-2 transition-all duration-200 ${
                i === currentIndex
                  ? "border-blue-500 w-10 h-10 scale-110"
                  : "border-transparent w-8 h-8 opacity-50 hover:opacity-80"
              }`}
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
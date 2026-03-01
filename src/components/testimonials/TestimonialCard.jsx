import React from "react";
import TestimonialStars from "./TestimonialStars";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white p-4 md:p-10 rounded-lg shadow-lg max-w-4xl w-full text-center border border-gray-200">
      <p className="text-gray-600 mb-4 text-sm md:text-lg">
        “{testimonial.quote}”
      </p>

      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-16 md:w-24 h-16 md:h-24 mx-auto rounded-full mb-4"
      />

      <h3 className="font-semibold text-lg md:text-2xl">
        {testimonial.name}
      </h3>

      <span className="text-gray-500 text-sm md:text-base">
        {testimonial.role}
      </span>

      <TestimonialStars rating={testimonial.rating} />
    </div>
  );
};

export default TestimonialCard;
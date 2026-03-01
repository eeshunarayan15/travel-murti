import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const TermsBanner = () => {
  return (
    <div className="relative w-full mb-8">
      <img
        src="https://res.cloudinary.com/djrxcdfrr/image/upload/v1731676840/premium_photo-1683140513388-4344c8fc2778_kbd6ff.jpg"
        alt="Terms and Conditions"
        className="w-full h-48 md:h-64 object-cover"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
        <h1 className="font-bold text-4xl md:text-5xl">
          Terms & Conditions
        </h1>

        <p className="text-md flex items-center pt-2">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <FaChevronRight className="mx-2" size={14} />
          Terms & Conditions
        </p>
      </div>
    </div>
  );
};

export default TermsBanner;
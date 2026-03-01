import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24">
      <div className="relative w-full mb-8">
        <img
          src="https://res.cloudinary.com/djrxcdfrr/image/upload/v1731676840/premium_photo-1683140513388-4344c8fc2778_kbd6ff.jpg"
          alt="Privacy Policy"
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          <p className="flex items-center mt-2">
            <Link to="/" className="hover:underline">Home</Link>
            <FaChevronRight className="mx-2" size={14} />
            Privacy Policy
          </p>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-48 py-12 text-gray-600">
        <p className="leading-relaxed mb-4">
          Travel Murti respects your privacy. This policy describes how we collect, use, and protect your personal information.
        </p>
        <p className="leading-relaxed mb-4">
          We collect information you provide when making enquiries or bookings. We use this to process your requests and improve our services.
        </p>
        <p className="leading-relaxed">
          For questions, contact us at contact.travelmurti@gmail.com.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

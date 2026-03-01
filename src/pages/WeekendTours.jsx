import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const WeekendTours = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24">
      <div className="relative w-full mb-8">
        <img
          src="https://res.cloudinary.com/djrxcdfrr/image/upload/v1731676840/premium_photo-1683140513388-4344c8fc2778_kbd6ff.jpg"
          alt="Weekend Tours"
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Weekend Tours</h1>
          <p className="flex items-center mt-2 text-sm md:text-base">
            <Link to="/" className="hover:underline">Home</Link>
            <FaChevronRight className="mx-2" size={14} />
            Weekend Tours
          </p>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-48 py-10 text-gray-600 bg-white">
        <p className="text-base md:text-lg leading-relaxed mb-6">
          India is well known for its cultural diversity and spiritual harmony.
          Weekend tours offer the perfect opportunity to take a short break from
          busy schedules and explore nearby destinations.
        </p>
        <p className="text-base md:text-lg leading-relaxed">
          Whether you are looking for spiritual peace, scenic beauty, or cultural
          experiences, our carefully designed weekend tour packages help you
          relax, refresh, and reconnect with yourself.
        </p>
      </div>
    </div>
  );
};

export default WeekendTours;

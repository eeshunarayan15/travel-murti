import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { heroData } from "./heroData";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[calc(100vh-250px)] md:h-[calc(100vh-80px)] bg-gray-800">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={30}
        slidesPerView={1}
        className="w-full h-full"
      >
        {heroData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center md:pt-24 pt-16">
                <div className="bg-black/50 p-6 sm:p-8 rounded-lg shadow-lg text-center w-full lg:max-w-4xl md:max-w-2xl max-w-64">
                  <h2 className="text-2xl sm:text-[28px] font-bold text-white">
                    {slide.title}
                  </h2>

                  <p className="mt-4 text-sm sm:text-base text-gray-200">
                    {slide.description}
                  </p>

                  <Link to={slide.link}>
                    <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                      Know More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const SubNavbar = () => {
  const phoneNumber = "+918527036496";
  const email = "contact.travelmurti@gmail.com";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-8 bg-gradient-to-r from-[#293c6b] to-[#1a399c] text-white">
      <div className="flex items-center gap-4 h-8 px-4 md:px-28 text-sm">
        <a href={`tel:${phoneNumber}`} className="flex items-center gap-1 hover:underline">
          <FaPhoneAlt className="hidden md:block" />
          <span>{phoneNumber.replace("+91", "")}</span>
        </a>
        <a href={`mailto:${email}`} className="flex items-center gap-1 hover:underline">
          <FaEnvelope />
          <span>{email}</span>
        </a>
      </div>
    </div>
  );
};

export default SubNavbar;
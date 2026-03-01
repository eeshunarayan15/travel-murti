import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-blue-400 mt-1" />,
      text:
        "Triangle Business Park, LG10, D-233, Sector 63, Noida, Uttar Pradesh, 201301, India",
    },
    {
      icon: <FaPhoneAlt className="text-blue-400 mt-1" />,
      text: "Mob: +91 8527036496",
      link: "tel:+918527036496",
    },
    {
      icon: <FaEnvelope className="text-blue-400 mt-1" />,
      text: "Email: contact.travelmurti@gmail.com",
      link: "mailto:contact.travelmurti@gmail.com",
    },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact" },
    { name: "Careers", path: "/we-are-hiring" },
  ];

  // ✅ NEW SERVICES ARRAY
  const services = [
    { name: "Spiritual Tours", path: "/spiritual-tours" },
    { name: "Holiday Tours", path: "/holiday-tours" },
    { name: "Honeymoon Tours", path: "/honeymoon-tours" },
    { name: "Weekend Tours", path: "/weekend-tours" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-conditions" },
    { name: "Cancellation & Refund Policy", path: "/cancellation-refund-policy" },
    { name: "Tour Booking T&C", path: "/tour-booking-t-c" },
  ];

  const socialMediaLinks = [
    {
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/share/1C5NKHqfon/",
    },
    { icon: <FaTwitter />, url: "https://twitter.com" },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/travelsmurti/profilecard/?igsh=dWRrNTFsYzlrOGht",
    },
    {
      icon: <FaLinkedinIn />,
      url: "https://www.linkedin.com/company/travelmurti/",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      <div className="max-w-screen-xl mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Quick Links */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
            <div className="h-1 w-10 bg-blue-500 rounded mb-4"></div>
            <ul className="space-y-2 text-slate-300">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-white transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Our Services */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-3">Our Services</h2>
            <div className="h-1 w-10 bg-blue-500 rounded mb-4"></div>
            <ul className="space-y-2 text-slate-300">
              {services.map((service) => (
                <li key={service.name}>
                  <Link to={service.path} className="hover:text-white transition">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-3">Legal</h2>
            <div className="h-1 w-10 bg-blue-500 rounded mb-4"></div>
            <ul className="space-y-2 text-slate-300">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-white transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
            <div className="h-1 w-10 bg-blue-500 rounded mb-4"></div>

            <ul className="space-y-3 text-slate-300">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  {item.icon}
                  {item.link ? (
                    <a href={item.link} className="hover:text-white transition">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 mt-6">
              {socialMediaLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-blue-500/30 border border-white/10 grid place-items-center transition"
                >
                  <span className="text-lg">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 my-6"></div>

        <div className="text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} Travel Murti. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
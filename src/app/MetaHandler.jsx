import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ROUTE_TITLES = {
  "/": "Travel Murti - Best Tour Packages in India",
  "/about": "About Us - Travel Murti",
  "/contact": "Contact Us - Travel Murti",
  "/weekend-tours": "Weekend Tours - Travel Murti",
  "/we-are-hiring": "We Are Hiring - Travel Murti",
  "/privacy-policy": "Privacy Policy - Travel Murti",
  "/terms-conditions": "Terms & Conditions - Travel Murti",
  "/cancellation-refund-policy": "Cancellation & Refund Policy - Travel Murti",
  "/tour-booking-t-c": "Tour Booking Terms - Travel Murti",
  "/admin/login": "Admin Login - Travel Murti",
};

const MetaHandler = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const title = ROUTE_TITLES[pathname] || "Travel Murti - Best Tour Packages in India";
    document.title = title;
  }, [pathname]);

  return null;
};

export default MetaHandler;

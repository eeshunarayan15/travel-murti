import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from "react-icons/fa";

function ContactUs() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white py-12 my-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-blue-600 font-semibold tracking-wide">
            Get in touch
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Contact Us
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            We’d love to hear from you!
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-lg shadow-blue-100/40 rounded-2xl p-6 flex flex-col items-center border border-slate-100">
            <div className="h-12 w-12 rounded-full bg-blue-50 grid place-items-center mb-3">
              <FaPhone className="text-blue-600 w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-800">Phone</h4>
            <p className="text-slate-600 text-center">+91-8527036496 <br /> +91-9319311405 </p>
          </div>

          <div className="bg-white shadow-lg shadow-blue-100/40 rounded-2xl p-6 flex flex-col items-center border border-slate-100">
            <div className="h-12 w-12 rounded-full bg-blue-50 grid place-items-center mb-3">
              <FaMapMarkerAlt className="text-blue-600 w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-800">Address</h4>
            <p className="text-slate-600 text-center">
              Triangle Business Park, LG10, D-233, Sector 63, Noida, Uttar Pradesh, 201301
            </p>
          </div>

          <div className="bg-white shadow-lg shadow-blue-100/40 rounded-2xl p-6 flex flex-col items-center border border-slate-100">
            <div className="h-12 w-12 rounded-full bg-blue-50 grid place-items-center mb-3">
              <FaClock className="text-blue-600 w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-800">Opening Time</h4>
            <p className="text-slate-600 text-center">09:00 am to 07:00 pm</p>
          </div>

          <div className="bg-white shadow-lg shadow-blue-100/40 rounded-2xl p-6 flex flex-col items-center border border-slate-100">
            <div className="h-12 w-12 rounded-full bg-blue-50 grid place-items-center mb-3">
              <FaEnvelope className="text-blue-600 w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-800">Email</h4>
            <p className="text-slate-600 text-center">
              info@travelmurti.com <br />
              contact.travelmurti@gmail.com
            </p>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-lg shadow-blue-100/40 border border-slate-100">
          <iframe
            title="Travel Murti Location Map"
            className="w-full h-96"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.17350923211!2d77.36161783123667!3d28.620968077565443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cefae57b52a77%3A0x783b7d3fffe9284a!2sTravel%20Murti!5e0!3m2!1sen!2sin!4v1771190782494!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;

// import { Link } from "react-router-dom";

// // ---------- CONSTANTS ----------
// const BANNER_IMAGE =
//   "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=500&auto=format&fit=crop&q=100&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzA2fHxob21lJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D";

// function AboutUs() {
//   return (
//     <div className="bg-gray-50 mb-20 mt-16">
//       {/* ---------- BANNER ---------- */}
//       <section
//         className="relative h-52 md:h-72 bg-cover bg-center flex items-center justify-center"
//         style={{ backgroundImage: `url('${BANNER_IMAGE}')` }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-30" />

//         <div className="relative z-10 text-center">
//           <h1 className="text-4xl md:text-6xl text-white font-extrabold tracking-wider drop-shadow-lg">
//             About Us
//           </h1>

//           <nav aria-label="Breadcrumb" className="mt-3">
//             <ol className="flex justify-center gap-2 text-white text-sm md:text-lg font-medium drop-shadow-md">
//               <li>
//                 <Link to="/">Home</Link>
//               </li>
//               <li aria-hidden="true">&gt;</li>
//               <li aria-current="page">About Us</li>
//             </ol>
//           </nav>
//         </div>
//       </section>

//       {/* ---------- MAIN CONTENT ---------- */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <header className="text-center">
//           <h2 className="text-3xl md:text-5xl font-bold text-gray-700 mb-6">
//             Welcome to Travel Murti
//           </h2>
//           <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
//             Travel Murti is your one-stop destination for all travel-related
//             services. Our expert planning ensures your journey is safe,
//             enjoyable, and unforgettable.
//           </p>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
//             <p className="text-gray-700 leading-relaxed text-lg">
//               We specialize in individual and group tours across India, making
//               us your go-to for all travel needs.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
//             <p className="text-gray-700 leading-relaxed text-lg">
//               Our commitment lies in providing economical options with
//               custom-tailored programs suited to your time and budget.
//             </p>
//           </div>
//         </div>

//         {/* ---------- STRENGTHS ---------- */}
//         <section className="mt-16">
//           <h3 className="text-3xl md:text-4xl font-bold text-gray-700 mb-8 text-center">
//             Our Strengths
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               {
//                 title: "Customer Relations",
//                 text:
//                   "We value long-term relationships and deliver personalized services.",
//               },
//               {
//                 title: "Destination Expertise",
//                 text:
//                   "Accurate destination knowledge with competitive pricing.",
//               },
//               {
//                 title: "Nationwide Reach",
//                 text:
//                   "On-the-ground support across India through our offices.",
//               },
//               {
//                 title: "Attention to Detail",
//                 text:
//                   "Every detail is handled to exceed expectations.",
//               },
//             ].map((item) => (
//               <div
//                 key={item.title}
//                 className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition text-center"
//               >
//                 <h4 className="text-xl font-semibold mb-4 text-indigo-600">
//                   {item.title}
//                 </h4>
//                 <p className="text-gray-700">{item.text}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ---------- COMMITMENT ---------- */}
//         <section className="mt-16">
//           <h3 className="text-3xl md:text-4xl font-bold text-gray-700 mb-8 text-center">
//             Our Commitment
//           </h3>

//           <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition max-w-4xl mx-auto text-center">
//             <p className="text-gray-700 text-lg leading-relaxed">
//               From planning to ground operations, Travel Murti ensures
//               stress-free and memorable journeys with exceptional customer
//               service.
//             </p>
//           </div>
//         </section>
//       </section>

//       {/* ---------- CTA ---------- */}
//       <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
//         <div className="max-w-4xl mx-auto text-center text-white">
//           <h3 className="text-3xl md:text-4xl font-bold mb-4">
//             Ready to Explore with Us?
//           </h3>
//           <p className="text-lg md:text-xl mb-6">
//             Let Travel Murti make your travel dreams come true.
//           </p>

//           <Link to="/contact">
//             <button className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-200 transition">
//               Contact Us Now
//             </button>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default AboutUs;
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Users,
  MapPin,
  Globe,
  Star,
  ArrowRight,
  Heart,
  Shield,
  Clock,
  Award,
} from "lucide-react";

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=1200&auto=format&fit=crop&q=100";

const strengths = [
  {
    icon: Users,
    title: "Customer Relations",
    text: "We value long-term relationships and deliver personalized services tailored to every traveler.",
    color: "blue",
  },
  {
    icon: MapPin,
    title: "Destination Expertise",
    text: "Accurate destination knowledge with competitive pricing across all major Indian destinations.",
    color: "green",
  },
  {
    icon: Globe,
    title: "Nationwide Reach",
    text: "On-the-ground support across India through our extensive network of offices and partners.",
    color: "purple",
  },
  {
    icon: Star,
    title: "Attention to Detail",
    text: "Every detail is meticulously handled to exceed your expectations and create lasting memories.",
    color: "orange",
  },
];

const stats = [
  { value: "10,000+", label: "Happy Travelers" },
  { value: "500+", label: "Tour Packages" },
  { value: "15+", label: "Years Experience" },
  { value: "4.9★", label: "Average Rating" },
];

const values = [
  {
    icon: Heart,
    title: "Passion",
    text: "We love travel and it shows in everything we do.",
  },
  {
    icon: Shield,
    title: "Trust",
    text: "Your safety and satisfaction are our top priorities.",
  },
  {
    icon: Clock,
    title: "Reliability",
    text: "On-time, every time — from booking to return.",
  },
  {
    icon: Award,
    title: "Excellence",
    text: "Award-winning service recognized across India.",
  },
];

const colorMap = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  green: "bg-green-50 text-green-600 border-green-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100",
};

function AboutUs() {
  return (
    <div className="bg-slate-50">
      {/* BANNER */}
      <section
        className="relative h-64 md:h-96 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url('${BANNER_IMAGE}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-10 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
            About Us
          </h1>
          <nav className="flex items-center gap-2 text-white/70 text-sm mt-3">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">About Us</span>
          </nav>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
              Our Story
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight mb-6">
              Welcome to <br />
              <span className="text-blue-600">Travel Murti</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Travel Murti is your one-stop destination for all travel-related
              services. Our expert planning ensures your journey is safe,
              enjoyable, and unforgettable.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              We specialize in individual and group tours across India,
              providing economical options with custom-tailored programs suited
              to your time and budget. From spiritual pilgrimages to honeymoon
              getaways, we make every trip extraordinary.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700
                text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-200 group"
            >
              Plan Your Trip
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Right — Stats */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm
                  hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                <p className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-1">
                  {value}
                </p>
                <p className="text-sm text-slate-500 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRENGTHS */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
              Why Choose Us
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800">
              Our Strengths
            </h3>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-8 h-[2px] bg-blue-500 rounded" />
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div className="w-8 h-[2px] bg-blue-500 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths.map(({ icon: Icon, title, text, color }) => (
              <div
                key={title}
                className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${colorMap[color]}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">
                  {title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
              What Drives Us
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800">
              Our Core Values
            </h3>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-8 h-[2px] bg-blue-500 rounded" />
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div className="w-8 h-[2px] bg-blue-500 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="text-center bg-white rounded-2xl p-8 border border-slate-200
                  shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">
                  {title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENT */}
      <section className="py-16 px-4 bg-white">
        <div
          className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-slate-50 rounded-3xl
          border border-blue-100 p-10 md:p-14 text-center shadow-sm"
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
            Our Promise
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            Our Commitment to You
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed">
            From planning to ground operations, Travel Murti ensures stress-free
            and memorable journeys with exceptional customer service at every
            step of the way.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 py-20 px-4 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore with Us?
          </h3>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Let Travel Murti make your travel dreams come true. Start planning
            your perfect journey today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl
                hover:bg-blue-50 transition-all shadow-lg group flex items-center gap-2"
            >
              Contact Us Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold
                rounded-xl border border-white/20 transition-all"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
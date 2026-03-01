// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { submitContact } from "../../services/contact.service";

// const INITIAL_STATE = {
//   name: "",
//   email: "",
//   mobile: "",
//   enquiry: "",
// };

// const ContactForm = () => {
//   const [user, setUser] = useState(INITIAL_STATE);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     if (!user.name || !user.email || !user.mobile || !user.enquiry) {
//       toast.error("All fields are required");
//       return false;
//     }

//     if (!/\S+@\S+\.\S+/.test(user.email)) {
//       toast.error("Invalid email format");
//       return false;
//     }

//     if (!/^\d{10}$/.test(user.mobile)) {
//       toast.error("Mobile number must be 10 digits");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);
//     try {
//       await submitContact(user);
//       toast.success("Your message has been sent successfully");
//       setUser(INITIAL_STATE);
//     } catch (err) {
//       toast.error(err.message || "Failed to send message");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 mb-12">
//       <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto border">
//         <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
//           Contact Form
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {["name", "email", "mobile"].map((field) => (
//             <input
//               key={field}
//               type={field === "email" ? "email" : "text"}
//               name={field}
//               placeholder={field.toUpperCase()}
//               value={user[field]}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           ))}

//           <textarea
//             name="enquiry"
//             rows="5"
//             placeholder="Message"
//             value={user.enquiry}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
//           >
//             {loading ? "Sending..." : "Send"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;
import { useState } from "react";
import { toast } from "react-hot-toast";
import { submitContact } from "../../services/contact.service";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  User,
  Smartphone,
  MessageSquare,
} from "lucide-react";

const INITIAL_STATE = { name: "", email: "", mobile: "", enquiry: "" };

const ContactForm = () => {
  const [user, setUser] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!user.name || !user.email || !user.mobile || !user.enquiry) {
      toast.error("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!/^\d{10}$/.test(user.mobile)) {
      toast.error("Mobile number must be 10 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await submitContact(user);
      toast.success("Message sent successfully!");
      setUser(INITIAL_STATE);
    } catch (err) {
      toast.error(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
      icon: User,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "john@example.com",
      icon: Mail,
    },
    {
      name: "mobile",
      label: "Mobile Number",
      type: "text",
      placeholder: "10-digit number",
      icon: Smartphone,
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Plan Your Perfect Journey
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-sm">
            Have questions about a tour? We're here to help you plan the trip of
            a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* LEFT — Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Info Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl shadow-blue-200">
              <h3 className="text-xl font-bold mb-2">Contact Information</h3>
              <p className="text-blue-200 text-sm mb-8">
                Reach out to us directly or fill the form and we'll get back to
                you within 24 hours.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 mb-0.5">Phone</p>
                    <p className="font-semibold">+91 8527036496</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 mb-0.5">Email</p>
                    <p className="font-semibold">
                      contact.travelmurti@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 mb-0.5">Office</p>
                    <p className="font-semibold leading-relaxed">
                      Triangle Business Park, Noida, Uttar Pradesh, 201301
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative circles */}
              <div className="relative mt-10 h-16">
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full -mb-4 -mr-4" />
                <div className="absolute bottom-4 right-8 w-12 h-12 bg-white/10 rounded-full" />
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Business Hours
              </h4>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
                  { day: "Saturday", time: "10:00 AM – 5:00 PM" },
                  { day: "Sunday", time: "Closed" },
                ].map(({ day, time }) => (
                  <div
                    key={day}
                    className="flex justify-between text-slate-600"
                  >
                    <span>{day}</span>
                    <span
                      className={`font-medium ${time === "Closed" ? "text-red-500" : "text-slate-800"}`}
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-1">
                Send us a Message
              </h3>
              <p className="text-sm text-slate-500 mb-8">
                We'll get back to you as soon as we can!
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {fields.map(
                  ({ name, label, type, placeholder, icon: Icon }) => (
                    <div key={name} className="space-y-1.5">
                      <Label className="text-sm font-medium text-slate-700">
                        {label}
                      </Label>
                      <div
                        className={`relative flex items-center rounded-xl border transition-all duration-200
                      ${
                        focused === name
                          ? "border-blue-500 ring-2 ring-blue-500/20 shadow-sm"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      >
                        <Icon className="w-4 h-4 text-slate-400 ml-4 shrink-0" />
                        <input
                          type={type}
                          name={name}
                          value={user[name]}
                          onChange={handleChange}
                          onFocus={() => setFocused(name)}
                          onBlur={() => setFocused(null)}
                          placeholder={placeholder}
                          required
                          className="flex-1 px-3 py-3 text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  ),
                )}

                {/* Message */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-slate-700">
                    Message
                  </Label>
                  <div
                    className={`relative rounded-xl border transition-all duration-200
                    ${
                      focused === "enquiry"
                        ? "border-blue-500 ring-2 ring-blue-500/20 shadow-sm"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-slate-400 absolute top-3.5 left-4" />
                    <textarea
                      name="enquiry"
                      value={user.enquiry}
                      onChange={handleChange}
                      onFocus={() => setFocused("enquiry")}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell us about your travel plans..."
                      rows={4}
                      required
                      className="w-full pl-11 pr-4 py-3 text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400 resize-none"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
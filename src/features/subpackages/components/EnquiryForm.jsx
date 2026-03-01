// import DOMPurify from "dompurify";
// import { toast } from "react-hot-toast";
// import { submitEnquiry } from "../../../services/subPackageApi";

// const EnquiryForm = () => {
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = Object.fromEntries(new FormData(e.target));
//     Object.keys(data).forEach(
//       (k) => (data[k] = DOMPurify.sanitize(data[k]))
//     );

//     if (+data.adults < 1) {
//       toast.error("At least one adult is required");
//       return;
//     }

//     try {
//       await submitEnquiry(data);
//       toast.success("Enquiry submitted successfully");
//       e.target.reset();
//     } catch {
//       toast.error("Failed to submit enquiry");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-3">
//       <input name="name" placeholder="Full Name" required />
//       <input name="email" type="email" placeholder="Email" required />
//       <input name="contactNo" placeholder="Contact No" required />
//       <input name="country" placeholder="Country" required />
//       <input name="adults" type="number" placeholder="Adults" required />
//       <input name="children" type="number" placeholder="Children" />
//       <input name="arrival" type="date" required />
//       <input name="departure" type="date" required />
//       <textarea name="travelRequirement" placeholder="Requirement" required />
//       <button className="w-full bg-green-500 text-white py-2 rounded">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default EnquiryForm;
import DOMPurify from "dompurify";
import { toast } from "react-hot-toast";
import { submitEnquiry } from "../../../services/subPackageApi";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

const EnquiryForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    Object.keys(data).forEach((k) => (data[k] = DOMPurify.sanitize(data[k])));
    if (+data.adults < 1) {
      toast.error("At least one adult is required");
      return;
    }
    setLoading(true);
    try {
      await submitEnquiry(data);
      toast.success("Enquiry submitted successfully!");
      e.target.reset();
    } catch {
      toast.error("Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs text-slate-600">Full Name *</Label>
        <Input
          name="name"
          placeholder="Enter your full name"
          required
          className="h-9 text-sm"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-xs text-slate-600">Email *</Label>
        <Input
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          className="h-9 text-sm"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-xs text-slate-600">Contact No *</Label>
        <Input
          name="contactNo"
          placeholder="+91 XXXXX XXXXX"
          required
          className="h-9 text-sm"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-xs text-slate-600">Country *</Label>
        <Input
          name="country"
          placeholder="India"
          required
          className="h-9 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs text-slate-600">Adults *</Label>
          <Input
            name="adults"
            type="number"
            placeholder="2"
            min="1"
            required
            className="h-9 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-slate-600">Children</Label>
          <Input
            name="children"
            type="number"
            placeholder="0"
            min="0"
            className="h-9 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs text-slate-600">Arrival *</Label>
          <Input name="arrival" type="date" required className="h-9 text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-slate-600">Departure *</Label>
          <Input
            name="departure"
            type="date"
            required
            className="h-9 text-sm"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-xs text-slate-600">Travel Requirement *</Label>
        <textarea
          name="travelRequirement"
          placeholder="Tell us about your travel plans..."
          required
          rows={3}
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        {loading ? "Submitting..." : "Submit Enquiry"}
      </Button>
    </form>
  );
};

export default EnquiryForm;
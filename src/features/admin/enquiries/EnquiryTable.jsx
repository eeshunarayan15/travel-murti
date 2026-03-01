import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getEnquiries, deleteEnquiry } from "../../services/enquiry.service";

const EnquiryTable = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        const res = await getEnquiries();
        if (Array.isArray(res.data)) {
          setEnquiries(res.data);
        }
      } catch (err) {
        toast.error("Failed to fetch enquiries");
      } finally {
        setLoading(false);
      }
    };

    loadEnquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) {
      return;
    }

    try {
      await deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      toast.success("Enquiry deleted successfully");
    } catch {
      toast.error("Failed to delete enquiry");
    }
  };

  if (loading) {
    return <p className="text-center text-slate-600">Loading enquiries...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-2xl border bg-white px-6 py-4 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Manage Enquiries</h2>
          <p className="text-sm text-slate-600">
            Review and remove customer enquiries
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden xl:block overflow-x-auto rounded-2xl border bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900 text-white">
              <tr>
                {[
                  "Name",
                  "Email",
                  "Contact",
                  "Country",
                  "Adults",
                  "Children",
                  "Arrival",
                  "Departure",
                  "Requirement",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-6 text-center">
                    No enquiries found
                  </td>
                </tr>
              ) : (
                enquiries.map((e) => (
                  <tr key={e._id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">{e.name}</td>
                    <td className="px-4 py-3">{e.email}</td>
                    <td className="px-4 py-3">{e.contactNo}</td>
                    <td className="px-4 py-3">{e.country}</td>
                    <td className="px-4 py-3">{e.adults}</td>
                    <td className="px-4 py-3">{e.children}</td>
                    <td className="px-4 py-3">
                      {new Date(e.arrival).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(e.departure).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{e.travelRequirement}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(e._id)}
                        className="rounded bg-red-500 px-3 py-1.5 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-4 xl:hidden">
          {enquiries.map((e) => (
            <div
              key={e._id}
              className="rounded-2xl border bg-white p-4 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{e.name}</h3>
                <button
                  onClick={() => handleDelete(e._id)}
                  className="rounded bg-red-500 px-3 py-1.5 text-white"
                >
                  Delete
                </button>
              </div>
              <div className="mt-2 text-sm space-y-1">
                <p>Email: {e.email}</p>
                <p>Contact: {e.contactNo}</p>
                <p>Country: {e.country}</p>
                <p>Adults: {e.adults}</p>
                <p>Children: {e.children}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnquiryTable;
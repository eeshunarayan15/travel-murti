import React, { useEffect, useState } from "react";
import { getEnquiries, deleteEnquiry } from "../../services/enquiry.service";
import { toast } from "react-hot-toast";
import { FiInbox, FiTrash2 } from "react-icons/fi";

const EnquiryPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEnquiries()
      .then((res) => setEnquiries(Array.isArray(res?.data) ? res.data : res?.data?.data ?? []))
      .catch(() => setEnquiries([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await deleteEnquiry(id);
      setEnquiries((e) => e.filter((x) => x._id !== id));
      toast.success("Enquiry deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-slate-600">Customer enquiries from the website contact and tour enquiry forms.</p>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Enquiries</h2>
          <p className="text-sm text-slate-500 mt-0.5">{enquiries.length} enquiry(ies)</p>
        </div>
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <FiInbox className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>No enquiries yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Message</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {enquiries.map((e) => (
                  <tr key={e._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{e.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{e.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{e.message || e.travelRequirement || "—"}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(e._id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        <FiTrash2 className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryPage;

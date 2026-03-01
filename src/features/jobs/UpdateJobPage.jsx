import React, { useEffect, useState } from "react";
import { getJobs, deleteJob } from "./jobs.service";
import JobForm from "./JobForm";
import { toast } from "react-hot-toast";
import { FiEdit2, FiTrash2, FiPlus, FiBriefcase } from "react-icons/fi";

const UpdateJobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchJobs = () => {
    setLoading(true);
    getJobs()
      .then(setJobs)
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this job posting?")) return;
    try {
      await deleteJob(id);
      setJobs((j) => j.filter((x) => x._id !== id));
      toast.success("Job removed");
    } catch {
      toast.error("Failed to remove job");
    }
  };

  const handleSuccess = () => {
    fetchJobs();
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-slate-600">Create and manage job postings for the careers page.</p>
        <button
          type="button"
          onClick={() => { setShowForm(true); setEditing(null); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          <FiPlus className="w-4 h-4" />
          New Job
        </button>
      </div>

      {(showForm || editing) && (
        <JobForm
          job={editing}
          onSuccess={handleSuccess}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Job Postings</h2>
          <p className="text-sm text-slate-500 mt-0.5">{jobs.length} posting(s)</p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading...</div>
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <FiBriefcase className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>No job postings yet. Click &quot;New Job&quot; to add one.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {jobs.map((job) => (
              <li key={job._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 hover:bg-slate-50">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-800 truncate">{job.title || job.designation}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {job.department && <span>{job.department}</span>}
                    {job.department && job.location && " · "}
                    {job.location}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => { setEditing(job); setShowForm(false); }}
                    className="inline-flex items-center gap-2 px-3 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 font-medium text-sm"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(job._id)}
                    className="inline-flex items-center gap-2 px-3 py-2 text-red-700 bg-red-50 rounded-lg hover:bg-red-100 font-medium text-sm"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UpdateJobPage;

import { useState, useEffect } from "react";
import { createJob, updateJob } from "./jobs.service";
import { toast } from "react-hot-toast";

const defaultForm = {
  title: "",
  designation: "",
  department: "",
  companyName: "Travel Murti",
  preferredIndustry: "",
  numberOfPositions: 1,
  location: "",
  experience: "",
  salary: "",
  jobObjective: "",
  skills: "",
  responsibilities: "",
  jobSpecifications: "",
  description: "",
  imageUrl: "",
};

const JobForm = ({ job, onSuccess, onCancel }) => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setForm({
        title: job.title || "",
        designation: job.designation || "",
        department: job.department || "",
        companyName: job.companyName || "Travel Murti",
        preferredIndustry: job.preferredIndustry || "",
        numberOfPositions: job.numberOfPositions ?? 1,
        location: job.location || "",
        experience: job.experience || "",
        salary: job.salary || "",
        jobObjective: job.jobObjective || "",
        skills: job.skills || "",
        responsibilities: job.responsibilities || "",
        jobSpecifications: job.jobSpecifications || "",
        description: job.description || "",
        imageUrl: job.imageUrl || "",
      });
    } else {
      setForm(defaultForm);
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "number" ? (value ? parseInt(value, 10) : 1) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title?.trim() || !form.location?.trim()) {
      toast.error("Title and Location are required");
      return;
    }
    setLoading(true);
    try {
      if (job) {
        await updateJob(job._id, form);
        toast.success("Job updated");
      } else {
        await createJob(form);
        toast.success("Job created");
      }
      onSuccess?.();
      if (!job) setForm(defaultForm);
    } catch (err) {
      toast.error(err?.message || "Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        {job ? "Edit Job Posting" : "New Job Posting"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Job Title *</label>
          <input name="title" value={form.title} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
          <input name="designation" value={form.designation} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
          <input name="department" value={form.department} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
          <input name="companyName" value={form.companyName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
          <input name="location" value={form.location} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Number of Positions</label>
          <input type="number" name="numberOfPositions" min={1} value={form.numberOfPositions} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
          <input name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 2-5 years" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Salary</label>
          <input name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. As per industry" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div className="space-y-4 mb-4">
        {["description", "jobObjective", "skills", "responsibilities", "jobSpecifications"].map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <textarea
              name={key}
              value={form[key]}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium">
          {loading ? "Saving..." : job ? "Update Job" : "Create Job"}
        </button>
        {job && (
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default JobForm;

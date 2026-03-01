import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import {
  FiBriefcase,
  FiMapPin,
  FiUsers,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import { getJobs } from "../features/jobs/jobs.service";

const WeAreHiring = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const list = await getJobs();
        setJobs(list);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyClick = (title = "Job Application") => {
    window.open(
      `mailto:contact.travelmurti@gmail.com?subject=${encodeURIComponent(
        `Application for ${title}`
      )}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-16 text-white">
          <div className="flex items-center gap-2 text-sm opacity-80">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <FaChevronRight size={12} />
            <span>We Are Hiring</span>
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold">
            Join the Travel Murti Team
          </h1>
          <p className="mt-3 text-lg text-slate-200 max-w-2xl">
            Build unforgettable journeys with us. Explore open roles and grow
            your career in travel, hospitality, and operations.
          </p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
              <div className="text-2xl font-bold">{jobs.length}</div>
              <div className="text-sm text-slate-200">Open Roles</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
              <div className="text-2xl font-bold">Pan India</div>
              <div className="text-sm text-slate-200">Locations</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
              <div className="text-2xl font-bold">Full‑time</div>
              <div className="text-sm text-slate-200">Opportunities</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
              <div className="text-2xl font-bold">Growth</div>
              <div className="text-sm text-slate-200">Career Path</div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            Open Positions
          </h2>
          <span className="text-sm text-slate-500">
            Updated regularly
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-2xl shadow-md border p-6"
              >
                <div className="h-5 w-1/2 bg-slate-200 rounded" />
                <div className="mt-3 h-4 w-1/3 bg-slate-200 rounded" />
                <div className="mt-6 h-20 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        ) : jobs.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800">
                      {job.title}
                    </h3>
                    <p className="text-slate-500">
                      {job.companyName} • {job.location}
                    </p>
                  </div>
                  <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    {job.department || "General"}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <FiBriefcase /> {job.designation || "Role"}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUsers /> {job.numberOfPositions} Positions
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock /> {job.experience || "Experience"}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiDollarSign /> {job.salary || "Salary"}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin /> {job.location || "Location"}
                  </div>
                </div>

                {job.description && (
                  <p className="mt-4 text-slate-600 line-clamp-3">
                    {job.description}
                  </p>
                )}

                <button
                  onClick={() => handleApplyClick(job.title)}
                  className="mt-6 w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md border p-10 text-center">
            <h3 className="text-xl font-semibold text-slate-800">
              No openings right now
            </h3>
            <p className="text-slate-500 mt-2">
              Check back soon or email your resume to
              {" "}
              <a
                className="text-blue-600 hover:underline"
                href="mailto:contact.travelmurti@gmail.com"
              >
                contact.travelmurti@gmail.com
              </a>
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default WeAreHiring;
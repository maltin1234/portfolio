"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/app/api/jobs"; // adjust path if needed!
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    job_type: "Full-time",
    description: "Build modern web interfaces using React and TypeScript.",
    responsibilities: "Develop UI components, maintain codebase, collaborate with backend.",
    requirements: "3+ years of React experience, strong TypeScript skills, teamwork.",
    candidates: [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        cvStatus: "Unread",
        cvLink: "/cv/alice-johnson.pdf",
      },
      {
        id: 2,
        name: "Bob Brown",
        email: "bob.brown@example.com",
        cvStatus: "Read",
        cvLink: "/cv/bob-brown.pdf",
      },
    ],
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataWorks",
    location: "New York, NY",
    job_type: "Part-time",
    description: "Develop scalable APIs and manage databases efficiently.",
    responsibilities: "Design APIs, optimize queries, ensure data security.",
    requirements: "Experience with Python/Django, PostgreSQL, REST APIs.",
    candidates: [
      {
        id: 3,
        name: "Clara Smith",
        email: "clara.smith@example.com",
        cvStatus: "Unread",
        cvLink: "/cv/clara-smith.pdf",
      },
    ],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "San Francisco, CA",
    job_type: "Contract",
    description: "Design user-friendly interfaces with a focus on accessibility.",
    responsibilities: "Create mockups, run usability tests, collaborate with devs.",
    requirements: "Portfolio of UI/UX work, Figma/Sketch experience, creativity.",
    candidates: [
      {
        id: 4,
        name: "David Green",
        email: "david.green@example.com",
        cvStatus: "Unread",
        cvLink: "/cv/david-green.pdf",
      },
    ],
  },
];

export default function JobBoard() {
  const { data: jobs = [], isLoading, error } = useQuery({
     queryKey: ['initial-jobs'],
     queryFn: () => getJobs(),
     staleTime: 5 * 1000,
  });

  const [selectedJob, setSelectedJob] = useState(null);
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [keywordFilter, setKeywordFilter] = useState("");

  const filteredJobs = jobs.filter(
    (job) =>
      (locationFilter === "" || job.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
      (typeFilter === "" || job.job_type === typeFilter) &&
      (keywordFilter === "" ||
        job.title.toLowerCase().includes(keywordFilter.toLowerCase()) ||
        job.description.toLowerCase().includes(keywordFilter.toLowerCase()))
  );

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  if (isLoading) return <div className="p-8">Loading jobs...</div>;
  if (error) return <div className="p-8 text-red-600">Failed to load jobs.</div>;

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar: Filters & Job List */}
      <div className="w-1/3 border-r border-gray-300 bg-white p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Filter Jobs</h2>

        <div className="mb-4 space-y-2">
          <input
            type="text"
            placeholder="Search keywords (e.g. frontend)"
            value={keywordFilter}
            onChange={(e) => setKeywordFilter(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Filter by location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <ul>
          {filteredJobs.map((job) => (
            <li
              key={job.id}
              onClick={() => handleSelectJob(job)}
              className={`p-4 cursor-pointer rounded hover:bg-blue-50 ${
                selectedJob?.id === job.id ? "bg-blue-100" : ""
              }`}
            >
              <h3 className="font-bold">{job.title}</h3>
              <p className="text-sm">{job.company}</p>
              <p className="text-xs text-gray-600">{job.location}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Job Details Panel */}
      <div className="w-2/3 p-6 bg-gray-50 overflow-y-auto">
        {selectedJob ? (
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-2">
              {selectedJob.title}
            </h2>
            <p className="text-md text-gray-700 mb-1">{selectedJob.company}</p>
            <p className="text-sm text-gray-500 mb-4">
              {selectedJob.location} · {selectedJob.job_type}
            </p>
            <h3 className="text-lg font-semibold mt-4">Description</h3>
            <p className="mb-4">{selectedJob.description}</p>
            <h3 className="text-lg font-semibold">Responsibilities</h3>
            <p className="mb-4">{selectedJob.responsibilities}</p>
            <h3 className="text-lg font-semibold">Requirements</h3>
            <p className="mb-6">{selectedJob.requirements}</p>

            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Apply Now
            </button>
          </div>
        ) : (
          <p className="text-gray-600">Select a job to see details.</p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation"; // FIXED

// Hardcoded job data
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Techify AB",
    location: "Stockholm, Sweden",
    datePosted: "April 18, 2025",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataNodes",
    location: "Malmö, Sweden",
    datePosted: "April 15, 2025",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Skyline Tech",
    location: "Remote",
    datePosted: "April 10, 2025",
  },
];

// Button component
function Button({ children, onClick, variant = "default" }) {
  const base = "px-6 py-3 rounded-lg font-semibold transition";
  const styles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant] || styles.default}`}>
      {children}
    </button>
  );
}

// Dashboard page component
export default function Dashboard() {
  const router = useRouter(); // <-- useRouter here

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 md:px-16">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Your Job Postings</h1>
        <Button onClick={() => router.push("/recruit/jobs/create")}>Post a Job</Button>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white hover:shadow-lg transition border border-gray-300 rounded-lg"
          >
            <div className="p-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-blue-800 hover:underline cursor-pointer">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-700">{job.company} – {job.location}</p>
                <p className="text-xs text-gray-500 mt-1">Posted on {job.datePosted}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push(`/recruit/jobs/job/${job.id}/candidates`)}
              >
                View Candidates
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

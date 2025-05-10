"use client";

import { useState } from "react";
import { useParams } from "next/navigation"; // FIXED
import { getUsers } from '@/app/api/users';



// Hardcoded data for jobs and candidates
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Techify AB",
    location: "Stockholm, Sweden",
    datePosted: "April 18, 2025",
    candidates: [
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        cvStatus: "Unread",
        cvLink: "/cv/johndoe.pdf",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "janesmith@example.com",
        cvStatus: "Read",
        cvLink: "/cv/janesmith.pdf",
      },
    ],
  },
  // You can add more jobs if needed
];

export default function CandidatesPage() {
  const { id } = useParams(); // <-- useParams instead of router.query
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const job = jobs.find((job) => job.id === parseInt(id));

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleMarkAsRead = (candidateId) => {
    if (!job) return;
    const updatedCandidates = job.candidates.map((candidate) =>
      candidate.id === candidateId
        ? { ...candidate, cvStatus: "Read" }
        : candidate
    );
    job.candidates = updatedCandidates;
    setSelectedCandidate(
      updatedCandidates.find((candidate) => candidate.id === candidateId)
    );
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Job not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 md:px-16">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Candidates for {job.title}</h1>
      </div>

      <div className="space-y-4 flex flex-col md:flex-row gap-6">
        {/* Left sidebar: List of candidates */}
        <div className="md:w-1/3 bg-white p-4 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Candidates</h2>
          {job.candidates.map((candidate) => (
            <div
              key={candidate.id}
              onClick={() => handleCandidateClick(candidate)}
              className="cursor-pointer hover:bg-gray-100 p-2 mb-2 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{candidate.name}</h3>
                <p className="text-sm text-gray-700">{candidate.email}</p>
              </div>
              <span
                className={`text-xs ${
                  candidate.cvStatus === "Read" ? "text-green-500" : "text-red-500"
                }`}
              >
                {candidate.cvStatus}
              </span>
            </div>
          ))}
        </div>

        {/* Right panel: Selected candidate's CV and details */}
        <div className="md:w-2/3 bg-white p-4 border border-gray-300 rounded-lg">
          {selectedCandidate ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">CV for {selectedCandidate.name}</h2>
              <p className="text-sm text-gray-700 mb-4">
                Email: {selectedCandidate.email}
              </p>
              <div className="mb-4">
                <a
                  href={selectedCandidate.cvLink}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  View CV
                </a>
              </div>
              <button
                onClick={() => handleMarkAsRead(selectedCandidate.id)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Mark as Read
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Select a candidate to view their details</p>
          )}
        </div>
      </div>
    </div>
  );
}

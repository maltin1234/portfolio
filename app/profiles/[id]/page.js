"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/app/api/profile";
import { useParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";

export default function ProfilePage() {
  const { id } = useParams();
  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id),
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <Loader2 className="animate-spin h-6 w-6" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <AlertCircle className="h-6 w-6 mr-2" />
        <span>Error loading profile.</span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col items-center p-8 bg-gradient-to-br from-blue-50 to-white">
          <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold uppercase">
            {profile.first_name.charAt(0)}
            {profile.last_name.charAt(0)}
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            {profile.first_name} {profile.last_name}
          </h1>
          <p className="text-gray-500 text-sm">@{profile.username}</p>
        </div>

        {/* Profile Details */}
        <div className="px-8 py-6 space-y-6 text-gray-700">
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Current Job</h2>
            <p className="text-lg">{profile.current_job}</p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h2 className="text-sm font-semibold text-gray-500">About</h2>
            <p className="whitespace-pre-line">{profile.username_description}</p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h2 className="text-sm font-semibold text-gray-500">Languages</h2>
            <p>{profile.languages}</p>
          </div>

          {profile.cv && (
            <>
              <hr className="border-gray-200" />
              <div>
                <h2 className="text-sm font-semibold text-gray-500">CV</h2>
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  View CV
                </a>
              </div>
            </>
          )}
        </div>

        {/* Projects Section */}
        <div className="mt-10 px-8 pb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Job Tracker",
                description: "A full-stack web app to track job applications and interviews.",
                link: "https://example.com/job-tracker",
              },
              {
                title: "Portfolio Website",
                description: "A personal website built using Next.js, Tailwind CSS, and React.",
                link: "https://example.com/portfolio",
              },
              {
                title: "API Explorer",
                description: "An interactive tool for visualizing and testing REST APIs.",
                link: "",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-blue-600 hover:underline"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

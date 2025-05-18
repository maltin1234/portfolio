"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/app/api/profile";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { id } = useParams();
  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id),
  });

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Error loading profile.</p>;

  return (
    
    <div className="min-h-screen max-w-3xl mx-auto px-6 py-10 bg-white shadow rounded-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
    
        {profile.first_name} {profile?.last_name}
      </h1>

      <p className="text-gray-600 text-sm mb-4">
        <strong>Current Job:</strong> {profile.current_job}
      </p>

      <p className="text-gray-700 whitespace-pre-line mb-6">
        {profile.username_description}
      </p>

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Languages</h2>
        <p className="text-gray-600">{profile.languages}</p>
      </div>

      {profile.cv && (
        <div className="mt-6">
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View CV
          </a>
        </div>
      )}
    </div>
  );
}

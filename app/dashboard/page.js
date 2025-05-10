"use client";
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react';

import { getUsers } from '@/app/api/users';

export default function Page() {
  const { data } = useQuery({
    queryKey: ['initial-users'],
    queryFn: () => getUsers(),
    staleTime: 5 * 1000,
  });

  // State for filter options
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [isEntryLevel, setIsEntryLevel] = useState(false);

  // Filtered data based on selected filters
  const filteredUsers = data?.filter((user) => {
    const locationMatch = selectedLocation ? user.location === selectedLocation : true;
    const rankMatch = selectedRank ? user.rank === selectedRank : true;
    const entryLevelMatch = isEntryLevel ? user.rank === 'Entry' : true;
    return locationMatch && rankMatch && entryLevelMatch;
  });

  // Get unique locations and ranks for dropdown options
  const locations = [...new Set(data?.map((user) => user.location) || [])];
  const ranks = ['Entry', 'Bronze', 'Silver', 'Gold']; // Adjust based on available ranks

  return (
    <div className="text-gray-900 min-h-screen py-10 bg-gray-100 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">User Leaderboard</h1>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4 justify-center">
          {/* Entry Level Filter */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isEntryLevel}
              onChange={(e) => setIsEntryLevel(e.target.checked)}
              className="h-5 w-5 text-blue-600"
            />
            <span>Entry Level</span>
          </div>

          {/* Location Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="location" className="text-sm">Location</label>
            <select
              id="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-gray-200 p-2 rounded"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Rank Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="rank" className="text-sm">Rank</label>
            <select
              id="rank"
              value={selectedRank}
              onChange={(e) => setSelectedRank(e.target.value)}
              className="bg-gray-200 p-2 rounded"
            >
              <option value="">All Ranks</option>
              {ranks.map((rank) => (
                <option key={rank} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* List View for users */}
        <section className="space-y-6">
          {filteredUsers?.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col lg:flex-row justify-between items-center"
            >
              {/* Left Side: Avatar and Basic Info */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <span className="text-gray-500 text-4xl">👤</span>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{user.username}</h2>
                <p className="text-sm text-gray-600 mt-2">{user.profession || "Professional"}</p>
                <p className="text-gray-700 text-center text-sm mt-2">
                  {user.description || "No description provided."}
                </p>
              </div>

              {/* Right Side: Detailed Info */}
              <div className="lg:flex-1 ml-4 mt-4 lg:mt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  {(user.technologies || ["React", "Node.js", "GraphQL", "Docker", "AWS"]).map((tech, index) => (
                    <span key={index} className="bg-gray-300 text-gray-800 text-xs px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h3 className="text-sm text-gray-800 font-semibold">
                    Average Rating:{" "}
                    <span className="text-[#d4af37]">
                      {user.ratings && user.ratings.length > 0
                        ? (user.ratings.reduce((sum, r) => sum + r.rating, 0) / user.ratings.length).toFixed(1)
                        : "N/A"}
                    </span>
                  </h3>
                  {user.ratings &&
                    user.ratings.slice(0, 3).map((rating, index) => (
                      <div key={index} className="text-xs text-gray-600 mt-1 flex justify-between">
                        <span>Feedback: {rating.feedback}</span>
                        <span className="text-[#d4af37]">Rating: {rating.rating}/5</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Links and View Button */}
              <div className="flex gap-4 mt-4 lg:mt-0">
                {user.linkedin_url && (
                  <a
                    href={user.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0077B5] hover:text-[#005983] transition duration-200"
                  >
                    LinkedIn
                  </a>
                )}
                {user.github_url && (
                  <a
                    href={user.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-300 transition duration-200"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

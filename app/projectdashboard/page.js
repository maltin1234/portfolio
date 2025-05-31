"use client";

import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getProjects } from "@/app/api/projects";

export default function Page() {
  const { data: projects, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["initial-projects"],
    queryFn: getProjects,
    staleTime: 5000,
  });

  const [filter, setFilter] = useState("Newest");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  const handleFilterChange = () => {
    const sorted = projects?.slice().sort((a, b) => {
      switch (filter) {
        case "Most Liked":
          return (b.likes || 0) - (a.likes || 0);
        case "Entry Level":
          return (a.level || "").localeCompare(b.level || "");
        case "Newest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
    setFilteredProjects(sorted);
  };

  async function handleRefresh() {
    const result = await refetch();
    if (result.data) {
      setFilteredProjects(result.data);
    }
  }

  return (
    <div className="min-h-screen py-12 bg-zinc-100 text-gray-900 flex flex-col items-center px-4 relative">
      {/* See More Projects button fixed bottom right */}
      <button
        onClick={handleRefresh}
        disabled={isFetching}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg flex items-center space-x-3 hover:bg-blue-700 transition z-50"
        aria-label="See More Projects"
        title="See More Projects"
      >
        {isFetching ? (
          <svg
            className="animate-spin h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m0 0A7.5 7.5 0 0119.5 12a7.5 7.5 0 01-7.5 7.5A7.49 7.49 0 015.42 14.5M19.5 19.5V14h-.582"
            />
          </svg>
        )}
        <span className="font-semibold select-none">See More Projects</span>
      </button>

      <motion.h1
        className="text-5xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h1>

      <div className="mb-10 flex justify-center items-center space-x-4">
        <select
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border-2 border-gray-600 focus:outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Newest">Newest</option>
          <option value="Most Liked">Most Liked</option>
          <option value="Entry Level">Entry Level</option>
        </select>

        <button
          onClick={handleFilterChange}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg border-2 border-blue-700 hover:bg-blue-700 transition"
        >
          Apply Filter
        </button>
      </div>

      {isLoading && <p className="text-gray-500 animate-pulse">Loading projects...</p>}
      {isError && <p className="text-red-500">Failed to load projects. Please try again.</p>}

      <div className="flex flex-col items-center w-full max-w-2xl space-y-6">
        {filteredProjects?.map((project) => (
          <motion.div
            key={project.id}
            className="w-full border border-gray-300 rounded-2xl bg-white/80 backdrop-blur-sm shadow-md p-4 transition-transform hover:scale-[1.01]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

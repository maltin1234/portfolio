"use client";

import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getProjects } from "@/app/api/projects";

export default function Page() {
  const { data: projects, isLoading, isError } = useQuery({
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

  return (
    <div className="min-h-screen py-12 bg-zinc-100 text-gray-900 flex flex-col items-center px-4">
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

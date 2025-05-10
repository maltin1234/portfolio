"use client";

import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { getMyProjects } from "@/app/api/projects";

export default function Page() {
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ["initial-projects"],
    queryFn: getMyProjects,
    staleTime: 5000,
  });

  return (
    <div className="min-h-screen py-16 bg-[#f9fafb] text-gray-900 flex flex-col items-center px-4">
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-center mb-10 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h1>

      {isLoading && (
        <p className="text-gray-500 animate-pulse">Loading your projects...</p>
      )}
      {isError && (
        <p className="text-red-600">Failed to load projects. Please try again.</p>
      )}

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects?.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`bg-white rounded-xl shadow-md p-6 border-2 hover:shadow-lg transition-shadow border-black-400
            `}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

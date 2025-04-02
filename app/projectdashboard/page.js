"use client";

import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/app/api/projects";

export default function Page() {
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ["initial-projects"],
    queryFn: getProjects,
    staleTime: 5000,
  });

  return (
    <div className="min-h-screen py-12 bg-gray-900 text-white flex flex-col items-center">
      <motion.h1
        className="text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h1>

      {isLoading && (
        <p className="text-gray-400 animate-pulse">Loading projects...</p>
      )}
      {isError && (
        <p className="text-red-500">Failed to load projects. Please try again.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 px-6">
        {projects?.map((project) => (
          <motion.div
            key={project.id}
            className="w-full md:w-[400px] lg:w-[450px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

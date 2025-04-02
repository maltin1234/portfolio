"use client";
import React from "react";
import Image from "next/image";

const ProjectCard = ({ project }) => {
  if (!project) return null; // Prevent rendering if no project data

  return ( 
    <div className="bg-gray-700 rounded-lg shadow-xl p-6 flex flex-col">
      {project.image && (
        <div className="relative w-full h-48">
          <Image
            src={project.image} // Use correct key from API response
            alt={project.title}
            layout="fill"
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <h2 className="text-xl font-semibold text-white mt-4">{project.title}</h2>
      <p className="text-gray-300 flex-grow overflow-y-auto mt-2 max-h-40">
        {project.project_description}
      </p>
      {/* Tags Section */}
      <div className="flex flex-wrap mt-4 gap-2">
        {project.tags?.map((tag, index) => (
          <span key={index} className="bg-blue-600 text-white text-sm py-1 px-3 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      {/* Links Section */}
      <div className="flex flex-wrap mt-4 gap-2">
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            GitHub
          </a>
        )}
        {project.link_url && (
          <a href={project.link_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            Website
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;

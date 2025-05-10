"use client";
import React from "react";
import Image from "next/image";

const ProjectCard = ({ project }) => {
  if (!project) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
      {project.image && (
        <div className="relative w-full h-56">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
          />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
        <p className="text-gray-600 text-sm max-h-36 overflow-y-auto whitespace-pre-line">
          {project.project_description}
        </p>

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4 mt-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
            >
              GitHub
            </a>
          )}
          {project.link_url && (
            <a
              href={project.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
            >
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

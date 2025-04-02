"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postProject } from "@/app/api/projects";

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    project_description: "",
    tags: "",
    link_url: "",
    github_url: "",
    completed: false,
  });

  const [imageFile, setImageFile] = useState(null); // Store image file separately

  const mutation = useMutation({ mutationFn: postProject });

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store selected file
  };

  const onCreateProject = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]); // Append text fields
    });

    if (imageFile) {
      data.append("image", imageFile); // Append file
    }

    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={onCreateProject}
      className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-white">Add New Project</h2>

      {/* Title Field */}
      <label className="block mb-4">
        <span className="text-white">Title</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
        />
      </label>

      {/* Description Field */}
      <label className="block mb-4">
        <span className="text-white">Description</span>
        <textarea
          name="project_description"
          value={formData.project_description}
          onChange={handleChange}
          placeholder="Project Description"
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
        />
      </label>

      {/* Image Upload Field */}
      <label className="block mb-4">
        <span className="text-white">Upload Image</span>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
        />
      </label>

      {/* Tags Field */}
      <label className="block mb-4">
        <span className="text-white">Tags</span>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g., JavaScript, React"
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
        />
      </label>

      {/* Link URL Field */}
      <label className="block mb-4">
        <span className="text-white">Link URL</span>
        <input
          type="text"
          name="link_url"
          value={formData.link_url}
          onChange={handleChange}
          placeholder="e.g., https://example.com"
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
        />
      </label>

      {/* GitHub URL Field */}
      <label className="block mb-4">
        <span className="text-white">GitHub URL</span>
        <input
          type="text"
          name="github_url"
          value={formData.github_url}
          onChange={handleChange}
          placeholder="e.g., https://github.com/example"
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
        />
      </label>

      {/* Completed Checkbox */}
      <label className="block mb-4">
        <span className="text-white">Completed</span>
        <input
          type="checkbox"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
          className="ml-2"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500"
      >
        Add Project
      </button>
    </form>
  );
};

export default AddProjectForm;

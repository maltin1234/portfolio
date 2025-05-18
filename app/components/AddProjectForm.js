"use client";

import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { postProject } from "@/app/api/projects"; // make sure this is correct
import { useRouter } from "next/navigation";

const AddProjectForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    project_description: "",
    tags: "",
    link_url: "",
    github_url: "",
    completed: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const mutation = useMutation({
    mutationFn: postProject,
    onSuccess: () => {
      router.push("/dashboard"); // Redirect to dashboard on success
    },
  });

  // Word count helper
  const getWordCount = (text) =>
    text.trim().split(/\s+/).filter(Boolean).length;

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.project_description.trim()) {
      newErrors.project_description = "Description is required";
    } else if (getWordCount(formData.project_description) > 600) {
      newErrors.project_description = "Description must not exceed 600 words";
    }
    if (!formData.tags.trim()) newErrors.tags = "Tags are required";
    if (!formData.link_url.trim()) newErrors.link_url = "Link URL is required";
    if (!formData.github_url.trim())
      newErrors.github_url = "GitHub URL is required";
    if (!imageFile) newErrors.image = "Image is required";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validate();
  }, [formData, imageFile]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files?.[0] || null);
  };

  const onCreateProject = (e) => {
    e.preventDefault();
    validate();

    if (!isFormValid) return;

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (imageFile) data.append("image", imageFile);

    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={onCreateProject}
      className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-white">Add New Project</h2>

      {/* TITLE */}
      <label className="block mb-4">
        <span className="text-white">Title</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
        />
        {errors.title && (
          <p className="text-red-400 text-sm">{errors.title}</p>
        )}
      </label>

      {/* DESCRIPTION */}
      <label className="block mb-4">
        <span className="text-white">Description</span>
        <textarea
          name="project_description"
          value={formData.project_description}
          onChange={handleChange}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
        />
        <p className="text-sm text-gray-300 mt-1">
          Word count: {getWordCount(formData.project_description)} / 600
        </p>
        {errors.project_description && (
          <p className="text-red-400 text-sm">{errors.project_description}</p>
        )}
      </label>

      {/* IMAGE */}
      <label className="block mb-4">
        <span className="text-white">Upload Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
        />
        {errors.image && (
          <p className="text-red-400 text-sm">{errors.image}</p>
        )}
      </label>

      {/* TAGS */}
      <label className="block mb-4">
        <span className="text-white">Tags</span>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
        />
        {errors.tags && <p className="text-red-400 text-sm">{errors.tags}</p>}
      </label>

      {/* LINK URL */}
      <label className="block mb-4">
        <span className="text-white">Link URL</span>
        <input
          type="text"
          name="link_url"
          value={formData.link_url}
          onChange={handleChange}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
        />
        {errors.link_url && (
          <p className="text-red-400 text-sm">{errors.link_url}</p>
        )}
      </label>

      {/* GITHUB URL */}
      <label className="block mb-4">
        <span className="text-white">GitHub URL</span>
        <input
          type="text"
          name="github_url"
          value={formData.github_url}
          onChange={handleChange}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
        />
        {errors.github_url && (
          <p className="text-red-400 text-sm">{errors.github_url}</p>
        )}
      </label>

      {/* COMPLETED */}
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

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full text-white p-2 rounded-md ${
          isFormValid
            ? "bg-blue-600 hover:bg-blue-500"
            : "bg-gray-600 cursor-not-allowed"
        }`}
      >
        Add Project
      </button>
    </form>
  );
};

export default AddProjectForm;

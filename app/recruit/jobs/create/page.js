"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postJob } from "@/app/api/jobs";

export default function CreateJobForm() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    company_name: "",
    location: "",
    country: "",
    description: "",
    responsibilities: "",
    requirements: "",
    job_type: "full_time", // Adjust based on valid backend choices
    contact_email: "",
  });

  const mutation = useMutation({
    mutationFn: async (newJob) => {
      const form = new FormData();
      for (const key in newJob) {
        form.append(key, newJob[key]);
      }
      return postJob(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["initial-jobs"] });
      setFormData({
        title: "",
        company: "",
        company_name: "",
        location: "",
        country: "",
        description: "",
        responsibilities: "",
        requirements: "",
        job_type: "",
        contact_email: "",
      });
      alert("Job posted successfully!");
    },
    onError: (error) => {
      console.error("Error creating job:", error);
      alert("Failed to post job.");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded text-black"
        />
        <input
          name="company"
          type="text"
          placeholder="Company (Display Name)"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded text-black"
        />
        <input
          name="company_name"
          type="text"
          placeholder="Company Legal Name"
          value={formData.company_name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded text-black"
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded text-black"
        />
        <input
          name="country"
          type="text"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded text-black"
        />
        <input
          name="contact_email"
          type="email"
          placeholder="Contact Email"
          value={formData.contact_email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded text-black"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded text-black"
        />
        <textarea
          name="responsibilities"
          placeholder="Responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        />
        <textarea
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        />
        <select
          name="job_type"
          value={formData.job_type}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        >
      
          <option value="full_time">Full-time</option>
          <option value="PT">Part-time</option>
          <option value="CT">Contract</option>
        </select>
        {console.log(formData.job_type)}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {mutation.isPending ? "Posting..." : "Post Job"}
        </button>
        {console.log(formData.job_type)}
      </form>
    </div>
  );
}

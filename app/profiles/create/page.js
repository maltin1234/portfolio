"use client";

import { useState } from "react";

export default function CreateProfileWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    current_job: "",
    username_description: "",
    languages: "",
    cv: "",
    projects: [],
  });

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const addProject = () => {
    if (newProject.title && newProject.description) {
      setFormData({
        ...formData,
        projects: [...formData.projects, newProject],
      });
      setNewProject({ title: "", description: "", link: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted profile:", formData);
    // TODO: POST to API
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Create Your Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1 */}
        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold">Step 1: Personal Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="first_name"
                placeholder="First Name"
                className="input"
                value={formData.first_name}
                onChange={handleChange}
              />
              <input
                name="last_name"
                placeholder="Last Name"
                className="input"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <input
              name="username"
              placeholder="Username"
              className="input w-full"
              value={formData.username}
              onChange={handleChange}
            />
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold">Step 2: Job and About</h2>
            <input
              name="current_job"
              placeholder="Current Job"
              className="input w-full"
              value={formData.current_job}
              onChange={handleChange}
            />
            <textarea
              name="username_description"
              placeholder="Describe yourself"
              rows={4}
              className="input w-full"
              value={formData.username_description}
              onChange={handleChange}
            />
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <h2 className="text-lg font-semibold">Step 3: Skills & CV</h2>
            <input
              name="languages"
              placeholder="Languages spoken"
              className="input w-full"
              value={formData.languages}
              onChange={handleChange}
            />
            <input
              name="cv"
              placeholder="CV link (URL)"
              className="input w-full"
              value={formData.cv}
              onChange={handleChange}
            />
          </>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <>
            <h2 className="text-lg font-semibold">Step 4: Add Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                name="title"
                placeholder="Title"
                className="input"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
              />
              <input
                name="description"
                placeholder="Description"
                className="input"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
              />
              <input
                name="link"
                placeholder="Link"
                className="input"
                value={newProject.link}
                onChange={(e) =>
                  setNewProject({ ...newProject, link: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              onClick={addProject}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Project
            </button>

            <ul className="mt-4 space-y-2">
              {formData.projects.map((proj, i) => (
                <li key={i} className="bg-gray-50 p-3 rounded border">
                  <strong>{proj.title}</strong>: {proj.description}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <>
            <h2 className="text-lg font-semibold">Step 5: Review & Submit</h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>Name:</strong> {formData.first_name}{" "}
                {formData.last_name}
              </p>
              <p>
                <strong>Username:</strong> {formData.username}
              </p>
              <p>
                <strong>Job:</strong> {formData.current_job}
              </p>
              <p>
                <strong>About:</strong> {formData.username_description}
              </p>
              <p>
                <strong>Languages:</strong> {formData.languages}
              </p>
              <p>
                <strong>CV:</strong> {formData.cv}
              </p>
              <p>
                <strong>Projects:</strong>{" "}
                {formData.projects.length === 0
                  ? "None"
                  : formData.projects.length}
              </p>
            </div>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Back
            </button>
          )}
          {step < 5 && (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          )}
          {step === 5 && (
            <button
              type="submit"
              className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

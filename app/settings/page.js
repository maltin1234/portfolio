"use client";

import { useState, useEffect } from "react";

// Mock data for the profile
const mockProfile = {
  first_name: "John",
  last_name: "Doe",
  username_description: "Software developer and enthusiast.",
  cv: null,
  languages: "English, Spanish",
  current_employment_status: "employed",
  current_job_title_or_unemployment_description: "Senior Developer",
};

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    username_description: "",
    cv: null,
    languages: "",
    current_employment_status: "employed",
    current_job_title_or_unemployment_description: "",
  });

  const [editing, setEditing] = useState(false); // Toggle between view and edit mode

  // Simulate fetching profile data (use mock data here)
  useEffect(() => {
    setProfile(mockProfile);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProfile({
      ...profile,
      cv: e.target.files[0], // Store the file object
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving the profile or sending to API
    console.log("Profile submitted:", profile);
    alert("Profile saved successfully!");
    setEditing(false); // Switch to view mode after saving
  };

  return (
    <div className="min-h-screen py-12 bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8">Profile Settings</h1>

      {/* Profile View Section */}
      {!editing ? (
        <div className="w-full max-w-3xl p-6 bg-gray-800 rounded-lg mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center">
              {/* Placeholder for Profile Image */}
              <span className="text-2xl text-white">JD</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{profile.first_name} {profile.last_name}</h2>
              <p className="text-sm text-gray-400">{profile.username_description}</p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {/* Personal Information */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-blue-400">Personal Information</h3>
              <p className="text-sm text-gray-400"><strong>Full Name:</strong> {profile.first_name} {profile.last_name}</p>
              <p className="text-sm text-gray-400"><strong>Username Description:</strong> {profile.username_description}</p>
            </div>

            {/* Employment Section */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-blue-400">Employment</h3>
              <p className="text-sm text-gray-400"><strong>Current Job Title:</strong> {profile.current_job_title_or_unemployment_description}</p>
              <p className="text-sm text-gray-400"><strong>Employment Status:</strong> {profile.current_employment_status}</p>
            </div>

            {/* Languages Section */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-blue-400">Languages</h3>
              <p className="text-sm text-gray-400"><strong>Languages Spoken:</strong> {profile.languages}</p>
            </div>

            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        // Profile Edit Form
        <form onSubmit={handleSubmit} className="w-full max-w-3xl p-6 bg-gray-800 rounded-lg">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-400">Personal Information</h3>
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={profile.first_name}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full bg-gray-700 text-white rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={profile.last_name}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full bg-gray-700 text-white rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">Username Description</label>
                <textarea
                  name="username_description"
                  value={profile.username_description}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full bg-gray-700 text-white rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-400">Employment</h3>
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">Current Job Title</label>
                <input
                  type="text"
                  name="current_job_title_or_unemployment_description"
                  value={profile.current_job_title_or_unemployment_description}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full bg-gray-700 text-white rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">Current Employment Status</label>
                <select
                  name="current_employment_status"
                  value={profile.current_employment_status}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full bg-gray-700 text-white rounded-md"
                >
                  <option value="employed">Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="student">Student</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="retired">Retired</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-400">Languages</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">Languages Spoken</label>
              <input
                type="text"
                name="languages"
                value={profile.languages}
                onChange={handleChange}
                placeholder="Comma separated (e.g. English, Spanish)"
                className="mt-2 p-2 w-full bg-gray-700 text-white rounded-md"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-400">Upload CV</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">Upload CV (Optional)</label>
              <input
                type="file"
                name="cv"
                onChange={handleFileChange}
                className="mt-2 p-2 w-full bg-gray-700 text-white rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}

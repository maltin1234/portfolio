import React from "react";
import { FaUser, FaLinkedin, FaGithub } from "react-icons/fa";

const DashCard = ({ user, onClick }) => {
  const getRankColor = (rank) => {
    switch (rank) {
      case "Gold":
        return "text-yellow-500";
      case "Silver":
        return "text-gray-400";
      case "Bronze":
        return "text-amber-500";
      default:
        return "text-gray-600";
    }
  };

  // Default hardcoded technologies
  const defaultTechnologies = ["React", "Node.js", "GraphQL", "Docker", "AWS"];

  // Calculate average rating
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return "N/A";
    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  return (
    <div
      className="p-6 mb-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-200"
      onClick={onClick}
    >
      {/* User Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <FaUser className="text-gray-400 text-3xl" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
            <p className="text-sm text-gray-500">{user.profession || "Professional"}</p>
          </div>
        </div>

        {/* Rank */}
        <div className={`text-lg ${getRankColor(user.rank)} font-semibold`}>
          {user.rank || "No rank"}
        </div>
      </div>

      {/* Technologies and Ratings */}
      <div className="flex justify-between mb-4">
        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2">
          {(user.technologies || defaultTechnologies).slice(0, 5).map((tech, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Average Rating */}
        <div className="text-sm text-gray-600 flex items-center">
          <span className="font-semibold">Avg. Rating:</span>
          <span className="ml-2 text-yellow-500">{calculateAverageRating(user.ratings)}</span>
        </div>
      </div>

      {/* Individual Ratings */}
      {user.ratings && user.ratings.length > 0 && (
        <div className="text-sm text-gray-600">
          <h3 className="font-semibold">Ratings:</h3>
          {user.ratings.slice(0, 3).map((rating, index) => (
            <div key={index} className="flex justify-between text-xs mt-1">
              <span>Feedback: {rating.feedback}</span>
              <span className="text-yellow-500">Rating: {rating.rating}/5</span>
            </div>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex space-x-4 mt-4">
        {user.linkedin_url && (
          <a
            href={user.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500 transition duration-200"
          >
            <FaLinkedin size={20} />
          </a>
        )}
        {user.github_url && (
          <a
            href={user.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-500 transition duration-200"
          >
            <FaGithub size={20} />
          </a>
        )}
      </div>

      {/* View Portfolio Button */}
      <div className="mt-6 text-center">
        <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 transition duration-200">
          View Portfolio
        </button>
      </div>
    </div>
  );
};

export default DashCard;

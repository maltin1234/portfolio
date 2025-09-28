"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavBar() {
 
  const pathname = usePathname();
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { data: session } = useSession();

  const handleContactClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const toggleProjectsDropdown = () => {
    setProjectsDropdownOpen(!projectsDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <header className="sticky top-0 z-10 flex items-left justify-between px-6 py-4 bg-gray-900 text-white shadow-md">

      {/* Logo with "Jobs and Portfolios" */}
      <Link href="/projectdashboard">
        <div className="flex items-center gap-2 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-8 h-8"
          >
            <path d="M3 9.915V22h7v-7h4v7h7V9.915L12 3 3 9.915zM12 1l10 8.5V23h-9v-7h-2v7H2V9.5L12 1z" />
          </svg>
          <span className="text-2xl font-semibold tracking-wide">Jobs & Portfolios</span>
        </div>
      </Link>

      {/* Search Field */}
      <div className="relative mx-5 flex grow">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 px-4 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ minWidth: '200px', maxWidth: '400px' }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-8 font-medium">
        {/* Ranked Link */}
        <Link href="/dashboard">
          <div className="relative py-2 px-4 border border-gray-700 rounded-md hover:bg-white hover:text-black transition duration-300">
            Ranked
          </div>
        </Link>

        {/* My Projects Link */}
         {session && (
        <Link href="/my-projects">
          <div className="relative py-2 px-4 border border-gray-700 rounded-md hover:bg-white hover:text-black transition duration-300">
            My projects
          </div>
        </Link>
)}
        {/* Jobs Link */}
        <Link href="/jobdashboard">
          <div className="relative py-2 px-4 border border-gray-700 rounded-md hover:bg-white hover:text-black transition duration-300">
            Jobs
          </div>
        </Link>

        {/* Create Button — only visible if signed in */}
      {session && (
        <Link href="/add-project">
          <button className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300">
            Create
          </button>
        </Link>
         )}

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 py-2 px-4 border border-gray-700 rounded-md hover:bg-white hover:text-black transition duration-300"
            onClick={toggleProfileDropdown}
          >
            <img
              src="/profile.jpg"
              alt="User Profile"
              className="w-8 h-8 rounded-full border border-white"
            />
            <span>Profile</span>
          </button>
          {profileDropdownOpen && (
            <div
              className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10"
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <Link href="/profile">
                <div className="p-3 hover:bg-gray-700 hover:text-white transition duration-300">
                  View Profile
                </div>
              </Link>
              <Link href="/settings">
                <div className="p-3 hover:bg-gray-700 hover:text-white transition duration-300">
                  Settings
                </div>
              </Link>
              <Link href="/my-projects">
                <div className="p-3 hover:bg-gray-700 hover:text-white transition duration-300">
                  My projects
                </div>
              </Link>
              <Link href="/recruit/jobs">
                <div className="p-3 hover:bg-gray-700 hover:text-white transition duration-300">
                  Recruiter
                </div>
              </Link>
              <Link href="/">
                <button
                  onClick={() => signOut()}
                  className="w-full text-left p-3 hover:bg-gray-700 hover:text-white transition duration-300"
                >
                  Logout
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

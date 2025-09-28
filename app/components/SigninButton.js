"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SigninButton() {
  const { data: session } = useSession();
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    if (session && isGuest) {
      setIsGuest(false);
    }
  }, [session, isGuest]);

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">
            Welcome, {session.user?.name}!
          </h2>
          <p className="text-gray-600 mb-4">
            You're signed in with GitHub.
          </p>
          <p className="text-gray-700 mb-6">
            Start by setting up your project portfolio to showcase your work.
          </p>
          <Link
            href="/profiles/create"
            className="inline-block w-full mb-4 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Set Up Portfolio
          </Link>
          <Link
            href="/projectdashboard"
            className="block mb-6 text-blue-600 underline hover:text-blue-800"
          >
            View All Portfolios
          </Link>
          <button
            onClick={() => signOut()}
            className="w-full py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  if (isGuest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Browsing as Guest</h2>
          <p className="text-gray-700 mb-4">
            You can explore the platform, but signing in unlocks full features like saving projects and personalized content.
          </p>
          <Link
            href="/portfolio"
            className="block mb-6 text-blue-600 underline hover:text-blue-800"
          >
            View Portfolios
          </Link>
          <button
            onClick={() => setIsGuest(false)}
            className="text-blue-600 underline font-medium hover:text-blue-800 focus:outline-none"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">Sign in to Your Account</h1>
        <p className="text-gray-700 mb-8">
          Signing in allows you to save projects, like favorites, and access personalized content.
        </p>
        <button
          onClick={() => signIn("github")}
          aria-label="Sign in with GitHub"
          className="flex items-center justify-center w-full py-3 mb-6 bg-[#24292f] hover:bg-[#1b1f23] text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
        >
          <svg
            className="w-6 h-6 mr-2 fill-white"
            viewBox="0 0 24 24"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.423 17.07 3.633 16.7 3.633 16.7c-1.087-.743.083-.728.083-.728 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.304.76-1.605-2.665-.3-5.466-1.335-5.466-5.933 0-1.31.47-2.382 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.403c1.02.004 2.045.137 3.003.403 2.29-1.553 3.295-1.23 3.295-1.23.653 1.653.243 2.873.12 3.176.77.838 1.23 1.91 1.23 3.22 0 4.61-2.805 5.63-5.475 5.924.43.37.81 1.096.81 2.21 0 1.595-.015 2.88-.015 3.273 0 .32.19.694.8.575C20.565 21.795 24 17.295 24 12c0-6.63-5.373-12-12-12z" />
          </svg>
          Sign in with GitHub
        </button>
        <button
          onClick={() => setIsGuest(true)}
          className="text-sm text-blue-600 hover:underline focus:outline-none"
          aria-label="Continue as guest"
        >
          Continue as guest
        </button>
      </div>
    </div>
  );
}

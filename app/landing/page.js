"use client";

export default function Landing() {
  return (
    <div className="text-gray-900">
      {/* Header Section with a Simple Background Color */}
      <header className="bg-blue-600 text-white py-32 text-center">
        <h1 className="text-5xl font-bold">Your Digital Career Journey</h1>
        <p className="mt-4 text-xl">Showcase your projects, find jobs that fit you, and gain inspiration from others.</p>
        <a
          href="#get-started"
          className="mt-6 inline-block bg-white text-blue-600 py-2 px-6 rounded-lg hover:bg-gray-200 transition"
        >
          Get Started
        </a>
      </header>

      {/* What We Offer Section */}
      <section className="py-20 text-center bg-gray-100" id="what-we-offer">
        <h2 className="text-3xl font-semibold">What We Offer</h2>
        <p className="mt-4 text-xl text-gray-700">
          We’re more than just a job search platform. Our mission is to help you build and grow your career in the digital and IT world.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold">Showcase Your Projects</h3>
            <p className="mt-4 text-gray-600">
              Build your portfolio by creating and displaying your digital projects. Let your work speak for itself!
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold">Get Inspiration</h3>
            <p className="mt-4 text-gray-600">
              Browse through projects from others, get inspired, and push your own creativity further.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold">Find Jobs That Fit You</h3>
            <p className="mt-4 text-gray-600">
              We connect you with job opportunities that match your skills and interests in the IT and digital space.
            </p>
          </div>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="py-20 text-center bg-white">
        <h2 className="text-3xl font-semibold text-gray-900">Your Journey, Not Just a Job Search</h2>
        <p className="mt-4 text-xl text-gray-700">
          Our platform is designed to guide you through your entire career journey. It's not just about finding a job, it's about growth, learning, and making meaningful connections.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold">Competitions</h3>
            <p className="mt-4 text-gray-200">
              Participate in coding competitions and prove your skills to potential employers.
            </p>
          </div>
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold">Workshops</h3>
            <p className="mt-4 text-gray-200">
              Join workshops to learn new skills and stay updated with industry trends.
            </p>
          </div>
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold">IT Guidance</h3>
            <p className="mt-4 text-gray-200">
              Get personalized guidance to help you achieve your career goals in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-20 bg-gray-800 text-white text-center" id="get-started">
        <h2 className="text-3xl font-semibold">Start Your Journey Today</h2>
        <p className="mt-4 text-xl">
          Create an account, showcase your projects, and begin your journey in the digital and IT market today.
        </p>
        <a
          href="/signup"
          className="mt-6 inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Join Now
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2025 Your Digital Career Journey. All rights reserved.</p>
      </footer>
    </div>
  );
}

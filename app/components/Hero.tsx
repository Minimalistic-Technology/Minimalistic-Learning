"use client";

import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="h-[90vh] flex items-center justify-center px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

{/* Left Section */}
<div className="order-2 md:order-1">
  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
    Yours Learning <span className="text-blue-600">Journey</span> Starts with
    <br />
    <span className="text-blue-600">Here</span>
  </h1>
  <p className="text-gray-700 text-lg md:text-xl mb-6">
    Explore diverse courses, connect with top instructors, and achieve
    your dreams
  </p>

  {/* Slim Search Bar */}
  <div className="flex items-center w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
    <span className="text-gray-400 pl-3 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1114.5 3a7.5 7.5 0 012.15 14.65z"
        />
      </svg>
    </span>
    <input
      type="text"
      placeholder="Browse Courses"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full px-2 py-2 text-sm text-gray-700 focus:outline-none my-2"
    />
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-xl font-semibold transition duration-300 w-2/6 p-4"
    >
      Start Learning
    </button>
  </div>
</div>

{/* Right Section: Image */}
<div className="order-1 md:order-2 flex justify-center md:justify-end">
<div className="relative w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
  <Image
    src="/images/herostudent.png" // Corrected image path
    alt="Learning Illustration"
    width={2000} // Adjust width and height proportionally to the container
    height={2000}
    priority
    className="object-contain"
  />
</div>


</div>

      </div>
    </section>
  );
};

export default Hero;
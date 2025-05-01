import Image from 'next/image';
import React from 'react'

const SearchBarCourse = () => {
  return (
<div className="bg-[#daf0ff]">
      {/* User Info */}
      <div className="flex justify-end items-center p-10 gap-4 bg-[#daf0ff]">
        <span className="text-gray-600 text-lg">John Doe</span>
        <img
          src="https://cdn4.vectorstock.com/i/1000x1000/18/58/color-silhouette-cartoon-half-body-faceless-man-vector-15091858.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-4">
        {/* Welcome Section */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">
            Learn Anytime,Anywhere 
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Learn, Grow, Succeed—Your Next Skill Starts Here.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center items-center gap-4 mb-10">
      <input
        type="text"
        placeholder="Search Courses"
        className="w-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="px-6 py-3 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
        Filter by ▼
      </button>
    </div>
    </main>
    </div>
        );
      }


      
export default SearchBarCourse
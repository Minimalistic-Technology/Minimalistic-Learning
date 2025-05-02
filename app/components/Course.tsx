"use client";

import React, { useState } from "react";
import { categories, courses } from "@/app/data/courseData";
import Link from "next/link";

const slugify = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, '-');

const Course = () => {
  const [activeCategory, setActiveCategory] = useState("All Blog's"); //"All Courses");

  const filteredCourses = activeCategory === "All Blog's" //"All Courses"
    ? courses
    : courses.filter(course => course.category === activeCategory);

  return (
    <div className="bg-[#daf0ff] px-4 sm:px-6 md:px-10 lg:px-20 py-8">
      <p className="text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {/* Explore Course */}
        Explore Blog's
      </p>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 mb-6">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${
              activeCategory === category
                ? "text-blue-600 bg-white border border-blue-600"
                : "text-gray-600 hover:text-blue-600 hover:bg-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition hover:shadow-lg"
            >
              <img
                src={course.img}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-800">{course.title}</h3>
                <p className="text-gray-600 text-sm mt-2 flex-grow">{course.description}</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={i < course.rating ? "text-yellow-500" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                  </div>

                  {/* <Link href={`/coursesdetails/${slugify(course._id)}`}> */}
                  <Link href="/blog">
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">
                      {/* Browse Certification */}
                      Browse Blog's
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No courses available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Course;

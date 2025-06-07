"use client";

import React, { useState } from "react";
import { categories, courses } from "@/app/data/courseData";
import Link from "next/link";

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");

const Course = () => {
  const [activeCategory, setActiveCategory] = useState("All Blog's"); //"All Courses");

  const filteredCourses =
    activeCategory === "All Blog's" //"All Courses"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  return (
    <div className="bg-[#daf0ff] px-4 sm:px-6 md:px-10 lg:px-20 py-8">
      <p className="text-3xl sm:text-4xl font-bold text-center pb-6 bg-black bg-clip-text text-transparent">
        {/* Explore Course */}
        Explore Blogs
      </p>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 mb-6">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${
              activeCategory === category
                ? "relative overflow-hidden px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                : "text-gray-600 hover:text-blue-600 hover:bg-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="flex flex-wrap justify-center items-center gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div
              key={index}
              className="w-[300px] h-[420px] sm:w-[320px] sm:h-[440px] md:w-[350px] md:h-[420px] bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition hover:shadow-lg"
            >
              <img
                src={course.img}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-800">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 flex-grow">
                  {course.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={
                          i < course.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <Link href="/blog">
                    <button className="relative overflow-hidden px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                      <span className="relative z-10">Browse Blog's</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No courses available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Course;

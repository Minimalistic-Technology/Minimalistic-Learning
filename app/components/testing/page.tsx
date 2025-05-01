'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { courses as staticCourses } from "@/app/data/courseData";

type Course = {
  _id?: string;
  title: string;
  description: string;
  price?: number;
  img?: string;
  createdAt?: string;
};

const HomePage = () => {
  const [apiCourses, setApiCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/courses');
        setApiCourses(response.data);
      } catch (err) {
        setError('Failed to fetch API courses.');
      }
    };

    fetchCourses();
  }, []);

  const combinedCourses = [...staticCourses, ...apiCourses];

  return (
    <div className="p-8">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {combinedCourses.map((course, index) => (
          <div key={course._id || course._id || index} className="border rounded-lg shadow-md p-6 bg-white">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-700 mb-2">{course.description}</p>
            {course.price && <p className="text-green-600 font-bold">₹ {course.price}</p>}
            {course.createdAt && (
              <p className="text-sm text-gray-400 mt-2">Created At: {new Date(course.createdAt).toLocaleDateString()}</p>
            )}
            {course.img && (
              <img src={course.img} alt={course.title} className="mt-2 w-full h-40 object-cover rounded-md" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

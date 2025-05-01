"use client";

import Image from "next/image";
import React, { useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const courses = {
  Mathematics: ["Algebra", "Calculus", "Geometry", "Trigonometry"],
  "Digital Marketing": [
    "SEO",
    "Social Media Marketing",
    "Content Marketing",
    "PPC",
  ],
  Programming: ["JavaScript", "Python", "Java", "C++"],
};

// Function to get the number of days in a month
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const TutorProfile: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear] = useState<number>(new Date().getFullYear());
  const [classType, setClassType] = useState<string>("physical"); // Default to physical class
  const [address, setAddress] = useState<string>("");
  const [onlinePlatform, setOnlinePlatform] = useState<string | null>(null);
  const [time, setTime] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<keyof typeof courses | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [additionalDetails, setAdditionalDetails] = useState<string>("");
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const handleDateSelect = (date: number) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
    setSelectedDate(null);
  };

  const handleBooking = () => {
    if (
      !selectedDate ||
      !time ||
      !selectedCourse ||
      !selectedTopic ||
      (classType === "physical" && !address) ||
      (classType === "online" && !onlinePlatform)
    ) {
      alert("Please fill in all fields to complete the booking.");
      return;
    }

    const bookingInfo = {
      date: `${months[selectedMonth]} ${selectedDate}, ${selectedYear}`,
      time,
      course: selectedCourse,
      topic: selectedTopic,
      additionalDetails,
      ...(classType === "physical"
        ? { location: address }
        : { platform: onlinePlatform }),
    };

    setBookingDetails(bookingInfo);
    alert("Your booking has been successfully submitted!");
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Tutor Profile
        </h1>
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Left Section - Tutor Info */}
          <div className="lg:w-2/3">
            <div className="flex items-center space-x-4 mb-6">
              <Image
                src="https://via.placeholder.com/150"
                alt="Tutor Profile"
                className="w-20 h-20 rounded-full shadow"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
                <p className="text-sm text-gray-500">Price: £12-£20/hour</p>
                <p className="text-yellow-500">★★★★★</p>
              </div>
            </div>
            <p className="text-gray-700 font-medium mb-4">
              Expertise:{" "}
              <span className="font-normal">Digital Marketing and Mathematics</span>
            </p>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-bold text-gray-900 mb-2">About Tutor</h3>
              <p className="text-gray-600 mb-2">
                Experienced tutor with expertise in Digital Marketing and Mathematics, dedicated to simplifying complex concepts for learners.
              </p>
              <p className="text-gray-600">
                With 5+ years in SEO, social media management, and digital
                advertising, and 7+ years teaching math from basic arithmetic to
                advanced calculus, they’ve successfully trained over 200
                students and helped countless others achieve their academic and
                professional goals.
              </p>
            </div>
          </div>

          {/* Right Section - Booking Form */}
          <div className="lg:w-1/3 space-y-6">
            {/* Calendar */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Select Date</h3>
              <div className="mb-4">
                <label
                  htmlFor="month"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Month
                </label>
                <select
                  id="month"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-blue-50"
                >
                  {months.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                <div className="grid grid-cols-7 gap-2 text-center">
                  {Array.from({ length: daysInMonth }, (_, i) => (
                    <div
                      key={i}
                      onClick={() => handleDateSelect(i + 1)}
                      className={`py-2 rounded-lg cursor-pointer ${
                        selectedDate === i + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-600 hover:bg-blue-200"
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              {selectedDate && (
                <p className="mt-4 text-green-600">
                  Selected Date: {months[selectedMonth]} {selectedDate},{" "}
                  {selectedYear}
                </p>
              )}
            </div>

            {/* Class Type */}
            <div>
              <label
                htmlFor="classType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Class Type
              </label>
              <select
                id="classType"
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-blue-50"
              >
                <option value="physical">Physical Class</option>
                <option value="online">Online Class</option>
              </select>
            </div>

            {/* Location or Online Platform */}
            {classType === "physical" && (
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Physical Class Location (Address)
                </label>
                <input
                  id="location"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter physical location"
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-blue-50"
                />
              </div>
            )}
            {classType === "online" && (
              <div>
                <label
                  htmlFor="onlinePlatform"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Online Platform
                </label>
                <select
                  id="onlinePlatform"
                  value={onlinePlatform || ""}
                  onChange={(e) => setOnlinePlatform(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-blue-50"
                >
                  <option value="" disabled>
                    Select a platform
                  </option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="Zoom">Zoom</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                </select>
              </div>
            )}

            {/* Time Input */}
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Time
              </label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-blue-50"
              />
            </div>

            {/* Course Dropdown */}
            <div>
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Course
              </label>
              <select
                id="course"
                value={selectedCourse || ""}
                onChange={(e) => {
                  setSelectedCourse(e.target.value as keyof typeof courses);
                  setSelectedTopic(null); // Reset topic when course changes
                }}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-blue-50"
              >
                <option value="" disabled>
                  Choose a course
                </option>
                {Object.keys(courses).map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            {/* Topic Dropdown */}
            {selectedCourse && (
              <div>
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Topic
                </label>
                <select
                  id="topic"
                  value={selectedTopic || ""}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-blue-50"
                >
                  <option value="" disabled>
                    Choose a topic
                  </option>
                  {courses[selectedCourse]?.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Additional Details */}
            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Additional Details
              </label>
              <textarea
                id="details"
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                placeholder="Provide any additional details"
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-blue-50"
              ></textarea>
            </div>

            {/* Booking Button */}
            <button
              onClick={handleBooking}
              className="w-full px-4 py-2 bg-blue-600 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-700"
            >
              Submit Booking
            </button>
          </div>
        </div>

        {/* Booking Details */}
        {bookingDetails && (
          <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Booking Details
            </h3>
            <p>Date: {bookingDetails.date}</p>
            <p>Time: {bookingDetails.time}</p>
            <p>Course: {bookingDetails.course}</p>
            <p>Topic: {bookingDetails.topic}</p>
            {classType === "physical" && <p>Location: {bookingDetails.location}</p>}
            {classType === "online" && <p>Platform: {bookingDetails.platform}</p>}
            <p>Additional Details: {bookingDetails.additionalDetails}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorProfile;

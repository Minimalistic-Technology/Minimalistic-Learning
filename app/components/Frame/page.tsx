'use client'; /* Made by Sandip B. */

import React from "react";
import Footer from "../Footer";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const LearningDashboard: React.FC = () => {
  return (
    <div className="bg-[#daf0ff] min-h-screen relative overflow-hidden">

      {/* Header Section */}
      <header className="px-28 py-4">
        <p className="text-blue-600">Your Learning Journey Continues, John</p>
      </header>

      {/* Your Learning Path */}
      <section className="px-14 py-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 text-center">
            <h2 className="text-4xl py-8 font-semibold text-blue-600">Your Learning Path</h2>
        </div>
        <a href="#" className="text-gray-500 hover:underline mt-20">Edit Selection</a>
      </div>
        
        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {[
            {
              title: "Digital Marketing",
              desc: "Essential strategies for modern marketing.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              img: "https://etimg.etb2bimg.com/photo/89866384.cms",
            },
            {
              title: "Social Media Management",
              desc: "Grow and manage social platforms effectively.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              img: "https://okcredit-blog-images-prod.storage.googleapis.com/2020/12/shutterstock_338604821.jpg",
            },
            {
              title: "Health",
              desc: "Improve your Health ranking with us.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI-MUJejb9GvGSx0Mwgk0WYCQhLh0INpyrm3EqEYUX2jLNnBhz5BljGOs9OR2_KBDPNvE&usqp=CAU",
            },
          ].map((course, index) => (
            <div key={index} className="bg-transparent relative rounded-lg">
              <img src={course.img} alt={course.title} className="w-full h-40 object-cover rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-black text-lg font-semibold px-4 py-2 rounded-lg bg-[#daf0ff]">
                  {course.title}
                </h3>
              </div>
              <p className="text-sm mt-4 text-gray-600">{course.desc}</p>
            </div>
          ))}
        </div>

        {/* Start Learning Button */}
          <div className="mt-6 flex justify-end">
            <button className="px-6 py-3 bg-blue-500 text-white text-lg rounded-md shadow-md hover:bg-blue-600">
              Start Learning
            </button>
          </div>
      </section>

      {/* Schedule Learning */}
      <section className="px-14 py-8 mt-6">
        <h2 className="text-4xl font-semibold text-center text-blue-600">Schedule Learning Pace</h2>
        <div className="flex flex-col md:flex-row justify-between mt-4 gap-6">
          
          {/* Learning Pace */}
          <div className="w-full md:w-1/2 bg-transparent p-4 rounded-lg">
            <h3 className="text-lg text-blue-600">Learning Pace</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-sm gap-3 mt-4">
                {["Daily", "Weekly", "Bi-weekly", "At own pace"].map((option) => (
                    <button key={option} className="px-3 py-4 bg-transparent border border-gray-400 rounded-md hover:bg-blue-200">
                        {option}
                    </button>
                ))}
            </div>
            <h3 className="text-lg text-blue-600 mt-4">Time per day</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-sm gap-3 mt-4">
                {["30 mins", "1 hour", "2 hours", "3 hours and above"].map((option) => (
                    <button key={option} className="px-3 py-4 bg-transparent border border-gray-400 rounded-md hover:bg-blue-200">
                        {option}
                    </button>
                ))}
            </div>
        </div>

          {/* Free Days Selection */}
          <div className="w-full md:w-1/3 bg-transparent p-4 rounded-lg">
            <h3 className="text-lg text-blue-600">Choose your free days</h3>
            {/* <input type="date" className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" /> */}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Calander" />
                </DemoContainer>
              </LocalizationProvider>

              <div className="mt-4 px-24 flex justify-end">
                  <button className="w-24 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600">
                      Save
                  </button>
              </div>
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="px-24 py-10 mt-8">
          <h2 className="text-4xl font-semibold text-center text-blue-600 mt-6">Payment Plans</h2>
          <p className="text-gray-600 text-lg mt-12">Select a Plan</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mt-6">
              {[
                  { plan: "Basic", price: "Free", features: "3-course customization", isHighlighted: false },
                  { plan: "Premium", price: "£15/month", features: "6-course customization", isHighlighted: true },
                  { plan: "Super-Premium", price: "£30/month", features: "12-course customization", isHighlighted: false },
              ].map((item, index) => (
                  <div
                      key={index}
                      className={`p-6 w-auto rounded-lg text-center transition-transform duration-300 ${item.isHighlighted ? 'border-4 border-blue-600 transform scale-110' : 'bg-transparent border border-blue-600'}`}>
                      <h3 className="font-semibold text-lg">{item.plan}</h3>
                      <p className="text-gray-600 mt-10">{item.features}</p>
                      <p className="text-xl font-bold mt-10">{item.price}</p>
                      <button className={`${item.isHighlighted ? 'mt-10 w-26 px-4 py-3 border border-gray-500 bg-blue-500 rounded-md hover:bg-blue-600' : 'mt-10 w-26 px-4 py-3 border border-gray-500 bg-transparent rounded-md hover:bg-blue-200'}`}>
                          Start Learning
                      </button>
                  </div>
              ))}
          </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LearningDashboard;
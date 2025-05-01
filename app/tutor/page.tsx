
"use client";
import React, { useState } from "react";
import Course from "../components/Course";
import Footer from "../components/Footer";
import SearchBarCourse from "../components/SearchBarCourse";
import TutorProfile from "../components/TutorProfile";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Page = () => {
  return (
    <div className="bg-[#daf0ff] text-gray-800">
      <header className="px-28 py-4">
        <p className="text-blue-600">Your Learning Journey Continues, John</p>
      </header>
      <SearchBarCourse/>
      <Course />
      <section className="px-4 sm:px-10 py-8 sm:py-10 bg-[#daf0ff]">
        <h2 className="text-3xl font-semibold mb-4 sm:mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-6">
          Customize Your Learning Path
        </h2>
        <p className="text-base ml-24 sm:text-lg mt-2"> Choose Three Topics To Create Minimalistic Learning Experience</p>
        <textarea
          placeholder="Search topics..."
          className="h-10 w-full sm:w-2/3 md:w-1/2 p-0.5 m-1 border rounded-xl ml-24 block">
        </textarea>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 px-24">
          {[
            { img  : "https://images.pexels.com/photos/965345/pexels-photo-965345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "Artificial Intelligence" },
            { img: "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "Digital Marketing" },
            { img: "https://images.pexels.com/photos/8919548/pexels-photo-8919548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "Finance & Investing" },
            { img  : "https://images.pexels.com/photos/965345/pexels-photo-965345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "Artificial Intelligence" },
            { img: "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "Digital Marketing" },
            { img: "https://images.pexels.com/photos/8919548/pexels-photo-8919548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "Finance & Investing" },
            { img  : "https://images.pexels.com/photos/965345/pexels-photo-965345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "Artificial Intelligence" },
            { img: "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "Digital Marketing" },
            { img: "https://images.pexels.com/photos/8919548/pexels-photo-8919548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "Finance & Investing" }
          ].map((topic, index) => (
            <div key={index} className="bg-transparent rounded-lg relative overflow-hidden">
              <img
                src={topic.img}
                className="w-full h-52 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-black text-lg font-semibold px-4 py-2 rounded-lg backdrop-blur-md bg-white/10">
                  {topic.title}
                </h3>
              </div>
            </div>

          ))}
        </div>
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg block ml-auto">
          Customize & Start
        </button>
      </section>

      <section className="px-4 sm:px-10 py-8 sm:py-10">
        <h2 className="text-3xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          We Value Your Feedback
        </h2>
        <p className="text-base sm:text-lg my-4 text-center">
           Choose Three Topics To Create Minimalistic Learning Experience
        </p>
        <div>
            <div className="mx-auto px-20">
              <textarea
                placeholder="Write your feedback..."
                className="w-full bg-transparent h-8 p-0.5 border border-purple-500 rounded-lg "
              ></textarea>
              <textarea
                placeholder="Additional comments..."
                className="w-full bg-transparent h-32 p-4 border border-purple-500 rounded-lg"
              ></textarea>
            </div>
            <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg block ml-auto">
              Submit Feedback
            </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Page;
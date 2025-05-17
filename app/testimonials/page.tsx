"use client";

import React from "react";
import Footer from "../components/Footer";

const testimonials = [
  {
    id: 1,
    name: "Harsh Ratnani",
    feedback:
      "Visionary leader with a passion for education and technology innovation.",
    avatar:
      "https://pascualbrokers.com/wp-content/uploads/2020/02/dummy-profile.jpg",
    title: "Founder & CEO",
  },
  {
    id: 2,
    name: "Parth Doshi",
    feedback:
      "Expert in operational strategy and user-focused solutions, fostering collaboration and growth.",
    avatar:
      "https://pascualbrokers.com/wp-content/uploads/2020/02/dummy-profile.jpg",
    title: "Founder",
  },
  {
    id: 3,
    name: "Sumit Borate",
    feedback: "Specialized in extracting insights and predictions from data.",
    avatar: "/images/Sumitborate.jpeg",
    title: "Data Scientist",
  },
  {
    id: 4,
    name: "Harsh Bhavsar",
    feedback: "Leading our digital marketing campaigns with precision.",
    avatar: "/images/harsh.jpg",
    title: "Digital Marketing Head",
  },
  {
    id: 5,
    name: "Pops",
    feedback: "Always creating intuitive and beautiful UI/UX designs.",
    avatar:
      "/images/pops.jpeg",
    title: "Jr. Software Devloper",
  },
  {
    id: 6,
    name: "Varshini Varma",
    feedback: "Designing interfaces that delight users.",
    avatar: "/images/Varshini.jpeg",
    title: "Jr. Software Devloper",
  },
  {
    id: 7,
    name: "Manan Doshi",
    feedback: "Focusing on the user journey and smooth interactions.",
    avatar: "/images/manan.jpeg",
    title: "Jr. Software Devloper",
  },
  {
    id: 8,
    name: "Mahesh Kumar Thever",
    feedback: "Crafting seamless user experiences.",
    avatar: "/images/mahesh.jpeg",
    title: "Jr. Software Devloper",
  },
  {
    id: 9,
    name: "Sandip Baranwal",
    feedback: "Bringing fresh ideas to every user experience challenge.",
    avatar: "/images/sandip.jpeg",
    title: "Jr. Software Devloper",
  },
  {
    id: 10,
    name: "Sunny Radhakrishna",
    feedback: "Designing impactful and user-friendly experiences.",
    avatar: "/images/sunny.jpeg",
    title: "Jr. Software Devloper",
  },
  {
    id: 11,
    name: "Sadashiv Zore",
    feedback: "Blending creativity with usability in all designs.",
    avatar: "/images/sadashiv.jpeg",
    title: "Jr. Software Devloper",
  },
];

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-[#daf0ff] text-gray-800 font-sans">
      <section className="py-16">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          About us Testimonials
        </h1>
        <div className="max-w-6xl mx-auto px-6 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-blue-200 rounded-xl p-6 flex flex-col items-center text-center"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h2 className="text-lg font-semibold">{member.name}</h2>
              <p className="text-sm text-blue-500">{member.title}</p>
              <p className="text-sm text-gray-500 mt-2">{member.feedback}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;

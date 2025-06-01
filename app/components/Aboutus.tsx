"use client";

import Image from "next/image";
import React, { use } from "react";
import Footer from "./Footer";
import { motion } from "framer-motion";
import ScrollProgressBar from "./ScrollerProgress";
const AboutUs = () => {
  const teamMembers = [
    {
      name: "Harsh Ratnani",
      role: "Founder & CEO",
      img: "https://pascualbrokers.com/wp-content/uploads/2020/02/dummy-profile.jpg",
    },
    {
      name: "Parth Doshi",
      role: "Founder",
      img: "https://pascualbrokers.com/wp-content/uploads/2020/02/dummy-profile.jpg",
    },
    {
      name: "Sneha Chavan",
      role: "Manager",
      img: "https://pascualbrokers.com/wp-content/uploads/2020/02/dummy-profile.jpg",
    },
    {
      name: "Sumit Borate",
      role: "Data Science",
      img: "/images/Sumitborate.jpeg",
    },
    {
      name: "harsh Bhavsar",
      role: "Digital Marketing Head",
      img: "/images/harsh.jpg",
    },
    {
      name: "Pops",
      role: "Jr. Software Devloper",
      img: "/images/pops.jpeg",
    },
    {
      name: "Varshini Varma",
      role: "Jr. Software Devloper",
      img: "/images/Varshini.jpeg",
    },
    {
      name: "Manan Doshi",
      role: "Jr. Software Devloper",
      img: "/images/manan.jpeg",
    },
    {
      name: "Mahesh Kumar Thever",
      role: "Jr. Software Devloper",
      img: "/images/mahesh.jpeg",
    },
    {
      name: "Sandip Baranwal",
      role: "Jr. Software Devloper",
      img: "/images/sandip.jpeg",
    },
    {
      name: "Sunny Radhakrishna",
      role: "Jr. Software Devloper",
      img: "/images/sunny.jpeg",
    },
    {
      name: "Sadashiv Zore",
      role: "Jr. Software Devloper",
      img: "/images/sadashiv.jpeg",
    },
    {
      name: "Tushar Shukla",
      role: "Jr. Software Devloper",
      img: "/images/tushar.png",
    },
    {
      name: "Manikanta Mettu",
      role: "Jr. Software Devloper",
      img:"/images/manikanta.jpg",
    }
  ];

  return (
    <div> <ScrollProgressBar/>
    <div className="bg-[#daf0ff] min-h-screen">
      {/* Our Journey Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          {/* Journey Text */}
          <div className="md:w-1/2">
            <h2 className="text-5xl font-bold leading-[1.3] mb-10 bg-black bg-clip-text text-transparent">
              Our Journey
            </h2>

            <p className="text-gray-600 mb-4">
              <strong className="text-lg">2024: Building the Team</strong>
              <br />
              Co-founders brought together developers and education enthusiasts
              to design a platform that simplifies the process for educators and
              improves learning outcomes for students.
            </p>
            <p className="text-gray-600">
              <strong className="text-lg">2025: Beta Version Launched</strong>
              <br />
              Released the platform’s first version, offering basic course
              creation tools and support for educators.
            </p>
          </div>
          {/* Journey Image */}
          <div className="md:w-1/3 flex justify-end">
            <Image
              src="https://media.istockphoto.com/id/157284581/photo/road-by-night.jpg?s=612x612&w=0&k=20&c=utloT84rFRHikE2EcrnG5N-bE_R4dQEfKcgrPxGjUyY="
              alt="Journey Image"
              width={300}
              height={300}
              className="rounded-full shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-16 bg-[#daf0ff]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-10 bg-black bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          {/* Team Members Grid */}
          {/* </div> <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"> */}
          <div className="flex flex-wrap justify-center gap-6 px-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white w-[260px] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1 border border-transparent hover:border-indigo-400"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    scale: { type: "spring", duration: 0.6, bounce: 0.5 },
                  }}
                  viewport={{ once: true, amount: 0.6 }} 
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={260}
                    height={200}
                    className="object-cover w-full h-[200px] transition-transform duration-300 hover:scale-105 hover:brightness-110 rounded-t-2xl"
                  />
                </motion.div>
                {/* Member Name and Role */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
    </div>
  );
};

export default AboutUs;

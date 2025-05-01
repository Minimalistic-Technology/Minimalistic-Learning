'use client';

import React from 'react';
import Image from 'next/image';
import { Mail } from 'lucide-react';

import SearchBarCourse from '../components/SearchBarCourse';
import Course from '../components/Course';
import ExploreTutor from '../components/ExploreTutor';
import TutorList from '../components/Tutorlist';
import PhysicalClass from '../components/PhysicalClass';
import Certifications from '../components/Certifactions';
import Footer from '../components/Footer';

const CourseCreatorSupport = () => {
  return (
    <section className="bg-[#daf0ff] flex flex-col items-center justify-center py-12 px-6 text-center">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Course Creator Support</h2>
      <p className="text-gray-700 mt-2 max-w-lg">
        Create and upload your courses effortlessly with our free editing and publishing assistance.
      </p>
      <p className="mt-4 text-lg font-semibold">
        To get started, send a mail to 
        <a 
          href="mailto:minimalisticlearning2020@gmail.com" 
          className="text-blue-600 hover:underline ml-1">
          minimalisticlearning2020@gmail.com
        </a>
      </p>
      <div className="mt-6">
        <Image
          src="https://www.shutterstock.com/image-vector/futuristic-robot-interacting-digital-data-600nw-2500204599.jpg"
          alt="Envelope"
          width={150}
          height={150}
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

const Page = () => {
  return (
    <div className="bg-[#daf0ff] min-h-screen">
      {/* Main Content */}
      <div className="space-y-10">
        {/* Hero Section */}
        <ExploreTutor />

        {/* Search Bar */}
        <SearchBarCourse />

        {/* Course Component */}
        <div>
          <TutorList />
          <Course />
          <PhysicalClass />
          <Certifications />
        </div>

        {/* Course Creator Support Section */}
        <CourseCreatorSupport />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Page;
import { courses } from "@/app/data/courseData";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import {ChevronDown, Phone, Check,Undo2 } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import * as Accordion from "@radix-ui/react-accordion";

// Slugify helper - must match Course.tsx logic
const slugify = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, '-');

type Props = {
  params: {
    id: string;
  };
};

const CourseDetails = ({ params }: Props) => {
  const slug = params.id;

  const course = courses.find(
    (c) => slugify(c.title) === slug
  );

  if (!course) return notFound();

  return (
    <div className="bg-[#daf0ff] min-h-screen">
      <div className="w-full h-auto p-6 md:p-14 bg-gradient-to-b from-blue-100 via-blue-300 to-blue-500 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col justify-center items-start ml-4 md:ml-20 mt-10">
          <h2 className="text-3xl md:text-5xl font-bold">
            {course.title}
          </h2>
          <p className="mt-2 text-base md:text-lg">{course.description}</p>
          <div className="flex flex-wrap mt-8 items-center gap-4 mb-6">
            <button className="px-4 py-2 md:px-6 md:py-3 bg-white rounded-full text-gray-800 font-medium hover:bg-gray-100 transition-colors">
              Get Started
            </button>

            <div className="flex items-center">
              <span className="font-bold mr-2">{course.rating}.0</span>
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={18} fill={i < course.rating ? "currentColor" : "none"} />
                ))}
              </div>
            </div>

            <div className="px-4 py-1 bg-white bg-opacity-30 rounded-full">
              {Math.floor(Math.random() * 1000 + 1000)} Rating
            </div>

            <div className="text-gray-700">
              {Math.floor(Math.random() * 100000 + 100000)} Students
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-md mt-10 overflow-hidden">
            <Image
              src={course.img}
              alt={course.title}
              width={800}
              height={64}
              className="rounded-lg object-cover"/>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 items-start">

          <div className="md:col-span-1 lg:col-span-2">
              <div className="bg-white shadow-sm rounded-lg border mt-4 mb-4 border-blue-400 p-6 mx-auto">
                <h3 className="text-2xl font-bold mb-4">What You Will Learn</h3>
                
                {Array.isArray(course.topics) ? (
                  <ul className="space-y-3">
                    {course.topics.map((topic, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-600">
                    <p>Course topics will be available soon.</p>
                    <button className="mt-4 text-blue-600 flex items-center">
                      See all course details <ChevronDown className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-white shadow-sm rounded-lg border mt-8 border-blue-400 p-6 mx-auto">
                <div className="border-t border-gray-200">
                    <h4 className="text-xl font-semibold mb-3">Course Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500">Category</p>
                        <p className="font-medium">{course.category}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="font-medium">{course.duration}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Skill Level</p>
                        <p className="font-medium">{course.skilllevel}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Certificate</p>
                        <p className="font-medium">{course.certificate}</p>
                      </div>
                    </div>
                  </div>
              </div>

              <div className="bg-white shadow-sm rounded-lg border mt-5 border-blue-400 p-6 mx-auto">
                  <h4 className="text-2xl font-semibold mb-8">Course Content</h4>

                  {course.content && Array.isArray(course.content) ? (
                    <Accordion.Root
                    type="multiple"
                    className="space-y-2">

                    {course.content.map((item, index) => (
                      <Accordion.Item
                        key={index}
                        value={`item-${index}`}>

                        <Accordion.Trigger className="group w-full flex items-center justify-between px-4 py-3 text-left text-gray-900 font-medium transition">
                          <div className="flex items-center space-x-4">
                            <span>{item.title}</span>
                            <span className="font-medium text-blue-600 rounded-full px-1 bg-blue-100">
                              {item.duration}
                            </span>
                          </div>
                          <ChevronDown className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                        </Accordion.Trigger>

                        <Accordion.Content className="px-4 py-2 bg-white text-gray-700 text-sm border-t">
                          <div className="mb-6 flex justify-between items-center">
                            <span className="text-base text-gray-900">Course Intro</span>
                            <span className="font-medium text-blue-600 rounded-full px-1 bg-blue-100">
                              {item.type}
                            </span>
                          </div>
                          <div className="mt-4 mb-6 flex justify-between items-center">
                            <span className="text-base text-gray-900">Watch Befor Start</span>
                            <span className="font-medium text-blue-600 rounded-full px-1 bg-blue-100">
                              {item.type}
                            </span>
                          </div>
                          <div className="mt-4 mb-6 flex justify-between items-center">
                            <span className="text-base text-gray-900">Read Before Start</span>
                            <span className="font-medium text-blue-600 rounded-full px-1 bg-blue-100">
                              {item.type}
                            </span>
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    ))}
                  </Accordion.Root>
                  ) : (
                    <p className="text-gray-600">Course content will be available soon.</p>
                  )}
              </div>
          </div>

        <div className="sticky top-8 self-start w-80 mx-auto m-4 bg-white border border-blue-400 rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-xl font-semibold text-gray-800">₹1500</span>
              <span className="text-gray-400 text-xs line-through ml-2">₹3000</span>
            </div>
            <div className="flex items-center p-1 bg-gray-100 rounded-full text-orange-400">
              <Star className="h-5 w-5" fill="currentColor" stroke="none" />
              <span className="ml-1">3 Day's Left</span>
            </div>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-full mb-2 font-medium">
            Add To Cart
          </button>
          <button className="w-full bg-white hover:bg-gray-200 text-gray-700 py-3 rounded-full mb-4 border border-gray-300 font-medium">
            Buy Now
          </button>
  
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <Undo2 className="h-5 w-5 mr-2 text-blue-600" />
            30-Day Money Back Guarantee
          </div>

          <div className="space-y-4 border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Start Date</span>
              <span className="text-blue-600 rounded-full px-1 bg-blue-100">4 hrs 20 min</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Enrolled</span>
              <span className="text-blue-600 rounded-full px-1 bg-blue-100">101</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Lectures</span>
              <span className="text-blue-600 rounded-full px-1 bg-blue-100">55</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Skill Level</span>
              <span className="text-blue-600 rounded-full px-1 bg-blue-100">Basic</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Language</span>
              <span className="text-gray-800 rounded-full px-1 bg-gray-100">English</span>
            </div>
            
            <button className="flex items-center justify-between w-full text-blue-600 mt-2">
              Show More
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          </div>

          <div className="flex justify-center space-x-4 mt-16 mb-12">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <FaFacebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <FaInstagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>

          <div className="text-center text-xs mb-8 text-gray-500">
            For Details About The Course
          </div>

          <div className="flex items-center justify-center text-blue-600 bg-blue-50 rounded-full py-2 text-sm m-2">
            <Phone className="h-4 w-4 mr-2" />
            <span>Call Us: +91 12345 67891</span>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default CourseDetails;
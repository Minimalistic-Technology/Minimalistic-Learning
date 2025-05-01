'use client';

import { ChevronRight, Bell, Play } from "lucide-react";
import Image from "next/image";
import { Sidebar } from "../components/Sidebar";
import { StatsCard } from "../components/dashboard/StatsCard";
import { CourseCard } from "../components/dashboard/CourseCard";

const stats = [
  { title: "Total Courses", value: "6", bgColor: "bg-[#EEF2FF]", iconColor: "text-[#3b82f6]", type: "total" as const },
  { title: "Ongoing Courses", value: "3", bgColor: "bg-[#F0FDF4]", iconColor: "text-[#22c55e]", type: "ongoing" as const },
  { title: "Completed Courses", value: "8", bgColor: "bg-[#FAF5FF]", iconColor: "text-[#a855f7]", type: "completed" as const }
];

const courses = [
  {
    title: "Financial planning for beginners",
    description: "Learn about managing money and investing in the right places",
    image: "https://www.shutterstock.com/image-vector/financial-literacy-budgeting-managing-personal-260nw-2307242813.jpg"
  },
  {
    title: "Fundamentals of Data Science",
    description: "Master data analysis and machine learning concepts",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdPj3EGP36Vn1IrCMQUm9m3-xsrn2Awe5Nvw&s"
  },
  {
    title: "Nutrition and Wellness Basics",
    description: "Learn about healthy living and balanced nutrition",
    image: "https://motionarray.imgix.net/motion-array-2916866-jAhwN1Hscb-high_0008.jpg?w=660&q=60&fit=max&auto=format"
  }
];

const watchProgress = [
  { title: 'Build Rest API with Node.js', progress: 80, image: '/course-1.jpg' },
  { title: 'Explore use of Data Science', progress: 25, image: '/course-2.jpg' },
  { title: 'Rest and Wellness Exercises', progress: 80, image: '/course-3.jpg' },
  { title: 'Personal Finance 101', progress: 92, image: '/course-4.jpg' },
  { title: 'Rest and wellness routines', progress: 40, image: '/course-5.jpg' }
];

const activityLog = [
  {
    activity: "Make assignment for course",
    details: "Paid for physical class",
    action: "View"
  },
  {
    activity: "Finished a course",
    details: "Got a certificate for CSS++",
    action: "View"
  },
  {
    activity: "Watched uploaded new study content",
    details: "Content: CSS++",
    action: "View"
  },
  {
    activity: "System update",
    details: "App will be out for update",
    action: "View"
  }
];

export default function StudentDashboard() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-[#daf0ff] overflow-auto">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <header className="flex flex-col">
            {/* Top Navigation */}
            <div className="flex justify-between items-center bg-white p-4 mt-16 lg:mt-0">
              <div className="flex items-center">
                <span className="text-[#6B7AFF] text-lg font-bold">Dashboard</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 relative overflow-hidden">
                    <Image src="https://cdn4.vectorstock.com/i/1000x1000/18/58/color-silhouette-cartoon-half-body-faceless-man-vector-15091858.jpg" 
                    alt="Profile"
                    width={50}
                    height={50} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jone Doe</p>
                    <p className="text-xs text-gray-500">Student</p>
                  </div>
                </div>
              </div>
            </div> 
            
            {/* Welcome Text */}
            <div className="p-4 sm:p-6 md:p-10 pb-6">
              <h2 className="text-gray-500 text-sm">Welcome back</h2>
              <div className="flex items-center gap-1">
                <h1 className="text-xl font-semibold">John Doe</h1>
                <span className="text-gray-400">👋</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="px-4 sm:px-6 md:px-10 pb-10">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="w-full">
                  <StatsCard {...stat} />
                </div>
              ))}
            </div>

            {/* Popular Courses */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Popular Courses</h2>
                <a href="/courses" className="text-[#6B7AFF] text-sm hover:text-blue-600 flex items-center">
                  View all
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
              <div className="relative">
                <div className="flex gap-4 md:gap-8 overflow-x-auto pb-6 scrollbar-hide">
                  {courses.map((course, index) => (
                    <div key={index} className="flex-none w-[280px] sm:w-[320px] md:w-[360px]">
                      <CourseCard {...course} />
                    </div>
                  ))}
                </div>
                <button className="absolute -right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-50/50 rounded-full transition-colors">
                  <ChevronRight className="w-6 h-6 text-[#6B7AFF]" />
                </button>
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === 0 ? 'bg-[#6B7AFF]' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </section>

            {/* Main Layout */}
            <div className="flex flex-col xl:flex-row gap-6">
              {/* Left Section */}
              <div className="flex-1 max-w-full xl:max-w-[800px]">
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Enrolled Courses */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-[#6B7AFF] text-lg font-semibold">Enrolled Courses</h2>
                      <button className="text-[#6B7AFF] text-sm hover:text-blue-600">Add</button>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="space-y-2">
                        {[
                          { name: 'Software Management', level: 'Beginner' },
                          { name: 'CSS++', level: 'Intermediate' },
                          { name: 'Python', level: 'Beginner' },
                          { name: 'React Js', level: 'Advanced' }
                        ].map((course, index) => (
                          <div key={index} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                            <span className="text-gray-700 text-sm">{course.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-gray-400 text-xs">{course.level}</span>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Deadlines */}
                  <div>
                    <h2 className="text-[#6B7AFF] text-lg font-semibold mb-4">Upcoming Deadlines</h2>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="space-y-2">
                        {[
                          { text: "Attend CSS++ lesson zone", done: true },
                          { text: "Make payment for Python course", done: false },
                          { text: "Download extra learning materials", done: false },
                          { text: "Update profile settings", done: false }
                        ].map((task, index) => (
                          <div key={index} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                task.done ? 'border-[#6B7AFF] bg-[#6B7AFF]' : 'border-gray-300'
                              }`}>
                                {task.done && (
                                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                )}
                              </div>
                              <span className="text-sm text-gray-700">{task.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Log */}
                <div>
                  <h2 className="text-[#6B7AFF] text-lg font-semibold mb-4">Recent Activity Log</h2>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="text-left border-b border-gray-100">
                          <th className="text-sm text-gray-500 font-medium pb-3 w-[45%]">Activity</th>
                          <th className="text-sm text-gray-500 font-medium pb-3 w-[45%]">Details</th>
                          <th className="text-sm text-gray-500 font-medium pb-3 w-[10%]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {activityLog.map((log, index) => (
                          <tr key={index} className="border-b border-gray-100 last:border-0">
                            <td className="py-3 text-sm text-gray-700">{log.activity}</td>
                            <td className="py-3 text-sm text-gray-500">{log.details}</td>
                            <td className="py-3 text-right">
                              <button className="text-[#6B7AFF] text-sm hover:text-blue-600">
                                {log.action}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Section - Continue Watching */}
              <div className="w-full xl:w-[400px]">
                <h2 className="text-[#6B7AFF] text-xl font-semibold mb-6">Continue Watching</h2>
                <div className="space-y-6">
                  {watchProgress.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-white p-5 rounded-3xl h-[85px]">
                      <div className="relative w-[52px] h-[52px] rounded-2xl overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate mb-3">{item.title}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-[#6B7AFF] h-1.5 rounded-full" 
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <p className="mt-1.5 text-xs text-gray-500">{item.progress}% Complete</p>
                      </div>
                      <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                        <Play className="w-5 h-5 text-[#6B7AFF] fill-[#6B7AFF]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
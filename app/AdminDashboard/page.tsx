'use client';

import React, { useState } from 'react';
import { FaThLarge, FaUser , FaCreditCard, FaCog, FaBell, FaChartBar } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Menu } from "lucide-react";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock data for stats
  const stats = [
    { number: 33, label: "Total Students", icon: "👤" },
    { number: 82, label: "Courses Sold", icon: "📚" },
    { number: 14, label: "Total Tutors", icon: "👨‍🏫" },
    { number: 19, label: "Students Enrolled", icon: "🧑‍🎓" },
  ];

  // Updated activity log data to match image exactly
  const activityLog = [
    { activity: "New user registered", details: "Tutor signed up", status: "Approved", action: "View profile" },
    { activity: "New student enrolment", details: "Student enrolled in UIUX course", status: "Pending", action: "View profile" },
    { activity: "Instructor application new content", details: "Content: CSS++", status: "Approved", action: "View profile" },
    { activity: "System update", details: "Security test", status: "Pending", action: "View update" },
  ];

  // Updated engagement data to match image
  const engagementData = [
    { name: 'Daily', value: 25, color: '#2563EB' },
    { name: 'Weekly', value: 45, color: '#DBEAFE' },
    { name: 'Monthly', value: 30, color: '#60A5FA' },
  ];

  // Sidebar component
  const Sidebar = () => {
    return (
      <aside className={`bg-white min-h-screen top-0 shadow-md transition-transform duration-300 w-64 fixed z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex md:flex-col`}>
        <nav className="mt-6">
          <ul>
            <li className="px-4 py-3 text-indigo-900 font-bold">
              <a href="/AdminDashboard" className="flex items-center">
                <FaThLarge className="mr-3 text-lg md:text-xl" />
                Dashboard
              </a>
            </li>
            <li className="px-4 py-3">
              <a href="#" className="flex items-center text-gray-600">
                <FaUser  className="mr-3 text-lg md:text-xl" />
                User Management
              </a>
            </li>
            <li className="px-4 py-3">
              <a href="#" className="flex items-center text-gray-600">
                <FaCreditCard className="mr-3 text-lg md:text-xl" />
                Payment & Subscription
              </a>
            </li>
            <li className="px-4 py-3">
              <a href="#" className="flex items-center text-gray-600">
                <FaChartBar className="mr-3 text-lg md:text-xl" />
                Reports
              </a>
            </li>
            <li className="px-4 py-3">
              <a href="#" className="flex items-center text-gray-600">
                <FaCog className="mr-3 text-lg md:text-xl" />
                Settings
              </a>
            </li>
          </ul>
        </nav>

        {/* Logout section */}
        <div className="fixed -bottom-4 flex">
          <a 
            href="/#" 
            className="fixed bottom-4 flex text-red-500 hover:text-red-700 mt-4">
            <span className="font-semibold text-lg ml-8">{'[-> '}Log out</span>
          </a>
        </div>
      </aside>
    );
  };

  return (
    <div className="flex flex-wrap bg-blue-500">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 bg-[#daf0ff]">
        {/* Mobile Toggle Button */}
        <button
          className={`flex left-2 z-50 p-2 bg-transparent text-black rounded-lg transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="h-6 w-6" />
        </button>
        {/* Header with notifications, and user profile */}
        <div className="flex flex-wrap bg-white shadow-md px-8 justify-end items-center">
          <div className="flex items-center space-x-6">
            {/* Notification Icon with Badge */}
            <div className="relative cursor-pointer">
              <FaBell className="text-gray-600 text-xl md:text-2xl" />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded -full px-1">2</span>
            </div>

            {/* User Profile */}
            <div className="relative flex p-1 items-center space-x-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1999/1999625.png"
                alt="Icon"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-gray-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-600">John Doe</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-4 p-4 md:p-6 rounded-lg">
          <p className="text-md text-blue-500">Welcome back,</p>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 flex items-center">
            John Doe <span className="ml-2">👋</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg shadow flex items-center space-x-2"
            >
              <span className="text-3xl text-blue-600">{stat.icon}</span>
              <h3 className="text-3xl font-bold text-blue-600">{stat.number}</h3>
              <p className="text-gray-600 text-sm whitespace-nowrap">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Popular Courses */}
        <div className="p-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-blue-700 font-semibold">Popular Courses</h2>
            <a href="#" className="text-blue-600 text-sm">View all</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Finance Course */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                <img 
                  src="https://www.shutterstock.com/image-vector/financial-literacy-budgeting-managing-personal-260nw-2307242813.jpg" 
                  alt="Finance Course" 
                  className="w-full h-48 object-cover" 
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-black mb-2">Finance Course</h3>
                <p className="text-gray-600 text-sm">Basic finance course to manage your money</p>
              </div>
            </div>

            {/* Programming Course */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                <img 
                  src="https://media.istockphoto.com/id/1413990965/photo/glowing-python-programming-language-code-on-a-blue-digital-surface-with-a-sphere-grid-design.jpg?s=612x612&w=0&k=20&c=sC5Gcktg85_J6e50P5DGngrez1MElLql5xrYKd13sA4=" 
                  alt="Programming Course" 
                  className="w-full h-48 object-cover" 
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-black mb-2">Programming Basics</h3>
                <p className="text-gray-600 text-sm">Introduction to programming fundamentals and Python basics</p>
              </div>
            </div>

            {/* Fitness Course */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                <img 
                  src="https://motionarray.imgix.net/motion-array-2916866-jAhwN1Hscb-high_0008.jpg?w=660&q=60&fit=max&auto=format" 
                  alt="Fitness Course" 
                  className="w-full h-48 object-cover" 
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-black mb-2">Fitness Training</h3>
                <p className="text-gray-600 text-sm">Complete body workout and nutrition guide</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Log and Student Engagement Section */}
        <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

          {/* Activity Log Box */}
          <div  className="lg:col-span-2">
          <h2 className="text-lg font-medium text-blue-700 mb-4 lg:col-span-2">Activity Log</h2>
          <div className=" bg-white rounded-xl shadow-sm p-4 md:p-14">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-4 font-medium">Activity</th>
                  <th className="pb-4 font-medium">Details</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium w-32">Action</th>
                </tr>
              </thead>
              <tbody>
                {activityLog.map((log, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="py-3 text-sm text-gray-600">{log.activity}</td>
                    <td className="py-3 text-sm text-gray-600">{log.details}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        log.status === 'Approved' 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'bg-yellow-50 text-yellow-600'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <a href="#" className="text-blue-600 text-sm hover:underline">{log.action}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>

          {/* Student Engagement Box */}
          <div>
          <h2 className="text-lg font-medium mb-4 text-blue-700">Student Engagement</h2>
          <div className="p-4 md:p-6 bg-white rounded-xl shadow-md">
            <div className="flex justify-center items-center mb-6">
              <ResponsiveContainer width={250} height={250}>
                <PieChart>
                  <Pie
                    data={engagementData}
                    innerRadius={55}
                    outerRadius={75}
                    startAngle={0}
                    endAngle={360}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    label={({ value, x, y }) => (
                      <text 
                        x={x} 
                        y={y} 
                        fill="#000"        
                        fontSize="12px"
                        textAnchor="middle" 
                        dominantBaseline="central"
                      >
                        {`${value}%`}      
                      </text>
                    )}
                    labelLine={false}
                  >
                    {engagementData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}     
                        fill={entry.color}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {engagementData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-sm mr-3" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

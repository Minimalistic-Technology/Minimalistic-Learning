'use client'; /* Made by Sandip B. */

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell,Pencil,Menu} from "lucide-react";

interface SidebarProps {
  isOpen: boolean; // Define the type for the prop
}
// Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const pathname = usePathname();
  const menuItems = [
    { icon: '📊', label: 'Dashboard', href: '/components/TutorDashboard' },
    { icon: '📚', label: 'Course Management', href: '/components/TutorDashboard/course-management' },
    { icon: '👥', label: 'Student Management', href: '/components/TutorDashboard/student-management' },
    { icon: '📝', label: 'Assignments & Assessments', href: '/components/TutorDashboard/assignments' },
    { icon: '💰', label: 'Revenue', href: '/components/TutorDashboard/revenue' },
    { icon: '⚙️', label: 'Settings', href: '/components/TutorDashboard/settings' },
  ];

  return (
    <div className={`min-h-screen top-0 bg-white py-14 px-2 transition-transform duration-300 w-64 fixed z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex md:flex-col`}>
      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex items-center p-2 mb-2 rounded-lg cursor-pointer ${
              pathname === item.href ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <Link 
        href="/#" 
        className="fixed bottom-6 flex text-red-500 hover:text-red-700 mt-4">
        <span className="font-semibold text-lg ml-8">{'[-> '}Log out</span>
      </Link>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon, count, label }: { icon: string; count: number; label: string }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
    <div className="text-blue-500 text-2xl">{icon}</div>
    <div className="text-black">
      <span className="font-bold text-lg">{count}</span> {label}
    </div>
  </div>
);

// Main Dashboard Component
export default function TutorDashboard() {
  const [users, setUsers] = useState([
    {
      name: 'John Doe',
      avatar: "https://cdn4.vectorstock.com/i/1000x1000/18/58/color-silhouette-cartoon-half-body-faceless-man-vector-15091858.jpg",
      progress: 92 // Individual progress for John Doe
    },
    {
      name: 'Emily White',
      avatar: "https://cdn4.vectorstock.com/i/1000x1000/18/58/color-silhouette-cartoon-half-body-faceless-man-vector-15091858.jpg",
      progress: 85 // Individual progress for Emily White
    },
    {
      name: 'Julia Mike',
      avatar: "https://cdn4.vectorstock.com/i/1000x1000/18/58/color-silhouette-cartoon-half-body-faceless-man-vector-15091858.jpg",
      progress: 78 // Individual progress for Julia Mike
    },
    {
      name: 'John Doe',
      avatar: "https://cdn4.vectorstock.com/i/1000x1000/18/58/color-silhouette-cartoon-half-body-faceless-man-vector-15091858.jpg",
      progress: 92 // Individual progress for John Doe
    },
    {
      name: 'Emily White',
      avatar: "https://cdn4.vectorstock.com/i/1000x1000/18/58/color-silhouette-cartoon-half-body-faceless-man-vector-15091858.jpg",
      progress: 85 // Individual progress for Emily White
    },
    {
      name: 'Julia Mike',
      avatar: "https://cdn4.vectorstock.com/i/1000x1000/18/58/color-silhouette-cartoon-half-body-faceless-man-vector-15091858.jpg",
      progress: 78 // Individual progress for Julia Mike
    }
  ]);

  // Function to update progress
  const updateProgress = (index: number, newProgress: number) => {
    const updatedUsers = [...users];
    updatedUsers[index].progress = newProgress;
    setUsers(updatedUsers);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#daf0ff]">
      <Sidebar isOpen={isSidebarOpen} />
      <main>
        {/* Mobile Toggle Button */}
        <button
          className={`flex left-2 z-50 p-2 bg-transparent text-black rounded-lg transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="h-6 w-6" />
          {/* <span className="text-xl font-bold">{'>'}</span> */}
        </button>

        {/* Header Section */}
        <div className="flex flex-wrap bg-white shadow-md px-8 justify-end items-center">
          <div className="flex items-center space-x-6">
            <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
            <div className="flex items-center space-x-3">
              <Image
                src={users[0].avatar}
                width={40}
                height={40}
                className="rounded-full border border-gray-400" alt={''} />
              <div className="text-sm text-gray-800">
                <span className="text-lg font-semibold">{users[0].name}</span>
                <p className="text-sm text-gray-500">Tutor</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <h2 className="text-gray-400">Welcome back,</h2>
            <h1 className="text-2xl font-semibold text-gray-800">{users[0].name}</h1>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatsCard icon="📚" count={30} label="Total Courses" />
            <StatsCard icon="👥" count={12} label="Total Students" />
            <StatsCard icon="💰" count={6700} label="Total Revenue" />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Left Content - Schedule and Other Sections */}
            <div className="col-span-2 space-y-4">
              {/* Schedule Section Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-blue-800 font-semibold">Today's Lesson Schedule</h2>
                <button className="text-blue-800 hover:text-blue-600">View All</button>
              </div>

              {/* Schedule Content */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="space-y-4">
                  {/* 1:00 PM - CS++ Class */}
                  <div className="flex items-start space-x-3">
                    <div className="text-gray-600 font-bold text-sm w-8">1pm</div>
                    <div className="w-1 bg-blue-500 h-24 "></div>
                    <div className="flex-1 bg-purple-100 p-6 rounded-lg">
                      <div className="font-medium text-gray-800">CS++</div>
                      <div className="text-xs text-gray-600">Physical Class | 1:00pm | 30 mins</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-gray-600 text-sm w-8">1:30</div>
                  </div>

                  {/* 2:00 PM - Software Management Class */}
                  <div className="flex items-start space-x-3">
                    <div className="text-gray-600 font-bold text-sm w-8">2pm</div>
                    <div className="w-1 bg-blue-500 h-40"></div>
                    <div className="flex-1 bg-blue-200 p-12 rounded-lg">
                      <div className="font-medium text-gray-800">Software Management</div>
                      <div className="text-xs text-gray-600">Online Class | 2:00 pm | 60 mins</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-gray-600 font-bold text-sm w-8">3pm</div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-gray-600 text-sm w-8">3:30</div>
                  </div>
                </div>
              </div>

              {/* Top Students for the Month */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-blue-800">Top Students for the Month</h2>
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                    <div className="space-y-4">
                      {users.map((student, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Image
                              src={student.avatar}
                              width={32}
                              height={32}
                              className="rounded-full" alt={''} />
                            <span className="text-sm text-gray-700">{student.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{student.progress}%</span>
                            <button
                              className="text-blue-500 text-xs"
                              onClick={() => updateProgress(index, student.progress + 5)}>
                              View Profile
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Revenue for the Month */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-blue-800">Revenue for the Month</h2>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <div className="mb-6">
                      <div className="text-sm bg-white text-gray-600">Total revenue</div>
                      <div className="text-2xl bg-white font-semibold">£700</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Unpaid</span>
                          <span className="text-xs text-green-500">+40% more</span>
                        </div>
                        <div className="text-lg font-semibold">£300</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Bonus</span>
                          <span className="text-xs text-red-500">-15% less</span>
                        </div>
                        <div className="text-lg font-semibold">£50</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Physical classes</span>
                          <span className="text-xs text-green-500">+10% more</span>
                        </div>
                        <div className="text-lg font-semibold">£100</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Online classes</span>
                          <span className="text-xs text-red-500">-5% less</span>
                        </div>
                        <div className="text-lg font-semibold">£250</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews from Parents Section */}
              <h2 className="text-lg font-semibold text-blue-800">Reviews from Parents</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
                <div className="mb-4">
                  <button className="text-blue-800">View All</button>
                </div>
                <div className="flex items-start space-x-4">
                  <Image
                    src={users[0].avatar}
                    alt={users[0].name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-gray-600 text-sm mb-2">
                      Lorem ipsum dolor sit amet consectetur. Dictum quis mauris diam sodales dignissim non massa in nisi. Lorem nunc eget auctor in imperdiet.
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-700">John Doe</span>
                      <span className="text-sm text-gray-400">| 35 years Old</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4">
              {/* Uploaded Courses */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg text-blue-800 font-semibold">Uploaded Courses</h2>
                  <button className="text-blue-800 hover:text-blue-600">
                    <Pencil size={20} />
                  </button>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-1">
                      <p className="text-gray-700 font-medium">Software Management</p>
                      <p className="text-xs text-gray-400">Beginner</p>
                    </div>
                    <div className="flex items-center justify-between border-b pb-1">
                      <p className="text-gray-700 font-medium">CS++</p>
                      <p className="text-xs text-gray-400">Advanced</p>
                    </div>
                    <div className="flex items-center justify-between border-b pb-1">
                      <p className="text-gray-700 font-medium">Python</p>
                      <p className="text-xs text-gray-400">Beginner</p>
                    </div>
                    <div className="flex items-center justify-between border-b pb-1">
                      <p className="text-gray-700 font-medium">React js</p>
                      <p className="text-xs text-gray-400">Advanced</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Upcoming Deadlines */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">Upcoming Deadlines</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input type="radio" className="form-checkbox rounded-full" />
                      <span>Schedule live classes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" className="form-checkbox rounded-full" />
                      <span>Grade assignments</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" className="form-checkbox rounded-full" />
                      <span>Upload extra learning materials</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" className="form-checkbox rounded-full" />
                      <span>Update payment</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Students Progress Summary */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">Students Progress Summary</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="space-y-4">
                    {users.map((student, index) => (
                      <div key={index} className="flex p-2 items-center space-x-2">
                        <span className="p-2 text-blue-600">{index + 1}.</span>
                        <Image
                          src={student.avatar}
                          alt={student.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">{student.name}</span>
                            <span className="text-sm font-medium text-blue-600">{student.progress}%</span>
                          </div>
                          <div className="w-full border border-black rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
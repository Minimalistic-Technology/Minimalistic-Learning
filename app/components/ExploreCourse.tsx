"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Image from "next/image";

export default function ExploreCourse() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ width: "100%", typography: "body1", fontWeight: "bold" }}
      className="max-w-7xl mx-auto h-full"
    >
    <p className="text-3xl md:text-6xl text-center pb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
  Explore Course
</p>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab
              label="All Courses"
              value="1"
              sx={{ fontWeight: "bold", textTransform: "none" }}
            />
            <Tab
              label="Business"
              value="2"
              sx={{ fontWeight: "bold", textTransform: "none" }}
            />
            <Tab
              label="Science and Technology"
              value="3"
              sx={{ fontWeight: "bold", textTransform: "none" }}
            />
            <Tab
              label="Arts and Humanities"
              value="4"
              sx={{ fontWeight: "bold", textTransform: "none" }}
            />
            <Tab
              label="Health"
              value="5"
              sx={{ fontWeight: "bold", textTransform: "none" }}
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ typography: "body1", fontWeight: "bold" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {new Array(6).fill(0).map((item:any, index:any) => (
              <div className="w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-md p-4" key={index}>
                <div className="">
                  <div className="md:shrink-0">
                    <Image
                      className="h-48 w-full object-cover rounded-xl"
                      src="https://cdn4.vectorstock.com/i/1000x1000/18/58/color-silhouette-cartoon-half-body-faceless-man-vector-15091858.jpg"
                      alt="Mountain"
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="p-4">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      Case Study
                    </div>
                    <a
                      href="#"
                      className="block mt-1 text-xl leading-tight font-bold text-black hover:underline"
                    >
                      Introduction to Public Health
                    </a>
                    <p className="mt-2 text-slate-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed sit amet nulla auctor, vestibulum magna sed, convallis
                      ex.
                    </p>
                    <div className="sm:flex justify-between">
                      <div className="mt-4">
                        <div className="flex items-center">
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-slate-300"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-slate-300"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                        </div>
                        <span className="text-slate-600">3.8/5</span>
                      </div>
                      <div className="mt-4">
                        <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-purple-600 transition duration-300">
                          Browse Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel value="2" sx={{ typography: "body1", fontWeight: "bold" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {new Array(2).fill(0).map((item:any, index:any) => (
              <div className="w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-md p-4" key={index}>
                <div className="">
                  <div className="md:shrink-0">
                    <Image
                      className="h-48 w-full object-cover rounded-xl"
                      src="https://cdn4.vectorstock.com/i/1000x1000/18/58/color-silhouette-cartoon-half-body-faceless-man-vector-15091858.jpg"
                      width={100}
                      height={100}
                      alt="Mountain"
                    />
                  </div>
                  <div className="p-4">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      Case Study
                    </div>
                    <a
                      href="#"
                      className="block mt-1 text-xl leading-tight font-bold text-black hover:underline"
                    >
                      Finding customers for a new FinTech company
                    </a>
                    <p className="mt-2 text-slate-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed sit amet nulla auctor, vestibulum magna sed, convallis
                      ex.
                    </p>
                    <div className="sm:flex justify-between">
                      <div className="mt-4">
                        <div className="flex items-center">
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-slate-300"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-slate-300"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                        </div>
                        <span className="text-slate-600">3.8/5</span>
                      </div>
                      <div className="mt-4">
                        <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-purple-600 transition duration-300">
                          Browse Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        </TabPanel>
        <TabPanel value="3" sx={{ typography: "body1", fontWeight: "bold" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {new Array(3).fill(0).map((item:any, index:any) => (
              <div className="w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-md p-4" key={index}>
                <div className="">
                  <div className="md:shrink-0">
                    <Image
                      className="h-48 w-full object-cover rounded-xl"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
                      alt="Mountain"
                    />
                  </div>
                  <div className="p-4">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      Case Study
                    </div>
                    <a
                      href="#"
                      className="block mt-1 text-xl leading-tight font-bold text-black hover:underline"
                    >
                      Finding customers for a new FinTech company
                    </a>
                    <p className="mt-2 text-slate-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed sit amet nulla auctor, vestibulum magna sed, convallis
                      ex.
                    </p>
                    <div className="sm:flex justify-between">
                      <div className="mt-4">
                        <div className="flex items-center">
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-slate-300"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-slate-300"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                        </div>
                        <span className="text-slate-600">3.8/5</span>
                      </div>
                      <div className="mt-4">
                        <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-purple-600 transition duration-300">
                          Browse Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        </TabPanel>
        <TabPanel value="4" sx={{ typography: "body1", fontWeight: "bold" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {new Array(4).fill(0).map((item:any, index:any) => (
              <div className="w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-md p-4" key={index}>
                <div className="">
                  <div className="md:shrink-0">
                    <Image
                      className="h-48 w-full object-cover rounded-xl"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
                      alt="Mountain"
                    />
                  </div>
                  <div className="p-4">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      Case Study
                    </div>
                    <a
                      href="#"
                      className="block mt-1 text-xl leading-tight font-bold text-black hover:underline"
                    >
                      Finding customers for a new FinTech company
                    </a>
                    <p className="mt-2 text-slate-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed sit amet nulla auctor, vestibulum magna sed, convallis
                      ex.
                    </p>
                    <div className="sm:flex justify-between">
                      <div className="mt-4">
                        <div className="flex items-center">
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-slate-300"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-slate-300"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                        </div>
                        <span className="text-slate-600">3.8/5</span>
                      </div>
                      <div className="mt-4">
                        <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-purple-600 transition duration-300">
                          Browse Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        </TabPanel>
        <TabPanel value="5" sx={{ typography: "body1", fontWeight: "bold" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {new Array(5).fill(0).map((item:any, index:any) => (
              <div className="w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-md p-4" key={index}>
                <div className="">
                  <div className="md:shrink-0">
                    <Image
                      className="h-48 w-full object-cover rounded-xl"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
                      alt="Mountain"
                    />
                  </div>
                  <div className="p-4">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      Case Study
                    </div>
                    <a
                      href="#"
                      className="block mt-1 text-xl leading-tight font-bold text-black hover:underline"
                    >
                      Finding customers for a new FinTech company
                    </a>
                    <p className="mt-2 text-slate-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed sit amet nulla auctor, vestibulum magna sed, convallis
                      ex.
                    </p>
                    <div className="sm:flex justify-between">
                      <div className="mt-4">
                        <div className="flex items-center">
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-slate-300"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-slate-300"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                        </div>
                        <span className="text-slate-600">3.8/5</span>
                      </div>
                      <div className="mt-4">
                        <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-purple-600 transition duration-300">
                          Browse Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

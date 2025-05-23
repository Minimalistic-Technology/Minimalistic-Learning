"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import { InfiniteMovingCardsDemo } from "../components/InfiniteMovingCardsDemo";
import { blogs } from "@/app/lib/blogData";
import { motion } from "framer-motion";
import Image from "next/image";
const categories = [
  "All",
  "AI",
  "Web Development",
  "Data Science",
  "Blockchain",
  "Cloud Computing",
  "Cybersecurity",
  "Mobile Development",
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#daf0ff] text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-[#265ef8]  via-[#b4daf3]  to-transparent py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6 animate-fade-in">
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-gray-800 leading-tight">
              Insights, Tutorials, and Tech News
            </h1>
            <p className="text-gray-700 text-[clamp(1.125rem,2.5vw,1.875rem)]">
              Stay updated with the latest in tech and learning.
            </p>
          </div>

          {/* Hero Image */}
          <div className="w-full md:w-1/2 flex justify-center">
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
                src="/images/blog3.png"
                alt="Tech illustration"
                width={260}
                height={200}
                className="w-72 h-72 object-cover rounded-full shadow-xl ring-4 ring-white transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mt-6">
        <p className="text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Latest Blog's
        </p>
        <InfiniteMovingCardsDemo />
      </div>

      <p className=" mt-6 text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Famous Blog's
      </p>
      {/* Search, Category, and Create Button Section */}
      <section className="max-w-7xl mx-auto px-4 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search Blog's..."
          className="w-full md:w-1/3 px-4 py-2 border border-blue-400 rounded-lg focus:outline-blue-200 focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-1/4 px-4 py-2 border border-blue-400 rounded-lg focus:outline-blue-200 focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Create New Blog Button */}
        <Link href="/blog/createblog's">
          <button className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
            + Create New Blog
          </button>
        </Link>
      </section>

      {/* Blog Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white border border-blue-300 rounded-3xl shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-[1.03] flex flex-col overflow-hidden"
          >
            <div className="relative h-56 w-full overflow-hidden rounded-t-3xl">
              {/* <img
                src={blog.image}
                alt={blog.title}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              /> */}
              <motion.img
                src={blog.image}
                alt={blog.title}
               
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  scale: { type: "spring", duration: 0.6, bounce: 0.5 },
                }}
                viewport={{ once: true, amount: 0.6 }}
               
                className="object-cover w-full h-full  hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-t-3xl pointer-events-none" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                {blog.category}
              </span>
              <h2 className="text-2xl font-extrabold mt-2 text-gray-900 leading-tight">
                {blog.title}
              </h2>
              <p className="text-gray-700 mt-3 text-sm flex-grow leading-relaxed">
                {blog.description}
              </p>

              <div className="flex justify-between items-center text-gray-400 text-xs mt-6 font-medium tracking-wide">
                <span>{blog.author}</span>
                <span>{blog.date}</span>
              </div>

              <Link
                href={`/blog/${blog.id}`}
                className="mt-6 inline-flex items-center gap-1 self-start rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-semibold hover:bg-blue-700 transition"
              >
                Read More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <div className="flex justify-center pb-12">
        <nav className="flex gap-2">
          <button className="px-4 py-2 rounded-md bg-white shadow-sm text-gray-700 hover:bg-blue-50">
            1
          </button>
          <button className="px-4 py-2 rounded-md bg-white shadow-sm text-gray-700 hover:bg-blue-50">
            2
          </button>
          <button className="px-4 py-2 rounded-md bg-white shadow-sm text-gray-700 hover:bg-blue-50">
            Next →
          </button>
        </nav>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;

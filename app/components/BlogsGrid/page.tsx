// components/BlogsGrid.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";

interface Blog {
  _id: string;
  title: string;
  description: string;
  category?: string;
  image?: string;
  date: string;
  author?: string;
  tags?: string[];
  rating?: number;
  minutes: number;
  authorId: string;
  verified?: boolean;
  paraphrased?: string;
}

interface BlogsGridProps {
  blogs: Blog[];
  onVerify: (id: string) => void;
  onDelete: (id: string) => void;
}

const BlogsGrid: React.FC<BlogsGridProps> = ({ blogs, onVerify, onDelete }) => {
  if (blogs.length === 0) {
    return (
      <p className="text-center text-gray-500 col-span-full">
        No blogs found for the selected filter.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <motion.div
          key={blog._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-blue-200 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03] flex flex-col overflow-hidden"
        >
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                {blog.category || "Uncategorized"}
              </span>
              {blog.verified && (
                <span
                  title="Verified"
                  className="inline-flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-3 py-0.5 text-xs font-semibold select-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Verified
                </span>
              )}
            </div>

            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              {blog.title}
            </h2>

            <p className="text-gray-700 mt-2 text-sm flex-grow leading-relaxed">
              {blog.description.length > 200
                ? blog.description.slice(0, 200) + "..."
                : blog.description}
            </p>

            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-medium select-none"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center text-gray-500 text-xs mt-6 font-medium">
              <span>{blog.author || "Unknown Author"}</span>
              <span>{format(new Date(blog.date), "PPP")}</span>
            </div>
             {/* {blog.paraphrased && (
                <div className="text-sm italic text-green-800 bg-green-50 rounded p-2 mt-3 border border-green-200 select-text">
                  {blog.paraphrased}
                </div>
              )} */}
            <div className="mt-5 flex flex-col gap-3">
              {!blog.verified && (
                <button
                  onClick={() => onVerify(blog._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
                >
                  Verify
                </button>
              )}

              <button
                onClick={() => onDelete(blog._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
              >
                Delete
              </button>
            </div>

            <Link
              href={`/blog/${blog._id}`}
              className="mt-6 inline-flex items-center gap-2 self-start rounded-lg bg-blue-600 px-5 py-2 text-white text-sm font-semibold hover:bg-blue-700 transition select-none"
            >
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
        </motion.div>
      ))}
    </div>
  );
};

export default BlogsGrid;

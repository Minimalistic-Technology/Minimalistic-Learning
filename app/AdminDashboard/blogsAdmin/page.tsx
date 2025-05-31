"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";
import axiosInstance from "@/app/axiosInstance/page";

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

type FilterType = "all" | "verified" | "notVerified" | "paraphrased" | "notParaphrased";

const BlogsAdminPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [paraphraseTexts, setParaphraseTexts] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<FilterType>("all");

 useEffect(() => {
  axios
    .get("http://localhost:5000/blogs")
    .then((res) => {
      const sortedBlogs = res.data.sort(
        (a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setBlogs(sortedBlogs);
    })
    .finally(() => setLoading(false));
}, []);


  const handleVerify = (id: string) => {
    axiosInstance.put(`http://localhost:5000/blogs/${id}`, { verified: true }).then(() => {
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, verified: true } : b))
      );
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    axiosInstance.delete(`http://localhost:5000/blogs/${id}`).then(() => {
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    });
  };

  const handleParaphrase = (id: string) => {
    const text = paraphraseTexts[id];
    if (!text || text.trim() === "") {
      alert("Please enter paraphrase text.");
      return;
    }
    const paraphrased = `AI version: ${text}`;
    axiosInstance.put(`http://localhost:5000/blogs/${id}`, { paraphrased }).then(() => {
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, paraphrased } : b))
      );
      setParaphraseTexts((prev) => ({ ...prev, [id]: "" }));
    });
  };

  const handleTextareaChange = (id: string, value: string) => {
    setParaphraseTexts((prev) => ({ ...prev, [id]: value }));
  };

  // Filtering logic based on filter state
  const filteredBlogs = blogs.filter((blog) => {
    switch (filter) {
      case "verified":
        return blog.verified === true;
      case "notVerified":
        return !blog.verified;
      case "paraphrased":
        return !!blog.paraphrased;
      case "notParaphrased":
        return !blog.paraphrased;
      default:
        return true; // all
    }
  });

  if (loading)
    return (
      <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 rounded-3xl h-72 shadow-md"
          />
        ))}
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {[
          { label: "All", value: "all" },
          { label: "Verified", value: "verified" },
          { label: "Not Verified", value: "notVerified" },
          { label: "Paraphrased", value: "paraphrased" },
          { label: "Not Paraphrased", value: "notParaphrased" },
        ].map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value as FilterType)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
              filter === value
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No blogs found for the selected filter.
          </p>
        )}

        {filteredBlogs.map((blog) => (
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-gray-900 leading-snug">{blog.title}</h2>

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

              {blog.paraphrased && (
                <div className="text-sm italic text-green-800 bg-green-50 rounded p-2 mt-3 border border-green-200 select-text">
                  {blog.paraphrased}
                </div>
              )}

              <div className="mt-5 flex flex-col gap-3">
                {!blog.verified && (
                  <button
                    onClick={() => handleVerify(blog._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
                  >
                    Verify
                  </button>
                )}

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
                >
                  Delete
                </button>

                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  rows={3}
                  placeholder="Paraphrase here..."
                  value={paraphraseTexts[blog._id] || ""}
                  onChange={(e) => handleTextareaChange(blog._id, e.target.value)}
                />

                <button
                  onClick={() => handleParaphrase(blog._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
                >
                  Paraphrase (AI)
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlogsAdminPage;

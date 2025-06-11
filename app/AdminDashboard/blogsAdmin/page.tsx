"use client";
import React, { useEffect, useState } from "react";
import api from "utils/api";
import axiosInstance from "@/app/axiosInstance/page";
import ScrollProgressBar from "@/app/components/ScrollerProgress";
import LoadingSkeleton from "app/components/loading/page";
import BlogsGrid from "@/app/components/BlogsGrid/page";
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

type FilterType =
  | "all"
  | "verified"
  | "notVerified"
  | "paraphrased"
  | "notParaphrased";

const BlogsAdminPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [paraphraseTexts, setParaphraseTexts] = useState<
    Record<string, string>
  >({});
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    api
      .get("/blogs")
      .then((res) => {
        const sortedBlogs = res.data.sort(
          (a: Blog, b: Blog) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setBlogs(sortedBlogs);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleVerify = (id: string) => {
    axiosInstance.put(`/blogs/${id}`, { verified: true }).then(() => {
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, verified: true } : b))
      );
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    axiosInstance.delete(`/blogs/${id}`).then(() => {
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    });
  };

  // const handleParaphrase = (id: string) => {
  //   const text = paraphraseTexts[id];
  //   if (!text || text.trim() === "") {
  //     alert("Please enter paraphrase text.");
  //     return;
  //   }
  //   const paraphrased = `AI version: ${text}`;
  //   axiosInstance.put(`http://localhost:5000/blogs/${id}`, { paraphrased }).then(() => {
  //     setBlogs((prev) =>
  //       prev.map((b) => (b._id === id ? { ...b, paraphrased } : b))
  //     );
  //     setParaphraseTexts((prev) => ({ ...prev, [id]: "" }));
  //   });
  // };

  // const handleTextareaChange = (id: string, value: string) => {
  //   setParaphraseTexts((prev) => ({ ...prev, [id]: value }));
  // };

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
    return <LoadingSkeleton />

  return (
    <div>
      {" "}
      <ScrollProgressBar />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {[
            { label: "All", value: "all" },
            { label: "Verified", value: "verified" },
            { label: "Not Verified", value: "notVerified" },
            // { label: "Paraphrased", value: "paraphrased" },
            // { label: "Not Paraphrased", value: "notParaphrased" },
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
        <div >
          <BlogsGrid
  blogs={filteredBlogs}
  onVerify={handleVerify}
  onDelete={handleDelete}
/>

        </div>
      </div>
    </div>
  );
};

export default BlogsAdminPage;

"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpenCheck,
  CheckCircle2,
  CircleDashed,
  Filter,
  RefreshCcw,
} from "lucide-react";
import ScrollProgressBar from "@/app/components/ScrollerProgress";
import LoadingSkeleton from "@/app/components/loading";
import BlogsGrid from "@/app/components/BlogsGrid";
import { toast } from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000/api/v1";

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

type FilterType = "all" | "verified" | "notVerified";

const filterOptions: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Verified", value: "verified" },
  { label: "Pending", value: "notVerified" },
];

const BlogsAdminPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Load blogs from API
  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/posts`);
        const data = await res.json().catch(() => ({}));
        const postsArray = Array.isArray(data?.posts)
          ? data.posts
          : Array.isArray(data)
          ? data
          : [];

        const normalized: Blog[] = postsArray.map((post: any, index: number) => ({
          _id: post._id ?? post.id ?? `post-${index}`,
          title: post.title ?? "Untitled Blog",
          description:
            post.description ??
            post.content ??
            "Stay tuned for more insights from Minimalistic Learning.",
          category: post.category ?? post.topic ?? "General",
          image: post.image ?? post.coverImage,
          date: post.createdAt ?? post.updatedAt ?? new Date().toISOString(),
          author:
            post.author?.name ??
            post.author ??
            post.authorName ??
            "Minimalistic Learning",
          tags: post.tags ?? (post.category ? [post.category] : []),
          rating: post.rating ?? post.views ?? 5,
          minutes: post.minutes ?? 5,
          authorId: post.authorId ?? post.author?._id ?? "",
          verified: post.verified ?? post.published ?? false,
          paraphrased: post.paraphrased,
        }));

        setBlogs(normalized);
      } catch (error) {
        console.error("Error loading blogs:", error);
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const handleVerify = async (id: string) => {
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (!accessToken) {
        toast.error("Authentication required. Please login.");
        return;
      }

      const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ verified: true }),
      });

      if (!res.ok) {
        throw new Error(`Failed to verify blog (${res.status})`);
      }

      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, verified: true } : b))
      );
      toast.success("Blog verified successfully");
    } catch (error) {
      console.error("Error verifying blog:", error);
      toast.error("Failed to verify blog");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (!accessToken) {
        toast.error("Authentication required. Please login.");
        return;
      }

      const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete blog (${res.status})`);
      }

      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  const stats = useMemo(() => {
    const verifiedCount = blogs.filter((b) => b.verified).length;
    const pendingCount = blogs.length - verifiedCount;
    return {
      total: blogs.length,
      verified: verifiedCount,
      pending: pendingCount,
    };
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((blog) => {
        if (!searchTerm.trim()) return true;
        const haystack = `${blog.title} ${blog.description} ${blog.author} ${
          blog.category
        }`.toLowerCase();
        return haystack.includes(searchTerm.toLowerCase());
      })
      .filter((blog) => {
        switch (filter) {
          case "verified":
            return blog.verified === true;
          case "notVerified":
            return !blog.verified;
          default:
            return true;
        }
      });
  }, [blogs, filter, searchTerm]);

  if (loading) return <LoadingSkeleton />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50/50 to-pink-50/50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20 pb-16">
      <ScrollProgressBar />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 pt-10">
        <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/90 px-8 py-10 shadow-2xl backdrop-blur">
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-b from-[#2563eb]/20 to-sky-200/30 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                <BookOpenCheck className="h-4 w-4 text-[#2563eb]" />
                Blog Review Hub
              </p>
              <h1 className="text-3xl font-semibold text-slate-900 lg:text-4xl">
                Moderate & publish stories with clarity.
              </h1>
              <p className="max-w-2xl text-sm text-slate-500">
                Filter, verify, and curate submissions from the community.
                Actions sync with the Admin aesthetic so everything feels part
                of the same system.
              </p>
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-3 lg:w-auto">
              {[
                {
                  label: "Total Submissions",
                  value: stats.total,
                  accent: "from-slate-900 to-slate-700",
                  icon: Filter,
                },
                {
                  label: "Verified",
                  value: stats.verified,
                  accent: "from-emerald-500 to-emerald-600",
                  icon: CheckCircle2,
                },
                {
                  label: "Pending",
                  value: stats.pending,
                  accent: "from-amber-500 to-amber-600",
                  icon: CircleDashed,
                },
              ].map(({ label, value, accent, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/50 bg-white/80 p-4 shadow-lg backdrop-blur"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                    {label}
                    <Icon className="h-4 w-4 text-slate-400" />
                  </div>
                  <p
                    className={`bg-gradient-to-r ${accent} bg-clip-text text-3xl font-bold text-transparent`}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/60 bg-white/95 p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2563eb]/10 text-[#2563eb]">
                <Filter className="h-4 w-4" />
              </span>
              Curate submissions by status
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm text-slate-500 shadow-sm">
                <input
                  type="text"
                  placeholder="Search title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => setFilter(value)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      filter === value
                        ? "bg-[#2563eb] text-white shadow-lg shadow-blue-200"
                        : "border border-slate-200 bg-white text-slate-600 hover:text-[#2563eb]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilter("all");
                }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 hover:text-[#2563eb]"
              >
                <RefreshCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-dashed border-slate-200/70 bg-slate-50/60 p-4">
            <BlogsGrid
              blogs={filteredBlogs}
              onVerify={handleVerify}
              onDelete={handleDelete}
            />
            {filteredBlogs.length === 0 && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white/90 p-10 text-center text-slate-500 shadow-inner">
                No entries match your filters. Try broadening the scope.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogsAdminPage;

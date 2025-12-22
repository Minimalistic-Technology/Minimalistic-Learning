"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  BarChart3, 
  PenSquare, 
  Search, 
  Filter,
  TrendingUp,
  Clock,
  Star,
  BookOpen,
  Sparkles,
  ChevronDown,
  X,
  Grid3x3,
  List
} from "lucide-react";
import ScrollProgressBar from "../components/ScrollerProgress";
import Footer from "../components/Footer";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || " ";

interface Blog {
  _id: string;
  slug?: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  author?: string;
  date?: string;
  verified?: boolean;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

const sortOptions = [
  { label: "All Blogs", value: "default", icon: Grid3x3 },
  { label: "Most Popular", value: "most-viewed", icon: TrendingUp },
  { label: "Most Recent", value: "most-recent", icon: Clock },
];

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortFilter, setSortFilter] = useState<string>("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Local fallback from static data to avoid empty state if API fails

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/posts`);
        const data = await res.json()
        console.log(data)
        const postsArray = Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data)
          ? data
          : [];

        const normalized = postsArray.map((post: any, index: number) => ({
          _id: post._id ?? post.id ?? `post-${index}`,
          slug: post.slug ?? post._id ?? post.id,
          title: post.title ?? "Untitled Blog",
          description:
            post.description ??
            post.content ??
            "Stay tuned for more insights from Minimalistic Learning.",
          image: post.image ?? post.coverImage,
          category: post.category ?? post.topic ?? "General",
          author:
            post.author?.name ??
            post.author ??
            post.authorName ??
            "Minimalistic Learning",
          date: post.createdAt ?? post.updatedAt ?? new Date().toISOString(),
          verified: post.verified ?? post.published ?? true,
          rating: post.rating ?? post.views ?? 5,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        }));
        console.log(normalized)
        if (normalized.length) {
          setBlogs(normalized);
        }
      } catch (err) {
        setError("Unable to load blogs from the server.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  console.log(blogs, error)

  const filteredBlogs = useMemo(() => {
    const filtered = blogs
      // Show verified blogs OR blogs where verified is undefined/null (newly created)
      .filter((blog) => blog.verified !== false || blog.verified === undefined || blog.verified === null)
      .filter((blog) => {
        const matchesCategory =
          selectedCategory === "All" ||
          blog.category?.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      });

    const sorted = [...filtered];
    if (sortFilter === "most-recent") {
      sorted.sort((a, b) => {
        const aDate = a.date ? new Date(a.date).getTime() : 0;
        const bDate = b.date ? new Date(b.date).getTime() : 0;
        return bDate - aDate;
      });
    } else if (sortFilter === "most-viewed") {
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }
    return sorted;
  }, [blogs, searchTerm, selectedCategory, sortFilter]);

  const categories = useMemo(
    () => {
      const unique = Array.from(
        new Set(blogs.map((blog) => blog.category).filter(Boolean))
      ) as string[];
      return ["All", ...unique];
    },
    [blogs]
  );

  const totalCategories = categories.length ? categories.length - 1 : 0;
  const totalAuthors = useMemo(
    () =>
      Array.from(
        new Set(blogs.map((blog) => blog.author ?? "Minimalistic Learning"))
      ).length,
    [blogs]
  );

  const highlightStats = [
    {
      label: "Published blogs",
      value: blogs.length.toString(),
      meta: "+3 new this week",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Categories curated",
      value: totalCategories.toString(),
      meta: "Handpicked topics",
      icon: Sparkles,
      color: "from-sky-500 to-sky-600",
    },
    {
      label: "Active mentors",
      value: totalAuthors.toString(),
      meta: "Voices powering the hub",
      icon: TrendingUp,
      color: "from-cyan-500 to-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50/50 to-cyan-50/50 dark:from-slate-950 dark:via-blue-950/20 dark:to-cyan-950/20 text-slate-800 dark:text-slate-100">
      <ScrollProgressBar />
      
      {/* Hero Section */}
      <section className="relative pt-4 sm:pt-6 pb-12 sm:pb-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-[1.2fr_0.8fr] items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#2563eb] ring-1 ring-blue-200/50 dark:ring-blue-700/50">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                Blog Hub
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-slate-100 dark:via-blue-100 dark:to-slate-100 bg-clip-text text-transparent">
                  Discover Stories, <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                    Insights & Inspiration
                  </span>
                </h1>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                  Explore curated content from industry experts. Learn, grow, and share your knowledge with the Minimalistic Learning community.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {sortOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSortFilter(option.value)}
                      className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                        sortFilter === option.value
                          ? "bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                          : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50"
                      }`}
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Editor's Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl sm:rounded-3xl border border-blue-200/50 dark:border-blue-700/50 bg-gradient-to-br from-blue-600 via-sky-600 to-cyan-600 p-6 sm:p-8 text-white shadow-2xl ring-2 ring-blue-500/30 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
              </div>
              <div className="relative flex h-full flex-col justify-between space-y-4 sm:space-y-6">
                <div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/70 mb-2 sm:mb-3">
                    EDITOR&apos;S NOTE
                  </p>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed">
                    &ldquo;Consistent storytelling amplifies every community.&rdquo;
                  </h2>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3">
                  <Link
                    href="/blog/createblogs"
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-white/30 hover:scale-105"
                  >
                    <PenSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Publish new blog
                  </Link>
                  <Link
                    href="/AdminDashboard/blogsAdmin"
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-white px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-[#2563eb] transition-all hover:scale-105"
                  >
                    <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Manage library
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {highlightStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 sm:p-6 shadow-lg ring-1 ring-black/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute -right-4 -top-4 h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br ${stat.color} opacity-10 blur-2xl`} />
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} mb-3 sm:mb-4`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-1.5 sm:mb-2">
                    {stat.label}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
                    <span className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
                      {stat.value}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-900/20 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 w-fit">
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {stat.meta}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 sm:p-6 shadow-lg ring-1 ring-black/5">
          {error && (
            <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search blogs by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>

            {/* Category Filter & View Toggle */}
            <div className="flex items-center gap-3">
              {/* Category Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Category</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl p-2 z-50 max-h-96 overflow-y-auto"
                    >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category || "All");
                    setShowFilters(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {category}
                </button>
              ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-slate-700 text-[#2563eb] shadow-sm"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-white dark:bg-slate-700 text-[#2563eb] shadow-sm"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Create Button */}
              <Link
                href="/blog/createblogs"
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
              >
                <PenSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Create Blog</span>
                <span className="sm:hidden">Create</span>
              </Link>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedCategory !== "All") && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm font-medium">
                  Search: &quot;{searchTerm}&quot;
                  <button onClick={() => setSearchTerm("")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Blogs Grid/List */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
            <span className="ml-3 text-sm text-slate-500">Loading blogs...</span>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-16 text-center shadow-lg"
          >
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                No blogs found
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              <Link
                href="/blog/createblogs"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/30 mt-4"
              >
                <PenSquare className="w-4 h-4" />
                Create the first blog
              </Link>
            </div>
          </motion.div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "space-y-6"
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((blog, index) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  viewMode={viewMode}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

// Blog Card Component
function BlogCard({
  blog,
  viewMode,
  index,
}: {
  blog: Blog;
  viewMode: "grid" | "list";
  index: number;
}) {
  if (viewMode === "list") {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <Link
          href={`/blog/${blog.slug ?? blog._id}`}
          className="group flex gap-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
        >
          <div className="relative w-64 h-48 flex-shrink-0 overflow-hidden">
            <Image
              src={
                blog.image ||
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              }
              alt={blog.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-semibold text-[#2563eb]">
                {blog.category || "General"}
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                {blog.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <Star className="w-3 h-3 fill-current" />
                    Verified
                  </span>
                )}
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {blog.rating?.toFixed(1) || "5.0"}
                  </span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-[#2563eb] transition-colors">
                {blog.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                {blog.description}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {blog.date
                    ? new Date(blog.date).toLocaleDateString()
                    : "Recently"}
                </span>
                <span>{blog.author || "Minimalistic Learning"}</span>
              </div>
              <span className="inline-flex items-center gap-2 font-semibold text-[#2563eb] group-hover:gap-3 transition-all">
                Read More
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <Link href={`/blog/${blog.slug ?? blog._id}`}>
        <div className="relative h-64 w-full overflow-hidden">
          {/* <Image
            src={
              blog.image ||
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            }
            alt={blog.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
          /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wide text-[#2563eb]">
              {blog.category || "General"}
            </span>
            {blog.verified && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/90 backdrop-blur-sm text-xs font-semibold text-white">
                <Star className="w-3 h-3 fill-current" />
                Verified
              </span>
            )}
          </div>
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {blog.rating?.toFixed(1) || "5.0"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-[#2563eb] transition-colors">
            {blog.title}
          </h2>
          <p className="flex-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
            {blog.description}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {blog.date
                  ? new Date(blog.date).toLocaleDateString()
                  : "Recently"}
              </span>
              <span>•</span>
              <span>{blog.author || "Minimalistic Learning"}</span>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] group-hover:gap-3 transition-all">
              Read More
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default BlogPage;

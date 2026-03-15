"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { PenSquare, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { BlogHero } from "@/features/blog/components/blog-hero";
import { BlogStats } from "@/features/blog/components/blog-status";
import { BlogFilters } from "@/features/blog/components/blog-filters";
import { BlogCard } from "@/features/blog/components/blog-card";
import { useBlogDelete, useBlogPage } from "@/features/blog/hooks/use-blogs";
import { cn } from "../lib/utils";

const BlogPage = () => {
  const { user, isAuthenticated } = useAuth();
  const {
    blogs,
    isLoading,
    isError,
    viewMode,
    sortFilter,
    setSortFilter,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    showFilters,
    setShowFilters,
    setViewMode,
    error,
    totalAuthors,
    totalCategories,
  } = useBlogPage();

  return (
    <div
      className={cn(
        "min-h-screen pt-20 flex flex-col gap-16",
        // "bg-gradient-to-br from-blue-50 via-sky-50/50 to-cyan-50/50 dark:from-slate-950 dark:via-blue-950/20 dark:to-cyan-950/20",
        "text-slate-800 dark:text-slate-100",
      )}
    >
      <BlogHero
        sortFilter={sortFilter}
        setSortFilter={setSortFilter}
        isAuthenticated={isAuthenticated}
      />

      <BlogStats
        totalBlogs={blogs.length}
        totalCategories={totalCategories}
        totalAuthors={totalAuthors}
      />

      <BlogFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isAuthenticated={isAuthenticated}
        error={error?.message as string}
      />

      <section className="max-w-7xl mx-auto px-6 pb-24 w-full">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
            <span className="ml-3 text-sm text-slate-500">
              Loading blogs...
            </span>
          </div>
        ) : blogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 p-16 text-center shadow-lg"
          >
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                No blogs found
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Try adjusting your search or filter criteria.
              </p>
              {isAuthenticated && (
                <Link
                  href="/blog/createblogs"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg mt-4"
                >
                  <PenSquare className="w-4 h-4" /> Create the first blog
                </Link>
              )}
            </div>
          </motion.div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "space-y-6"
            }
          >
            <AnimatePresence mode="popLayout">
              {blogs.map((blog, index) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  viewMode={viewMode}
                  index={index}
                  currentUser={user}
                  isAuthenticated={isAuthenticated}
                  onDelete={() => useBlogDelete(blog._id)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;

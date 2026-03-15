"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Star, Clock, TrendingUp } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { Blog } from "@/features/blog/types";
import { BlogCard } from "@/features/blog/components/blog-card";
import { useBlogDelete } from "@/features/blog/hooks/use-blogs";
import { AnimatedBackground } from "../animated-background";
import { Badge } from "../badge";

interface PopularBlogsSectionProps {
  blogs: Blog[];
}

export default function PopularBlogsSection({
  blogs,
}: PopularBlogsSectionProps) {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  return (
    <section className="relative bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-950 py-24 md:py-32 overflow-hidden">
      {/* Background Decorations */}
      <AnimatedBackground
        blobs={[
          {
            className:
              "absolute top-0 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl",
          },
          {
            className:
              "absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl",
          },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <Badge
            title="Trending Now"
            icon={<TrendingUp className="size-3"/>}
            className="mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
              Popular Blogs
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Explore our most-read content from expert contributors
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
          >
            View all blogs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Blogs Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              viewMode={"grid"}
              currentUser={user}
              isAuthenticated={isAuthenticated}
              index={index}
              onDelete={() => useBlogDelete(blog._id)}
            />
          ))}
          {blogs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-16 text-center shadow-lg"
            >
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  No blogs available yet
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Be the first to create one!
                </p>
                {isAuthenticated && !authLoading ? (
                  <Link
                    href="/blog/createblogs"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 mt-4"
                  >
                    Write a Blog
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 mt-4"
                  >
                    Login to Write a Blog
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

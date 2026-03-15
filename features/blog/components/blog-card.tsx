"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Edit2, Star, Trash2 } from "lucide-react";
import { Blog, ViewMode } from "../types";
import { useBlogAuthor } from "../hooks/use-blogs";

interface Props {
  blog: Blog;
  viewMode: ViewMode;
  index: number;
  currentUser: any;
  isAuthenticated: boolean;
  onDelete: (id: string) => void;
}

export const BlogCard = ({
  blog,
  viewMode,
  index,
  currentUser,
  isAuthenticated,
  onDelete,
}: Props) => {
  const isAuthor = useBlogAuthor(blog, currentUser, isAuthenticated);

  const imageUrl = blog.coverImage?.url || "/placeholder-blog.jpg";
  const imageAlt = blog.coverImage?.alt || blog.title;

  const AuthorActions = () =>
    isAuthor ? (
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Link
          href={`/blog/edit/${blog._id}`}
          className="p-2 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
        >
          <Edit2 className="size-4" />
        </Link>
        <button
          onClick={() => onDelete(blog._id)}
          className="p-2 rounded-full bg-rose-600 text-white shadow-lg hover:bg-rose-700 transition"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    ) : null;

  if (viewMode === "list") {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="relative group"
      >
        <Link
          href={`/blog/${blog.slug ?? blog._id}`}
          className="flex gap-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
        >
          <div className="relative w-64 h-48 flex-shrink-0 overflow-hidden">
            <img
              src={imageUrl}
              alt={imageAlt}
              className={`h-full w-full object-cover transition duration-500 group-hover:scale-110 ${!blog.coverImage?.url ? "opacity-50 grayscale" : ""}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-xs font-semibold text-[#2563eb]">
                {blog.category || "General"}
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                {blog.readTime && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                    <Clock className="w-3 h-3" /> {blog.readTime} min read
                  </span>
                )}
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
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : "Recently"}
                </span>
                <span>
                  {(currentUser &&
                    `${currentUser.firstName} ${currentUser.lastName}`) ||
                    "Minimalistic Learning"}
                </span>
              </div>
              <span className="inline-flex items-center gap-2 font-semibold text-[#2563eb] group-hover:gap-3 transition-all">
                Read More <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
        <AuthorActions />
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <Link
        href={`/blog/${blog.slug ?? blog._id}`}
        className="flex flex-col flex-1"
      >
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt}
            className={`h-full w-full object-cover transition duration-500 group-hover:scale-110 ${!blog.coverImage?.url ? "opacity-50 grayscale" : ""}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-xs font-bold uppercase tracking-wide text-[#2563eb]">
              {blog.category || "General"}
            </span>
          </div>
          {blog.readTime && (
            <div className="absolute bottom-4 left-4">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-xs font-bold text-slate-700">
                <Clock className="w-3 h-3" /> {blog.readTime} min read
              </span>
            </div>
          )}
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
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString()
                  : "Recently"}
              </span>
              <span>•</span>
              <span>
                {(currentUser &&
                  `${currentUser.firstName} ${currentUser.lastName}`) ||
                  "Minimalistic Learning"}
              </span>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] group-hover:gap-3 transition-all">
              Read More <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
      <AuthorActions />
    </motion.article>
  );
};

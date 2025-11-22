"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Star, Play, Clock, TrendingUp } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  author?: string;
  date?: string;
  verified?: boolean;
  rating?: number;
}

interface PopularBlogsSectionProps {
  blogs: Blog[];
}

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Link 
        href={`/blog/${blog._id}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:shadow-2xl"
      >
        {/* Blog Image */}
        <div className="relative h-56 w-full overflow-hidden">
          {blog.image ? (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover transition duration-500 ease-in-out group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-pink-900/20 flex items-center justify-center">
              <Play size={48} className="opacity-20 text-slate-400 dark:text-slate-600" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wide text-[#2563eb] shadow-lg">
              {blog.category || "General"}
            </span>
          </div>

          {/* Rating */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-lg">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {blog.rating?.toFixed(1) || "5.0"}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-[#2563eb] transition-colors line-clamp-2">
              {blog.title}
            </h3>
            <p className="flex-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {blog.description?.length && blog.description.length > 120
                ? `${blog.description.slice(0, 120)}…`
                : blog.description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {blog.date
                  ? new Date(blog.date).toLocaleDateString()
                  : "Recently"}
              </span>
              <span>•</span>
              <span>{blog.author || "Minimalistic Learning"}</span>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] group-hover:gap-3 transition-all">
              Read
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PopularBlogsSection({ blogs }: PopularBlogsSectionProps) {
  return (
    <section className="relative bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-950 py-24 md:py-32 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#2563eb] mb-4 shadow-lg">
              <TrendingUp className="w-3 h-3" />
              Trending Now
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
              Popular Blogs
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Explore our most-read content from expert contributors
            </p>
          </div>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
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
              index={index}
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
                <Link
                  href="/blog/createblogs"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/30 mt-4"
                >
                  Create Blog
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

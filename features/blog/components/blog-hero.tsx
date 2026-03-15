"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  PenSquare,
  Sparkles,
  Grid3x3,
  TrendingUp,
  Clock,
} from "lucide-react";

const sortOptions = [
  { label: "All Blogs", value: "default", icon: Grid3x3 },
  { label: "Most Popular", value: "most-viewed", icon: TrendingUp },
  { label: "Most Recent", value: "most-recent", icon: Clock },
];

interface Props {
  sortFilter: string;
  setSortFilter: (v: string) => void;
  isAuthenticated: boolean;
}

export const BlogHero = ({
  sortFilter,
  setSortFilter,
  isAuthenticated,
}: Props) => (
  <section className="relative pt-4 sm:pt-6 pb-12 sm:pb-16 overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:gap-10 md:grid-cols-[1.2fr_0.8fr] items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#2563eb] ring-1 ring-blue-200/50 dark:ring-blue-700/50">
            <Sparkles className="w-3 h-3" /> Blog Hub
          </div>
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-slate-100 dark:via-blue-100 dark:to-slate-100 bg-clip-text text-transparent">
              Discover Stories,{" "}
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                Insights & Inspiration
              </span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Explore curated content from industry experts. Learn, grow, and
              share your knowledge with the Minimalistic Learning community.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {sortOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setSortFilter(option.value)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    sortFilter === option.value
                      ? "bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                      : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-white border border-slate-200/50"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {option.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-3xl border border-blue-200/50 dark:border-blue-700/50 bg-gradient-to-br from-blue-600 via-sky-600 to-cyan-600 p-8 text-white shadow-2xl ring-2 ring-blue-500/30 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
          </div>
          <div className="relative flex flex-col justify-between space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/70 mb-3">
                EDITOR&apos;S NOTE
              </p>
              <h2 className="text-xl md:text-2xl font-bold leading-relaxed">
                &ldquo;Consistent storytelling amplifies every community.&rdquo;
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {isAuthenticated && (
                <Link
                  href="/blog/createblogs"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/20 backdrop-blur-sm px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/30 hover:scale-105"
                >
                  <PenSquare className="w-4 h-4" /> Publish new blog
                </Link>
              )}
              <Link
                href="/AdminDashboard/blogsAdmin"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#2563eb] transition-all hover:scale-105"
              >
                <BarChart3 className="w-4 h-4" /> Manage library
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

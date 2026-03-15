"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Sparkles, TrendingUp } from "lucide-react";

interface Props {
  totalBlogs: number;
  totalCategories: number;
  totalAuthors: number;
}

export const BlogStats = ({
  totalBlogs,
  totalCategories,
  totalAuthors,
}: Props) => {
  const stats = [
    {
      label: "Published blogs",
      value: totalBlogs.toString(),
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
    <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div
                className={`absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br ${stat.color} opacity-10 blur-2xl`}
              />
              <div className="relative">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 mb-2">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                    {stat.value}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <ArrowUpRight className="w-3 h-3" /> {stat.meta}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

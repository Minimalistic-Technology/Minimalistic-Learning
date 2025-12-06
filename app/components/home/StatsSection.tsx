"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FolderOpen, Users, Star } from 'lucide-react';

interface StatsSectionProps {
  blogCount: number;
  categoryCount: number;
  authorCount: number;
  averageRating: string;
}

interface StatItemProps {
  number: string;
  label: string;
  icon: React.ReactNode;
  index: number;
}

function StatItem({ number, label, icon, index }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative rounded-3xl border border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            className="block text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-slate-100 dark:via-purple-100 dark:to-slate-100 bg-clip-text text-transparent"
          >
            {number}
          </motion.span>
          <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsSection({ 
  blogCount, 
  categoryCount, 
  authorCount, 
  averageRating 
}: StatsSectionProps) {
  const stats = [
    {
      number: `${blogCount}+`,
      label: "Published Blogs",
      icon: <BookOpen className="w-8 h-8 text-[#2563eb]" />,
    },
    {
      number: `${categoryCount}+`,
      label: "Categories",
      icon: <FolderOpen className="w-8 h-8 text-purple-600" />,
    },
    {
      number: `${authorCount}+`,
      label: "Contributors",
      icon: <Users className="w-8 h-8 text-indigo-600" />,
    },
    {
      number: averageRating,
      label: "Average Rating",
      icon: <Star className="w-8 h-8 text-amber-500 fill-amber-500" />,
    },
  ];

  return (
    <section className="relative border-y border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-b from-white/50 to-slate-50/50 dark:from-slate-900/50 dark:to-slate-950/50 backdrop-blur-sm py-16 md:py-24 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              number={stat.number}
              label={stat.label}
              icon={stat.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, FolderOpen, Users, Star } from "lucide-react";
import { AnimatedBackground } from "../animated-background";
import { cn } from "@/app/lib/utils";

interface StatsSectionProps {
  blogCount: number;
  categoryCount: number;
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
      className={cn(
        "relative rounded-3xl p-8 backdrop-blur-xl transition-all duration-300 group",
        "border border-slate-200/50 dark:border-slate-700/50",
        "bg-white/80 dark:bg-slate-900/80",
        "shadow-lg ring-1 ring-black/5 hover:shadow-xl"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300",
          "bg-gradient-to-br from-blue-500/5 via-sky-500/5 to-cyan-500/5",
          "group-hover:opacity-100"
        )}
      />

      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <div
          className={cn(
            "inline-flex items-center justify-center w-16 h-16 rounded-2xl",
            "bg-gradient-to-br from-blue-100 to-sky-100",
            "dark:from-blue-900/30 dark:to-sky-900/30",
          )}
        >
          {icon}
        </div>

        <div>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            className={cn(
              "block text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent",
              "bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900",
              "dark:from-slate-100 dark:via-blue-100 dark:to-slate-100"
            )}
          >
            {number}
          </motion.span>

          <p
            className={cn(
              "mt-2 text-sm font-semibold uppercase tracking-wide",
              "text-slate-600 dark:text-slate-400"
            )}
          >
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
      icon: <FolderOpen className="w-8 h-8 text-blue-600" />,
    },
  ];

  return (
    <section
      className={cn(
        "relative py-16 md:py-24 overflow-hidden backdrop-blur-sm",
        "border-y border-slate-200/50 dark:border-slate-800/50",
        "bg-gradient-to-b from-white/50 to-slate-50/50",
        "dark:from-slate-900/50 dark:to-slate-950/50"
      )}
    >
      <AnimatedBackground
        blobs={[
          {
            className:
              "absolute top-0 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl",
          },
          {
            className:
              "absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl",
          },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              number={stat.number}
              label={stat.label}
              icon={stat.icon}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
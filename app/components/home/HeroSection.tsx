"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

interface HeroSectionProps {
  blogCount: number;
}

export default function HeroSection({ blogCount }: HeroSectionProps) {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      <h1>Loading....</h1>;
    }
  }, [isAuthenticated, authLoading]);

  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-cyan-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-sky-400/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32">
        <div className="grid gap-8 sm:gap-10 md:gap-12 md:grid-cols-2 md:items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-[#2563eb] ring-1 ring-blue-200/50 dark:ring-blue-700/50 shadow-lg"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="hidden sm:inline">
                Minimalistic Learning Platform
              </span>
              <span className="sm:hidden">Learning Platform</span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight"
            >
              <span className="block text-slate-900 dark:text-slate-100">
                Master new skills
              </span>
              <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                at your own pace.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-lg text-base sm:text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-400"
            >
              Join thousands of learners. Access high-quality content, blogs,
              and resources curated by industry experts.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                href="/blog"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/60 hover:scale-105"
              >
                Explore Blog
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              {isAuthenticated && !authLoading && (
                <Link
                  href="/blog/createblogs"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 transition-all hover:bg-white dark:hover:bg-slate-800 hover:scale-105 hover:border-[#2563eb]/50"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  Create Blog
                </Link>
              )}
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-4 sm:pt-6 space-y-2 sm:space-y-3"
            >
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                Trusted by learners worldwide
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  {
                    icon: Users,
                    label: "Industry Experts",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Award,
                    label: "Verified Content",
                    color: "from-blue-500 to-sky-500",
                  },
                  {
                    icon: TrendingUp,
                    label: "Regular Updates",
                    color: "from-sky-500 to-cyan-500",
                  },
                ].map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <motion.div
                      key={badge.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r ${badge.color} bg-opacity-10 backdrop-blur-sm border border-white/20 dark:border-slate-700/50`}
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#2563eb]" />
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {badge.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden md:block"
          >
            <div className="absolute -right-2 -top-2 md:-right-4 md:-top-4 h-48 w-48 md:h-72 md:w-72 rounded-full bg-blue-400/20 blur-3xl"></div>

            {/* Main Card */}
            <div className="relative rounded-2xl md:rounded-3xl border border-blue-200/50 dark:border-blue-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl ring-2 ring-blue-500/20 dark:ring-blue-700/20 overflow-hidden group hover:scale-105 transition-transform duration-500">
              {/* Gradient Background */}
              <div className="aspect-square relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100 dark:from-blue-900/30 dark:via-sky-900/30 dark:to-cyan-900/30" />

                {/* Animated Orbs */}
                <motion.div
                  animate={{
                    x: [0, 20, 0],
                    y: [0, 20, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-10 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-400/30 blur-2xl"
                />
                <motion.div
                  animate={{
                    x: [0, -20, 0],
                    y: [0, -20, 0],
                    rotate: [0, -10, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-sky-400/30 to-blue-400/30 blur-2xl"
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 md:p-8 text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 mb-4 md:mb-6 shadow-xl"
                  >
                    <BookOpen className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1 md:mb-2">
                    Learning Made Simple
                  </h3>
                  <p className="text-sm md:text-base lg:text-lg text-slate-600 dark:text-slate-400">
                    Explore curated content
                  </p>
                </div>
              </div>

              {/* Floating Stats Card */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 rounded-xl md:rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-3 md:p-4 lg:p-5 shadow-xl ring-1 ring-black/5"
              >
                <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg md:rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-600 dark:text-blue-400">
                    <CheckCircle size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">
                      {blogCount}+ Blogs
                    </p>
                    <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-blue-400 text-blue-400" />
                      Published & verified
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

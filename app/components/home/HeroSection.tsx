"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, ArrowRight, Sparkles, TrendingUp, Users, Award, Star } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  blogCount: number;
}

export default function HeroSection({ blogCount }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24">
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
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
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
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-400/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
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
              className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 py-2 text-sm font-semibold text-[#2563eb] ring-1 ring-purple-200/50 dark:ring-purple-700/50 shadow-lg"
            >
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>Minimalistic Learning Platform</span>
              <Sparkles className="w-4 h-4" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight"
            >
              <span className="block text-slate-900 dark:text-slate-100">
                Master new skills
              </span>
              <span className="block mt-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                at your own pace.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-lg text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-400"
            >
              Join thousands of learners. Access high-quality content, blogs, and resources curated by industry experts.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Link 
                href="/blog"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/60 hover:scale-105"
              >
                Explore Blog
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/blog/createblogs"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-8 py-4 text-base font-semibold text-slate-700 dark:text-slate-300 transition-all hover:bg-white dark:hover:bg-slate-800 hover:scale-105 hover:border-[#2563eb]/50"
              >
                <Sparkles className="w-5 h-5" />
                Create Blog
              </Link>
            </motion.div>
            
            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-6 space-y-3"
            >
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Trusted by learners worldwide</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Users, label: "Industry Experts", color: "from-blue-500 to-cyan-500" },
                  { icon: Award, label: "Verified Content", color: "from-purple-500 to-pink-500" },
                  { icon: TrendingUp, label: "Regular Updates", color: "from-indigo-500 to-purple-500" },
                ].map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <motion.div
                      key={badge.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${badge.color} bg-opacity-10 backdrop-blur-sm border border-white/20 dark:border-slate-700/50`}
                    >
                      <Icon className="w-4 h-4 text-[#2563eb]" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{badge.label}</span>
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
            <div className="absolute -right-4 -top-4 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl"></div>
            
            {/* Main Card */}
            <div className="relative rounded-3xl border border-purple-200/50 dark:border-purple-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl ring-2 ring-purple-500/20 dark:ring-purple-700/20 overflow-hidden group hover:scale-105 transition-transform duration-500">
              {/* Gradient Background */}
              <div className="aspect-square relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 dark:from-purple-900/30 dark:via-indigo-900/30 dark:to-pink-900/30" />
                
                {/* Animated Orbs */}
                <motion.div
                  animate={{ 
                    x: [0, 20, 0],
                    y: [0, 20, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-2xl"
                />
                <motion.div
                  animate={{ 
                    x: [0, -20, 0],
                    y: [0, -20, 0],
                    rotate: [0, -10, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-400/30 blur-2xl"
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 mb-6 shadow-xl"
                  >
                    <BookOpen className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Learning Made Simple
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Explore curated content
                  </p>
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-8 right-8 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-5 shadow-xl ring-1 ring-black/5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-600 dark:text-green-400">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{blogCount}+ Blogs</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
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

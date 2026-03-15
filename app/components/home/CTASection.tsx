"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen, TrendingUp } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 via-sky-500/20 to-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-3xl border border-blue-200/50 dark:border-blue-700/50 bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 px-8 py-20 md:py-24 text-center text-white shadow-2xl ring-2 ring-blue-500/30 dark:ring-blue-700/30 sm:px-12"
      >
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.1)_50%,transparent_70%)] bg-[length:200%_200%]"
        />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white mb-6"
          >
            <Sparkles className="w-3 h-3" />
            Get Started
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
          >
            Ready to start your
            <br />
            <span className="text-white/90">learning journey?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mx-auto mt-4 mb-10 max-w-2xl text-lg md:text-xl text-blue-100 leading-relaxed"
          >
            Join thousands of learners today. Explore our blog library and start creating your own content to share knowledge with the community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/auth/login"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-xl transition-all hover:bg-slate-100 hover:scale-105 hover:shadow-2xl"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/blog"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/20 hover:scale-105 hover:border-white/50"
            >
              <BookOpen className="w-5 h-5" />
              Explore Blogs
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Join 50,000+ learners</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/50" />
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Access unlimited content</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/50" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Start creating today</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Award, Sparkles, Zap, Shield } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative rounded-3xl border border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-8 shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:shadow-2xl overflow-hidden"
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-indigo-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:via-indigo-500/5 group-hover:to-pink-500/5 transition-all duration-300 rounded-3xl" />
      
      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 group-hover:shadow-lg"
      >
        {icon}
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#2563eb] transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      icon: <Users className="text-[#2563eb] w-8 h-8" />,
      title: "Expert Contributors",
      description: "Learn from industry professionals who share real-world insights and practical knowledge.",
    },
    {
      icon: <TrendingUp className="text-purple-600 w-8 h-8" />,
      title: "Interactive Content",
      description: "Engage with high-quality blogs, tutorials, and resources designed for effective learning.",
    },
    {
      icon: <Award className="text-pink-600 w-8 h-8" />,
      title: "Verified Quality",
      description: "All content is curated and verified to ensure accuracy and relevance for learners.",
    },
    {
      icon: <Sparkles className="text-indigo-600 w-8 h-8" />,
      title: "Curated Collections",
      description: "Handpicked content organized by topics to help you find exactly what you need.",
    },
    {
      icon: <Zap className="text-amber-600 w-8 h-8" />,
      title: "Fast Learning",
      description: "Optimized content delivery and intuitive interface for the best learning experience.",
    },
    {
      icon: <Shield className="text-emerald-600 w-8 h-8" />,
      title: "Secure Platform",
      description: "Your data and progress are protected with enterprise-grade security measures.",
    },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#2563eb] mb-6 shadow-lg"
          >
            <Sparkles className="w-3 h-3" />
            Features
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
            Why choose <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">Minimalistic Learning?</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We focus on providing the best learning experience possible with modern tools and curated content.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

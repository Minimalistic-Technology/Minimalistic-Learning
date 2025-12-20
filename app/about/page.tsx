"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Target, Users, Lightbulb, Heart, Sparkles, ArrowRight, BookOpen, TrendingUp, Award } from "lucide-react";
import Footer from "../components/Footer";
import Team from "../components/Team";
import Link from "next/link";
import { useRef } from "react";

const values = [
  {
    icon: Target,
    title: "Focus on Learning",
    description: "We believe in creating environments that eliminate distractions and promote deep, meaningful learning.",
    color: "from-blue-500 to-cyan-500",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Learning is better together. We foster a supportive community where everyone can grow.",
    color: "from-blue-500 to-sky-500",
    gradient: "from-blue-600 to-sky-600",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously improve our platform with the latest technologies and learning methodologies.",
    color: "from-sky-500 to-cyan-500",
    gradient: "from-sky-600 to-cyan-600",
  },
  {
    icon: Heart,
    title: "Accessibility",
    description: "Education should be accessible to everyone, regardless of background or circumstances.",
    color: "from-cyan-500 to-blue-500",
    gradient: "from-cyan-600 to-blue-600",
  },
];

const stats = [
  { number: "10K+", label: "Active Learners", delay: 0, icon: Users },
  { number: "500+", label: "Learning Paths", delay: 0.1, icon: BookOpen },
  { number: "50+", label: "Expert Instructors", delay: 0.2, icon: Award },
  { number: "100+", label: "Countries", delay: 0.3, icon: TrendingUp },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-sky-50/30 to-cyan-50/20 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900 pt-20 sm:pt-24 overflow-hidden">
      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 overflow-hidden pointer-events-none -z-10"
      >
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 dark:from-blue-900/20 via-transparent to-cyan-500/10 dark:to-cyan-900/20 bg-[length:200%_200%]"
        />
        {/* Floating orbs */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-900/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-900/30 rounded-full blur-3xl"
        />
      </motion.div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 py-2 text-xs sm:text-sm font-semibold text-[#2563eb] ring-1 ring-blue-200/50 dark:ring-blue-700/50 shadow-lg mb-6"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              About Us
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight"
            >
              About{" "}
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                Minimalistic Learning
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto"
            >
              We're on a mission to make learning simple, focused, and effective. 
              Our platform is designed to help you achieve your goals without the noise.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats with enhanced design */}
      <section ref={statsRef} className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/20" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: stat.delay,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative text-center p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <motion.p
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
                  >
                    {stat.number}
                  </motion.p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section - Enhanced */}
      <section ref={missionRef} className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 py-2 text-xs sm:text-sm font-semibold text-[#2563eb] ring-1 ring-blue-200/50 dark:ring-blue-700/50 shadow-lg w-fit mb-4"
            >
              <Target className="w-3 h-3 sm:w-4 sm:h-4" />
              Our Mission
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100"
            >
              Focus First,{" "}
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                Learn Better
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4 text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              <p>
                In a world full of distractions, we've created a learning platform that puts focus first. 
                Minimalistic Learning is built on the principle that <strong className="text-slate-900 dark:text-slate-100">less is more</strong>—less clutter, less noise, 
                more learning, more progress.
              </p>
              <p>
                We believe that the best learning experiences are simple, intuitive, and designed to help 
                you achieve your goals without unnecessary complexity. Every feature, every design choice, 
                and every piece of content is crafted with this philosophy in mind.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values with enhanced cards */}
      <section ref={valuesRef} className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-950 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400/10 dark:bg-blue-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-400/10 dark:bg-cyan-900/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={valuesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 py-2 text-xs sm:text-sm font-semibold text-[#2563eb] ring-1 ring-blue-200/50 dark:ring-blue-700/50 shadow-lg mb-6"
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
              Our Values
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={valuesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4"
            >
              The Principles That{" "}
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                Guide Us
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={valuesInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              The core beliefs that shape everything we do
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={valuesInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 blur-xl`}
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.6 }}
                  />

                  <motion.div
                    className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${value.gradient} mb-4 sm:mb-6 relative z-10 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  </motion.div>
                  <motion.h3
                    className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 sm:mb-3 relative z-10 group-hover:text-[#2563eb] transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {value.title}
                  </motion.h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">
                    {value.description}
                  </p>

                  {/* Floating sparkle */}
                  <motion.div
                    className="absolute top-4 right-4"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    <Sparkles className="h-5 w-5 text-blue-500/70 dark:text-blue-400/50" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team />

      {/* Enhanced CTA */}
      <section ref={ctaRef} className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-cyan-500/10 dark:from-blue-900/20 dark:via-sky-900/10 dark:to-cyan-900/20" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={ctaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 py-2 text-xs sm:text-sm font-semibold text-[#2563eb] ring-1 ring-blue-200/50 dark:ring-blue-700/50 shadow-lg mb-4"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              Get Started
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={ctaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100"
            >
              Ready to Start{" "}
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                Your Journey?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Join thousands of learners who are already on their journey to success
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4"
            >
              <Link href="/courses">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 text-sm sm:text-base"
                >
                  Explore Courses
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/resources">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl text-slate-900 dark:text-slate-100 font-semibold rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:border-[#2563eb]/50 transition-all duration-300 text-sm sm:text-base"
                >
                  Browse Resources
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

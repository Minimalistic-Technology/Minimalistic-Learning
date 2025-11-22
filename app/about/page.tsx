"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Target, Users, Lightbulb, Heart, Sparkles } from "lucide-react";
import Footer from "../components/Footer";
import Team from "../components/Team";
import { useRef } from "react";

const values = [
  {
    icon: Target,
    title: "Focus on Learning",
    description: "We believe in creating environments that eliminate distractions and promote deep, meaningful learning.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Learning is better together. We foster a supportive community where everyone can grow.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously improve our platform with the latest technologies and learning methodologies.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Heart,
    title: "Accessibility",
    description: "Education should be accessible to everyone, regardless of background or circumstances.",
    color: "from-pink-500 to-rose-500",
  },
];

const stats = [
  { number: "10K+", label: "Active Learners", delay: 0 },
  { number: "500+", label: "Learning Paths", delay: 0.1 },
  { number: "50+", label: "Expert Instructors", delay: 0.2 },
  { number: "100+", label: "Countries", delay: 0.3 },
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
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-16 overflow-hidden">
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
          className="absolute inset-0 bg-gradient-to-br from-primary/10 dark:from-primary/5 via-transparent to-primary/10 dark:to-primary/5 bg-[length:200%_200%]"
        />
      </motion.div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100"
            >
              About <span className="text-primary">Minimalistic Learning</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              We're on a mission to make learning simple, focused, and effective. 
              Our platform is designed to help you achieve your goals without the noise.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats with counter animation */}
      <section ref={statsRef} className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => {
          const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000;
          const randomY = Math.random() * 400;
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 dark:bg-primary/20 rounded-full"
              initial={{
                x: randomX,
                y: randomY,
              }}
              animate={{
                y: [null, Math.random() * 400],
                x: [null, typeof window !== 'undefined' ? Math.random() * window.innerWidth : randomX + 200],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center cursor-default"
              >
                <motion.p
                  className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2"
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
                >
                  {stat.number}
                </motion.p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section ref={missionRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100"
            >
              Our Mission
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              In a world full of distractions, we've created a learning platform that puts focus first. 
              Minimalistic Learning is built on the principle that less is more—less clutter, less noise, 
              more learning, more progress.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              We believe that the best learning experiences are simple, intuitive, and designed to help 
              you achieve your goals without unnecessary complexity. Every feature, every design choice, 
              and every piece of content is crafted with this philosophy in mind.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Values with interactive cards */}
      <section ref={valuesRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={valuesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4"
            >
              Our Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={valuesInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className="group relative p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden"
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
                    className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4 relative z-10"
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <motion.h3
                    className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 relative z-10"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {value.title}
                  </motion.h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm relative z-10">
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
                    <Sparkles className="h-5 w-5 text-primary/70 dark:text-primary/50" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team />

      {/* CTA */}
      <section ref={ctaRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={ctaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100"
            >
              Ready to Start Learning?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-slate-600 dark:text-slate-400"
            >
              Join thousands of learners who are already on their journey
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <motion.a
                href="/courses"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
              >
                Explore Courses
              </motion.a>
              <motion.a
                href="/resources"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Browse Resources
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

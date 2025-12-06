"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Users, BookOpen, Star, Sparkles } from "lucide-react";
import { useRef } from "react";

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects.",
    duration: "12 weeks",
    students: "5.2K",
    rating: 4.8,
    level: "Beginner",
    category: "Web Development",
    color: "from-blue-500 to-cyan-500",
    image: "/images/blog.png",
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Learn Python programming, data analysis, visualization, and machine learning basics.",
    duration: "10 weeks",
    students: "3.8K",
    rating: 4.9,
    level: "Intermediate",
    category: "Data Science",
    color: "from-purple-500 to-pink-500",
    image: "/images/blog1.png",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description: "Create beautiful interfaces with design principles, Figma, and user research methods.",
    duration: "8 weeks",
    students: "4.5K",
    rating: 4.7,
    level: "Beginner",
    category: "Design",
    color: "from-pink-500 to-rose-500",
    image: "/images/blog2.png",
  },
  {
    id: 4,
    title: "Mobile App Development",
    description: "Build iOS and Android apps using React Native and modern mobile development practices.",
    duration: "14 weeks",
    students: "2.9K",
    rating: 4.6,
    level: "Advanced",
    category: "Mobile Development",
    color: "from-emerald-500 to-teal-500",
    image: "/images/blog3.png",
  },
  {
    id: 5,
    title: "Cloud Computing Essentials",
    description: "Master AWS, Azure, and GCP. Learn infrastructure, deployment, and cloud architecture.",
    duration: "10 weeks",
    students: "2.1K",
    rating: 4.8,
    level: "Intermediate",
    category: "Cloud",
    color: "from-orange-500 to-amber-500",
    image: "/images/blog.png",
  },
  {
    id: 6,
    title: "Cybersecurity Fundamentals",
    description: "Understand security principles, ethical hacking, and protect systems from threats.",
    duration: "12 weeks",
    students: "1.8K",
    rating: 4.9,
    level: "Intermediate",
    category: "Security",
    color: "from-red-500 to-rose-500",
    image: "/images/blog1.png",
  },
];

const categories = ["All", "Web Development", "Data Science", "Design", "Mobile Development", "Cloud", "Security"];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const filteredCourses = selectedCategory === "All" 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-16 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
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
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <BookOpen className="h-4 w-4" />
            </motion.div>
            <span>Our Courses</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            Explore Learning <span className="text-primary">Opportunities</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Choose from our curated collection of courses designed to help you achieve your goals
          </motion.p>
        </motion.div>

        {/* Categories with spring animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.6 + index * 0.05,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-lg shadow-primary/50"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Courses Grid with stagger animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
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
                  className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-10 blur-xl`}
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

                <div className="relative z-10">
                  {/* Course Image */}
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="mb-4">
                    <motion.div
                      className="inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium mb-2"
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {course.category}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-500 dark:text-slate-400">
                    <motion.div
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.1, x: 5 }}
                    >
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.1, x: 5 }}
                    >
                      <Users className="h-4 w-4" />
                      <span>{course.students}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.1, rotate: [0, 15, -15, 0] }}
                    >
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {course.level}
                    </span>
                    <Link href={`/courses/${course.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        Enroll
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </motion.button>
                    </Link>
                  </div>
                </div>

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
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

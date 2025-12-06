"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { FileText, Video, Book, Download, ExternalLink, Search, Sparkles } from "lucide-react";
import { useState, useRef } from "react";

const resources = [
  {
    id: 1,
    title: "JavaScript Fundamentals Guide",
    type: "PDF",
    icon: FileText,
    description: "Comprehensive guide covering ES6+, async/await, and modern JavaScript patterns.",
    downloads: "12.5K",
    category: "Web Development",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "React Best Practices Video Series",
    type: "Video",
    icon: Video,
    description: "10-part video series on building scalable React applications with best practices.",
    downloads: "8.3K",
    category: "Web Development",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Python Data Structures Handbook",
    type: "PDF",
    icon: Book,
    description: "Complete reference for Python data structures, algorithms, and optimization techniques.",
    downloads: "15.2K",
    category: "Programming",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    title: "UI Design System Templates",
    type: "Download",
    icon: Download,
    description: "Figma templates and design system components for modern web applications.",
    downloads: "6.8K",
    category: "Design",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 5,
    title: "Cloud Architecture Patterns",
    type: "PDF",
    icon: FileText,
    description: "Learn about microservices, serverless, and cloud-native architecture patterns.",
    downloads: "4.9K",
    category: "Cloud",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: 6,
    title: "Mobile App Development Tutorial",
    type: "Video",
    icon: Video,
    description: "Step-by-step tutorial on building cross-platform mobile apps with React Native.",
    downloads: "7.1K",
    category: "Mobile Development",
    color: "from-indigo-500 to-purple-500",
  },
];

const categories = ["All", "Web Development", "Programming", "Design", "Cloud", "Mobile Development"];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <Book className="h-4 w-4" />
            </motion.div>
            <span>Resource Library</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            Learning <span className="text-primary">Resources</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Access free guides, templates, videos, and documentation to accelerate your learning
          </motion.p>
        </motion.div>

        {/* Search with focus animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative max-w-2xl mx-auto"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              <Search className="h-5 w-5 text-slate-400" />
            </motion.div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </motion.div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
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
                delay: 0.7 + index * 0.05,
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

        {/* Resources Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
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
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="group relative p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-0 group-hover:opacity-10 blur-xl`}
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

                  <div className="flex items-start gap-4 mb-4 relative z-10">
                    <motion.div
                      className="p-3 rounded-lg bg-primary/10 text-primary"
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>
                    <div className="flex-1">
                      <motion.div
                        className="inline-block px-2 py-1 rounded text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 mb-2"
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        {resource.type}
                      </motion.div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {resource.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700 relative z-10">
                    <motion.span
                      className="text-sm text-slate-500 dark:text-slate-400"
                      whileHover={{ scale: 1.1, x: 5 }}
                    >
                      {resource.downloads} downloads
                    </motion.span>
                    <Link href={`/resources/${resource.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-4 py-2 text-primary font-medium hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        View
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </motion.div>
                      </motion.button>
                    </Link>
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
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

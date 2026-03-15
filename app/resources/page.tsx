"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { FileText, Video, Book, Download, ExternalLink, Search, Sparkles, Filter, Grid3x3, List, ArrowRight, TrendingUp } from "lucide-react";
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
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    id: 2,
    title: "React Best Practices Video Series",
    type: "Video",
    icon: Video,
    description: "10-part video series on building scalable React applications with best practices.",
    downloads: "8.3K",
    category: "Web Development",
    color: "from-blue-500 to-sky-500",
    gradient: "from-blue-600 to-sky-600",
  },
  {
    id: 3,
    title: "Python Data Structures Handbook",
    type: "PDF",
    icon: Book,
    description: "Complete reference for Python data structures, algorithms, and optimization techniques.",
    downloads: "15.2K",
    category: "Programming",
    color: "from-blue-500 to-cyan-500",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    id: 4,
    title: "UI Design System Templates",
    type: "Download",
    icon: Download,
    description: "Figma templates and design system components for modern web applications.",
    downloads: "6.8K",
    category: "Design",
    color: "from-sky-500 to-cyan-500",
    gradient: "from-sky-600 to-cyan-600",
  },
  {
    id: 5,
    title: "Cloud Architecture Patterns",
    type: "PDF",
    icon: FileText,
    description: "Learn about microservices, serverless, and cloud-native architecture patterns.",
    downloads: "4.9K",
    category: "Cloud",
    color: "from-sky-500 to-blue-500",
    gradient: "from-sky-600 to-blue-600",
  },
  {
    id: 6,
    title: "Mobile App Development Tutorial",
    type: "Video",
    icon: Video,
    description: "Step-by-step tutorial on building cross-platform mobile apps with React Native.",
    downloads: "7.1K",
    category: "Mobile Development",
    color: "from-cyan-500 to-blue-500",
    gradient: "from-cyan-600 to-blue-600",
  },
];

const categories = ["All", "Web Development", "Programming", "Design", "Cloud", "Mobile Development"];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-sky-50/30 to-cyan-50/20 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900 pt-20 sm:pt-24 overflow-hidden">
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
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl text-[#2563eb] text-xs sm:text-sm font-semibold ring-1 ring-blue-200/50 dark:ring-blue-700/50 shadow-lg mb-3 sm:mb-4"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Book className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </motion.div>
            <span>Resource Library</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4"
          >
            Learning{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
              Resources
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4"
          >
            Access free guides, templates, videos, and documentation to accelerate your learning journey
          </motion.p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Search */}
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative flex-1 w-full"
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all shadow-lg"
                />
              </motion.div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl p-1 border border-slate-200 dark:border-slate-700 shadow-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6"
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
                  className={`px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50"
                      : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Results Count */}
        {filteredResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-center sm:text-left"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Found <span className="font-semibold text-[#2563eb]">{filteredResources.length}</span> resource{filteredResources.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        )}

        {/* Resources Grid/List */}
        <AnimatePresence mode="wait">
          {filteredResources.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${searchQuery}-${viewMode}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                : "flex flex-col gap-4 sm:gap-6"
              }
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
                      scale: viewMode === "grid" ? 1.02 : 1,
                      rotateY: viewMode === "grid" ? 5 : 0,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    className={`group relative ${
                      viewMode === "grid" 
                        ? "p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                        : "p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row gap-6"
                    }`}
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

                    {/* Icon */}
                    <motion.div
                      className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br ${resource.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300 relative z-10 ${
                        viewMode === "list" ? "flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20" : "mb-4 sm:mb-6"
                      }`}
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className={`flex-1 relative z-10 ${viewMode === "list" ? "flex flex-col justify-between" : ""}`}>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <motion.span
                            className="inline-block px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.3 }}
                          >
                            {resource.type}
                          </motion.span>
                          <motion.span
                            className="text-xs font-medium text-slate-500 dark:text-slate-400"
                            whileHover={{ scale: 1.1 }}
                          >
                            {resource.category}
                          </motion.span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 sm:mb-3 group-hover:text-[#2563eb] transition-colors line-clamp-2">
                          {resource.title}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {resource.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className={`flex items-center justify-between pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700 mt-4 sm:mt-6`}>
                        <motion.div
                          className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
                          whileHover={{ scale: 1.1, x: 5 }}
                        >
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-semibold">{resource.downloads}</span>
                          <span className="hidden sm:inline">downloads</span>
                        </motion.div>
                        <Link href={`/resources/${resource.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 text-sm sm:text-base"
                          >
                            View
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
                      <Sparkles className="h-5 w-5 text-blue-500/70 dark:text-blue-400/50" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16 sm:py-20 md:py-24"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-6">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                No resources found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                Clear Filters
                <Filter className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

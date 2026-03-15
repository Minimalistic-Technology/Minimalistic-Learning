"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Filter, Grid3x3, List, PenSquare, Search, X } from "lucide-react";
import { ViewMode } from "../types";

interface Props {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  categories: string[];
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  isAuthenticated: boolean;
  error: string | null;
}

export const BlogFilters = ({
  searchTerm, setSearchTerm,
  selectedCategory, setSelectedCategory,
  categories, showFilters, setShowFilters,
  viewMode, setViewMode,
  isAuthenticated, error,
}: Props) => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
    <div className="rounded-3xl border border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 p-4 sm:p-6 shadow-lg">
      {error && (
        <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search blogs by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Category</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl p-2 z-50 max-h-96 overflow-y-auto"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => { setSelectedCategory(category || "All"); setShowFilters(false); }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 text-white"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white dark:bg-slate-700 text-[#2563eb] shadow-sm" : "text-slate-500"}`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-white dark:bg-slate-700 text-[#2563eb] shadow-sm" : "text-slate-500"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {isAuthenticated && (
            <Link
              href="/blog/createblogs"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:scale-105"
            >
              <PenSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Create Blog</span>
              <span className="sm:hidden">Create</span>
            </Link>
          )}
        </div>
      </div>

      {(searchTerm || selectedCategory !== "All") && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-2">
          {searchTerm && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-700 text-sm font-medium">
              Search: &quot;{searchTerm}&quot;
              <button onClick={() => setSearchTerm("")}><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedCategory !== "All" && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-100 dark:bg-sky-900/20 text-sky-700 text-sm font-medium">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory("All")}><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}
    </div>
  </section>
);
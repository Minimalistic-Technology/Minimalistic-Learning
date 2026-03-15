"use client";

import React, { useMemo, useState, useEffect } from "react";
import ScrollProgressBar from "./components/ScrollerProgress";
import HeroSection from "./components/home/HeroSection";
import StatsSection from "./components/home/StatsSection";
import FeaturesSection from "./components/home/FeaturesSection";
import PopularBlogsSection from "./components/home/PopularBlogsSection";
import CTASection from "./components/home/CTASection";
import { useGetAllBlogs } from "@/features/blog/hooks/use-blogs";
import { Blog } from "@/features/blog/types";
import { cn } from "./lib/utils";
import { useAuth } from "./context/AuthContext";

export default function LandingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { data: blogsData, isLoading, isError } = useGetAllBlogs();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      <h1>Loading....</h1>;
    }
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    if (blogsData) {
      setBlogs(blogsData);
    }
  }, [blogsData]);

  // Calculate stats from blog data
  const totalCategories = Array.from(
    new Set(blogs.map((blog) => blog.category ?? "General")),
  ).length;

  const totalAuthors = Array.from(
    new Set(
      blogs.map((blog) =>
        typeof blog.authorId === "string" ? blog.authorId : blog.authorId._id,
      ),
    ),
  ).length;

  // Get top 3 blogs (most recent or highest rated)
  // const popularBlogs = useMemo(() => {
  //   return blogs
  //     .filter((blog) => blog.verified !== false)
  //     .sort((a, b) => {
  //       // Sort by rating first, then by date
  //       const ratingDiff = (b.rating ?? 5) - (a.rating ?? 5);
  //       if (ratingDiff !== 0) return ratingDiff;

  //       const aDate = a.date ? new Date(a.date).getTime() : 0;
  //       const bDate = b.date ? new Date(b.date).getTime() : 0;
  //       return bDate - aDate;
  //     })
  //     .slice(0, 3);
  // }, [blogs]);

  return (
    <div
      className={cn(
        "min-h-screen dark:from-slate-950 dark:via-blue-950/20 dark:to-cyan-950/20 dark:text-slate-100",
        "bg-gradient-to-br from-blue-50 via-sky-50/50 to-cyan-50/50 text-slate-800",
      )}
    >
      <div className="pt-6 sm:pt-8">
        <HeroSection blogCount={blogs.length} />

        <StatsSection
          blogCount={Number(blogs.length)}
          categoryCount={totalCategories}
          // authorCount={totalAuthors}
          // averageRating={averageRating}
        />

        <FeaturesSection />

        <PopularBlogsSection blogs={blogs} />

        <CTASection />
      </div>
    </div>
  );
}

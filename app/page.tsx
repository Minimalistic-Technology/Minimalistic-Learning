"use client";

import React, { useMemo } from 'react';
import ScrollProgressBar from './components/ScrollerProgress';
import Footer from './components/Footer';
import HeroSection from './components/home/HeroSection';
import StatsSection from './components/home/StatsSection';
import FeaturesSection from './components/home/FeaturesSection';
import PopularBlogsSection from './components/home/PopularBlogsSection';
import CTASection from './components/home/CTASection';
import { blogs as staticBlogs } from '@/app/lib/blogData';

interface Blog {
  _id: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  author?: string;
  date?: string;
  verified?: boolean;
  rating?: number;
}

type SourceBlog = Partial<Blog> & { id?: string };

// Normalize blog data (same as blog page)
const normalizedBlogs: Blog[] = (staticBlogs as SourceBlog[]).map(
  (blog, index) => ({
    _id: blog.id ?? blog._id ?? `blog-${index}`,
    title: blog.title ?? "Untitled Blog",
    description:
      blog.description ??
      "Stay tuned for more insights from Minimalistic Learning.",
    image: blog.image,
    category: blog.category,
    author: blog.author,
    date: blog.date,
    verified: blog.verified ?? true,
    rating: blog.rating ?? 5,
  })
);

// Calculate stats from blog data
const totalCategories = Array.from(
  new Set(normalizedBlogs.map((blog) => blog.category ?? "General"))
).length;
const totalAuthors = Array.from(
  new Set(normalizedBlogs.map((blog) => blog.author ?? "Minimalistic Learning"))
).length;
const averageRating = normalizedBlogs.length > 0
  ? (normalizedBlogs.reduce((sum, blog) => sum + (blog.rating ?? 5), 0) / normalizedBlogs.length).toFixed(1)
  : "4.9";

export default function LandingPage() {
  // Get top 3 blogs (most recent or highest rated)
  const popularBlogs = useMemo(() => {
    return normalizedBlogs
      .filter(blog => blog.verified !== false)
      .sort((a, b) => {
        // Sort by rating first, then by date
        const ratingDiff = (b.rating ?? 5) - (a.rating ?? 5);
        if (ratingDiff !== 0) return ratingDiff;

        const aDate = a.date ? new Date(a.date).getTime() : 0;
        const bDate = b.date ? new Date(b.date).getTime() : 0;
        return bDate - aDate;
      })
      .slice(0, 3);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50/50 to-cyan-50/50 dark:from-slate-950 dark:via-blue-950/20 dark:to-cyan-950/20 text-slate-800 dark:text-slate-100">
      {/* <ScrollProgressBar /> */}

      <div className="pt-8 sm:pt-12">
      <HeroSection blogCount={normalizedBlogs.length} />

        <StatsSection
          blogCount={normalizedBlogs.length}
          categoryCount={totalCategories}
          authorCount={totalAuthors}
          averageRating={averageRating}
        />

        <FeaturesSection />

        <PopularBlogsSection blogs={popularBlogs} />

        <CTASection />
      </div>

      <Footer />
    </div>
  );
}

"use client"; 

import React, { useMemo, useState, useEffect } from 'react';
import ScrollProgressBar from './components/ScrollerProgress';
import Footer from './components/Footer';
import HeroSection from './components/home/HeroSection';
import StatsSection from './components/home/StatsSection';
import FeaturesSection from './components/home/FeaturesSection';
import PopularBlogsSection from './components/home/PopularBlogsSection';
import CTASection from './components/home/CTASection';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

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

export default function LandingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/posts`);
        const data = await res.json();

        const postsArray = Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data)
            ? data
            : [];

        const normalized: Blog[] = postsArray.map((post: any, index: number) => ({
          _id: post._id ?? post.id ?? `post-${index}`,
          slug: post.slug ?? post._id ?? post.id,
          title: post.title ?? "Untitled Blog",
          description: post.description ?? post.content ?? "Stay tuned for more insights from Minimalistic Learning.",
          image: post.image ?? post.coverImage,
          category: post.category ?? post.topic ?? "General",
          author: post.author?.name ?? post.author ?? "Minimalistic Learning",
          date: post.createdAt ?? post.updatedAt,
          verified: post.verified ?? true,
          rating: post.rating ?? 5,
        }));

        setBlogs(normalized);
      } catch (error) {
        console.error("Error fetching blogs for home page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Calculate stats from blog data
  const totalCategories = Array.from(
    new Set(blogs.map((blog) => blog.category ?? "General"))
  ).length;
  const totalAuthors = Array.from(
    new Set(blogs.map((blog) => blog.author ?? "Minimalistic Learning"))
  ).length;
  const averageRating = blogs.length > 0
    ? (blogs.reduce((sum, blog) => sum + (blog.rating ?? 5), 0) / blogs.length).toFixed(1)
    : "4.9";

  // Get top 3 blogs (most recent or highest rated)
  const popularBlogs = useMemo(() => {
    return blogs
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
  }, [blogs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50/50 to-cyan-50/50 dark:from-slate-950 dark:via-blue-950/20 dark:to-cyan-950/20 text-slate-800 dark:text-slate-100">
      {/* <ScrollProgressBar /> */}

      <div className="pt-6 sm:pt-8">
        <HeroSection blogCount={blogs.length} />

        <StatsSection
          blogCount={blogs.length}
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

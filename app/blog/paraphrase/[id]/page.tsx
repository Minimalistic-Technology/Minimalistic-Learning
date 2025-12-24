"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import ScrollProgressBar from "@/app/components/ScrollerProgress";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Bookmark,
  ThumbsUp,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";

interface ParaphrasedBlog {
  _id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image?: string;
  category?: string;
  paraphrased: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function formatContent(content: string): string {
  return content
    ?.replace(
      /<pre><code>/g,
      `<pre class="bg-gray-900 text-white text-sm rounded-lg p-6 overflow-x-auto my-6"><code>`
    )
    ?.replace(/<\/code><\/pre>/g, `</code></pre>`)
    ?.replace(
      /"([^"]+)"/g,
      `<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6 bg-blue-50 py-4 pr-4 rounded-r-md">"$1"</blockquote>`
    )
    ?.replace(/<h2>/g, `<h2 class="text-2xl font-bold mt-10 mb-6 text-gray-800">`)
    ?.replace(/<h3>/g, `<h3 class="text-xl font-bold mt-8 mb-4 text-gray-800">`)
    ?.replace(/<p>/g, `<p class="mb-6 text-gray-700 leading-relaxed">`)
    ?.replace(/<ul>/g, `<ul class="list-disc pl-6 mb-6 text-gray-700">`)
    ?.replace(/<ol>/g, `<ol class="list-decimal pl-6 mb-6 text-gray-700">`)
    ?.replace(/<li>/g, `<li class="mb-2">`)
    ?.replace(/<a /g, `<a class="text-blue-600 font-medium hover:underline" `);
}

function calculateReadingTime(content: string): number {
  const wordCount = content?.split(/\s+/)?.length ?? 0;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export default function ParaphrasedBlogPage() {
  const params = useParams();
  const blogId = params?.id as string;
  const [blog, setBlog] = useState<ParaphrasedBlog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/posts/${blogId}`);
        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        const post = data.post;

        if (post) {
          setBlog({
            _id: post._id,
            title: post.title,
            description: post.description,
            author: post.author?.name ?? post.author ?? "Minimalistic Learning",
            date: post.date ?? post.createdAt,
            image: post.image,
            category: post.category ?? "General",
            paraphrased: `In summary: ${(post.description || post.content)?.slice(0, 220) ??
              "More curated insights are on the way for this post."
              }`
          });
        }
      } catch (error) {
        console.error("Error fetching blog for paraphrase:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const relatedBlogs = useMemo((): ParaphrasedBlog[] => {
    // Dynamic fetching of related blogs could be implemented here
    // For now we'll return empty or implement a separate fetch if neededs
    return [];
  }, [blog]);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50/50 to-pink-50/50">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-6 py-4 text-slate-600 shadow">
          <div className="h-5 w-5 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          Loading insight...
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        {/* <ScrollProgressBar /> */}
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50/50 to-pink-50/50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20 px-4">
          <div className="max-w-md rounded-3xl border border-slate-200 bg-white/95 px-8 py-10 text-center shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
              Not found
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              Paraphrased blog unavailable
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              The article you are looking for may have been moved or removed.
            </p>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to blog hub
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(blog.paraphrased);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50/50 to-pink-50/50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20 pb-16">
      {/* <ScrollProgressBar /> */}
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 font-semibold text-[#2563eb] shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog hub
          </Link>
          <div className="flex items-center gap-2">
            {[Twitter, Facebook, Linkedin].map((Icon) => (
              <button
                key={Icon.displayName ?? Icon.name}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-lg backdrop-blur">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#2563eb]">
                Refined insight
              </span>
              <h1 className="text-4xl font-semibold leading-tight text-slate-900">
                {blog.title}
              </h1>
              <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563eb]/10 text-[#2563eb]">
                    {blog.author.charAt(0)}
                  </div>
                  {blog.author}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                  <Calendar className="h-4 w-4 text-[#2563eb]" />
                  {blog.date}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                  <Clock className="h-4 w-4 text-[#2563eb]" />
                  {readingTime} min read
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSaved((prev) => !prev)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${saved
                    ? "bg-[#2563eb]/10 text-[#2563eb]"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  <Bookmark
                    className={`h-4 w-4 ${saved ? "fill-[#2563eb] text-[#2563eb]" : ""
                      }`}
                  />
                  {saved ? "Saved" : "Save for later"}
                </button>
                <button
                  onClick={() => setLiked((prev) => !prev)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${liked
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  <ThumbsUp
                    className={`h-4 w-4 ${liked ? "fill-emerald-500 text-emerald-500" : ""
                      }`}
                  />
                  {liked ? "Appreciated" : "Appreciate"}
                </button>
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-200 shadow-inner">
              {blog.image ? (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                  Awaiting cover image
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 shadow-md">
                Paraphrased edition
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_0.85fr]">
          <article className="rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-sm">
            <div
              className="prose prose-slate max-w-none text-slate-700"
              dangerouslySetInnerHTML={{
                __html: formatContent(blog.paraphrased),
              }}
            />
          </article>
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Tags
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[blog.category ?? "General", "Refined", "Editorial"].map(
                  (tag) => (
                    <span
                      key={`${blog._id}-${tag}`}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600"
                    >
                      #{tag}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Share
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Spread this refined take with your community.
              </p>
              <div className="mt-4 flex gap-3">
                {[Twitter, Facebook, Linkedin].map((Icon) => (
                  <button
                    key={`share-${Icon.displayName ?? Icon.name}`}
                    className="flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 py-3 text-slate-600 transition hover:bg-white"
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Related articles
              </p>
              <p className="text-base text-slate-500">
                Discover more stories to paraphrase
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb]"
            >
              Explore library
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {relatedBlogs.map((item) => (
              <div
                key={item._id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-40 bg-slate-100">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
                    {item.category}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">{item.date}</p>
                  <Link
                    href={`/blog/${item._id}`}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb]"
                  >
                    Read article
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

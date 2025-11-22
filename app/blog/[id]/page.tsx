// 'use client';

// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import Footer from '@/app/components/Footer';
// import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, ThumbsUp, MessageCircle, Twitter, Facebook, Linkedin } from 'lucide-react';

// interface BlogType {
//   _id: string;
//   title: string;
//   content: string;
//   author: string;
//   date: string;
//   image: string;
// }

// export default function BlogDetailPage() {
//   const params = useParams();
//   const blogId = params?.id as string;

//   const [blog, setBlog] = useState<BlogType | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [liked, setLiked] = useState(false);
//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(`http://localhost:5000/blogs/${blogId}`);
//         setBlog(response.data);
//       } catch (error) {
//         console.error('Error fetching blog:', error);
//         setBlog(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (blogId) {
//       fetchBlog();
//     }
//   }, [blogId]);

//   const handleLike = () => {
//     setLiked(!liked);
//   };

//   const handleSave = () => {
//     setSaved(!saved);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
//         <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
//         <p className="mt-4 text-gray-600">Loading article...</p>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
//           <p className="text-red-600 text-xl font-semibold mb-2">🚫 Blog not found</p>
//           <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
//           <Link
//             href="/blog"
//             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Blogs
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const readingTime = calculateReadingTime(blog.content);

//   return (
//   <div className="bg-[#daf0ff] min-h-screen overflow-x-hidden">

//   {/* Header with image and back button */}
//   <div className="relative p-1">
//     <img
//       src={blog.image}
//       alt={blog.title}
//       className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-none sm:rounded-lg"
//     />
//     {/* Overlay for better back button visibility */}
//     <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-none sm:rounded-lg pointer-events-none"></div>

//     <div className="absolute top-4 left-4 z-30">
//       <Link
//         href="/blog"
//         className="flex items-center text-white bg-black/70 hover:bg-black/90 px-5 py-2 rounded-full font-semibold shadow-lg transition duration-300"
//       >
//         <ArrowLeft className="w-5 h-5 mr-3" />
//         Back
//       </Link>
//     </div>
//   </div>

//   {/* Title & Meta Info */}
//   <div className="max-w-screen-2xl mx-auto -mt-16 relative z-20 px-4 sm:px-6 lg:px-8">
//     <div className="bg-white rounded-xl shadow-xl p-8 sm:p-12 lg:p-16">
//       <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight break-words">
//         {blog.title}
//       </h1>

//       <div className="mt-6 flex flex-wrap items-center text-gray-700 gap-x-8 gap-y-4 text-base sm:text-lg font-medium">
//         <div className="flex items-center space-x-3">
//           <User className="w-5 h-5 text-blue-600" />
//           <span>{blog.author}</span>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Calendar className="w-5 h-5 text-blue-600" />
//           <span>{blog.date}</span>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Clock className="w-5 h-5 text-blue-600" />
//           <span>{readingTime} min read</span>
//         </div>
//       </div>

//       <div className="mt-10 flex flex-wrap items-center justify-between border-t border-gray-200 pt-8 gap-6">
//         <div className="flex items-center space-x-6">
//           <button className="flex items-center text-gray-700 hover:text-blue-700 transition duration-300 font-semibold">
//             <Share2 className="w-6 h-6 mr-2" />
//             Share
//           </button>
//           <button className="flex items-center text-gray-700 hover:text-blue-700 transition duration-300 font-semibold">
//             <Bookmark className="w-6 h-6 mr-2" />
//             Save
//           </button>
//         </div>
//         <div className="flex items-center space-x-3">
//           <div className="h-3 w-3 rounded-full bg-green-500 shadow-md"></div>
//           <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">Published</span>
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Blog Content */}
//   <div className="max-w-screen-2xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
//     <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 prose prose-blue max-w-full break-words">
//       <div dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }} />
//     </div>
//   </div>

//   {/* Author Bio */}
//   <div className="max-w-screen-2xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 mb-20">
//     <div className="bg-white rounded-xl shadow-lg p-8 flex items-center space-x-6">
//       <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg">
//         {blog.author.charAt(0)}
//       </div>
//       <div>
//         <h3 className="text-xl font-bold text-gray-900">About {blog.author}</h3>
//         <p className="text-gray-700 mt-2 text-base sm:text-lg max-w-xl">
//           Professional writer and content creator with expertise in web development and digital marketing.
//         </p>
//       </div>
//     </div>
//   </div>

//       {/* Related Posts */}
//       <div className="max-w-screen-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 mb-16">
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {blogs.slice(0, 2).map((relatedBlog) =>
//             relatedBlog.id !== blogId ? (
//               <Link href={`/blog/${relatedBlog.id}`} key={relatedBlog.id} className="block group">
//                 <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
//                   <div className="relative h-48">
//                     <img
//                       src={relatedBlog.image}
//                       alt={relatedBlog.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>
//                   <div className="p-6">
//                     <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition duration-300">
//                       {relatedBlog.title}
//                     </h3>
//                     <p className="text-sm text-gray-500 mt-2">{relatedBlog.date}</p>
//                   </div>
//                 </div>
//               </Link>
//             ) : null
//           )}
//         </div>
//       </div>

//   <Footer />
// </div>

//   );
// }

// // Format content with styling
// function formatContent(content: string): string {
//   return content
//     ?.replace(/<pre><code>/g, `<pre class="bg-gray-900 text-white text-sm rounded-lg p-6 overflow-x-auto my-6"><code>`)
//     ?.replace(/<\/code><\/pre>/g, `</code></pre>`)
//     ?.replace(/"([^"]+)"/g, `<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6 bg-blue-50 py-4 pr-4 rounded-r-md">"$1"</blockquote>`)
//     ?.replace(/<h2>/g, `<h2 class="text-2xl font-bold mt-10 mb-6 text-gray-800">`)
//     ?.replace(/<h3>/g, `<h3 class="text-xl font-bold mt-8 mb-4 text-gray-800">`)
//     ?.replace(/<p>/g, `<p class="mb-6 text-gray-700 leading-relaxed">`)
//     ?.replace(/<ul>/g, `<ul class="list-disc pl-6 mb-6 text-gray-700">`)
//     ?.replace(/<ol>/g, `<ol class="list-decimal pl-6 mb-6 text-gray-700">`)
//     ?.replace(/<li>/g, `<li class="mb-2">`)
//     ?.replace(/<a /g, `<a class="text-blue-600 font-medium hover:underline" `);
// }

// // Estimate reading time
// function calculateReadingTime(content: string): number {
//   const wordCount = content?.split(/\s+/)?.length;
//   return Math.max(1, Math.ceil(wordCount / 200));
// }

"use client";

import { useMemo, useState } from "react";
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
  Star,
} from "lucide-react";
import { blogs as staticBlogs } from "@/app/lib/blogData";

interface BlogType {
  _id: string;
  title: string;
  description: string;
  content?: string;
  author: string;
  date: string;
  image?: string;
  category?: string;
  tags?: string[];
}

const normalizedBlogs: BlogType[] = staticBlogs.map((blog, index) => ({
  _id: blog.id ?? `blog-${index}`,
  title: blog.title,
  description:
    blog.description ??
    "Stay tuned for more insights from Minimalistic Learning.",
  content: blog.content,
  author: blog.author ?? "Minimalistic Learning",
  date: blog.date ?? new Date().toISOString(),
  image: blog.image,
  category: blog.category ?? "General",
  tags: [blog.category ?? "General"],
}));

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params?.id as string;
  const blog = normalizedBlogs.find((item) => item._id === blogId) ?? null;
  const relatedBlogs = useMemo(() => {
    if (!blog) return [];
    return normalizedBlogs
      .filter(
        (item) =>
          item.category === blog.category && item._id !== blog._id
      )
      .slice(0, 2);
  }, [blog]);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
    console.log("Rating recorded locally:", value);
  };

  const cleanMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^#+\s+(.*$)/gm, '<p class="font-bold text-lg">$1</p>')
      .replace(/^- (.*$)/gm, "<li>• $1</li>")
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-blue-600">$1</a>'
      )
      .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-gray-100 px-1 rounded">$1</code>'
      );
  };

  const readingTime = calculateReadingTime(
    blog?.content ?? blog?.description ?? ""
  );

  if (!blog) {
    return (
      <div>
        <ScrollProgressBar />
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50/50 to-pink-50/50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20 px-4">
          <div className="max-w-md rounded-3xl border border-slate-200 bg-white/95 px-8 py-10 text-center shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
              Not found
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              Blog unavailable
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50/50 to-pink-50/50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20 pb-16">
      <ScrollProgressBar />
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
                {blog.category}
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
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    saved
                      ? "bg-[#2563eb]/10 text-[#2563eb]"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Bookmark
                    className={`h-4 w-4 ${
                      saved ? "fill-[#2563eb] text-[#2563eb]" : ""
                    }`}
                  />
                  {saved ? "Saved" : "Save for later"}
                </button>
                <button
                  onClick={() => setLiked((prev) => !prev)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    liked
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <ThumbsUp
                    className={`h-4 w-4 ${
                      liked ? "fill-emerald-500 text-emerald-500" : ""
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
                Editorial status:{" "}
                <span className="text-[#2563eb]">Published</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_0.85fr]">
          <article className="rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-sm">
            <div
              className="prose prose-slate max-w-none text-slate-700"
              dangerouslySetInnerHTML={{
                __html: cleanMarkdown(blog.content ?? blog.description),
              }}
            />
          </article>
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Rating
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                How helpful was this article?
              </h3>
              <div className="mt-4 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        value <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Your feedback lives locally in this demo.
              </p>
            </div>
            {blog.tags && blog.tags.length > 0 && (
              <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Tags
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Share
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Amplify this article across your network.
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

        {relatedBlogs.length > 0 && (
          <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Related articles
                </p>
                <p className="text-base text-slate-500">
                  Similar stories curated for you
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb]"
              >
                View all
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {relatedBlogs.map((relatedBlog) => (
                <div
                  key={relatedBlog._id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="h-40 overflow-hidden">
                    {relatedBlog.image ? (
                      <img
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-400">
                        Awaiting cover
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
                      {relatedBlog.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">
                      {relatedBlog.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {relatedBlog.date}
                    </p>
                    <Link
                      href={`/blog/${relatedBlog._id}`}
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
        )}
      </div>
      <Footer />
    </div>
  );
}

function calculateReadingTime(content: string): number {
  const wordCount = content?.split(/\s+/)?.length ?? 0;
  return Math.max(1, Math.ceil(wordCount / 200));
}

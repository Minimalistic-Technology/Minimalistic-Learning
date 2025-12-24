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

import { useState, useEffect } from "react";
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
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface BlogType {
  _id: string;
  slug?: string;
  title: string;
  description: string;
  content?: string;
  author: string;
  date: string;
  image?: string;
  category?: string;
  tags?: string[];
}

interface CommentType {
  _id: string;
  content: string;
  author?: string;
  createdAt?: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params?.id as string;
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentForm, setCommentForm] = useState({ author: "", content: "" });
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

    const fetchBlog = async () => {
      if (!blogId) return;
      setIsLoading(true);
      setError(null);
      try {
        // Try fetching by the provided identifier (could be slug or ID)
        let res = await fetch(`${API_BASE_URL}/api/v1/posts/${blogId}`);

        // If 404, try fetching all posts and find by ID or slug
        if (!res.ok && res.status === 404) {
          try {
            const allPostsRes = await fetch(`${API_BASE_URL}/api/v1/posts`);
            if (allPostsRes.ok) {
              const allData = await allPostsRes.json().catch(() => ({}));
              const postsArray = Array.isArray(allData?.items)
                ? allData.items
                : Array.isArray(allData?.posts)
                  ? allData.posts
                  : Array.isArray(allData)
                    ? allData
                    : [];

              // Find the blog by _id, id, or slug
              const foundPost = postsArray.find(
                (p: any) => p._id === blogId || p.id === blogId || p.slug === blogId
              );

              if (foundPost) {
                const data = { post: foundPost };
                const post = data?.post ?? foundPost ?? {};
                // Process the found post (continue with normalization below)
                const normalized: BlogType = {
                  _id: post._id ?? post.id ?? blogId,
                  slug: post.slug ?? post._id ?? post.id,
                  title: post.title ?? "Untitled Blog",
                  description:
                    post.description ??
                    post.content ??
                    "Stay tuned for more insights from Minimalistic Learning.",
                  content: post.content ?? post.description,
                  author:
                    post.author?.name ??
                    post.author ??
                    post.authorName ??
                    "Minimalistic Learning",
                  date: post.createdAt ?? post.updatedAt ?? new Date().toISOString(),
                  image: post.image ?? post.coverImage,
                  category: post.category ?? post.topic ?? "General",
                  tags: post.tags ?? (post.category ? [post.category] : []),
                };
                setBlog(normalized);

                if (post._id && isValidObjectId(post._id)) {
                  await fetchComments(post._id);
                }
                setIsLoading(false);
                return;
              }
            }
          } catch (fallbackErr) {
            console.error("Fallback fetch failed:", fallbackErr);
          }
          throw new Error(`Blog not found (404)`);
        }

        if (!res.ok) {
          throw new Error(`Failed to load blog (${res.status})`);
        }
        const data = await res.json().catch(() => ({}));
        const post = data?.post ?? data ?? {};
        const normalized: BlogType = {
          _id: post._id ?? post.id ?? blogId,
          slug: post.slug ?? post._id ?? post.id,
          title: post.title ?? "Untitled Blog",
          description:
            post.description ??
            post.content ??
            "Stay tuned for more insights from Minimalistic Learning.",
          content: post.content ?? post.description,
          author:
            post.author?.name ??
            post.author ??
            post.authorName ??
            "Minimalistic Learning",
          date: post.createdAt ?? post.updatedAt ?? new Date().toISOString(),
          image: post.image ?? post.coverImage,
          category: post.category ?? post.topic ?? "General",
          tags: post.tags ?? (post.category ? [post.category] : []),
        };
        setBlog(normalized);

        if (Array.isArray(post.relatedPosts)) {
          const mapped = post.relatedPosts.map((item: any, index: number) => ({
            _id: item._id ?? item.id ?? `related-${index}`,
            slug: item.slug ?? item._id ?? item.id,
            title: item.title ?? "Untitled Blog",
            description:
              item.description ??
              item.content ??
              "Stay tuned for more insights from Minimalistic Learning.",
            author:
              item.author?.name ??
              item.author ??
              item.authorName ??
              "Minimalistic Learning",
            date: item.createdAt ?? item.updatedAt ?? new Date().toISOString(),
            image: item.image ?? item.coverImage,
            category: item.category ?? item.topic ?? "General",
            tags: item.tags ?? (item.category ? [item.category] : []),
          }));
          setRelatedBlogs(mapped);
        } else {
          setRelatedBlogs([]);
        }

        if (post._id && isValidObjectId(post._id)) {
          await fetchComments(post._id);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load this blog right now.");
        setBlog(null);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchComments = async (id: string) => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/posts/${id}/comments`);
        const data = await res.json().catch(() => ({}));
        const commentsArray = Array.isArray(data?.comments)
          ? data.comments
          : Array.isArray(data)
            ? data
            : [];
        const normalizedComments: CommentType[] = commentsArray.map(
          (item: any, index: number) => ({
            _id: item._id ?? item.id ?? `comment-${index}`,
            content: item.content ?? item.text ?? "",
            author: item.author ?? item.name ?? "Anonymous",
            createdAt: item.createdAt,
          })
        );
        setComments(normalizedComments);
      } catch (err) {
        console.error("Failed to load comments", err);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleRating = (value: number) => {
    setRating(value);
    console.log("Rating recorded locally:", value);
  };

  const handleCommentSubmit = async () => {
    if (!blog?._id || !commentForm.content.trim()) return;
    setCommentSubmitting(true);
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const res = await fetch(`${API_BASE_URL}/api/v1/posts/${blog._id}/comments`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          author: commentForm.author || "Anonymous",
          content: commentForm.content,
        }),
      });
      if (!res.ok) {
        throw new Error(`Failed to post comment (${res.status})`);
      }
      setCommentForm({ author: "", content: "" });
      const data = await res.json().catch(() => ({}));
      const newComment = data?.comment ?? data;
      if (newComment?._id) {
        setComments((prev) => [
          {
            _id: newComment._id,
            content: newComment.content ?? newComment.text ?? "",
            author: newComment.author ?? newComment.name ?? "Anonymous",
            createdAt: newComment.createdAt,
          },
          ...prev,
        ]);
      } else {
        // Refresh list if structure unknown
        await fetch(`${API_BASE_URL}/api/v1/posts/${blog._id}/comments`)
          .then((r) => r.json())
          .then((d) => {
            const commentsArray = Array.isArray(d?.comments)
              ? d.comments
              : Array.isArray(d)
                ? d
                : [];
            setComments(
              commentsArray.map((item: any, index: number) => ({
                _id: item._id ?? item.id ?? `comment-${index}`,
                content: item.content ?? item.text ?? "",
                author: item.author ?? item.name ?? "Anonymous",
                createdAt: item.createdAt,
              }))
            );
          })
          .catch(() => { });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!commentId) return;
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      const headers: HeadersInit = {};
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const res = await fetch(`${API_BASE_URL}/api/v1/comments/${commentId}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c._id !== commentId));
      } else if (res.status === 401 || res.status === 403) {
        alert("Authentication required to delete comments. Please login.");
      }
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50/50 to-pink-50/50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20">
        {/* <ScrollProgressBar /> */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-6 py-4 text-slate-600 shadow">
          <div className="h-5 w-5 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          Loading blog...
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
      {/* <ScrollProgressBar /> */}
      <div className="mx-auto max-w-6xl px-4 pt-20 sm:pt-24 pb-10 space-y-8">
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
                      className={`h-6 w-6 ${value <= (hoverRating || rating)
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

        <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Comments
                </p>
                <p className="text-sm text-slate-500">
                  Join the conversation
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-3">
                {comments.length === 0 && (
                  <p className="text-sm text-slate-500">
                    No comments yet. Be the first to share your thoughts.
                  </p>
                )}
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {comment.author ?? "Anonymous"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {comment.createdAt
                          ? new Date(comment.createdAt).toLocaleString()
                          : ""}
                      </p>
                      <p className="mt-2 text-sm text-slate-700">
                        {comment.content}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-xs font-semibold text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-800">Add comment</p>
                <div className="mt-3 space-y-3">
                  <input
                    type="text"
                    value={commentForm.author}
                    onChange={(e) =>
                      setCommentForm((prev) => ({ ...prev, author: e.target.value }))
                    }
                    placeholder="Your name"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <textarea
                    value={commentForm.content}
                    onChange={(e) =>
                      setCommentForm((prev) => ({ ...prev, content: e.target.value }))
                    }
                    placeholder="Share your thoughts..."
                    rows={4}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={handleCommentSubmit}
                    disabled={commentSubmitting}
                    className="w-full rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600 disabled:opacity-60"
                  >
                    {commentSubmitting ? "Posting..." : "Post comment"}
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                      href={`/blog/${relatedBlog.slug ?? relatedBlog._id}`}
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

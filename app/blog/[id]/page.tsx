'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { blogs } from '@/app/lib/blogData';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params?.id as string;
  const [blog, setBlog] = useState<typeof blogs[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const found = blogs.find((b) => b.id === blogId);
    setBlog(found || null);
    setIsLoading(false);
  }, [blogId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <p className="text-red-600 text-xl font-semibold mb-2">🚫 Blog not found</p>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(blog.content);

  return (
  <div className="bg-[#daf0ff] min-h-screen overflow-x-hidden">

  {/* Header with image and back button */}
  <div className="relative p-1">
    <img
      src={blog.image}
      alt={blog.title}
      className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-none sm:rounded-lg"
    />
    {/* Overlay for better back button visibility */}
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-none sm:rounded-lg pointer-events-none"></div>

    <div className="absolute top-4 left-4 z-30">
      <Link
        href="/blog"
        className="flex items-center text-white bg-black/70 hover:bg-black/90 px-5 py-2 rounded-full font-semibold shadow-lg transition duration-300"
      >
        <ArrowLeft className="w-5 h-5 mr-3" />
        Back
      </Link>
    </div>
  </div>

  {/* Title & Meta Info */}
  <div className="max-w-screen-2xl mx-auto -mt-16 relative z-20 px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-xl shadow-xl p-8 sm:p-12 lg:p-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight break-words">
        {blog.title}
      </h1>

      <div className="mt-6 flex flex-wrap items-center text-gray-700 gap-x-8 gap-y-4 text-base sm:text-lg font-medium">
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-blue-600" />
          <span>{blog.author}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span>{blog.date}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-blue-600" />
          <span>{readingTime} min read</span>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between border-t border-gray-200 pt-8 gap-6">
        <div className="flex items-center space-x-6">
          <button className="flex items-center text-gray-700 hover:text-blue-700 transition duration-300 font-semibold">
            <Share2 className="w-6 h-6 mr-2" />
            Share
          </button>
          <button className="flex items-center text-gray-700 hover:text-blue-700 transition duration-300 font-semibold">
            <Bookmark className="w-6 h-6 mr-2" />
            Save
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-green-500 shadow-md"></div>
          <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">Published</span>
        </div>
      </div>
    </div>
  </div>

  {/* Blog Content */}
  <div className="max-w-screen-2xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 prose prose-blue max-w-full break-words">
      <div dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }} />
    </div>
  </div>

  {/* Author Bio */}
  <div className="max-w-screen-2xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 mb-20">
    <div className="bg-white rounded-xl shadow-lg p-8 flex items-center space-x-6">
      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg">
        {blog.author.charAt(0)}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900">About {blog.author}</h3>
        <p className="text-gray-700 mt-2 text-base sm:text-lg max-w-xl">
          Professional writer and content creator with expertise in web development and digital marketing.
        </p>
      </div>
    </div>
  </div>

  {/* Related Posts */}
  <div className="max-w-screen-2xl mx-auto mt-16 px-6 sm:px-8 lg:px-12 mb-28">
  <h2 className="text-3xl font-extrabold text-gray-900 mb-10 border-b-4 border-blue-600 pb-2">
    Related Posts
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
    {blogs.slice(0, 2).map(
      (relatedBlog) =>
        relatedBlog.id !== blogId && (
          <Link
            href={`/blog/${relatedBlog.id}`}
            key={relatedBlog.id}
            className="block group rounded-xl bg-gradient-to-tr from-blue-50 to-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-transparent hover:border-blue-300"
          >
            <div className="relative h-56 md:h-64 overflow-hidden rounded-t-xl">
              <img
                src={relatedBlog.image}
                alt={relatedBlog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="font-extrabold text-2xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-snug">
                {relatedBlog.title}
              </h3>
              <p className="text-sm text-gray-500 mt-3 tracking-wide">
                {new Date(relatedBlog.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </Link>
        )
    )}
  </div>
</div>


  <Footer />
</div>

  );
}

// Format content with styling
function formatContent(content: string): string {
  return content
    .replace(/<pre><code>/g, `<pre class="bg-gray-900 text-white text-sm rounded-lg p-6 overflow-x-auto my-6"><code>`)
    .replace(/<\/code><\/pre>/g, `</code></pre>`)
    .replace(/"([^"]+)"/g, `<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6 bg-blue-50 py-2 pr-4 rounded-r-md">"$1"</blockquote>`)
    .replace(/<h2>/g, `<h2 class="text-2xl font-bold mt-8 mb-4">`)
    .replace(/<h3>/g, `<h3 class="text-xl font-bold mt-6 mb-3">`)
    .replace(/<p>/g, `<p class="mb-4 text-gray-700">`)
    .replace(/<a /g, `<a class="text-blue-600 hover:underline" `);
}

// Reading time estimate
function calculateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

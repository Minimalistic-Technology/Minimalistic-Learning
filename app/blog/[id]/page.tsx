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
      {/* Header with image */}
      <div className="relative p-1">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-none sm:rounded-lg"
        />

        <div className="absolute top-4 left-4 z-30">
          <Link
            href="/blog"
            className="flex items-center text-white bg-black/70 hover:bg-black/90 px-4 py-2 rounded-full transition duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </div>
      </div>

      {/* Blog Title & Meta Info */}
      <div className="max-w-7xl mx-auto -mt-16 relative z-20 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight break-words">
            {blog.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center text-gray-600 gap-x-6 gap-y-3 text-sm sm:text-base">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2 text-blue-600" />
              <span className="font-medium">{blog.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-600" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between border-t border-gray-100 pt-6 gap-4">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-blue-600 transition duration-300">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>
              <button className="flex items-center text-gray-600 hover:text-blue-600 transition duration-300">
                <Bookmark className="w-5 h-5 mr-2" />
                Save
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-500">Published</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 overflow-hidden">
          <div
            className="prose prose-sm sm:prose md:prose-lg lg:prose-xl max-w-full break-words"
            dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
          />
        </div>
      </div>

      {/* Author Bio */}
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl font-bold">
              {blog.author.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">About {blog.author}</h3>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Professional writer and content creator with expertise in web development and digital marketing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogs.slice(0, 2).map((relatedBlog) =>
            relatedBlog.id !== blogId ? (
              <Link href={`/blog/${relatedBlog.id}`} key={relatedBlog.id} className="block group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48">
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition duration-300">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">{relatedBlog.date}</p>
                  </div>
                </div>
              </Link>
            ) : null
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

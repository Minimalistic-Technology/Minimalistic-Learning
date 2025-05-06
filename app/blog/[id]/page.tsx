'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { blogs } from '@/app/lib/blogData';
import Link from 'next/link';
import Footer from '@/app/components/Footer';

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params?.id as string;
  const [blog, setBlog] = useState<typeof blogs[0] | null>(null);

  useEffect(() => {
    const found = blogs.find((b) => b.id === blogId);
    setBlog(found || null);
  }, [blogId]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-600 text-xl font-semibold">🚫 Blog not found.</p>
        <Link href="/blog" className="mt-4 text-blue-600 hover:underline font-medium">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-[450px] object-cover shadow-md"
      />

      {/* Blog Title & Meta Info */}
      <div className="mt-10 px-6 md:px-20">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">{blog.title}</h1>
        <p className="text-sm text-gray-500 mt-2">
          By <span className="text-blue-600 font-semibold">{blog.author}</span> • {blog.date}
        </p>
      </div>

      {/* Blog Content */}
      <div
        className="mt-10 px-6 md:px-20 prose prose-neutral dark:prose-invert prose-lg max-w-none leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
      />

      {/* Back Button */}
      <div className="px-6 md:px-20 my-12">
        <Link
          href="/blog"
          className="inline-block text-blue-600 hover:underline text-base font-medium"
        >
          ← Back to Blogs
        </Link>
      </div>

      <Footer />
    </div>
  );
}

function formatContent(content: string): string {
  return content
    .replace(/<pre><code>/g, `<pre class="bg-gray-900 text-white text-sm rounded-md p-4 overflow-x-auto my-6"><code>`)
    .replace(/<\/code><\/pre>/g, `</code></pre>`)
    .replace(/“([^”]+)”/g, `<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6">“$1”</blockquote>`);
}

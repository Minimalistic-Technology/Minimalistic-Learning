// 'use client';

// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { blogs } from '@/app/lib/blogData';
// import Link from 'next/link';
// import Footer from '@/app/components/Footer';
// import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';

// export default function BlogDetailPage() {
//   const params = useParams();
//   const blogId = params?.id as string;
//   const [blog, setBlog] = useState<typeof blogs[0] | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsLoading(true);
//     const found = blogs.find((b) => b.id === blogId);
//     setBlog(found || null);
//     setIsLoading(false);
//   }, [blogId]);

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
//     <div className="bg-[#daf0ff] min-h-screen overflow-x-hidden">
//       {/* Header with image */}
//       <div className="relative p-1">
//         <img
//           src={blog.image}
//           alt={blog.title}
//           className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-none sm:rounded-lg"
//         />

//         <div className="absolute top-4 left-4 z-30">
//           <Link
//             href="/blog"
//             className="flex items-center text-white bg-black/70 hover:bg-black/90 px-4 py-2 rounded-full transition duration-300"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back
//           </Link>
//         </div>
//       </div>

//       {/* Blog Title & Meta Info */}
//       <div className="max-w-screen-2xl mx-auto -mt-16 relative z-20 px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight break-words">
//             {blog.title}
//           </h1>

//           <div className="mt-6 flex flex-wrap items-center text-gray-600 gap-x-6 gap-y-3 text-sm sm:text-base">
//             <div className="flex items-center">
//               <User className="w-4 h-4 mr-2 text-blue-600" />
//               <span className="font-medium">{blog.author}</span>
//             </div>
//             <div className="flex items-center">
//               <Calendar className="w-4 h-4 mr-2 text-blue-600" />
//               <span>{blog.date}</span>
//             </div>
//             <div className="flex items-center">
//               <Clock className="w-4 h-4 mr-2 text-blue-600" />
//               <span>{readingTime} min read</span>
//             </div>
//           </div>

//           <div className="mt-8 flex flex-wrap items-center justify-between border-t border-gray-100 pt-6 gap-4">
//             <div className="flex items-center space-x-4">
//               <button className="flex items-center text-gray-600 hover:text-blue-600 transition duration-300">
//                 <Share2 className="w-5 h-5 mr-2" />
//                 Share
//               </button>
//               <button className="flex items-center text-gray-600 hover:text-blue-600 transition duration-300">
//                 <Bookmark className="w-5 h-5 mr-2" />
//                 Save
//               </button>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="h-2 w-2 rounded-full bg-green-500"></div>
//               <span className="text-sm text-gray-500">Published</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Blog Content */}
//       <div className="max-w-screen-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 overflow-hidden">
//           <div
//             className="prose prose-sm sm:prose md:prose-lg lg:prose-xl max-w-full break-words"
//             dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
//           />
//         </div>
//       </div>

//       {/* Author Bio */}
//       <div className="max-w-screen-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 mb-12">
//         <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
//           <div className="flex items-center space-x-4">
//             <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl font-bold">
//               {blog.author.charAt(0)}
//             </div>
//             <div>
//               <h3 className="text-lg sm:text-xl font-bold text-gray-900">About {blog.author}</h3>
//               <p className="text-gray-600 mt-1 text-sm sm:text-base">
//                 Professional writer and content creator with expertise in web development and digital marketing.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

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

//       <Footer />
//     </div>
//   );
// }

// // Format content with styling
// function formatContent(content: string): string {
//   return content
//     .replace(/<pre><code>/g, `<pre class="bg-gray-900 text-white text-sm rounded-lg p-6 overflow-x-auto my-6"><code>`)
//     .replace(/<\/code><\/pre>/g, `</code></pre>`)
//     .replace(/"([^"]+)"/g, `<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6 bg-blue-50 py-2 pr-4 rounded-r-md">"$1"</blockquote>`)
//     .replace(/<h2>/g, `<h2 class="text-2xl font-bold mt-8 mb-4">`)
//     .replace(/<h3>/g, `<h3 class="text-xl font-bold mt-6 mb-3">`)
//     .replace(/<p>/g, `<p class="mb-4 text-gray-700">`)
//     .replace(/<a /g, `<a class="text-blue-600 hover:underline" `);
// }

// // Reading time estimate
// function calculateReadingTime(content: string): number {
//   const wordCount = content.split(/\s+/).length;
//   return Math.max(1, Math.ceil(wordCount / 200));
// }

// 'use client';

// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import Footer from '@/app/components/Footer';
// import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';

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
//     <div className="bg-[#daf0ff] min-h-screen overflow-x-hidden">
//       {/* Header with image */}
//       <div className="relative p-1">
//         <img
//           src={blog.image}
//           alt={blog.title}
//           className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-none sm:rounded-lg"
//         />

//         <div className="absolute top-4 left-4 z-30">
//           <Link
//             href="/blog"
//             className="flex items-center text-white bg-black/70 hover:bg-black/90 px-4 py-2 rounded-full transition duration-300"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back
//           </Link>
//         </div>
//       </div>

//       {/* Blog Title & Meta Info */}
//       <div className="max-w-screen-2xl mx-auto -mt-16 relative z-20 px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight break-words">
//             {blog.title}
//           </h1>

//           <div className="mt-6 flex flex-wrap items-center text-gray-600 gap-x-6 gap-y-3 text-sm sm:text-base">
//             <div className="flex items-center">
//               <User className="w-4 h-4 mr-2 text-blue-600" />
//               <span className="font-medium">{blog.author}</span>
//             </div>
//             <div className="flex items-center">
//               <Calendar className="w-4 h-4 mr-2 text-blue-600" />
//               <span>{blog.date}</span>
//             </div>
//             <div className="flex items-center">
//               <Clock className="w-4 h-4 mr-2 text-blue-600" />
//               <span>{readingTime} min read</span>
//             </div>
//           </div>

//           <div className="mt-8 flex flex-wrap items-center justify-between border-t border-gray-100 pt-6 gap-4">
//             <div className="flex items-center space-x-4">
//               <button className="flex items-center text-gray-600 hover:text-blue-600 transition duration-300">
//                 <Share2 className="w-5 h-5 mr-2" />
//                 Share
//               </button>
//               <button className="flex items-center text-gray-600 hover:text-blue-600 transition duration-300">
//                 <Bookmark className="w-5 h-5 mr-2" />
//                 Save
//               </button>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="h-2 w-2 rounded-full bg-green-500"></div>
//               <span className="text-sm text-gray-500">Published</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Blog Content */}
//       <div className="max-w-screen-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 overflow-hidden">
//           <div
//             className="prose prose-sm sm:prose md:prose-lg lg:prose-xl max-w-full break-words"
//             dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
//           />
//         </div>
//       </div>

//       {/* Author Bio */}
//       <div className="max-w-screen-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 mb-12">
//         <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
//           <div className="flex items-center space-x-4">
//             <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl font-bold">
//               {blog.author.charAt(0)}
//             </div>
//             <div>
//               <h3 className="text-lg sm:text-xl font-bold text-gray-900">About {blog.author}</h3>
//               <p className="text-gray-600 mt-1 text-sm sm:text-base">
//                 Professional writer and content creator with expertise in web development and digital marketing.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// // Format content with styling
// function formatContent(content: string): string {
//   return content
//     ?.replace(/<pre><code>/g, `<pre class="bg-gray-900 text-white text-sm rounded-lg p-6 overflow-x-auto my-6"><code>`)
//     ?.replace(/<\/code><\/pre>/g, `</code></pre>`)
//     ?.replace(/"([^"]+)"/g, `<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6 bg-blue-50 py-2 pr-4 rounded-r-md">"$1"</blockquote>`)
//     ?.replace(/<h2>/g, `<h2 class="text-2xl font-bold mt-8 mb-4">`)
//     ?.replace(/<h3>/g, `<h3 class="text-xl font-bold mt-6 mb-3">`)
//     ?.replace(/<p>/g, `<p class="mb-4 text-gray-700">`)
//     ?.replace(/<a /g, `<a class="text-blue-600 hover:underline" `);
// }

// // Estimate reading time
// function calculateReadingTime(content: string): number {
//   const wordCount = content?.split(/\s+/)?.length;
//   return Math.max(1, Math.ceil(wordCount / 200));
// }
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, ThumbsUp, MessageCircle, Twitter, Facebook, Linkedin } from 'lucide-react';

interface BlogType {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params?.id as string;

  const [blog, setBlog] = useState<BlogType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/blogs/${blogId}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setBlog(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

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
    <div className="bg-gradient-to-b from-[#eaf6ff] to-white min-h-screen overflow-x-hidden">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-screen-2xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleSave} 
              className={`flex items-center px-3 py-1 rounded-full text-sm ${saved ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition`}
            >
              <Bookmark className={`w-4 h-4 mr-1 ${saved ? 'fill-blue-600 stroke-blue-600' : ''}`} />
              {saved ? 'Saved' : 'Save'}
            </button>
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition">
                <Twitter className="w-4 h-4 text-gray-700" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition">
                <Facebook className="w-4 h-4 text-gray-700" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition">
                <Linkedin className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Header with image */}
      <div className="relative">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
        />
        
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent pt-32 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-center space-x-2 text-white/80 text-sm mb-4">
              <span className="px-3 py-1 bg-blue-600/90 rounded-full">Featured</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{readingTime} min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-30">
        <div className="bg-white rounded-t-xl shadow-xl p-6 sm:p-8">
          {/* Author info bar */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                {blog.author.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{blog.author}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-500">Published</span>
            </div>
          </div>

          {/* Blog Content */}
          <div className="mt-8">
            <div
              className="prose prose-sm sm:prose lg:prose-lg max-w-full break-words prose-headings:text-gray-800 prose-a:text-blue-600"
              dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
            />
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-500 mb-3">TAGS</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition">Web Development</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition">UI/UX</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition">NextJS</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition">Design</span>
            </div>
          </div>

          {/* Engagement */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${liked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'} transition`}
                >
                  <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-blue-600 stroke-blue-600' : ''}`} />
                  <span>{liked ? 'Liked' : 'Like'}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition">
                  <MessageCircle className="w-5 h-5" />
                  <span>Comment</span>
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">Share:</span>
                <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition">
                    <Twitter className="w-4 h-4 text-gray-700" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition">
                    <Facebook className="w-4 h-4 text-gray-700" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition">
                    <Linkedin className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Author Bio */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-16">
        <div className="bg-blue-50 rounded-xl shadow-md p-6 sm:p-8 border border-blue-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">About the Author</h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
              {blog.author.charAt(0)}
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">{blog.author}</h4>
              <p className="text-gray-600 mt-2">
                Professional writer and content creator with expertise in web development and digital marketing. 
                With over 5 years of experience creating engaging content for tech audiences.
              </p>
              <div className="mt-4 flex items-center space-x-3">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition">Follow</button>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-800 transition">More articles</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Related Article Title</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    A brief description of the related article that might interest the reader.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">5 min read</span>
                    <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Read more
                    </Link>
                  </div>
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

// Format content with styling
function formatContent(content: string): string {
  return content
    ?.replace(/<pre><code>/g, `<pre class="bg-gray-900 text-white text-sm rounded-lg p-6 overflow-x-auto my-6"><code>`)
    ?.replace(/<\/code><\/pre>/g, `</code></pre>`)
    ?.replace(/"([^"]+)"/g, `<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6 bg-blue-50 py-4 pr-4 rounded-r-md">"$1"</blockquote>`)
    ?.replace(/<h2>/g, `<h2 class="text-2xl font-bold mt-10 mb-6 text-gray-800">`)
    ?.replace(/<h3>/g, `<h3 class="text-xl font-bold mt-8 mb-4 text-gray-800">`)
    ?.replace(/<p>/g, `<p class="mb-6 text-gray-700 leading-relaxed">`)
    ?.replace(/<ul>/g, `<ul class="list-disc pl-6 mb-6 text-gray-700">`)
    ?.replace(/<ol>/g, `<ol class="list-decimal pl-6 mb-6 text-gray-700">`)
    ?.replace(/<li>/g, `<li class="mb-2">`)
    ?.replace(/<a /g, `<a class="text-blue-600 font-medium hover:underline" `);
}

// Estimate reading time
function calculateReadingTime(content: string): number {
  const wordCount = content?.split(/\s+/)?.length;
  return Math.max(1, Math.ceil(wordCount / 200));
}
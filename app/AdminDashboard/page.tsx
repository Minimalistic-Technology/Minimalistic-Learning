"use client";
import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { Menu } from 'lucide-react';
import axios from 'axios';

interface Blog {
  _id: string;
  title: string;
  description: string;
  category?: string;
  image?: string;
  date: string;
  author?: string;
  tags?: string[];
  rating?: number;
  minutes: number;
  authorId: string;
}

interface QuoteBlog {
  _id: string;
  quote: string;
  name: string;
  title: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [quotes, setQuotes] = useState<QuoteBlog[]>([]);

  useEffect(() => {
    const parseYYMMDD = (dateStr: string): Date => {
      const [yy, mm, dd] = dateStr.split('-');
      const fullYear = parseInt(yy, 10) + 2000; 
      return new Date(`${fullYear}-${mm}-${dd}`);
    };

    const fetchData = async () => {
      try {
        const blogsRes = await axios.get('http://localhost:5000/blogs');
        const quotesRes = await axios.get('http://localhost:5000/quotes/latest');

        const sortedBlogs = blogsRes.data.sort(
          (a: Blog, b: Blog) => parseYYMMDD(b.date).getTime() - parseYYMMDD(a.date).getTime()
        );

        const sortedQuotes = quotesRes.data.sort(
          (a: QuoteBlog, b: QuoteBlog) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setBlogs(sortedBlogs);
        setQuotes(sortedQuotes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { number: 103, label: 'Total Users', icon: '👥' },
    { number: blogs.length, label: 'Blogs', icon: '📝' },
    { number: quotes.length, label: 'Quotes', icon: '💬' }
  ];

  return (
    <div className="flex flex-wrap bg-blue-500 min-h-screen">
      <main className="flex-1 bg-[#daf0ff] min-h-screen">
        {/* Sidebar toggle button for mobile */}
        <button
          className={`flex left-2 z-50 p-2 bg-transparent text-black rounded-lg transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Top Bar */}
        <div className="flex justify-end items-center bg-white shadow-md px-8 py-4">
          <div className="relative cursor-pointer mr-4">
            <FaBell className="text-gray-600 text-xl" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">2</span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1999/1999625.png"
              alt="Admin"
              className="w-8 h-8 rounded-full object-cover border border-gray-500"
            />
          </div>
        </div>

        {/* Welcome */}
        <div className="p-6">
          <p className="text-md text-blue-500">Welcome back,</p>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center">John Doe 👋</h2>
        </div>

        {/* Stats Cards */}
        <section className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-5 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl">{stat.icon}</div>
              <div>
                <h3 className="text-3xl font-bold text-blue-700">{stat.number}</h3>
                <p className="text-gray-600 uppercase tracking-wide">{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Blogs Section */}
        <section className="p-6 bg-white rounded-xl shadow-lg max-w-5xl mx-auto mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-5 border-b-2 border-blue-300 pb-2">Latest Blogs</h2>
          <div className="space-y-4">
            {blogs.slice(0, 3).map(blog => (
              <article
                key={blog._id}
                className="p-4 rounded-md border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                title={blog.title}
              >
                <h3 className="text-lg font-semibold text-gray-900">{blog.title}</h3>
                <p className="text-sm text-gray-600 truncate">{blog.description}</p>
                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                  <span>{blog.date}</span>
                  <span>{blog.author || 'Unknown author'}</span>
                </div>
              </article>
            ))}
          </div>
          <a href="AdminDashboard/blogsAdmin" className="inline-block mt-4 text-blue-600 hover:underline font-medium">
            View All Blogs →
          </a>
        </section>

        {/* Quotes Section */}
        <section className="p-6 bg-white rounded-xl shadow-lg max-w-5xl mx-auto mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-5 border-b-2 border-blue-300 pb-2">Motivational Quotes</h2>
          <div className="space-y-4">
            {quotes.slice(0, 3).map(quote => (
              <blockquote
                key={quote._id}
                className="p-4 italic text-gray-700 border-l-4 border-blue-500 bg-blue-50 rounded-md"
                title={quote.name}
              >
                “{quote.quote}” — <span className="font-semibold">{quote.name}</span>
              </blockquote>
            ))}
          </div>
          <a href="AdminDashboard/quotesAdmin" className="inline-block mt-4 text-blue-600 hover:underline font-medium">
            View All Quotes →
          </a>
        </section>

        {/* User Management Section */}
        <section className="p-6 bg-white rounded-xl shadow-lg max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2">User Management</h2>
          <a href="/admin/users" className="text-blue-600 hover:underline font-medium">
            Manage Users →
          </a>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;

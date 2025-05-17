// 'use client';

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Footer from "../components/Footer";
// import { InfiniteMovingCardsDemo } from "../components/InfiniteMovingCardsDemo";
// import axios from "axios";

// const categories = ["All", "AI", "Web Development", "Data Science", "Blockchain", "Cloud Computing", "Cybersecurity", "Mobile Development"];

// const BlogPage = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Fetch blogs from the API
//     axios
//       .get("http://localhost:5000/blogs")
//       .then((response) => {
//         setBlogs(response.data); // Assuming the API returns an array of blogs
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching blogs:", error);
//         setIsLoading(false);
//       });
//   }, []);

//   const filteredBlogs = blogs.filter((blog) => {
//     const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
//     const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-gray-600">Loading blogs...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#daf0ff] text-gray-800 font-sans">
//       {/* Hero Section */}
//       <section className="w-full bg-gradient-to-b from-[#daf0ff] via-blue-300 to-blue-500 py-16">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">
//           {/* Text Content */}
//           <div className="w-full md:w-1/2 text-center md:text-left">
//             <h1 className="text-6xl md:text-5xl font-bold text-gray-800 leading-tight">
//               Insights, Tutorials, and Tech News
//             </h1>
//             <p className="mt-4 text-gray-700 text-xl md:text-3xl">
//               Stay updated with the latest in tech and learning.
//             </p>
//           </div>

//           {/* Hero Image */}
//           <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
//             <img 
//               src="/images/blog3.png"
//               alt="Hero Image" 
//               width={350}
//               height={64}
//               className="rounded-full object-cover"/>
//           </div>
//         </div>
//       </section>
    
//       <div className="mt-6">
//         <p className="text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//           Latest Blog's
//         </p>
//         <InfiniteMovingCardsDemo />
//       </div>

//       <p className="mt-6 text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//         Famous Blog's
//       </p>

//       {/* Search, Category, and Create Button Section */}
//       <section className="max-w-7xl mx-auto px-4 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
//         <input
//           type="text"
//           placeholder="Search Blog's..."
//           className="w-full md:w-1/3 px-4 py-2 border border-blue-400 rounded-lg focus:outline-blue-200 focus:ring-2 focus:ring-blue-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <select
//           className="w-full md:w-1/4 px-4 py-2 border border-blue-400 rounded-lg focus:outline-blue-200 focus:ring-2 focus:ring-blue-500"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>{category}</option>
//           ))}
//         </select>

//         {/* Create New Blog Button */}
//         <Link href="/blog/createblog's">
//           <button className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
//             + Create New Blog
//           </button>
//         </Link>
//       </section>

//       {/* Blog Cards */}
//       <section className="max-w-7xl mx-auto px-4 py-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredBlogs.map((blog, index) => (
//           <div key={blog.id || index} className="bg-white border border-blue-300 rounded-2xl shadow hover:shadow-md transition flex flex-col">
//             <img src={blog.image} alt={blog.title} className="rounded-t-2xl object-cover h-48 w-full" />
//             <div className="p-4 flex flex-col flex-grow">
//               <span className="text-md font-semibold text-blue-500">{blog.category}</span>
//               <h2 className="text-2xl font-bold mt-2">{blog.title}</h2>
//               <p className="text-gray-600 mt-2 text-sm flex-grow">{blog.description}</p>
//               <div className="flex justify-between items-center text-gray-400 text-xs mt-4">
//                 <span>{blog.author}</span>
//                 <span>{blog.date}</span>
//               </div>
//               <Link href={`/blog/${blog.id}`} className="mt-4 inline-block text-blue-600 text-sm font-medium hover:underline">
//                 Read More →
//               </Link>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Pagination */}
//       <div className="flex justify-center pb-12">
//         <nav className="flex gap-2">
//           <button className="px-4 py-2 rounded-md bg-white shadow-sm text-gray-700 hover:bg-blue-50">1</button>
//           <button className="px-4 py-2 rounded-md bg-white shadow-sm text-gray-700 hover:bg-blue-50">2</button>
//           <button className="px-4 py-2 rounded-md bg-white shadow-sm text-gray-700 hover:bg-blue-50">Next →</button>
//         </nav>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default BlogPage;
// 'use client';

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Footer from "../components/Footer";
// import { InfiniteMovingCardsDemo } from "../components/InfiniteMovingCardsDemo";
// import axios from "axios";

// // Define the Blog type
// interface Blog {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   category: string;
//   author: string;
//   date: string;
// }

// const categories = ["All", "AI", "Web Development", "Data Science", "Blockchain", "Cloud Computing", "Cybersecurity", "Mobile Development"];

// const BlogPage = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/blogs")
//       .then((response) => {
//         setBlogs(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching blogs:", error);
//         setIsLoading(false);
//       });
//   }, []);

//   const filteredBlogs = blogs.filter((blog) => {
//     const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
//     const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-gray-600">Loading blogs...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#daf0ff] text-gray-800 font-sans">
//       {/* Hero Section */}
//       <section className="w-full bg-gradient-to-b from-[#daf0ff] via-blue-300 to-blue-500 py-16">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">
//           <div className="w-full md:w-1/2 text-center md:text-left">
//             <h1 className="text-6xl md:text-5xl font-bold text-gray-800 leading-tight">
//               Insights, Tutorials, and Tech News
//             </h1>
//             <p className="mt-4 text-gray-700 text-xl md:text-3xl">
//               Stay updated with the latest in tech and learning.
//             </p>
//           </div>
//           <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
//             <img 
//               src="/images/blog3.png"
//               alt="Hero Image" 
//               width={350}
//               height={64}
//               className="rounded-full object-cover"
//             />
//           </div>
//         </div>
//       </section>

//       <div className="mt-6">
//         <p className="text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//           Latest Blog's
//         </p>
//         <InfiniteMovingCardsDemo />
//       </div>

//       <p className="mt-6 text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//         Famous Blog's
//       </p>

//       <section className="max-w-7xl mx-auto px-4 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
//         <input
//           type="text"
//           placeholder="Search Blog's..."
//           className="w-full md:w-1/3 px-4 py-2 border border-blue-400 rounded-lg focus:outline-blue-200 focus:ring-2 focus:ring-blue-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <select
//           className="w-full md:w-1/4 px-4 py-2 border border-blue-400 rounded-lg focus:outline-blue-200 focus:ring-2 focus:ring-blue-500"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>{category}</option>
//           ))}
//         </select>
//         <Link href="/blog/createblog's">
//           <button className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
//             + Create New Blog
//           </button>
//         </Link>
//       </section>

//       <section className="max-w-7xl mx-auto px-4 py-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredBlogs.map((blog) => (
//           <div key={blog.id} className="bg-white border border-blue-300 rounded-2xl shadow hover:shadow-md transition flex flex-col">
//             <img src={blog.image} alt={blog.title} className="rounded-t-2xl object-cover h-48 w-full" />
//             <div className="p-4 flex flex-col flex-grow">
//               <span className="text-md font-semibold text-blue-500">{blog.category}</span>
//               <h2 className="text-2xl font-bold mt-2">{blog.title}</h2>
//               <p className="text-gray-600 mt-2 text-sm flex-grow">{blog.description}</p>
//               <div className="flex justify-between items-center text-gray-400 text-xs mt-4">
//                 <span>{blog.author}</span>
//                 <span>{blog.date}</span>
//               </div>
//               <Link href={`/blog/${blog.id}`} className="mt-4 inline-block text-blue-600 text-sm font-medium hover:underline">
//                 Read More →
//               </Link>
//             </div>
//           </div>
//         ))}
//       </section>

//       <div className="flex justify-center pb-12">
//         <nav className="flex gap-2">
//           <button className="px-4 py-2 rounded-md bg-white shadow-sm text-gray-700 hover:bg-blue-50">1</button>
//           <button className="px-4 py-2 rounded-md bg-white shadow-sm text-gray-700 hover:bg-blue-50">2</button>
//           <button className="px-4 py-2 rounded-md bg-white shadow-sm text-gray-700 hover:bg-blue-50">Next →</button>
//         </nav>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default BlogPage;
// 'use client';

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Footer from "../components/Footer";
// import { InfiniteMovingCardsDemo } from "../components/InfiniteMovingCardsDemo";
// import axios from "axios";

// // Define the Blog type
// interface Blog {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   category: string;
//   author: string;
//   date: string;
// }

// const categories = ["All", "AI", "Web Development", "Data Science", "Blockchain", "Cloud Computing", "Cybersecurity", "Mobile Development"];

// const BlogPage = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/blogs")
//       .then((response) => {
//         setBlogs(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching blogs:", error);
//         setIsLoading(false);
//       });
//   }, []);

//   const filteredBlogs = blogs.filter((blog) => {
//     const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
//     const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-gray-600">Loading blogs...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#daf0ff] text-gray-800 font-sans">
//       {/* Hero Section */}
//       <section className="w-full bg-gradient-to-b from-[#daf0ff] via-blue-300 to-blue-500 py-16">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">
//           <div className="w-full md:w-1/2 text-center md:text-left">
//             <h1 className="text-6xl md:text-5xl font-bold text-gray-800 leading-tight">
//               Insights, Tutorials, and Tech News
//             </h1>
//             <p className="mt-4 text-gray-700 text-xl md:text-3xl">
//               Stay updated with the latest in tech and learning.
//             </p>
//           </div>
//           <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
//             <img 
//               src="/images/blog3.png"
//               alt="Hero Image" 
//               width={350}
//               height={64}
//               className="rounded-full object-cover"
//             />
//           </div>
//         </div>
//       </section>

//       <div className="mt-6">
//         <p className="text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//           Latest Blog's
//         </p>
//         <InfiniteMovingCardsDemo />
//       </div>

//       <p className="mt-6 text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//         Famous Blog's
//       </p>

//       <section className="max-w-7xl mx-auto px-4 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
//         <input
//           type="text"
//           placeholder="Search Blog's..."
//           className="w-full md:w-1/3 px-4 py-2 border border-blue-400 rounded-lg focus:outline-blue-200 focus:ring-2 focus:ring-blue-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <select
//           className="w-full md:w-1/4 px-4 py-2 border border-blue-400 rounded-lg focus:outline-blue-200 focus:ring-2 focus:ring-blue-500"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>{category}</option>
//           ))}
//         </select>
//         <Link href="/blog/createblog's">
//           <button className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
//             + Create New Blog
//           </button>
//         </Link>
//       </section>

//       <section className="max-w-7xl mx-auto px-4 py-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredBlogs.map((blog) => (
//           <div key={blog.id} className="bg-white border border-blue-300 rounded-2xl shadow hover:shadow-md transition flex flex-col">
//             <img src={blog.image} alt={blog.title} className="rounded-t-2xl object-cover h-48 w-full" />
//             <div className="p-4 flex flex-col flex-grow">
//               <span className="text-md font-semibold text-blue-500">{blog.category}</span>
//               <h2 className="text-2xl font-bold mt-2">{blog.title}</h2>
//               <p className="text-gray-600 mt-2 text-sm flex-grow">{blog.description}</p>
//               <div className="flex justify-between items-center text-gray-400 text-xs mt-4">
//                 <span>{blog.author}</span>
//                 <span>{blog.date}</span>
//               </div>
//               <Link href={`/blog/${blog.id}`} className="mt-4 inline-block text-blue-600 text-sm font-medium hover:underline">
//                 Read More →
//               </Link>
//             </div>
//           </div>
//         ))}
//       </section>

//       <div className="flex justify-center pb-12">
//         <nav className="flex gap-2">
//           {[
//             { key: "page-1", label: "1" },
//             { key: "page-2", label: "2" },
//             { key: "page-next", label: "Next →" }
//           ].map((button) => (
//             <button 
//               key={button.key} 
//               className="px-4 py-2 rounded-md bg-white shadow-sm text-gray-700 hover:bg-blue-50"
//             >
//               {button.label}
//             </button>
//           ))}
//         </nav>
//       </div>

//       <Footer />
//     </div>
//   );
// };


// export default BlogPage;
// 'use client';

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Footer from "../components/Footer";
// import { InfiniteMovingCardsDemo } from "../components/InfiniteMovingCardsDemo";
// import axios from "axios";

// // Define the Blog type
// interface Blog {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   category: string;
//   author: string;
//   date: string;
// }

// const categories = ["All", "AI", "Web Development", "Data Science", "Blockchain", "Cloud Computing", "Cybersecurity", "Mobile Development"];

// const BlogPage = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/blogs")
//       .then((response) => {
//         setBlogs(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching blogs:", error);
//         setIsLoading(false);
//       });
//   }, []);

//   const filteredBlogs = blogs.filter((blog) => {
//     const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
//     const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-gray-600">Loading blogs...</p>
//         </div>
//       </div>
//     );
//   }

//   const paginationButtons = [
//     { id: "page-1", label: "1" },
//     { id: "page-2", label: "2" },
//     { id: "page-next", label: "Next →" }
//   ];

//   return (
//     <div className="min-h-screen bg-[#daf0ff] text-gray-800 font-sans">
//       {/* Hero Section */}
//       <section className="w-full bg-gradient-to-b from-[#daf0ff] via-blue-300 to-blue-500 py-16">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">
//           <div className="w-full md:w-1/2 text-center md:text-left">
//             <h1 className="text-6xl md:text-5xl font-bold text-gray-800 leading-tight">
//               Insights, Tutorials, and Tech News
//             </h1>
//             <p className="mt-4 text-gray-700 text-xl md:text-3xl">
//               Stay updated with the latest in tech and learning.
//             </p>
//           </div>
//           <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
//             <img 
//               src="/images/blog3.png"
//               alt="Hero Image" 
//               width={350}
//               height={64}
//               className="rounded-full object-cover"
//             />
//           </div>
//         </div>
//       </section>

//       <div className="mt-6">
//         <p className="text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//           Latest Quotes 
//         </p>
//         <InfiniteMovingCardsDemo />
//       </div>

//       <p className="mt-6 text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//         Famous Blog's
//       </p>

//       <section className="max-w-7xl mx-auto px-4 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
//         <input
//           type="text"
//           placeholder="Search Blog's..."
//           className="w-full md:w-1/3 px-4 py-2 border border-blue-400 rounded-lg focus:outline-blue-200 focus:ring-2 focus:ring-blue-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <select
//           className="w-full md:w-1/4 px-4 py-2 border border-blue-400 rounded-lg focus:outline-blue-200 focus:ring-2 focus:ring-blue-500"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>{category}</option>
//           ))}
//         </select>
//         <Link href="/blog/createblog's">
//           <button className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
//             + Create New Blog
//           </button>
//         </Link>
//       </section>

//       <section className="max-w-7xl mx-auto px-4 py-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredBlogs.map((blog:any) => (
//           <div key={blog._id} className="bg-white border border-blue-300 rounded-2xl shadow hover:shadow-md transition flex flex-col">
//             <img src={blog.image} alt={blog.title} className="rounded-t-2xl object-cover h-48 w-full" />
//             <div className="p-4 flex flex-col flex-grow">
//               <span className="text-md font-semibold text-blue-500">{blog.category}</span>
//               <h2 className="text-2xl font-bold mt-2">{blog.title}</h2>
//               <p className="text-gray-600 mt-2 text-sm flex-grow">{blog.description}</p>
//               <div className="flex justify-between items-center text-gray-400 text-xs mt-4">
//                 <span>{blog.author}</span>
//                 <span>{blog.date}</span>
//               </div>
//               <Link href={`/blog/${blog._id}`} className="mt-4 inline-block text-blue-600 text-sm font-medium hover:underline">
//                 Read More →
//               </Link>
//             </div>
//           </div>
//         ))}
//       </section>

//       <div className="flex justify-center pb-12">
//         <nav className="flex gap-2">
//           {paginationButtons.map((button) => (
//             <button 
//               key={button.id} 
//               className="px-4 py-2 rounded-md bg-white shadow-sm text-gray-700 hover:bg-blue-50"
//             >
//               {button.label}
//             </button>
//           ))}
//         </nav>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default BlogPage;
// 'use client';

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Footer from "../components/Footer";
// import { InfiniteMovingCardsDemo } from "../components/InfiniteMovingCardsDemo";
// import axios from "axios";

// // Define the Blog type
// interface Blog {
//   _id: string;
//   title: string;
//   description: string;
//   image: string;
//   category: string;
//   author: string;
//   date: string;
// }

// const categories = ["All", "AI", "Web Development", "Data Science", "Blockchain", "Cloud Computing", "Cybersecurity", "Mobile Development"];

// const BlogPage = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 6;

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/blogs")
//       .then((response) => {
//         setBlogs(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching blogs:", error);
//         setIsLoading(false);
//       });
//   }, []);

//   const filteredBlogs = blogs.filter((blog) => {
//     const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
//     const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const paginatedBlogs = filteredBlogs.slice(
//     (currentPage - 1) * blogsPerPage,
//     currentPage * blogsPerPage
//   );

//   const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-gray-600">Loading blogs...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#daf0ff] text-gray-800 font-sans">
//       {/* Hero Section */}
//       <section className="w-full bg-gradient-to-b from-[#daf0ff] via-blue-300 to-blue-500 py-16">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">
//           <div className="w-full md:w-1/2 text-center md:text-left">
//             <h1 className="text-6xl md:text-5xl font-bold text-gray-800 leading-tight">
//               Insights, Tutorials, and Tech News
//             </h1>
//             <p className="mt-4 text-gray-700 text-xl md:text-3xl">
//               Stay updated with the latest in tech and learning.
//             </p>
//           </div>
//           <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
//             <img 
//               src="/images/blog3.png"
//               alt="Hero Image" 
//               width={350}
//               height={64}
//               className="rounded-full object-cover"
//             />
//           </div>
//         </div>
//       </section>

//       <div className="mt-6">
//         <p className="text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//           Latest Quotes 
//         </p>
//         <InfiniteMovingCardsDemo />
//       </div>

//       <p className="mt-6 text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//         Famous Blogs
//       </p>

//       <section className="max-w-7xl mx-auto px-4 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 w-full">
//         <input
//           type="text"
//           placeholder="Search Blogs..."
//           className="w-full md:w-1/3 px-4 py-2 border border-blue-400 rounded-lg focus:outline-blue-200 focus:ring-2 focus:ring-blue-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <select
//           className="w-full md:w-1/4 px-4 py-2 border border-blue-400 rounded-lg focus:outline-blue-200 focus:ring-2 focus:ring-blue-500"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>{category}</option>
//           ))}
//         </select>
//         <Link href="/blog/create-blogs">
//           <button className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
//             + Create New Blog
//           </button>
//         </Link>
//         </section>
//         <section className="max-w-7xl mx-auto px-4 py-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {paginatedBlogs.map((blog) => (
//           <article key={blog._id} className="bg-white border border-blue-300 rounded-2xl shadow hover:shadow-md transition flex flex-col">
//             <img src={blog.image || "/images/default-blog.jpg"} alt={blog.title} className="rounded-t-2xl object-cover h-48 w-full" />
//             <div className="p-4 flex flex-col flex-grow">
//               <span className="text-md font-semibold text-blue-500">{blog.category}</span>
//               <h2 className="text-2xl font-bold mt-2">{blog.title}</h2>
//               <p className="text-gray-600 mt-2 text-sm flex-grow">{blog.description}</p>
//               <div className="flex justify-between items-center text-gray-400 text-xs mt-4">
//                 <span>{blog.author}</span>
//                 <span>{blog.date}</span>
//               </div>
//               <Link href={`/blog/${blog._id}`} className="mt-4 inline-block text-blue-600 text-sm font-medium hover:underline">
//                 Read More →
//               </Link>
//             </div>
//           </article>
//         ))}
//       </section>
      
//       <div className="flex justify-center pb-12">
//         <nav className="flex gap-2">
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button 
//               key={page} 
//               onClick={() => setCurrentPage(page)}
//               className={`px-4 py-2 rounded-md shadow-sm ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-50'}`}
//             >
//               {page}
//             </button>
//           ))}
//         </nav>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default BlogPage;
'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import { InfiniteMovingCardsDemo } from "../components/InfiniteMovingCardsDemo";
import axios from "axios";

// Define the Blog type
interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

const categories = ["All", "AI", "Web Development", "Data Science", "Blockchain", "Cloud Computing", "Cybersecurity", "Mobile Development"];

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const blogsPerPage = 6;

  useEffect(() => {
    axios
      .get("http://localhost:5000/blogs")
      .then((response) => {
        setBlogs(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  // Only filter blogs when the array is available
  const filteredBlogs = blogs ? blogs.filter((blog) => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }) : [];

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#daf0ff] text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-[#daf0ff] via-blue-300 to-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-6xl md:text-5xl font-bold text-gray-800 leading-tight">
              Insights, Tutorials, and Tech News
            </h1>
            <p className="mt-4 text-gray-700 text-xl md:text-3xl">
              Stay updated with the latest in tech and learning.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
            <img 
              src="/images/blog3.png"
              alt="Hero Image" 
              width={350}
              height={64}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </section>

      <div className="mt-6">
        <p className="text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Latest Quotes 
        </p>
        <InfiniteMovingCardsDemo />
      </div>

      <p className="mt-6 text-3xl sm:text-4xl font-bold text-center pb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Famous Blogs
      </p>

      <section className="max-w-7xl mx-auto px-4 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 w-full">
        <input
          type="text"
          placeholder="Search Blogs..."
          className="w-full md:w-1/3 px-4 py-2 border border-blue-400 rounded-lg focus:outline-blue-200 focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-1/4 px-4 py-2 border border-blue-400 rounded-lg focus:outline-blue-200 focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <Link href="/blog/create-blogs">
          <button className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
            + Create New Blog
          </button>
        </Link>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedBlogs.length > 0 ? (
          paginatedBlogs.map((blog) => (
            <article key={blog._id} className="bg-white border border-blue-300 rounded-2xl shadow hover:shadow-md transition flex flex-col">
              <img src={blog.image || "/images/default-blog.jpg"} alt={blog.title} className="rounded-t-2xl object-cover h-48 w-full" />
              <div className="p-4 flex flex-col flex-grow">
                <span className="text-md font-semibold text-blue-500">{blog.category}</span>
                <h2 className="text-2xl font-bold mt-2">{blog.title}</h2>
                <p className="text-gray-600 mt-2 text-sm flex-grow">{blog.description}</p>
                <div className="flex justify-between items-center text-gray-400 text-xs mt-4">
                  <span>{blog.author}</span>
                  <span>{blog.date}</span>
                </div>
                <Link href={`/blog/${blog._id}`} className="mt-4 inline-block text-blue-600 text-sm font-medium hover:underline">
                  Read More →
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-600 text-xl">No blogs found matching your criteria.</p>
          </div>
        )}
      </section>
      
      {totalPages > 0 && (
        <div className="flex justify-center pb-12">
          <nav className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button 
                key={page} 
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md shadow-sm ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-50'}`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPage;
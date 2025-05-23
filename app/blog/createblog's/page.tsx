
"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";
import { Camera, FileText, Calendar, User, Tag, Link } from "lucide-react";
import axios from "axios";

interface BlogFormData {
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
}

const CreateBlogPage = () => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    description: "",
    category: "",
    image: "",
    date: new Date().toISOString().split('T')[0], // Default to today's date
    author: "",
    tags: [],
  });
  
  const [currentTag, setCurrentTag] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagAdd = (e: FormEvent) => {
    e.preventDefault();
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, currentTag.trim()] });
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      // Create URL for preview
      const fileUrl = URL.createObjectURL(files[0]);
      setImagePreview(fileUrl);
      
      // In a real app with file upload, you would handle the file differently
      // For now we'll just set the image field to the filename
      setFormData({ ...formData, image: files[0].name });
      
      // To implement actual file upload:
      // 1. Create a FormData object
      // 2. Append the file to it
      // 3. Make a separate API call to upload the file
      // 4. Get the URL or identifier back from the server
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      // Make API call to the backend
      const response = await axios.post('http://localhost:5000/blogs', formData);
      
      console.log("API Response:", response.data);
      alert("Blog created successfully!");
      router.push("/blog");
    } catch (error) {
      console.error("Error creating blog:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Failed to create blog. Please try again.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#daf0ff]">
          {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-[#daf0ff] via-blue-300 to-blue-500 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Create Your Tech Blog
            </h1>
            <p className="mt-4 text-gray-700 text-lg md:text-xl">
                Share your insights with the tech community
            </p>
          </div>

          {/* Hero Image */}
          <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
            <img 
              src="/images/blog2.png"
              alt="Hero Image" 
              width={250}
              height={64}
              className="rounded-full object-cover"/>
          </div>
        </div>
      </section>
          
          <form onSubmit={handleSubmit} className="p-8">
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
                {errorMessage}
              </div>
            )}
            
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              <div className="xl:col-span-3 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter an attention-grabbing title"
                    className="w-full px-4 py-3 rounded-xl bg-[#daf0ff] border border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                
                {/* Text Editor (replaced ReactQuill with enhanced textarea) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blog Content</label>
                  <div className="bg-[#daf0ff] border border-blue-400 rounded-xl overflow-hidden">
                    {/* Toolbar */}
                    <div className="bg-[#daf0ff] border border-blue-400 p-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const text = textarea.value;
                            const before = text.substring(0, start);
                            const selection = text.substring(start, end);
                            const after = text.substring(end);
                            const newText = before + "**" + selection + "**" + after;
                            setFormData({ ...formData, description: newText });
                            // Reset selection after state update
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + 2, end + 2);
                            }, 0);
                          }
                        }}
                        className="px-2 py-1 text-sm bg-[#daf0ff] border border-blue-400 rounded hover:bg-gray-100"
                        title="Bold"
                      >
                        <strong>B</strong>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const text = textarea.value;
                            const before = text.substring(0, start);
                            const selection = text.substring(start, end);
                            const after = text.substring(end);
                            const newText = before + "*" + selection + "*" + after;
                            setFormData({ ...formData, description: newText });
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + 1, end + 1);
                            }, 0);
                          }
                        }}
                        className="px-2 py-1 text-sm bg-[#daf0ff] border border-blue-400 rounded hover:bg-gray-100"
                        title="Italic"
                      >
                        <em>I</em>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const text = textarea.value;
                            const before = text.substring(0, start);
                            const selection = text.substring(start, end);
                            const after = text.substring(end);
                            const newText = before + "# " + selection + after;
                            setFormData({ ...formData, description: newText });
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + 2, end + 2);
                            }, 0);
                          }
                        }}
                        className="px-2 py-1 text-sm bg-[#daf0ff] border border-blue-400 rounded hover:bg-gray-100"
                        title="Heading"
                      >
                        H
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const text = textarea.value;
                            const before = text.substring(0, start);
                            const after = text.substring(start);
                            const newText = before + "\n- " + after;
                            setFormData({ ...formData, description: newText });
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + 3, start + 3);
                            }, 0);
                          }
                        }}
                        className="px-2 py-1 text-sm bg-[#daf0ff] border border-blue-400 rounded hover:bg-gray-100"
                        title="Bullet List"
                      >
                        • List
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const text = textarea.value;
                            const before = text.substring(0, start);
                            const selection = text.substring(start, end);
                            const after = text.substring(end);
                            const newText = before + "[" + (selection || "link text") + "](url)" + after;
                            setFormData({ ...formData, description: newText });
                            const newCursorPos = selection ? start + selection.length + 3 : start + 11;
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(newCursorPos, newCursorPos + 3);
                            }, 0);
                          }
                        }}
                        className="px-2 py-1 text-sm bg-[#daf0ff] border border-blue-400 rounded hover:bg-gray-100"
                        title="Link"
                      >
                        <Link className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const text = textarea.value;
                            const before = text.substring(0, start);
                            const after = text.substring(start);
                            const newText = before + "\n```\ncode here\n```\n" + after;
                            setFormData({ ...formData, description: newText });
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + 5, start + 14);
                            }, 0);
                          }
                        }}
                        className="px-2 py-1 text-sm bg-[#daf0ff] border border-blue-400 rounded hover:bg-gray-100"
                        title="Code Block"
                      >
                        {'</>'}
                      </button>
                    </div>
                    
                    {/* Content Area */}
                    <textarea
                      id="blog-content"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      placeholder="Write your blog content here..."
                      className="w-full bg-[#daf0ff] p-4 min-h-64 focus:outline-none focus:ring-0"
                      rows={10}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Markdown supported (bold, italic, links, lists, headings)</span>
                    <span>{formData.description.length} characters</span>
                  </div>
                </div>
                
                {/* Preview Section */}
                {formData.description && (
                  <div className="bg-[#daf0ff] border border-blue-400 rounded-xl p-4 mt-2 max-h-[400px] overflow-auto">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
                    <div
                      className="prose max-w-none break-words"
                      style={{ whiteSpace: 'pre-wrap' }}
                      dangerouslySetInnerHTML={{
                        __html: formData.description
                          .replace(/&/g, "&amp;")
                          .replace(/</g, "&lt;")
                          .replace(/>/g, "&gt;")
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                          .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                          .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                          .replace(/^- (.*$)/gm, '<ul><li>$1</li></ul>')
                          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
                          .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                      }}
                    />
                  </div>
                )}

                
                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Tag className="inline mr-2 h-4 w-4" />
                    Tags
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Add a tag"
                      className="flex-grow px-4 py-2 rounded-l-xl bg-[#daf0ff] border border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <button
                      type="button"
                      onClick={handleTagAdd}
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-xl hover:bg-blue-700 transition"
                    >
                      Add
                    </button>
                  </div>
                  
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Camera className="inline mr-2 h-4 w-4" />
                    Featured Image
                  </label>
                  <div className="mt-1 border-2 border-dashed border-blue-400 rounded-xl p-6 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-48 mx-auto rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview("");
                            setFormData({ ...formData, image: "" });
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <>
                        <Camera className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-500">
                          Drag and drop an image or click to browse
                        </p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-4 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </div>
                </div>
                
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#daf0ff] border border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="">Select Category</option>
                    <option value="AI">Artificial Intelligence</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Mobile Development">Mobile Development</option>
                  </select>
                </div>
                
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline mr-2 h-4 w-4" />
                    Publish Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#daf0ff] border border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                
                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline mr-2 h-4 w-4" />
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-[#daf0ff] border border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-3 rounded-2xl text-white font-medium text-lg transition
                  ${isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </span>
                ) : (
                  'Publish Blog'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => router.push("/blog")}
                className="ml-4 px-6 py-3 rounded-2xl bg-gray-200 border border-blue-400 text-gray-700 hover:bg-gray-50 font-medium transition"
              >
                Cancel
              </button>
            </div>
          </form>
      <Footer />
    </div>
  );
};

export default CreateBlogPage;
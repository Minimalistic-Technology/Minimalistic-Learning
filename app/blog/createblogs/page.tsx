"use client";

import { motion } from "framer-motion";
import { PenSquare, Sparkles } from "lucide-react";
import Footer from "@/app/components/Footer";
import { MarkdownToolbar } from "@/features/blog/components/markdown-toolbar";
import { ImageUpload } from "@/features/blog/components/image-upload";
import { TagInput } from "@/features/blog/components/tag-input";
import { useCreateBlog } from "@/features/blog/hooks/use-create-blog";

const CreateBlogPage = () => {
  const {
    formData,
    imagePreview,
    currentTag,
    setCurrentTag,
    isLoading,
    errorMessage,
    authLoading,
    handleChange,
    handleTagAdd,
    removeTag,
    handleImageChange,
    clearImage,
    insertMarkdown,
    handleSubmit,
    router,
  } = useCreateBlog();

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50/50 to-pink-50/50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20 px-4 py-10">
        <div className="mx-auto max-w-6xl space-y-8">

          {/* Hero */}
          <section className="rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-lg backdrop-blur">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2563eb]">Creator studio</p>
                <h1 className="text-4xl font-semibold text-slate-900">
                  Create your next Minimalistic Learning blog
                </h1>
                <p className="text-base text-slate-500">
                  Draft with clarity, structure with intention, and publish with the same calm UI as the Admin Dashboard.
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
                    <PenSquare className="h-4 w-4 text-[#2563eb]" /> Guided editor
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
                    <Sparkles className="h-4 w-4 text-[#2563eb]" /> Markdown ready
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <motion.img
                  src="/images/blog2.png"
                  alt="Hero Image"
                  className="h-60 w-60 rounded-3xl border border-slate-200 object-cover shadow-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          </section>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg md:p-8"
          >
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
                    className="w-full px-4 py-3 rounded-xl bg-white text-black border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blog Content</label>
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <MarkdownToolbar insertMarkdown={insertMarkdown} />
                    <textarea
                      id="blog-content"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      required
                      placeholder="Write your blog content here..."
                      className="w-full bg-white text-black p-4 min-h-64 focus:outline-none focus:ring-0"
                      rows={10}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Markdown supported (bold, italic, links, lists, headings)</span>
                    <span>{formData.content.length} characters</span>
                  </div>
                </div>

                {/* Preview */}
                {formData.content && (
                  <div className="bg-white border border-slate-200 rounded-xl p-4 mt-2 max-h-[400px] overflow-auto">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
                    <div
                      className="prose max-w-none break-words text-black"
                      style={{ whiteSpace: "pre-wrap" }}
                      dangerouslySetInnerHTML={{
                        __html: formData.content
                          .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(/\*(.*?)\*/g, "<em>$1</em>")
                          .replace(/^### (.*$)/gm, "<h3>$1</h3>")
                          .replace(/^## (.*$)/gm, "<h2>$1</h2>")
                          .replace(/^# (.*$)/gm, "<h1>$1</h1>")
                          .replace(/^- (.*$)/gm, "<ul><li>$1</li></ul>")
                          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>')
                          .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>"),
                      }}
                    />
                  </div>
                )}

                <TagInput
                  tags={formData.tags}
                  currentTag={currentTag}
                  onCurrentTagChange={(e) => setCurrentTag(e.target.value)}
                  onTagAdd={handleTagAdd}
                  onTagRemove={removeTag}
                />
              </div>

              <div className="space-y-6">
                <ImageUpload
                  imagePreview={imagePreview}
                  onImageChange={handleImageChange}
                  onClear={clearImage}
                />

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white text-black border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-3 rounded-2xl text-white font-medium text-lg transition ${
                  isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Publishing...
                  </span>
                ) : "Publish Blog"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/blog")}
                className="ml-4 px-6 py-3 rounded-2xl bg-gray-200 border border-slate-200 text-gray-700 hover:bg-gray-50 font-medium transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateBlogPage;
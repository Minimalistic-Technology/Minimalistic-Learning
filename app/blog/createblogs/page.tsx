"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";
import { Camera, Tag, Link, PenSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";
import apiClient from "@/app/lib/api";
import toast from "react-hot-toast";

interface BlogFormData {
  title: string;
  content: string;
  category: string;
  image: string;
  tags: string[];
  authorId: string;
}

const CreateBlogPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "",
    category: "",
    image: "",
    tags: [],
    authorId: "",
  });

  const [currentTag, setCurrentTag] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, authorId: user.id || "" }));
    }
  }, [user]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setImagePreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
    }
  };

  const insertMarkdown = (
    wrap: (sel: string) => {
      text: string;
      cursorStart: number;
      cursorEnd: number;
    },
  ) => {
    const textarea = document.getElementById(
      "blog-content",
    ) as HTMLTextAreaElement;
    if (!textarea) return;
    const { selectionStart: start, selectionEnd: end, value } = textarea;
    const selection = value.substring(start, end);
    const { text, cursorStart, cursorEnd } = wrap(selection);
    setFormData((prev) => ({ ...prev, content: text }));
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorStart, cursorEnd);
    }, 0);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (formData.image && formData.image.length > 2 * 1024 * 1024) {
      const msg =
        "The image is too large. Please upload an image smaller than 1.5MB.";
      setErrorMessage(msg);
      toast.error(msg);
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        coverImage: {
          url: formData.image,
          alt: formData.title,
        },
        tags: formData.tags,
        authorId: formData.authorId,
        published: true,
      };

      const response = await apiClient.post("/api/v1/posts", payload);
      alert(`response: ${JSON.stringify(response)}`)
      console.log("Server response:", response.data);

      toast.success("Blog published successfully!");
      // setTimeout(() => router.push("/blog"), 800);
      router.push('/blog')
    } catch (error: any) {
      console.error("Error creating blog:", error);
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to publish blog. Please try again.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

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
          <section className="rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-lg backdrop-blur">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2563eb]">
                  Creator studio
                </p>
                <h1 className="text-4xl font-semibold text-slate-900">
                  Create your next Minimalistic Learning blog
                </h1>
                <p className="text-base text-slate-500">
                  Draft with clarity, structure with intention, and publish with
                  the same calm UI as the Admin Dashboard.
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
                    <PenSquare className="h-4 w-4 text-[#2563eb]" />
                    Guided editor
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
                    <Sparkles className="h-4 w-4 text-[#2563eb]" />
                    Markdown ready
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Title
                  </label>
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

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Content
                  </label>
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    {/* Toolbar */}
                    <div className="bg-white border-b border-slate-200 p-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        title="Bold"
                        onClick={() =>
                          insertMarkdown((sel) => {
                            const val = document.getElementById(
                              "blog-content",
                            ) as HTMLTextAreaElement;
                            const s = val.selectionStart,
                              e = val.selectionEnd,
                              t = val.value;
                            return {
                              text:
                                t.substring(0, s) +
                                "**" +
                                sel +
                                "**" +
                                t.substring(e),
                              cursorStart: s + 2,
                              cursorEnd: e + 2,
                            };
                          })
                        }
                        className="px-2 py-1 text-sm bg-white text-gray-700 border border-slate-200 rounded hover:bg-gray-100"
                      >
                        <strong>B</strong>
                      </button>

                      <button
                        type="button"
                        title="Italic"
                        onClick={() =>
                          insertMarkdown((sel) => {
                            const val = document.getElementById(
                              "blog-content",
                            ) as HTMLTextAreaElement;
                            const s = val.selectionStart,
                              e = val.selectionEnd,
                              t = val.value;
                            return {
                              text:
                                t.substring(0, s) +
                                "*" +
                                sel +
                                "*" +
                                t.substring(e),
                              cursorStart: s + 1,
                              cursorEnd: e + 1,
                            };
                          })
                        }
                        className="px-2 py-1 text-sm text-gray-700 bg-white border border-slate-200 rounded hover:bg-gray-100"
                      >
                        <em>I</em>
                      </button>

                      <button
                        type="button"
                        title="Heading"
                        onClick={() =>
                          insertMarkdown((sel) => {
                            const val = document.getElementById(
                              "blog-content",
                            ) as HTMLTextAreaElement;
                            const s = val.selectionStart,
                              e = val.selectionEnd,
                              t = val.value;
                            return {
                              text:
                                t.substring(0, s) + "# " + sel + t.substring(e),
                              cursorStart: s + 2,
                              cursorEnd: e + 2,
                            };
                          })
                        }
                        className="px-2 py-1 text-sm text-gray-700 bg-white border border-slate-200 rounded hover:bg-gray-100"
                      >
                        H
                      </button>

                      <button
                        type="button"
                        title="Bullet List"
                        onClick={() =>
                          insertMarkdown(() => {
                            const val = document.getElementById(
                              "blog-content",
                            ) as HTMLTextAreaElement;
                            const s = val.selectionStart,
                              t = val.value;
                            return {
                              text: t.substring(0, s) + "\n- " + t.substring(s),
                              cursorStart: s + 3,
                              cursorEnd: s + 3,
                            };
                          })
                        }
                        className="px-2 py-1 text-sm text-gray-700 bg-white border border-slate-200 rounded hover:bg-gray-100"
                      >
                        • List
                      </button>

                      <button
                        type="button"
                        title="Link"
                        onClick={() =>
                          insertMarkdown((sel) => {
                            const val = document.getElementById(
                              "blog-content",
                            ) as HTMLTextAreaElement;
                            const s = val.selectionStart,
                              e = val.selectionEnd,
                              t = val.value;
                            const linkText = sel || "link text";
                            const inserted = `[${linkText}](url)`;
                            const cursorPos = s + linkText.length + 3;
                            return {
                              text:
                                t.substring(0, s) + inserted + t.substring(e),
                              cursorStart: cursorPos,
                              cursorEnd: cursorPos + 3,
                            };
                          })
                        }
                        className="px-2 py-1 text-sm text-gray-700 bg-white border border-slate-200 rounded hover:bg-gray-100"
                      >
                        <Link className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        title="Code Block"
                        onClick={() =>
                          insertMarkdown(() => {
                            const val = document.getElementById(
                              "blog-content",
                            ) as HTMLTextAreaElement;
                            const s = val.selectionStart,
                              t = val.value;
                            return {
                              text:
                                t.substring(0, s) +
                                "\n```\ncode here\n```\n" +
                                t.substring(s),
                              cursorStart: s + 5,
                              cursorEnd: s + 14,
                            };
                          })
                        }
                        className="px-2 py-1 text-sm text-gray-700 bg-white border border-slate-200 rounded hover:bg-gray-100"
                      >
                        {"</>"}
                      </button>
                    </div>

                    {/* FIX 2: name="content" to match state key */}
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
                    <span>
                      Markdown supported (bold, italic, links, lists, headings)
                    </span>
                    <span>{formData.content.length} characters</span>
                  </div>
                </div>

                {/* Preview */}
                {formData.content && (
                  <div className="bg-white border border-slate-200 rounded-xl p-4 mt-2 max-h-[400px] overflow-auto">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Preview
                    </h3>
                    <div
                      className="prose max-w-none break-words text-black"
                      style={{ whiteSpace: "pre-wrap" }}
                      dangerouslySetInnerHTML={{
                        __html: formData.content
                          .replace(/&/g, "&amp;")
                          .replace(/</g, "&lt;")
                          .replace(/>/g, "&gt;")
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(/\*(.*?)\*/g, "<em>$1</em>")
                          .replace(/^### (.*$)/gm, "<h3>$1</h3>")
                          .replace(/^## (.*$)/gm, "<h2>$1</h2>")
                          .replace(/^# (.*$)/gm, "<h1>$1</h1>")
                          .replace(/^- (.*$)/gm, "<ul><li>$1</li></ul>")
                          .replace(
                            /\[([^\]]+)\]\(([^)]+)\)/g,
                            '<a href="$2" class="text-blue-600 underline">$1</a>',
                          )
                          .replace(
                            /```([\s\S]*?)```/g,
                            "<pre><code>$1</code></pre>",
                          ),
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
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleTagAdd(); // FIX 3: no event argument
                        }
                      }}
                      className="flex-grow px-4 py-2 rounded-l-xl bg-white text-black border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <button
                      type="button"
                      onClick={handleTagAdd} // FIX 3: no event argument
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
                  <div className="mt-1 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
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
                            setFormData((prev) => ({ ...prev, image: "" }));
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
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
                    <option value="Mobile Development">
                      Mobile Development
                    </option>
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
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Publishing...
                  </span>
                ) : (
                  "Publish Blog"
                )}
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

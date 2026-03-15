import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { createBlog } from "../services";
import { BlogFormData } from "../types";
import toast from "react-hot-toast";

export const useCreateBlog = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "",
    category: "",
    tags: [],
    authorId: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [currentTag, setCurrentTag] = useState<string>("");
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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be smaller than 5MB.");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImagePreview("");
    setImageFile(null);
  };

  const insertMarkdown = (
    wrap: (sel: string) => { text: string; cursorStart: number; cursorEnd: number }
  ) => {
    const textarea = document.getElementById("blog-content") as HTMLTextAreaElement;
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

    try {
      await createBlog(formData, imageFile);
      toast.success("Blog published successfully!");
      router.push("/blog");
    } catch (error: any) {
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

  return {
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
  };
};
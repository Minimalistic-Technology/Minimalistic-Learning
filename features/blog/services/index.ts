import apiClient from "@/app/lib/api";
import { Blog, BlogFormData } from "../types";

export const createBlog = async (
  formData: BlogFormData,
  imageFile: File | null,
) => {
  const formDataToSend = new FormData();
  formDataToSend.append("title", formData.title);
  formDataToSend.append("content", formData.content);
  formDataToSend.append("category", formData.category);
  formDataToSend.append("published", "true");
  formDataToSend.append("authorId", formData.authorId);
  formData.tags.forEach((tag) => formDataToSend.append("tags[]", tag));

  if (imageFile) {
    formDataToSend.append("coverImage", imageFile);
  }

  const { data: createdBlog } = await apiClient.post<Blog>("/api/v1/posts", formDataToSend, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return createdBlog;
};

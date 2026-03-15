import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Blog, PopulateAuthor, ViewMode } from "../types";
import { deleteBlogById, getAllBlogs } from "../services";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}

export const useGetAllBlogs = () => {
  return useQuery<Blog[], Error>({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
    staleTime: 1000 * 60 * 5, // 5 min — avoid refetch on every mount
    refetchOnWindowFocus: false,
  });
};

export const useDeleteBlog = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, string>({
    mutationFn: () => deleteBlogById(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["blogs"] });

      const previousBlogs = queryClient.getQueryData<Blog[]>(["blogs"]);

      queryClient.setQueryData<Blog[]>(
        ["blogs"],
        (old) => old?.filter((blog) => blog._id !== id) ?? [],
      );

      return { previousBlogs };
    },

    onSuccess: (deleted: boolean) => {
      if (deleted) {
        toast.success("Blog deleted successfully");
      } else {
        // Server responded but not with 204 — treat as soft failure
        toast.error("Blog could not be deleted. Please try again.");
      }
    },

    onError: (error: any, id: string, context: any) => {
      // Roll back optimistic update on hard failure
      if (context?.previousBlogs) {
        queryClient.setQueryData<Blog[]>(["blogs"], context.previousBlogs);
      }
      toast.error(error?.response?.data?.message || "Failed to delete blog.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useBlogAuthor = (
  blog: Blog,
  currentUser: User,
  isAuthenticated: boolean,
) => {
  const memoizedValue = useMemo(() => {
    if (!isAuthenticated || !currentUser || !blog) {
      console.log("Inside 1st block");
      return false;
    }

    if (
      typeof blog.authorId === "object" &&
      blog.authorId !== null &&
      currentUser.id === blog.authorId._id
    ) {
      return true;
    }

    return false;
  }, [currentUser, isAuthenticated, blog]);

  return memoizedValue;
};

export const useBlogFilters = (blogs: Blog[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortFilter, setSortFilter] = useState<string>("default");

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(blogs.map((b) => b.category).filter(Boolean)),
    ) as string[];
    return ["All", ...unique];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const filtered = blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" ||
        blog.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    const sorted = [...filtered];

    return sorted;
  }, [blogs, searchTerm, selectedCategory, sortFilter]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortFilter,
    setSortFilter,
    filteredBlogs,
    categories,
  };
};

export const useBlogStats = (blogs: Blog[], categoriesCount: number) => {
  const totalCategories = categoriesCount ? categoriesCount - 1 : 0;

  const totalAuthors = useMemo(() => {
    const authorIds = blogs.map((b) =>
      typeof b.authorId === "string" ? b.authorId : b.authorId._id,
    );

    return new Set(authorIds).size;
  }, [blogs]);

  return { totalCategories, totalAuthors };
};

export const useBlogView = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(false);

  return {
    viewMode,
    setViewMode,
    showFilters,
    setShowFilters,
  };
};

export const useBlogDelete = (id: string) => {
  const { mutate: deleteMutate, isPending } = useDeleteBlog(id);

  const handleDeleteBlog = (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    deleteMutate(id);
  };

  return { handleDeleteBlog, isDeleting: isPending };
};

export const useBlogPage = () => {
  const { data: blogs = [], isLoading, isError, error } = useGetAllBlogs();

  const filters = useBlogFilters(blogs);
  const stats = useBlogStats(blogs, filters.categories.length);
  const view = useBlogView();

  return {
    blogs,
    isLoading,
    isError,
    error,
    ...filters,
    ...stats,
    ...view,
  };
};

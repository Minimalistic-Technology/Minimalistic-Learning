export interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    description?: string;
    coverImage?: {
        url: string;
        alt: string;
        publicId: string;
    }
    readTime: number;
    tags: string[];
    authorId: string | PopulateAuthor; // Points to User model
    published: boolean;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PopulateAuthor {
  _id: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface BlogFormData {
  title: string;
  content: string;
  category: string;
  tags: string[];
  authorId: string;
}

export type ViewMode = "grid" | "list";

export const sortOptions = [
  { label: "All Blogs", value: "default", icon: "Grid3x3" },
  { label: "Most Popular", value: "most-viewed", icon: "TrendingUp" },
  { label: "Most Recent", value: "most-recent", icon: "Clock" },
] as const;
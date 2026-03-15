export interface Blog {
    _id: string;
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
    authorId: string; // Points to User model
    published: boolean;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BlogFormData {
  title: string;
  content: string;
  category: string;
  tags: string[];
  authorId: string;
}
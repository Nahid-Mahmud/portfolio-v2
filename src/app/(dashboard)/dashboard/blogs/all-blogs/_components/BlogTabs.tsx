"use client";

import { BlogCard } from "@/app/(dashboard)/dashboard/blogs/all-blogs/_components/BlogCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Blog {
  id: string;
  title: string;
  description: string;
  photo: string;
  altText: string;
  slug: string;
  categoryId: string;
  isPublished: boolean;
  createdAt: string;
}

interface BlogTabsProps {
  blogs: Blog[];
}

export function BlogTabs({ blogs }: BlogTabsProps) {
  const publishedBlogs = blogs.filter((blog) => blog.isPublished);
  const unpublishedBlogs = blogs.filter((blog) => !blog.isPublished);

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="all">All Blogs ({blogs.length})</TabsTrigger>
        <TabsTrigger value="published">Published ({publishedBlogs.length})</TabsTrigger>
        <TabsTrigger value="drafts">Drafts ({unpublishedBlogs.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No blogs available</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="published">
        {publishedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No published blogs</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="drafts">
        {unpublishedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {unpublishedBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No draft blogs</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

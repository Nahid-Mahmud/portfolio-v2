import { getAllBlogCategories } from "@/actions/blog.category.actions";
import AddBlogs from "./_components/AddBlogs";
import { Suspense } from "react";

export default async function BlogPage() {
  const blogCategories = (await getAllBlogCategories()) || [];
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AddBlogs categories={blogCategories.data} />
      </Suspense>
    </div>
  );
}

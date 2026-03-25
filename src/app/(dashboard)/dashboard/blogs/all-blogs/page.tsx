import { getAllBlogs } from "@/actions/blog.actions";
import { BlogTabs } from "@/app/(dashboard)/dashboard/blogs/all-blogs/_components/BlogTabs";

export const dynamic = "force-dynamic";

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

export default async function AdminAllBlogs() {
  const { data: blogs } = (await getAllBlogs()) as { data: Blog[] };

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="md:mb-16 mb-5 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">All Blogs</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">Manage all your blog posts here.</p>
        </div>

        <BlogTabs blogs={blogs} />
      </div>
    </section>
  );
}

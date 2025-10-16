import { getAllBlogs } from "@/actions/blog.actions";
import { BlogCard } from "@/app/(dashboard)/dashboard/blogs/all-blogs/_components/BlogCard";

interface Blog {
  id: string;
  title: string;
  description: string;
  photo: string;
  altText: string;
  slug: string;
  categoryId: string;
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
      </div>
    </section>
  );
}

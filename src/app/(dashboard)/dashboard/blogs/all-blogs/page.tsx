import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllBlogs } from "@/actions/blog.actions";

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
  console.log(blogs);
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="md:mb-16 mb-5 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">All Blogs</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">Manage all your blog posts here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog.slug} className="z-10 flex flex-col h-full pt-0">
              {blog.photo && (
                <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                  <Image src={blog.photo} alt={blog.altText} fill className="object-cover" />
                </div>
              )}
              <CardContent className="space-y-2 pt-4 flex-1">
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>{blog.description}</CardDescription>
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="items-end flex w-full justify-end">
                <Button variant={"outline"} asChild>
                  <Link href={`/dashboard/blogs/edit-blogs/${blog.id}`} className="text-primary font-medium">
                    Edit Blog
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

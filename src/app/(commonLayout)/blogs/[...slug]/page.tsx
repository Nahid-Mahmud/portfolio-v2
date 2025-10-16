import { getBlogById } from "@/actions/blog.actions";
import { Button } from "@/components/ui/button";
import { readMarkdownFile } from "@/utils/readMarkdownFile";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBlogs } from "../../_data/blogs";
// Force dynamic rendering for project pages
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: blogData } = await getBlogById(slug[0]);
  const blog = blogData
    ? {
        title: blogData.title,
        image: blogData.photo,
        publishDate: new Date(blogData.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        fullBlog: blogData.content, // pass content directly
        description: blogData.description,
      }
    : allBlogs.find((b) => b.slug === slug[1]);
  if (!blog) {
    notFound();
  }
  const contentHtml = await readMarkdownFile(blog.fullBlog);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {blog.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image src={blog.image} alt={blog.title} fill className="object-cover" />
            </div>
          )}

          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{blog.title}</h1>
            <p className="text-muted-foreground">{blog.publishDate}</p>
          </div>

          {contentHtml && (
            <div className="prose prose-sm md:prose-lg max-w-none dark:prose-invert text-wrap break-words">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

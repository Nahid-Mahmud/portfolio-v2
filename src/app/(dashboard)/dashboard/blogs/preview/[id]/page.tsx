import { getBlogByIdForAdmin } from "@/actions/blog.actions";
import { Button } from "@/components/ui/button";
import CodeBlockWrapper from "@/components/CodeBlockWrapper";
import { readMarkdownFile } from "@/utils/readMarkdownFile";
import { calculateReadingTime, formatReadingTime } from "@/utils/readingTime";
import { ArrowLeft, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPreviewPage({ params }: PageProps) {
  const { id } = await params;
  const { data: blogData } = await getBlogByIdForAdmin(id);

  if (!blogData) {
    notFound();
  }

  const blog = {
    title: blogData.title,
    image: blogData.photo,
    publishDate: new Date(blogData.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    fullBlog: blogData.content,
    description: blogData.description,
    tags: blogData.tags,
  };

  const contentHtml = await readMarkdownFile(blog.fullBlog);
  const readingTime = contentHtml ? calculateReadingTime(contentHtml) : 1;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <Link href="/dashboard/blogs/all-blogs" className="hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <Link href="/dashboard/blogs/all-blogs" className="hover:text-foreground transition-colors">
                All Blogs
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-2 text-foreground font-medium">Preview</li>
          </ol>
        </nav>

        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard/blogs/all-blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Blogs
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <header className="space-y-4">
            <h1 className="text-4xl font-bold">{blog.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
              <time dateTime={blogData.createdAt}>{blog.publishDate}</time>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatReadingTime(readingTime)}</span>
              </div>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.slice(0, 5).map((tag: string, index: number) => (
                    <span key={index} className="px-2 py-1 text-xs bg-accent dark:bg-secondary rounded-md">
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 5 && (
                    <span className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground">
                      +{blog.tags.length - 5} more
                    </span>
                  )}
                </div>
              )}
            </div>
            {!blogData.isPublished && (
              <div className="inline-block px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-md">
                Draft - Not Published
              </div>
            )}
          </header>

          {blog.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image src={blog.image} alt={blog.title} fill className="object-cover z-10" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" />
            </div>
          )}

          {contentHtml && (
            <article className="prose prose-sm md:prose-lg max-w-none dark:prose-invert text-wrap wrap-break-word">
              <CodeBlockWrapper>
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </CodeBlockWrapper>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

import { Metadata } from "next";
import { allBlogs } from "../../_data/blogs";
import { notFound } from "next/navigation";
import { readMarkdownFile } from "@/utils/readMarkdownFile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = allBlogs.find((b) => b.slug === params.slug);
  if (!blog) {
    return { title: "Blog Not Found" };
  }
  if (!blog) {
    return { title: "Blog Not Found" };
  }
  const img = blog.image;
  const imageUrl = typeof img === "string" ? img : img.src;
  return {
    title: `${blog.title} - Md. Nahid Mahmud`,
    description: blog.description,
    openGraph: {
      title: `${blog.title} - Md. Nahid Mahmud`,
      description: blog.description,
      url: `https://nahid-mahmud.xyz/blogs/${blog.slug}`,
      siteName: "Md. Nahid Mahmud",
      images: [
        {
          url: imageUrl || "/open_Graph_photo.png",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} - Md. Nahid Mahmud`,
      description: blog.description,
      images: [imageUrl || "/open_Graph_photo.png"],
    },
  };
}

interface PageProps {
  params: { slug: string };
}

export default async function BlogPage({ params }: PageProps) {
  const blog = allBlogs.find((b) => b.slug === params.slug);
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

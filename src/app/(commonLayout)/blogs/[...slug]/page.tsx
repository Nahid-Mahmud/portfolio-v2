import { getBlogById } from "@/actions/blog.actions";
import { Button } from "@/components/ui/button";
import CodeBlockWrapper from "@/components/CodeBlockWrapper";
import envVariables from "@/config/env";
import { readMarkdownFile } from "@/utils/readMarkdownFile";
import { calculateReadingTime, formatReadingTime } from "@/utils/readingTime";
import { ArrowLeft, Clock, Facebook, Github, Linkedin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBlogs } from "../../_data/blogs";
// Force dynamic rendering for project pages
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
        fullBlog: blogData.content,
        description: blogData.description,
        slug: slug[0],
      }
    : allBlogs.find((b) => b.slug === slug[1]);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const baseUrl = envVariables.NEXT_PUBLIC_BASE_URL || "https://nahid-mahmud.xyz";
  const blogUrl = `${baseUrl}/blogs/${blog.slug || slug[0]}`;
  const imageUrl = blog.image?.startsWith("http") ? blog.image : `${baseUrl}${blog.image}`;

  return {
    title: blog.title,
    description: blog.description,
    authors: [{ name: "Md. Nahid Mahmud", url: baseUrl }],
    creator: "Md. Nahid Mahmud",
    publisher: "Md. Nahid Mahmud",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: blogUrl,
      siteName: "Md. Nahid Mahmud - Portfolio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: blogData?.createdAt || blog.publishDate,
      authors: ["Md. Nahid Mahmud"],
      section: "Technology",
      tags: blogData?.tags || ["web development", "programming", "technology"],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      creator: "@nahidmahmuddev",
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code", // Replace with your actual verification code
    },
  };
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
        slug: slug[0],
      }
    : allBlogs.find((b) => b.slug === slug[1]);
  if (!blog) {
    notFound();
  }

  const contentHtml = await readMarkdownFile(blog.fullBlog);
  const baseUrl = envVariables.NEXT_PUBLIC_BASE_URL || "https://nahidmahmud.dev";
  const blogUrl = `${baseUrl}/blogs/${blog.slug || slug[0]}`;
  const imageUrl = blog.image?.startsWith("http") ? blog.image : `${baseUrl}${blog.image}`;

  // Calculate reading time
  const readingTime = contentHtml ? calculateReadingTime(contentHtml) : 1;

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: imageUrl,
    url: blogUrl,
    datePublished: blogData?.createdAt || blog.publishDate,
    dateModified: blogData?.createdAt || blog.publishDate,
    author: {
      "@type": "Person",
      name: "Md. Nahid Mahmud",
      url: baseUrl,
      jobTitle: "Fullstack Developer",
      sameAs: [
        "https://www.linkedin.com/in/md-nahid-mahmud/",
        "https://github.com/Nahid-Mahmud",
        "https://www.facebook.com/nahidmahmudd/",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Md. Nahid Mahmud",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogUrl,
    },
    keywords:
      blogData?.tags && Array.isArray(blogData.tags)
        ? blogData.tags.join(", ")
        : "web development, programming, technology",
    articleSection: "Technology",
    inLanguage: "en-US",
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li className="before:content-['/'] before:mx-2">
                <Link href="/blogs" className="hover:text-foreground transition-colors">
                  Blogs
                </Link>
              </li>
              <li className="before:content-['/'] before:mx-2 text-foreground font-medium">{blog.title}</li>
            </ol>
          </nav>

          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blogs
              </Link>
            </Button>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Article Header */}
            <header className="space-y-4">
              <h1 className="text-4xl font-bold">{blog.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
                <time dateTime={blogData?.createdAt || blog.publishDate}>{blog.publishDate}</time>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatReadingTime(readingTime)}</span>
                </div>
                {blogData?.tags && blogData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blogData.tags.slice(0, 5).map((tag: string, index: number) => (
                      <span key={index} className="px-2 py-1 text-xs bg-accent dark:bg-secondary rounded-md">
                        {tag}
                      </span>
                    ))}
                    {blogData.tags.length > 5 && (
                      <span className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground">
                        +{blogData.tags.length - 5} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </header>

            {blog.image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  // placeholder="blur"
                  // blurDataURL=""
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            )}

            {/* Article Content */}
            {contentHtml && (
              <article className="prose prose-sm md:prose-lg max-w-none dark:prose-invert text-wrap break-words">
                <CodeBlockWrapper>
                  <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                </CodeBlockWrapper>
              </article>
            )}

            {/* Author Section */}
            <footer className="flex flex-col py-6 border-t border-border/50 mt-12 gap-4">
              <div className="mb-4 sm:mb-0">
                <p className="text-lg text-muted-foreground">Written by</p>
                <p className="text-2xl font-semibold">Md. Nahid Mahmud</p>
                <p className="text-lg text-muted-foreground">Fullstack Developer</p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <Link
                  href="https://www.facebook.com/nahidmahmudd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-background border border-border hover:bg-accent hover:border-accent-foreground/20 transition-all duration-200"
                  title="Facebook"
                >
                  <Facebook className="h-4 w-4 text-[#1877F2]" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/md-nahid-mahmud/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-background border border-border hover:bg-accent hover:border-accent-foreground/20 transition-all duration-200"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                </Link>
                <Link
                  href="https://github.com/Nahid-Mahmud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-background border border-border hover:bg-accent hover:border-accent-foreground/20 transition-all duration-200"
                  title="GitHub"
                >
                  <Github className="h-4 w-4" />
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

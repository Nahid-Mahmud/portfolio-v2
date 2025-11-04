import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
// Add import for Card components
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

export const metadata: Metadata = {
  title: "Blogs - Md. Nahid Mahmud",
  description: "Read my latest blog posts about web development, tutorials, and more.",
  openGraph: {
    title: "Blogs - Md. Nahid Mahmud",
    description: "Read my latest blog posts about web development, tutorials, and more.",
    url: "https://nahid-mahmud.xyz/blogs",
    siteName: "Md. Nahid Mahmud",
    images: [
      {
        url: "/open_Graph_photo.png",
        width: 1200,
        height: 630,
        alt: "My Blogs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs - Md. Nahid Mahmud",
    description: "Read my latest blog posts about web development, tutorials, and more.",
    images: ["/open_Graph_photo.png"],
  },
};

export default async function Blogs() {
  const { data: blogs } = await getAllBlogs();

  return (
    <section id="blogs" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="md:mb-16 mb-5 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">My Blogs</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Read my latest blog posts about web development, tutorials, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog: Blog) => (
            <Card key={blog.slug} className="z-10 flex flex-col h-full pt-0">
              {blog.photo && (
                <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                  <Image src={blog.photo} alt={blog.altText} fill className="object-cover" />
                </div>
              )}
              <CardContent className="space-y-2 pt-4 flex-1">
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>{blog.description}</CardDescription>
              </CardContent>
              <CardFooter className="items-end flex w-full justify-end">
                <Button variant={"outline"} asChild>
                  <Link
                    href={`/blogs/${blog.id}/${blog.description}/${blog.slug}`}
                    className="text-primary font-medium"
                  >
                    Read Full Blog →
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

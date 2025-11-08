import { allBlogs } from "@/app/(commonLayout)/_data/blogs";
import envVariables from "@/config/env";
import { MetadataRoute } from "next";

interface ApiBlog {
  _id: string;
  title: string;
  description: string;
  photo: string;
  altText: string;
  slug: string;
  categoryId: string;
  createdAt: string;
  updatedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = envVariables.NEXT_PUBLIC_BASE_URL || "https://nahidmahmud.dev";

  // Get dynamic blogs from API (public endpoint, no cookies needed for sitemap)
  let dynamicBlogs: ApiBlog[] = [];
  try {
    const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Revalidate every hour for sitemap
    });

    if (res.ok) {
      const responseData = await res.json();
      dynamicBlogs = responseData.data || [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error("Error fetching blogs for sitemap:", error);
  }

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic blog routes from API
  const dynamicBlogRoutes: MetadataRoute.Sitemap = dynamicBlogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog._id}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Static blog routes from local data
  const staticBlogRoutes: MetadataRoute.Sitemap = allBlogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...dynamicBlogRoutes, ...staticBlogRoutes];
}

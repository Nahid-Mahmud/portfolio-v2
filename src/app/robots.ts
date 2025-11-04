import { MetadataRoute } from "next";
import envVariables from "@/config/env";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = envVariables.NEXT_PUBLIC_BASE_URL || "https://nahidmahmud.dev";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/", "/_next/", "/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

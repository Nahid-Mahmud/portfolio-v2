import { NextRequest, NextResponse } from "next/server";
import { allBlogs } from "@/app/(commonLayout)/_data/blogs";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const blog = allBlogs.find((b) => b.slug === slug);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Read the raw markdown content
    const filePath = path.join(process.cwd(), "src", "docs", blog.fullBlog);
    const content = fs.readFileSync(filePath, "utf-8");

    // For now, assume image is a local path, but form expects URL, so maybe leave as is or convert
    // Since image is imported, perhaps return the src or something, but for simplicity, return as is

    return NextResponse.json({
      ...blog,
      content,
      // Add missing fields with defaults
      altText: "", // Not available
      tags: "", // Not available
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

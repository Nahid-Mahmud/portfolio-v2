import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FolderOpen, Tag } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your portfolio dashboard. Manage your blogs, projects, and blog categories.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Blogs
            </CardTitle>
            <CardDescription>Manage your blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href="/dashboard/blogs/add-blogs" className="block text-sm text-blue-600 hover:underline">
                Add New Blog
              </Link>
              <Link href="/dashboard/blogs/all-blogs" className="block text-sm text-blue-600 hover:underline">
                View All Blogs
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Blog Categories
            </CardTitle>
            <CardDescription>Organize your blogs with categories</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/blogs/blog-category" className="text-sm text-blue-600 hover:underline">
              Manage Categories
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Projects
            </CardTitle>
            <CardDescription>Showcase your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href="/dashboard/project/add-new" className="block text-sm text-blue-600 hover:underline">
                Add New Project
              </Link>
              <Link href="/dashboard/project/all" className="block text-sm text-blue-600 hover:underline">
                View All Projects
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

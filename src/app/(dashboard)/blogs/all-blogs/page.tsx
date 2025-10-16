import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, BookOpen } from "lucide-react";

export default function AllBlogsPage() {
  // Placeholder data - in a real app, this would come from an API or database
  const blogs = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      category: "Web Development",
      status: "Published",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "React Best Practices",
      category: "React",
      status: "Draft",
      date: "2024-01-10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Blogs</h1>
          <p className="text-muted-foreground">Manage and view all your blog posts</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/blogs/add-blogs">
            <Plus className="h-4 w-4 mr-2" />
            Add New Blog
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Card key={blog.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {blog.title}
              </CardTitle>
              <CardDescription>
                {blog.category} • {blog.status} • {blog.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No blogs yet</h3>
          <p className="text-muted-foreground mb-4">Start writing your first blog post</p>
          <Button asChild>
            <Link href="/dashboard/blogs/add-blogs">Create Your First Blog</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

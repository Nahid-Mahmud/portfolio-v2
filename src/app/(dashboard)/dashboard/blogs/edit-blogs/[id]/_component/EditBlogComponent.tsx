"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateBlog } from "@/actions/blog.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MDXEditor = dynamic(() => import("@/components/mdx-editor").then((mod) => ({ default: mod.MDXEditor })), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] border rounded-md flex items-center justify-center">Loading editor...</div>
  ),
});

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  altText: z.string().min(1, "Alt text is required"),
  tags: z.string().min(1, "Tags are required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function EditBlogComponent({
  blog,
  categories,
}: {
  blog: any;
  categories: { id: string; name: string }[];
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog.title || "",
      description: blog.description || "",
      altText: blog.altText || "",
      tags: blog.tags ? blog.tags.join(", ") : "",
      content: blog.content || "",
      category: blog.categoryId || "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: BlogFormData) => {
    try {
      setIsSubmitting(true);

      // Update the blog using the blog action
      const result = await updateBlog(blog.id, {
        title: data.title,
        content: data.content,
        description: data.description,
        photo: imageFile || undefined,
        altText: data.altText,
        category: data.category,
        tags: data.tags,
        // if photo is a file then send deletePhoto as previously set image link getting form api
        deletePhoto: imageFile ? blog.photo : undefined,
      });

      if (result.success) {
        toast.success("Blog updated successfully!");
        router.push("/dashboard/blogs/all-blogs"); // Redirect to the blogs list
      } else {
        toast.error(`Failed to update blog: ${result.error || "Unknown error"}`);
        console.error("Blog update error:", result);
      }
    } catch (error) {
      toast.error("An error occurred while updating the blog");
      console.error("Blog update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter blog title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (for SEO)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description of the blog for SEO and previews"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid  gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Image File (Optional - leave empty to keep current)
              </label>
              {blog.photo && !imageFile && (
                <div className="mb-2">
                  <p className="text-sm text-gray-600">Current Image:</p>
                  <img src={blog.photo} alt={blog.altText} className="w-32 h-32 object-cover rounded" />
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  // Check file size - 5MB max
                  if (file && file.size > 5 * 1024 * 1024) {
                    toast.error("File size exceeds 5MB limit");
                    e.target.value = "";
                    setImageFile(null);
                    return;
                  }
                  setImageFile(file);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {" "}
            <FormField
              control={form.control}
              name="altText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alt Text for Image (SEO)</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe the image for accessibility and SEO" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma separated, for SEO keywords)</FormLabel>
                  <FormControl>
                    <Input placeholder="react, nextjs, typescript" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <MDXEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Write your blog content here..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Updating Blog...
              </>
            ) : (
              "Update Blog"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

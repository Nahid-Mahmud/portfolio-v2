"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MDXEditor } from "@/components/mdx-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  publishDate: z.string().min(1, "Publish date is required"),
  image: z.string(),
  altText: z.string().min(1, "Alt text is required"),
  tags: z.string().min(1, "Tags are required"),
  content: z.string().min(1, "Content is required"),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function EditBlogPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const slug = params.id as string;

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      publishDate: "",
      image: "",
      altText: "",
      tags: "",
      content: "",
    },
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        if (response.ok) {
          const blog = await response.json();
          form.reset({
            title: blog.title,
            description: blog.description,
            publishDate: blog.publishDate,
            image: blog.image || "", // Since image is imported, perhaps not a URL, but for now
            altText: blog.altText || "",
            tags: blog.tags || "",
            content: blog.content,
          });
        } else {
          console.error("Failed to fetch blog");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug, form]);

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Submit to API to update blog
      console.log("Updated blog data:", data);
      alert("Blog updated successfully! (Check console for data)");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Error updating blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="text-center">Loading blog...</div>
      </div>
    );
  }

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="publishDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publish Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                    className="min-h-[400px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? "Updating Blog..." : "Update Blog"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

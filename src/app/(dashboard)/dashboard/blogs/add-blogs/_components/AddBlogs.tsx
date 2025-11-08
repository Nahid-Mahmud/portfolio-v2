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

import { createBlog } from "@/actions/blog.actions";
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

export default function AddBlogs({ categories }: { categories: { id: string; name: string }[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isImageError, setIsImageError] = useState(false);
  const router = useRouter();

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      altText: "",
      tags: "",
      content: "",
      category: "",
    },
  });

  // Form submission handler that will be called only if we have valid form data and an image
  const onSubmit = async (data: BlogFormData) => {
    if (!imageFile) return; // Safety check

    try {
      setIsSubmitting(true);

      // Create the blog using the blog action
      const result = await createBlog({
        title: data.title,
        content: data.content,
        description: data.description,
        photo: imageFile,
        altText: data.altText,
        categoryId: data.category,
        tags: data.tags,
      });

      if (result.success) {
        toast.success("Blog created successfully!");
        router.push("/dashboard/blogs/all-blogs"); // Redirect to the blogs list
      } else {
        toast.error(`Failed to create blog: ${result.error || "Unknown error"}`);
        // console.error("Blog creation error:", result);
      }
    } catch (error) {
      toast.error("An error occurred while creating the blog");
      // console.error("Blog creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Add New Blog</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            // Check image but allow Zod validation to proceed
            if (!imageFile) {
              setIsImageError(true);
              // Don't return, let Zod validation errors also show
            }

            // Only if we have an image, proceed with the rest of the submission
            if (imageFile) {
              onSubmit(data);
            }
          })}
          className="space-y-6"
        >
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
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Image File
              </label>
              <Input
                type="file"
                accept="image/*"
                // max upload size 5MB
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
                  if (file) {
                    setIsImageError(false);
                  }
                }}
              />
              {isImageError && <p className="text-sm text-destructive">Image file is required</p>}
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
          </div>

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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    // className="min-h-[400px]"
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
                Adding Blog...
              </>
            ) : (
              "Add Blog"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

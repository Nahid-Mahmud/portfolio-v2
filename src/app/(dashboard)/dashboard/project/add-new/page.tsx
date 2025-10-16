"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dynamic from "next/dynamic";
import { createProject } from "@/actions/project.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MDXEditor = dynamic(() => import("@/components/mdx-editor").then((mod) => ({ default: mod.MDXEditor })), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] border rounded-md flex items-center justify-center">Loading editor...</div>
  ),
});

// Alternative: Import MarkdownInput if you want to use it instead
// const MarkdownInput = dynamic(() => import("@/components/MarkdownInput"), {
//   ssr: false,
//   loading: () => (
//     <div className="min-h-[400px] border rounded-md flex items-center justify-center">Loading editor...</div>
//   ),
// });

const projectSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(500, "Title is too long"),
  shortDescription: z.string().min(1, "Short description cannot be empty"),
  projectDetails: z.string().min(1, "Project details cannot be empty"),
  liveLink: z.string().url("Invalid live link URL"),
  frontendLink: z.string().url("Invalid frontend link URL"),
  backendLink: z
    .string()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, "Invalid backend link URL"),
  altText: z.string().min(1, "Alt text is required"),
  video: z.string().refine((val) => val === "" || z.string().url().safeParse(val).success, "Invalid video URL"),
  category: z.enum(["FullStack", "Frontend"]),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function AddNewProject() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isImageError, setIsImageError] = useState(false);
  const router = useRouter();

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      projectDetails: "",
      liveLink: "",
      frontendLink: "",
      backendLink: "",
      altText: "",
      video: "",
      category: "FullStack",
      technologies: [],
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    if (!imageFile) return; // Safety check

    setIsSubmitting(true);
    try {
      const result = await createProject({
        ...data,
        photo: imageFile,
      });

      if (result.success) {
        toast.success("Project added successfully!");
        form.reset();
        setImageFile(null);
        setIsImageError(false);
        router.push("/dashboard/project/all");
      } else {
        toast.error(result.error || "Error adding project");
        console.error("Error details:", result.details);
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Error adding project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Add New Project</h1>

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
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief description of the project" className="min-h-[80px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="liveLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://myproject.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Image File
              </label>
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
                  if (file) {
                    setIsImageError(false);
                  }
                }}
              />
              {isImageError && <p className="text-sm text-destructive">Image file is required</p>}
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="frontendLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frontend Repository</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/user/frontend-repo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="backendLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Backend Repository (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/user/backend-repo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FullStack">FullStack</SelectItem>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="video"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Explanation Video URL (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies (comma separated)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="React, Next.js, TypeScript, Node.js"
                    value={field.value.join(", ")}
                    onChange={(e) => {
                      const technologies = e.target.value
                        .split(",")
                        .map((tech) => tech.trim())
                        .filter((tech) => tech.length > 0);
                      field.onChange(technologies);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Details (Markdown)</FormLabel>
                <FormControl>
                  <MDXEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Write detailed project information here..."
                    className="min-h-[400px]"
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
                Adding Project...
              </>
            ) : (
              "Add Project"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

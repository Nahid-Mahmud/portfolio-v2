"use client";

import { updateProject } from "@/actions/project.actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Dynamic import for MDXEditor to avoid hydration issues
const MDXEditor = dynamic(() => import("@/components/mdx-editor").then((mod) => ({ default: mod.MDXEditor })), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] border rounded-md flex items-center justify-center">Loading editor...</div>
  ),
});

const projectSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(500, "Title is too long"),
  shortDescription: z.string().min(1, "Short description cannot be empty"),
  projectDetails: z.string().min(1, "Project details cannot be empty"),
  liveLink: z.string().url("Invalid live link URL"),
  frontendLink: z.string().url("Invalid frontend link URL"),
  backendLink: z.string().url("Invalid backend link URL").optional(),
  altText: z.string().min(1, "Alt text is required"),
  video: z.string().url("Invalid video URL").optional(),
  category: z.enum(["FullStack", "Frontend"]),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectType {
  id: string;
  title: string;
  shortDescription: string;
  projectDetails: string;
  liveLink: string;
  frontendLink: string;
  backendLink?: string;
  photo: string;
  altText: string;
  video?: string;
  category: "FullStack" | "Frontend";
  technologies: string[];
}

export default function EditProject({ project }: { project: ProjectType }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project.title || "",
      shortDescription: project.shortDescription || "",
      projectDetails: project.projectDetails || "",
      liveLink: project.liveLink || "",
      frontendLink: project.frontendLink || "",
      backendLink: project.backendLink || "",
      altText: project.altText || "",
      video: project.video || "",
      category: project.category || "FullStack",
      technologies: project.technologies || [],
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      const result = await updateProject(project.id, {
        name: data.title,
        description: data.shortDescription,
        liveUrl: data.liveLink,
        clientRepo: data.frontendLink,
        serverRepo: data.backendLink,
        photo: imageFile || undefined,
        altText: data.altText,
        category: data.category,
        tags: data.technologies.join(", "),
        explanationVideo: data.video,
        projectData: data.projectDetails,
        deletePhoto: imageFile ? project.photo : undefined,
      });

      if (result.success) {
        toast.success("Project updated successfully!");
        router.push("/dashboard/project/all");
      } else {
        toast.error(result.error || "Error updating project");
        console.error("Error details:", result.details);
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Error updating project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          <div className="grid  gap-6">
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
                Image File (Optional - leave empty to keep current)
              </label>
              {project.photo && !imageFile && (
                <div className="mb-2">
                  <p className="text-sm text-gray-600">Current Image:</p>
                  <img src={project.photo} alt={project.altText} className="w-32 h-32 object-cover rounded" />
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
                Updating Project...
              </>
            ) : (
              "Update Project"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

"use client";

import { deleteProject } from "@/actions/project.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface ProjectData {
  id: string;
  title: string;
  shortDescription: string;
  liveLink: string;
  frontendLink: string;
  backendLink: string;
  photo: string;
  altText: string;
  category: "FullStack" | "Frontend";
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

interface ProjectCardProps {
  project: ProjectData;
  onDelete: (id: string) => void;
}

export function AdminProjectCard({ project, onDelete }: ProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteProject(project.id);
      if (result.success) {
        toast.success("Project deleted successfully");
        onDelete(project.id);
      } else {
        toast.error(result.error || "Failed to delete project");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the project");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={project.photo || "/placeholder.svg"}
          alt={project.altText || project.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {project.shortDescription.length > 100
            ? `${project.shortDescription.slice(0, 100)}...`
            : project.shortDescription}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/project/${project.id}`}>View</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/project/edit/${project.id}`}>Edit</Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { AdminProjectCard } from "@/components/dashboard/projects/AdminProjectCard";
import { useState } from "react";

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

interface ProjectsClientProps {
  initialProjects: ProjectData[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);

  const handleDeleteProject = (deletedId: string) => {
    setProjects(projects.filter((project) => project.id !== deletedId));
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <AdminProjectCard key={project.id} project={project} onDelete={handleDeleteProject} />
      ))}
    </div>
  );
}

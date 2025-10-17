"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DeleteProjectModal from "./DeleteProjectModal";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showAllTech, setShowAllTech] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
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
          {project.technologies.slice(0, showAllTech ? project.technologies.length : 5).map((tech, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded">
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllTech(!showAllTech)}
              className="px-2 py-1 text-xs h-auto"
            >
              {showAllTech ? "Show less" : `+${project.technologies.length - 5} more`}
            </Button>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" asChild>
            <Link href={`/projects/${project.id}`}>View</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/project/edit/${project.id}`}>Edit</Link>
          </Button>
          <Button variant="destructive" onClick={handleDeleteClick}>
            Delete
          </Button>
        </div>
      </CardContent>
      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        project={project}
        onDelete={onDelete}
      />
    </Card>
  );
}

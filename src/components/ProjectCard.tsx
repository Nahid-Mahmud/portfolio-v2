"use client";

import type { Project } from "@/types/projects";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      title="Outdated project. Working on new projects."
      className="overflow-hidden dark:bg-[#162034] h-full flex flex-col group border-muted-foreground/20 transition-colors hover:shadow-lg dark:hover:shadow-white/10 pt-0"
    >
      <div className="relative overflow-hidden h-64">
        <div className="absolute hidden inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity md:flex items-center justify-center z-10">
          <div className="flex gap-4">
            <Button size="sm" variant="secondary" asChild>
              <Link href={`/projects/${encodeURIComponent(project.id)}`}>View Details</Link>
            </Button>
            <Button size="sm" variant="secondary" asChild>
              <Link href={project.liveUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          </div>
        </div>
        <div className="h-full w-full overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            height={500}
            width={500}
            alt={project.name}
            className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      <CardContent className="flex-grow pt-6">
        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">
          {project.description.length > 100 ? `${project.description.slice(0, 100)}...` : project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.slice(0, 5).map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}

          {project.tags.length > 5 ? (
            <Badge key="more" variant="secondary" className="font-normal">
              +{project.tags.length - 5} more
            </Badge>
          ) : null}
        </div>
      </CardContent>

      <div className="px-4 pb-4 pt-2 mt-auto space-y-2">
        <div className="flex items-center gap-4 justify-between w-full ">
          <div className="flex gap-5 items-center justify-between w-full md:w-fit">
            {project.clientRepo && (
              <Link
                href={project.clientRepo}
                className="text-sm font-medium flex items-center hover:text-primary transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="mr-1 h-4 w-4" />
                Client
              </Link>
            )}

            {project.serverRepo && (
              <Link
                href={project.serverRepo}
                className="text-sm font-medium flex items-center hover:text-primary transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="mr-1 h-4 w-4" />
                Server
              </Link>
            )}
          </div>
          <div>
            <Button size="sm" variant="outline" asChild className="hidden md:inline-flex">
              <Link href={`/projects/${encodeURIComponent(project.id)}`}>View Details</Link>
            </Button>
          </div>
        </div>
        <div className="flex w-full items-start justify-between">
          <Button className="md:hidden" size="sm" variant="outline" asChild>
            <Link href={`/projects/${encodeURIComponent(project.id)}`}>View Details</Link>
          </Button>
          <Link
            href={project.liveUrl}
            className="text-sm md:hidden font-medium flex items-center hover:text-primary transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink className="mr-1 h-4 w-4" />
            Live
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default ProjectCard;

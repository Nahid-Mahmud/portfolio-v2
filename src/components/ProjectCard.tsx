import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Project } from "@/types/projects";
import Link from "next/link";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col group border-muted-foreground/20 transition-colors hover:shadow-lg dark:hover:shadow-white/10 ">
      <div className="relative overflow-hidden h-64">
        <div className="absolute hidden inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity md:flex items-center justify-center z-10">
          <div className="flex gap-4">
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
            src={project.image}
            height={500}
            width={500}
            alt={project.name}
            className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      <CardContent className="flex-grow pt-6">
        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 flex justify-between">
        <Link
          href={project.clientRepo}
          className="text-sm font-medium flex items-center hover:text-primary transition-colors"
          target="_blank"
          rel="noreferrer"
        >
          <Github className="mr-1 h-4 w-4" />
          Client
        </Link>

        <Link
          href={project.serverRepo}
          className="text-sm font-medium flex items-center hover:text-primary transition-colors"
          target="_blank"
          rel="noreferrer"
        >
          <Github className="mr-1 h-4 w-4" />
          Server
        </Link>
        <Link
          href={project.liveUrl}
          className="text-sm md:hidden font-medium flex items-center hover:text-primary transition-colors"
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink className="mr-1 h-4 w-4" />
          Live
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;

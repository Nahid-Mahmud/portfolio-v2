import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projectsData } from "@/app/data/projects";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: PageProps) {
  const projectId = decodeURIComponent(params.id);
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Project Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <Image src={project.image} alt={project.name} fill className="object-cover" priority />
          </div>

          {/* Project Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{project.name}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{project.description}</p>
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Category */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Category</h3>
              <p className="text-muted-foreground capitalize">{project.category}</p>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-8">
            <Button asChild size="lg">
              <Link href={project.liveUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>

            {project.clientRepo && (
              <Button variant="outline" size="lg" asChild>
                <Link href={project.clientRepo} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Client Repository
                </Link>
              </Button>
            )}

            {project.serverRepo && (
              <Button variant="outline" size="lg" asChild>
                <Link href={project.serverRepo} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Server Repository
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

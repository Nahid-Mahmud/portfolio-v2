import { projectsData } from "@/app/_data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { readMarkdownFile } from "@/utils/readMarkdownFile";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactPlayer from "react-player";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Function to process Markdown to HTML

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const projectId = decodeURIComponent(resolvedParams.id);
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  const projectDetailsHtml = await readMarkdownFile(project.projectData);

  return (
    <div className="min-h-screen bg-background pt-20 ">
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
          {!project?.explanationVideo && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg bg-white">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover bg-white aspect-square z-10"
                priority
              />
            </div>
          )}

          {/* Explanation Video */}
          {project.explanationVideo && (
            <div className="space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg bg-black">
                <ReactPlayer
                  src={project.explanationVideo}
                  width="100%"
                  height="100%"
                  controls
                  style={{ position: "absolute", top: 0, left: 0 }}
                  config={{
                    youtube: {
                      // @ts-expect-error - playerVars type definition issue
                      playerVars: {
                        vq: "hd1080",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}

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

          {/* Project Details from Markdown */}
          {projectDetailsHtml && (
            <div className="pt-8">
              <h2 className="text-2xl font-semibold mb-6">Project Details</h2>
              <div
                className="prose prose-sm md:prose-lg max-w-none dark:prose-invert text-wrap break-words"
                dangerouslySetInnerHTML={{ __html: projectDetailsHtml }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

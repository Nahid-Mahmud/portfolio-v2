"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import type { Project } from "@/types/projects";
import Link from "next/link";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "./Modal";

function ProjectCard({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side rendering for the modal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Card
        title="Outdated project. Working on new projects."
        className="overflow-hidden dark:bg-[#162034] h-full flex flex-col group border-muted-foreground/20 transition-colors hover:shadow-lg dark:hover:shadow-white/10 "
      >
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
            {project.description.length > 100 ? `${project.description.slice(0, 100)}...` : project.description}{" "}
            {project?.description?.length > 100 && (
              <Button
                variant="link"
                className="px-0 h-auto font-medium cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                See more
              </Button>
            )}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="border-t pt-4 flex justify-between">
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

      {isMounted && (
        <Modal className="z-20 bg-white dark:bg-[#010313] " isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalHeader>
            <ModalTitle>{project.name}</ModalTitle>
          </ModalHeader>

          <ModalBody>
            <div className="space-y-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">{project.description}</p>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Category</h4>
                  <p className="text-muted-foreground">{project.category}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild>
                    <Link href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Link>
                  </Button>

                  {project.clientRepo && (
                    <Button variant="outline" asChild>
                      <Link href={project.clientRepo} target="_blank" rel="noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Client Repository
                      </Link>
                    </Button>
                  )}

                  {project.serverRepo && (
                    <Button variant="outline" asChild>
                      <Link href={project.serverRepo} target="_blank" rel="noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Server Repository
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
}

export default ProjectCard;

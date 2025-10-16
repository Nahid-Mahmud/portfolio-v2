import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FolderOpen } from "lucide-react";

export default function AllProjectsPage() {
  // Placeholder data - in a real app, this would come from an API or database
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A modern portfolio built with Next.js and TypeScript",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      status: "Completed",
      date: "2024-01-20",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB"],
      status: "In Progress",
      date: "2024-01-05",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Projects</h1>
          <p className="text-muted-foreground">Manage and showcase all your projects</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/project/add-new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                {project.title}
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.status} • {project.date}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">Start showcasing your work</p>
          <Button asChild>
            <Link href="/dashboard/project/add-new">Create Your First Project</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

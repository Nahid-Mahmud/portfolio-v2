import { projectsData } from "@/app/(commonLayout)/_data/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AdminAllProjects() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">All Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {project.description.length > 100 ? `${project.description.slice(0, 100)}...` : project.description}
              </p>
              <Button variant="outline">Edit</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

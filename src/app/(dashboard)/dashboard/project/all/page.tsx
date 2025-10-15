import { getAllProjects } from "@/actions/project.actions";
import { ProjectsClient } from "./ProjectsClient";

export default async function AdminAllProjects() {
  const { data: projects } = await getAllProjects();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">All Projects</h1>
      <ProjectsClient initialProjects={projects || []} />
    </div>
  );
}

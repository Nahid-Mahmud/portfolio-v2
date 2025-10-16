import { getProjectById } from "@/actions/project.actions";
import EditProject from "./_component/EditProject";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data: project } = await getProjectById(id);

  if (!project) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Project Not Found</h1>
        <p>The project you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div>
      <EditProject project={project} />
    </div>
  );
}

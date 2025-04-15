import ProjectCardsComponent from "@/components/ProjectCardsComponent";

export default function Projects() {
  return (
    <section id="projects" className="py-20 ">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">My Projects</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            A showcase of my recent work, personal projects, and collaborations.
          </p>
        </div>

        <ProjectCardsComponent />
      </div>
    </section>
  );
}

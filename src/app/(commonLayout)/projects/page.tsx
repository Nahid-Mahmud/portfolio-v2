import ProjectCardsComponent from "@/components/ProjectCardsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Md. Nahid Mahmud",
  description:
    "Explore my recent work, personal projects, and collaborations. A showcase of creativity and technical expertise.",
  openGraph: {
    title: "Projects - Md. Nahid Mahmud",
    description:
      "Explore my recent work, personal projects, and collaborations. A showcase of creativity and technical expertise.",
    url: "https://nahid-mahmud.xyz/projects",
    siteName: "Md. Nahid Mahmud",
    images: [
      {
        url: "/open_Graph_photo.png",
        width: 1200,
        height: 630,
        alt: "My Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Md. Nahid Mahmud",
    description:
      "Explore my recent work, personal projects, and collaborations. A showcase of creativity and technical expertise.",
    images: ["/open_Graph_photo.png"],
  },
};

export default function Projects() {
  return (
    <section id="projects" className="py-20 ">
      <div className="container px-4 mx-auto">
        <div className="md:mb-16 mb-5 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl  mb-4">My Projects</h2>
          {/* outdated project warning and working on new projects */}

          <p className="max-w-2xl mx-auto text-muted-foreground">
            A showcase of my recent work, personal projects, and collaborations.
          </p>
        </div>

        <ProjectCardsComponent />
      </div>
    </section>
  );
}

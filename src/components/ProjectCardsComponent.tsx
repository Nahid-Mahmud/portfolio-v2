"use client";
import type { Project } from "@/types/projects";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ReactHubImage from "@/assets/react-hub.png";
import byteCanvasImage from "@/assets/bytecanvas.png";
import assignmentBuddyImage from "@/assets/assignment-buddy.png";
import construction_websiteImage from "@/assets/construction_website.png";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const projects: Project[] = [
  {
    id: "Civil & Structural Engineering Company Website",
    name: "Civil & Structural Engineering Company Website",
    description:
      "Developed a responsive, professional front-end for an engineering firm offering civil, structural, and specialty services. My goal was to showcase the company’s expertise and streamline the user journey. I implemented a clean layout, service sections, and contact forms, resulting in a polished site that supports lead generation and reflects the firm's innovation and reliability.",
    image: construction_websiteImage,
    liveUrl: "https://bernithamedford.vercel.app/",
    clientRepo: "",
    serverRepo: "",
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    category: "frontend",
  },
  {
    id: "reacthub",
    name: "ReactHub",
    description: "A comprehensive platform for React developers to share resources and collaborate on projects.",
    image: ReactHubImage,
    liveUrl: "https://react-hub-nahid.surge.sh/",
    clientRepo: "https://github.com/Nahid-Mahmud/react-hub-client",
    serverRepo: "https://github.com/Nahid-Mahmud/react-hub-server",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    category: "fullstack",
  },
  {
    id: "bytecanvas",
    name: "ByteCanvas",
    description: "A digital canvas application that allows users to create and share Products online.",
    image: byteCanvasImage,
    liveUrl: "https://bytecanvas.surge.sh/",
    clientRepo: "https://github.com/Nahid-Mahmud/Byte-canvas-client",
    serverRepo: "https://github.com/Nahid-Mahmud/ByteCanvas-server",
    tags: ["React", "Firebase", "Node.js", "Express"],
    category: "fullstack",
  },
  {
    id: "assignmentbuddy",
    name: "Assignment Buddy",
    description: "An educational platform that helps students manage and collaborate on assignments.",
    image: assignmentBuddyImage,
    liveUrl: "https://assignment-buddy.surge.sh/",
    clientRepo: "https://github.com/Nahid-Mahmud/assignmnet-buddy-client",
    serverRepo: "https://github.com/Nahid-Mahmud/assignmnet-buddy-server",
    tags: ["React", "MongoDB", "Express", "JWT"],
    category: "fullstack",
  },
];

function ProjectCardsComponent() {
  // Get unique categories from projects
  const categories = ["all", ...new Set(projects.map((project) => project.category))];
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="space-y-8">
      <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full ">
        <TabsList className="w-full z-10 max-w-md mx-auto grid grid-cols-3 mb-8 dark:bg-[#0A2540]">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  className="relative z-10"
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default ProjectCardsComponent;

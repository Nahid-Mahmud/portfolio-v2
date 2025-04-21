"use client";
import { Project } from "@/types/projects";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ReactHubImage from "@/assets/react-hub.png";
import byteCanvasImage from "@/assets/bytecanvas.png";
import assignmentBuddyImage from "@/assets/assignment-buddy.png";

const projects: Project[] = [
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
    description: "A digital canvas application that allows users to create and share products online.",
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
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
  );
}

export default ProjectCardsComponent;

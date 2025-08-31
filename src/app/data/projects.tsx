import AIOImage from "@/assets/aio.png";
import assignmentBuddyImage from "@/assets/assignment-buddy.png";
import byteCanvasImage from "@/assets/bytecanvas.png";
import ReactHubImage from "@/assets/react-hub.png";
import { Project } from "../../types/projects";
export const projectsData: Project[] = [
  {
    id: "AIO Chat",
    name: "AIO Chat",
    description:
      "A full-featured AI chatbot app built with Next.js and React — supporting multiple AI models, context management, and responsive UI.",
    liveUrl: "http://aio.chat.nahid-mahmud.xyz",
    clientRepo: "https://github.com/Nahid-Mahmud/personal-ai-chatbot",
    tags: ["Next.js", "React", "Redux", "Next-Themes", "Tailwind Css"],
    category: "frontend",
    image: AIOImage,
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

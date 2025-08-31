import { Project } from "../../types/projects";
import AIOImage from "@/assets/aio.png";
import aquaImage from "@/assets/aqua.png";
import assignmentBuddyImage from "@/assets/assignment-buddy.png";
import byteCanvasImage from "@/assets/bytecanvas.png";
import construction_websiteImage from "@/assets/construction_website.png";
import ReactHubImage from "@/assets/react-hub.png";
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
    id: "Civil & Structural Engineering Company Website",
    name: "Civil & Structural Engineering Company Website",
    description:
      "Developed a responsive, professional front-end for an engineering firm offering civil, structural, and specialty services. My goal was to showcase the company’s expertise and streamline the user journey. I implemented a clean layout, service sections, and contact forms, resulting in a polished site that supports lead generation and reflects the firm's innovation and reliability.",
    image: construction_websiteImage,
    liveUrl: "https://civil-154sde.vercel.app/",
    clientRepo: "",
    serverRepo: "",
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    category: "frontend",
  },
  {
    id: "Frontend Development for Smart Water Leak Detection System",
    name: "Frontend Development for Smart Water Leak Detection System",
    description:
      "Developed the frontend for Aqua IQ, a smart leak detection system by Pure IC. The goal was to present complex product features in a clear, engaging, and responsive layout. I implemented a clean UI, structured product information, and intuitive navigation, ensuring a smooth user experience across devices. The result was a polished and professional website that supports the product’s innovative positioning in the market.",
    image: aquaImage,
    liveUrl: "https://aqua-frontend-nextjs.vercel.app/",
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

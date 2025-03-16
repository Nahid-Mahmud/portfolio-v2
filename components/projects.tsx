"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "A fully responsive e-commerce website with product filtering, cart functionality, and checkout process.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "Next.js", "Tailwind CSS", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Dashboard UI",
      description: "An interactive admin dashboard with data visualization, user management, and real-time updates.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "TypeScript", "Framer Motion", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Social Media App",
      description: "A social platform with user authentication, post creation, comments, and real-time notifications.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="projects" className="py-20 md:py-32 bg-background ">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
          <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
            A selection of my recent work showcasing my skills and expertise
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <div className="relative overflow-hidden">
        <div className="aspect-video overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={600}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <Button size="sm" variant="secondary" asChild>
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Code
            </Link>
          </Button>
        </div>
      </div>
      <CardContent className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag, i) => (
            <span key={i} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Braces,
  Code,
  Cpu,
  Database,
  FileType,
  Github,
  Globe,
  Layers,
  LayoutGrid,
  Rocket,
  Send,
  Server,
  Wind,
  Workflow,
} from "lucide-react";
import { useState } from "react";

type Skill = {
  name: string;
  icon: React.ReactNode;
  category: "frontend" | "backend" | "tools";
};

const skills: Skill[] = [
  { name: "HTML", icon: <Code className="h-10 w-10 text-gray-700" />, category: "frontend" },
  { name: "CSS", icon: <LayoutGrid className="h-10 w-10 text-gray-700" />, category: "frontend" },
  { name: "JavaScript", icon: <Braces className="h-10 w-10 text-gray-700" />, category: "frontend" },
  { name: "TypeScript", icon: <FileType className="h-10 w-10 text-gray-700" />, category: "frontend" },
  { name: "Tailwind CSS", icon: <Wind className="h-10 w-10 text-gray-700" />, category: "frontend" },
  { name: "ReactJS", icon: <Workflow className="h-10 w-10 text-gray-700" />, category: "frontend" },
  { name: "Next.js", icon: <Layers className="h-10 w-10 text-gray-700" />, category: "frontend" },
  { name: "Node.js", icon: <Server className="h-10 w-10 text-gray-700" />, category: "backend" },
  { name: "MongoDB", icon: <Database className="h-10 w-10 text-gray-700" />, category: "backend" },
  { name: "API Integration", icon: <Send className="h-10 w-10 text-gray-700" />, category: "backend" },
  { name: "Postman", icon: <Globe className="h-10 w-10 text-gray-700" />, category: "tools" },
  { name: "GitHub", icon: <Github className="h-10 w-10 text-gray-700" />, category: "tools" },
  { name: "GitHub Actions", icon: <Rocket className="h-10 w-10 text-gray-700" />, category: "tools" },
  { name: "CI/CD", icon: <Cpu className="h-10 w-10 text-gray-700" />, category: "tools" },
  {
    name: "VPS Hosting (Ubuntu)",
    icon: <Server className="h-10 w-10 text-gray-700" strokeWidth={1} />,
    category: "tools",
  },
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "tools">("all");

  const filteredSkills = activeTab === "all" ? skills : skills.filter((skill) => skill.category === activeTab);

  return (
    <section className="pt-28 pb-20 min-h-[80vh] container mx-auto">
      <div className="mb-8">
        <h2 className="md:text-5xl text-3xl underline font-bold text-center text-gray-800 dark:text-slate-100 mt-1">
          Tech Stack
        </h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 border-b dark:border-gray-700 border-gray-300">
        {["all", "frontend", "backend", "tools"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "all" | "frontend" | "backend" | "tools")}
            className={cn(
              "px-4 py-2 font-medium text-lg transition-colors",
              activeTab === tab
                ? "text-gray-800 dark:text-white border-b-2 border-gray-800  dark:border-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <AnimatePresence>
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center z-10 justify-center p-6 border border-gray-200 rounded-md bg-white hover:shadow-md transition-shadow duration-300 dark:bg-gray-900  dark:border-gray-700 dark:hover:shadow-lg"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {skill.icon}
              <span className="mt-3 text-center text-gray-700 dark:text-slate-300">{skill.name}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

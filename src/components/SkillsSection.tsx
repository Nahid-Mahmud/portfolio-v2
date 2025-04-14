"use client";

import apiImage from "@/assets/skills/api.png";
import ciCdImage from "@/assets/skills/ci-cd.png";
import cssImage from "@/assets/skills/css-3.png";
import GithubActionImage from "@/assets/skills/GitHub Actions.png";
import githubImage from "@/assets/skills/GitHub.png";
import htmlImage from "@/assets/skills/html-5.png";
import javascriptImage from "@/assets/skills/js.png";
import mongoDBImage from "@/assets/skills/MongoDB.png";
import nextJsImage from "@/assets/skills/Next.js.png";
import nodeJsImage from "@/assets/skills/node-js.png";
import postmanImage from "@/assets/skills/Postman.png";
import reactJsImage from "@/assets/skills/React.png";
import tailwindCssImage from "@/assets/skills/tailwindcss.png";
import typescriptImage from "@/assets/skills/typescript.png";
import vps from "@/assets/skills/vps.png";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type Skill = {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "tools";
};

const skills: Skill[] = [
  { name: "HTML", icon: htmlImage.src, category: "frontend" },
  { name: "CSS", category: "frontend", icon: cssImage.src },
  { name: "JavaScript", category: "frontend", icon: javascriptImage.src },
  { name: "TypeScript", category: "frontend", icon: typescriptImage.src },
  { name: "Tailwind CSS", category: "frontend", icon: tailwindCssImage.src },
  { name: "ReactJS", category: "frontend", icon: reactJsImage.src },
  { name: "Next.js", category: "frontend", icon: nextJsImage.src },
  { name: "Node.js", category: "backend", icon: nodeJsImage.src },
  { name: "MongoDB", category: "backend", icon: mongoDBImage.src },
  { name: "API Integration", category: "frontend", icon: apiImage.src },
  { name: "Postman", category: "tools", icon: postmanImage.src },
  { name: "GitHub", category: "tools", icon: githubImage.src },
  { name: "GitHub Actions", category: "tools", icon: GithubActionImage.src },
  { name: "CI/CD", category: "tools", icon: ciCdImage.src },
  { name: "VPS Hosting (Ubuntu)", category: "tools", icon: vps.src },
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
              className="flex flex-col items-center z-10 justify-center p-6 border border-gray-200 rounded-md bg-white hover:shadow-md  dark:hover:shadow-md hover:scale-105 transition-all dark:hover:shadow-slate-400 duration-300 dark:bg-gray-300  dark:border-gray-700 "
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Image src={skill.icon} alt={skill.name} height={60} width={60} />
              <span className="mt-3 text-center text-gray-700 dark:text-black">{skill.name}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

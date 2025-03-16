"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  Code2,
  FileCode,
  Braces,
  SquareCode,
  ArrowRightLeft,
  FileJson,
  Wind,
  Figma,
  GitBranch,
  Github,
} from "lucide-react"

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const skills = [
    { name: "HTML5", icon: Code2, color: "text-[#E34F26]" },
    { name: "CSS3", icon: FileCode, color: "text-[#1572B6]" },
    { name: "JavaScript", icon: Braces, color: "text-[#F7DF1E]" },
    { name: "TypeScript", icon: FileJson, color: "text-[#3178C6]" },
    { name: "React", icon: SquareCode, color: "text-[#61DAFB]" },
    { name: "Next.js", icon: ArrowRightLeft, color: "text-foreground" },
    { name: "Tailwind CSS", icon: Wind, color: "text-[#06B6D4]" },
    { name: "Figma", icon: Figma, color: "text-[#F24E1E]" },
    { name: "Git", icon: GitBranch, color: "text-[#F05032]" },
    { name: "GitHub", icon: Github, color: "text-foreground" },
  ]

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/50 ">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Technical Skills</h2>
          <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
            The technologies and tools I use to bring web projects to life
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-6 rounded-xl bg-background shadow-lg"
              >
                <skill.icon className={`h-10 w-10 ${skill.color}`} />
                <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 hover:opacity-100 transition-opacity" />
              </motion.div>
              <span className="font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


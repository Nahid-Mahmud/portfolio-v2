"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section id="about" className="py-20 md:py-32 bg-background ">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-primary/0 blur-xl opacity-50" />
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Developer portrait"
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
              <div className="mt-2 h-1 w-20 bg-primary rounded-full" />
            </motion.div>

            <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed">
              I'm a passionate frontend developer with a keen eye for design and a commitment to creating intuitive,
              user-friendly web experiences. With a strong foundation in modern web technologies, I bring ideas to life
              through clean code and thoughtful interactions.
            </motion.p>

            <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed">
              My journey in web development began 5 years ago, and since then, I've worked on a diverse range of
              projects from e-commerce platforms to interactive dashboards. I'm constantly learning and adapting to new
              technologies to stay at the forefront of frontend development.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4">
              <h3 className="text-xl font-semibold mb-3">What I bring to the table:</h3>
              <ul className="space-y-2">
                {[
                  "Clean, maintainable code that scales",
                  "Responsive designs that work across all devices",
                  "Performance-optimized applications",
                  "Accessibility-first approach",
                  "User-centered design thinking",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


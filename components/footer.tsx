"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-primary">Dev</span>Portfolio
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Creating beautiful web experiences with modern technologies
            </p>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <ArrowUp className="h-5 w-5" />
            <span className="sr-only">Back to top</span>
          </motion.button>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                LinkedIn
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}


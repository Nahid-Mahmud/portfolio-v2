import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import profileImage from "@/assets/profile.png";

export default function Home() {
  return (
    <div className="container gap-5 pt-20 flex flex-col-reverse md:flex-row items-center justify-between">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 ">
        <div className="absolute inset-0 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="absolute inset-0">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect
                width="40"
                height="40"
                fill="none"
                stroke="white"
                strokeWidth="0.6"
                className="opacity-60 dark:opacity-20
              rotate-12 dark:-rotate-12 transition-all duration-300
              dark:stroke-white stroke-green-900"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col gap-5">
        <h2 className="text-lg font-medium text-slate-600 dark:text-slate-400">Hi, I am</h2>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">Md. Nahid Mahmud</h1>
        <div className="">
          <p className="text-2xl font-medium text-emerald-600 dark:text-emerald-400">Web Developer</p>
        </div>
        <p className="text-lg text-slate-700 dark:text-slate-300 max-w-md">
          I build exceptional digital experiences with modern technologies, focusing on clean code and user-centered
          design.
        </p>
        <div className="flex gap-4 pt-4">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="mr-2 h-4 w-4" /> Download CV
          </Button>
          <Button
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Contact Me <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="flex gap-4 pt-4">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Linkedin className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="mailto:contact@example.com">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Mail className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-emerald-600 dark:border-emerald-500">
          <Image src={profileImage} alt="John Doe" fill className="object-cover" priority />
        </div>
      </div>
    </div>
  );
}

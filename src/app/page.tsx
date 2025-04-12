import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import profileImage from "@/assets/profile.png";

export default function Home() {
  return (
    <div className="container gap-5 pt-20 flex flex-col-reverse md:flex-row h-screen items-center justify-between">
      {/* grid background */}

      <div className="md:w-1/2 flex flex-col lg:gap-7 gap-4 md:gap-5">
        <h2 className="lg:text-5xl text-xl font-medium text-slate-600 dark:text-slate-400">Hi, I am</h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl  font-bold text-slate-900 dark:text-white">Md. Nahid Mahmud</h1>
        <div className="">
          <p className="text-2xl font-medium text-emerald-600 dark:text-emerald-400">Web Developer</p>
        </div>
        <p className="text-lg text-slate-700 dark:text-slate-300 max-w-md">
          I build exceptional digital experiences with modern technologies, focusing on clean code and user-centered
          design.
        </p>
        <div className="flex gap-4 pt-4">
          <Button className="text-md bg-emerald-600 h-10 w-fit hover:bg-emerald-700 flex items-center group cursor-pointer">
            <Download className="transition-transform duration-300 group-hover:scale-125" />
            Resume
          </Button>
          <Button
            variant="outline"
            className="text-md group h-10 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
            asChild
          >
            <Link href="/contact" className="flex items-center">
              Contact Me <ArrowRight className="group-hover:ml-2 transition-all duration-300 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="flex gap-4 pt-4">
          <Link
            className="text-md group h-12 w-12 rounded-full border flex items-center justify-center border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
            href="https://github.com/Nahid-Mahmud"
            target="_blank"
            // rel="noopener noreferrer"
          >
            <Github className="h-7 w-7 " />
          </Link>
          <Link
            className="text-md group h-12 w-12 rounded-full border flex items-center justify-center border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
            href="https://www.linkedin.com/in/md-nahid-mahmud/"
            target="_blank"
            // rel="noopener noreferrer"
          >
            <Linkedin className="h-7 w-7 " />
          </Link>
          <Link
            className="text-md group h-12 w-12 rounded-full border flex items-center justify-center border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
            href="mailto:nahidmahmudn2@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail className="h-7 w-7" />
          </Link>
        </div>
      </div>
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
        <div className="relative w-64 h-64 transition-colors duration-500 bg-green-50 dark:bg-blue-100 md:w-80 md:h-80 lg:h-96 lg:w-96 xl:h-[500px] xl:w-[500px] rounded-full overflow-hidden border-4 border-emerald-600 dark:border-emerald-500">
          <Image src={profileImage} alt="John Doe" fill className="object-cover" priority />
        </div>
      </div>
    </div>
  );
}

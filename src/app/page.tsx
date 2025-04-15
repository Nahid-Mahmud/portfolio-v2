import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import profileImage from "@/assets/profile.png";
import TextAnimate from "@/components/TextAnimate";

// Define metadata for the Home page
export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      notranslate: false,
      noarchive: false,
      nosnippet: false,
    },
  },
  metadataBase: new URL("https://nahid-mahmud.xyz"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  title: "Md. Nahid Mahmud - Fullstack Developer",
  description:
    "Welcome to the portfolio of Md. Nahid Mahmud, a Fullstack Developer specializing in crafting exceptional digital experiences with modern technologies.",
  keywords: [
    "Md. Nahid Mahmud",
    "Fullstack Developer",
    "Frontend Developer",
    "MERN Stack",
    "Web Development",
    "Clean Code",
    "User-Centered Design",
  ],
  openGraph: {
    title: "Md. Nahid Mahmud - Fullstack Developer",
    description:
      "Explore the portfolio of Md. Nahid Mahmud, a Fullstack Developer passionate about clean code and user-centered design.",
    url: "https://nahid-mahmud.xyz",
    siteName: "Md. Nahid Mahmud Portfolio",
    images: [
      {
        url: "/open_Graph_photo.png", // Replace with the actual path to your image
        width: 1200,
        height: 630,
        alt: "Md. Nahid Mahmud - Profile Picture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Nahid Mahmud - Fullstack Developer",
    description:
      "Discover the work of Md. Nahid Mahmud, a Fullstack Developer specializing in modern web technologies.",
    // images: ["/profile.png"], // Replace with the actual path to your image
    creator: "@nm_nahid01", // Replace with your Twitter handle
  },
};

export default function Home() {
  return (
    <div className="container gap-5 pt-20 flex flex-col-reverse md:flex-row md:h-screen pb-5 m items-center md:justify-between">
      <div className="md:w-1/2 flex flex-col lg:gap-7 gap-4 md:gap-5">
        <h2 className="lg:text-5xl text-xl font-medium text-slate-600 dark:text-slate-400">Hi, I am</h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl  font-bold text-slate-900 dark:text-white">Md. Nahid Mahmud</h1>
        <div className="">
          <div className="text-2xl font-medium text-emerald-600 dark:text-emerald-400">
            <TextAnimate />
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <Button className="text-md bg-emerald-600 h-12 text-xl w-fit hover:bg-emerald-700 flex items-center group cursor-pointer">
            <Download className="transition-transform duration-300 group-hover:scale-125" />
            Resume
          </Button>
          <div className="text-md group h-12 text-xl border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 border flex items-center justify-center rounded-md cursor-pointer px-3">
            <Link href="/contact" className="flex gap-1 items-center">
              Contact Me <ArrowRight className="group-hover:ml-2 transition-all duration-300 h-6 w-6 text-xl" />
            </Link>
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <Link
            className="text-md group h-12 w-12 rounded-full border flex items-center justify-center border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
            href="https://github.com/Nahid-Mahmud"
            target="_blank"
          >
            <Github className="h-7 w-7 " />
          </Link>
          <Link
            className="text-md group h-12 w-12 rounded-full border flex items-center justify-center border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
            href="https://www.linkedin.com/in/md-nahid-mahmud/"
            target="_blank"
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
      <div className="md:mt-0 md:w-1/2 flex justify-center">
        <div className="relative w-64 h-64 transition-colors duration-500 bg-green-50 dark:bg-blue-100 md:w-80 md:h-80 lg:h-96 lg:w-96 xl:h-[500px] xl:w-[500px] rounded-full overflow-hidden border-4 border-emerald-600 dark:border-emerald-500">
          <Image
            src={profileImage}
            alt="Md. Nahid Mahmud - Profile Picture"
            fill
            className="object-cover"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}

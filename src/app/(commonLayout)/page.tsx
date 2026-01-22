import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import GithubContributions from "@/components/sections/GithubContributions";
import SkillsSectionComponent from "@/components/sections/SkillsSectionComponent";

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
  title: "Md. Nahid Mahmud - Fullstack Developer | Portfolio",
  description:
    "Welcome to the portfolio of Md. Nahid Mahmud, a Fullstack Developer specializing in crafting exceptional digital experiences with modern technologies. Explore my projects, experience, skills, and get in touch.",
  keywords: [
    "Md. Nahid Mahmud",
    "Fullstack Developer",
    "Frontend Developer",
    "MERN Stack",
    "Web Development",
    "Clean Code",
    "User-Centered Design",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
  ],
  openGraph: {
    title: "Md. Nahid Mahmud - Fullstack Developer",
    description:
      "Explore the portfolio of Md. Nahid Mahmud, a Fullstack Developer passionate about clean code and user-centered design. View my projects, experience, and skills.",
    url: "https://nahid-mahmud.xyz",
    siteName: "Md. Nahid Mahmud Portfolio",
    images: [
      {
        url: "/open_Graph_photo.png",
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
    creator: "@nm_nahid01",
  },
};

export default function Home() {
  return (
    <div className="scroll-smooth">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSectionComponent />
      <ProjectsSection />
      <GithubContributions />
      <ContactSection />
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Frontend Developer Portfolio",
  description: "Portfolio showcasing my skills and projects as a frontend developer",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

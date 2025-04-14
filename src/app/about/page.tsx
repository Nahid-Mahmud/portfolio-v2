import AboutMeSection from "@/components/AboutMeSection";
import SkillsSection from "@/components/SkillsSection";
import { Metadata } from "next";
import React from "react";

// Define metadata for the About page
export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://nahid-mahmud.xyz"),
  title: "About Me - Md. Nahid Mahmud",
  description:
    "Learn more about Md. Nahid Mahmud, a passionate Fullstack Developer specializing in crafting beautiful and performant Frontend experiences.",
  keywords: [
    "Md. Nahid Mahmud",
    "About Me",
    "Fullstack Developer",
    "Frontend Developer",
    "MERN Stack",
    "Web Development",
    "Clean Code",
  ],
  openGraph: {
    title: "About Me - Md. Nahid Mahmud",
    description:
      "Discover the journey and expertise of Md. Nahid Mahmud, a Fullstack Developer with a focus on elegant and user-friendly web solutions.",
    siteName: "Md. Nahid Mahmud Portfolio",
    // images: [
    //   {
    //     url: "./profile.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Md. Nahid Mahmud - Profile Picture",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me - Md. Nahid Mahmud",
    description:
      "Explore the journey of Md. Nahid Mahmud, a Fullstack Developer passionate about clean code and user-centered design.",
    images: ["/profile.png"],
    creator: "@nm_nahid01",
  },
};

const AboutSectionInspired: React.FC = () => {
  return (
    <div className="py-20 md:py-28 ">
      <AboutMeSection />
      <SkillsSection />
    </div>
  );
};

export default AboutSectionInspired;

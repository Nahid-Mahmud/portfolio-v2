"use client";

import React, { useEffect, useRef, useState } from "react";
import SkillCard from "./SkillCard";
import { skills } from "@/app/(commonLayout)/_data/skills";

const categories = [
  "All",
  "Interpersonal",
  "Management",
  "Analytical",
  "Personal",
  "Organizational",
  "Creative",
  "Quality",
];

const SoftSkills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(skills.length).fill(false));
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionInView, setSectionInView] = useState(false);

  const filteredSkills =
    selectedCategory === "All" ? skills : skills.filter((skill) => skill.category === selectedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sectionInView) {
          setSectionInView(true);
          // Stagger the animation of cards
          filteredSkills.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                const skillIndex = skills.findIndex((s) => s.id === filteredSkills[index].id);
                newVisible[skillIndex] = true;
                return newVisible;
              });
            }, index * 150);
          });
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [filteredSkills, sectionInView]);

  // Reset animations when category changes
  useEffect(() => {
    setVisibleCards(new Array(skills.length).fill(false));
    setSectionInView(false);
  }, [selectedCategory]);

  return (
    <section ref={sectionRef} className="md:py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8 px-4 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text md:underline">
            Soft Skills
          </h2>
        </div>

        {/* Category Filter */}
        <div className="mb-12 px-4 sm:px-0">
          <div className="flex gap-3 justify-start sm:justify-center overflow-x-auto no-scrollbar py-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`flex-shrink-0 whitespace-nowrap rounded-full font-medium transition-all duration-300 border cursor-pointer
                  ${
                    selectedCategory === category
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/25 px-4 py-2 text-sm"
                      : "z-10 text-muted-foreground border-border/50 bg-white hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/50 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4 sm:px-0">
          {filteredSkills.map((skill, index) => {
            const skillIndex = skills.findIndex((s) => s.id === skill.id);
            return <SkillCard key={skill.id} skill={skill} index={index} isVisible={visibleCards[skillIndex]} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default SoftSkills;

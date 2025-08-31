"use client";
import { skills } from "@/app/_data/skills";
import React, { useEffect, useRef, useState } from "react";
import SkillCard from "./SkillCard";

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
      { threshold: 0.1 }
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
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text underline">
            Soft Skills
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border 
                ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                    : "z-10 text-muted-foreground border-border/50 hover:bg-primary/10 bg-white hover:text-primary hover:border-primary/50"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

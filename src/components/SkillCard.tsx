"use client";

import React, { useState } from "react";
import { Skill } from "@/app/_data/skills";
import ProgressRing from "./ProgressRing";

interface SkillCardProps {
  skill: Skill;
  index: number;
  isVisible: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = skill.icon;

  return (
    <div
      className={` z-10 group relative overflow-hidden rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 p-6 
        transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        animationDelay: `${index * 100}ms`,
        background: "linear-gradient(135deg, rgb(var(--card)/0.8) 0%, rgb(var(--card)/0.4) 100%)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 transition-opacity duration-300 
        ${isHovered ? "opacity-100" : "opacity-0"}`}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-lg bg-primary/10 transition-all duration-300 
            ${isHovered ? "scale-110 bg-primary/20" : ""}`}
          >
            <IconComponent className="w-6 h-6 text-primary" />
          </div>
          <ProgressRing progress={skill.proficiency} isVisible={isVisible} />
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {skill.name}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{skill.description}</p>

        <div className="flex items-center justify-between">
          <span className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
            {skill.category}
          </span>
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className={`absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 blur-xl transition-opacity duration-500 -z-10
        ${isHovered ? "opacity-30" : "opacity-0"}`}
      />
    </div>
  );
};

export default SkillCard;

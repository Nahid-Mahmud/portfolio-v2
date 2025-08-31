"use client";
import { projectsData } from "@/app/_data/projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

function ProjectCardsComponent() {
  // Get unique categories from projects
  const categories = ["all", ...new Set(projectsData.map((project) => project.category))];
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter((project) => project.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="space-y-8">
      <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full ">
        <TabsList className="w-full z-10 max-w-md mx-auto grid grid-cols-3 mb-8 dark:bg-[#0A2540]">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  className="relative z-10"
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default ProjectCardsComponent;

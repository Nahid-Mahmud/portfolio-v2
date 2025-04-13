"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const wordsToAnimate = [
  "Frontend Developer ",
  "Backend Developer",
  "Full Stack Developer",
  "Web Developer",
  "JavaScript Developer",
  "HTML/CSS Developer",
  "React.js Developer",
  "Web Application Developer",
  "WordPress Web Developer ",
];

const TextAnimate = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const currentWord = wordsToAnimate[currentWordIndex];
    const animationDuration = currentWord.length * 150;
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordsToAnimate.length);
    }, animationDuration + 500); // Change word every 3 seconds
    return () => clearInterval(interval);
  }, [currentWordIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation for child elements
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: -20, blur: 10 },
    visible: { opacity: 1, y: 0, blur: 0 },
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWordIndex} // Ensure unique key for each word to trigger re-animation
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          className={cn("z-10 inline-block relative text-left text-green-600 dark:text-green-100 px-2")}
        >
          {wordsToAnimate[currentWordIndex].split("").map((letter, index) => (
            <motion.span key={index} variants={letterVariants} className={cn("inline-block")}>
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TextAnimate;

"use client";
import { useEffect, useState } from "react";

const wordsToAnimate = [
  "Full Stack Developer",
  "Frontend Developer",
  "Next.js Developer",
  "Backend Developer",
  "Web Developer",
  "JavaScript Developer",
  "React.js Developer",
  "Web Application Developer",
];

export default function SimpleTextAnimate() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentWord = wordsToAnimate[currentWordIndex];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      // Typing animation
      if (displayText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 100);
      } else {
        // Pause before deleting
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      // Deleting animation
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        // Move to next word
        setCurrentWordIndex((prev) => (prev + 1) % wordsToAnimate.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentWordIndex]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

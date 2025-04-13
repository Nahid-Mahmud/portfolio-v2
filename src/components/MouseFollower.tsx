"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateMousePosition = (e: MouseEvent) => {
      //   console.log("x position", e.clientX, "xy position", e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 hidden md:block"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        className="h-16 w-16 rounded-full border-2 border-green-500 bg-green-100/20 "
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 160,
          damping: 10,
        }}
      />
    </div>
  );
}

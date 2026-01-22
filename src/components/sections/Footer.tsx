import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-center">
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
          ©{new Date().getFullYear()} · Built with Next.js, shadcn/ui and Tailwind CSS · Developed by Md. Nahid Mahmud ·
        </p>
      </div>
    </footer>
  );
}

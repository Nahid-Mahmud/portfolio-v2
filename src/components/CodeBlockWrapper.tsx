"use client";

import { useEffect, useRef } from "react";

interface CodeBlockWrapperProps {
  children: React.ReactNode;
}

export default function CodeBlockWrapper({ children }: CodeBlockWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Find all code blocks
    const codeBlocks = contentRef.current.querySelectorAll("pre");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    codeBlocks.forEach((pre, index) => {
      // Skip if already processed
      if (pre.querySelector(".copy-button-container")) return;

      // Create copy button container
      const copyContainer = document.createElement("div");
      copyContainer.className =
        "copy-button-container absolute top-2 right-2 z-10 opacity-0 transition-opacity duration-200";

      // Create copy button
      const copyButton = document.createElement("button");
      copyButton.className =
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-secondary hover:text-accent-foreground h-8 px-3 text-xs cursor-pointer";
      copyButton.setAttribute("type", "button");
      copyButton.setAttribute("aria-label", "Copy code");

      // Initially show copy icon
      copyButton.innerHTML = `
        <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        <span>Copy</span>
      `;

      // Add click handler
      copyButton.addEventListener("click", async () => {
        const code = pre.querySelector("code");
        if (!code) return;

        try {
          await navigator.clipboard.writeText(code.textContent || "");

          // Show success state
          copyButton.innerHTML = `
            <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            <span>Copied!</span>
          `;

          // Reset after 2 seconds
          setTimeout(() => {
            copyButton.innerHTML = `
              <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span>Copy</span>
            `;
          }, 2000);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          // console.error("Failed to copy:", err);
        }
      });

      copyContainer.appendChild(copyButton);

      // Make pre relative and add copy button
      pre.style.position = "relative";

      // Add dark mode styling for code blocks
      pre.style.backgroundColor = "#1a1a1a";
      pre.style.border = "1px solid #333333";
      pre.style.borderRadius = "0.5rem";
      pre.style.padding = "1rem";

      pre.appendChild(copyContainer);

      // Add hover effect to show copy button
      pre.addEventListener("mouseenter", () => {
        copyContainer.style.opacity = "1";
      });

      pre.addEventListener("mouseleave", () => {
        copyContainer.style.opacity = "0";
      });
    });
  }, [children]);

  return (
    <div ref={contentRef} className="relative">
      {children}
    </div>
  );
}

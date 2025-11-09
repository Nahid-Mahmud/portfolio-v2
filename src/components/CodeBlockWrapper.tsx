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

      const code = pre.querySelector("code");
      if (!code) return;

      // Count lines in the code block
      const codeText = code.textContent || "";
      const lines = codeText.split("\n");
      const lineCount = lines.length;

      // Create wrapper for code block with expand/collapse functionality
      const codeWrapper = document.createElement("div");
      codeWrapper.className = "code-block-wrapper relative";

      // Create button container for both copy and expand/collapse buttons
      const buttonContainer = document.createElement("div");
      buttonContainer.className =
        "button-container absolute top-2 right-2 z-20 opacity-0 transition-opacity duration-200 flex gap-2";

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

      // Add click handler for copy
      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(codeText);

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

      buttonContainer.appendChild(copyButton);

      // Make pre relative and add styling
      pre.style.position = "relative";
      pre.style.backgroundColor = "#1a1a1a";
      pre.style.border = "1px solid #333333";
      pre.style.borderRadius = "0.5rem";
      pre.style.padding = "1rem";
      pre.style.margin = "0";

      // If code block has more than 10 lines, add expand/collapse functionality
      if (lineCount > 10) {
        let isExpanded = false;

        // Create fade overlay
        const fadeOverlay = document.createElement("div");
        fadeOverlay.className =
          "absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none transition-opacity duration-300";
        fadeOverlay.style.background = "linear-gradient(transparent, #1a1a1a)";

        // Create expand/collapse button
        const expandButton = document.createElement("button");
        expandButton.className =
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-secondary hover:text-accent-foreground h-8 px-3 text-xs cursor-pointer";
        expandButton.setAttribute("type", "button");

        const updateExpandButton = () => {
          if (isExpanded) {
            expandButton.innerHTML = `
              <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 15-6-6-6 6"/>
              </svg>
              <span>Collapse</span>
            `;
          } else {
            expandButton.innerHTML = `
              <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
              <span>Expand</span>
            `;
          }
        };

        // Add expand button to button container
        buttonContainer.appendChild(expandButton);

        // Set initial collapsed state
        pre.style.maxHeight = "240px"; // Approximately 10 lines
        pre.style.overflow = "hidden";
        pre.style.transition = "max-height 0.3s ease-in-out";

        updateExpandButton();

        // Store original pre element
        const originalPre = pre;

        // Add elements to wrapper first
        codeWrapper.appendChild(originalPre.cloneNode(true));
        codeWrapper.appendChild(fadeOverlay);

        // Replace original pre with wrapper
        originalPre.parentNode?.replaceChild(codeWrapper, originalPre);

        // Get the new pre element from wrapper
        const newPre = codeWrapper.querySelector("pre");
        if (newPre) {
          newPre.appendChild(buttonContainer);

          // Get actual full height by temporarily removing height restriction
          const getFullHeight = () => {
            const currentMaxHeight = newPre.style.maxHeight;
            const currentOverflow = newPre.style.overflow;

            newPre.style.maxHeight = "none";
            newPre.style.overflow = "visible";
            const fullHeight = newPre.scrollHeight;

            newPre.style.maxHeight = currentMaxHeight;
            newPre.style.overflow = currentOverflow;

            return fullHeight;
          };

          // Add click handler for expand/collapse
          expandButton.addEventListener("click", () => {
            isExpanded = !isExpanded;

            if (isExpanded) {
              const fullHeight = getFullHeight();
              newPre.style.maxHeight = fullHeight + "px";
              fadeOverlay.style.opacity = "0";

              // After animation completes, remove height constraint
              setTimeout(() => {
                newPre.style.maxHeight = "none";
                newPre.style.overflow = "visible";
              }, 300);
            } else {
              // Get current height first
              const currentHeight = newPre.scrollHeight;
              newPre.style.maxHeight = currentHeight + "px";
              newPre.style.overflow = "hidden";

              // Force reflow then animate to collapsed height
              requestAnimationFrame(() => {
                newPre.style.maxHeight = "240px";
                fadeOverlay.style.opacity = "1";
              });
            }

            updateExpandButton();
          });

          // Add hover effect to show buttons
          codeWrapper.addEventListener("mouseenter", () => {
            buttonContainer.style.opacity = "1";
          });

          codeWrapper.addEventListener("mouseleave", () => {
            buttonContainer.style.opacity = "0";
          });
        }
      } else {
        // For code blocks with 10 or fewer lines, just add copy functionality
        pre.appendChild(buttonContainer);

        // Add hover effect to show copy button
        pre.addEventListener("mouseenter", () => {
          buttonContainer.style.opacity = "1";
        });

        pre.addEventListener("mouseleave", () => {
          buttonContainer.style.opacity = "0";
        });
      }
    });
  }, [children]);

  return (
    <div ref={contentRef} className="relative">
      {children}
    </div>
  );
}

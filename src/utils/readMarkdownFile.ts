import fs from "fs";
import path from "path";
import { processMarkdown } from "./processMarkdown";

/**
 * Reads markdown content from a file or uses provided content as fallback
 * @param projectData - Either a filename (e.g., "aioChat.md") or markdown content string
 * @returns Processed HTML string or null if no content
 */
export async function readMarkdownFile(projectData: string | undefined): Promise<string | null> {
  if (!projectData) {
    return null;
  }

  try {
    // Check if projectData is a filename (ends with .md) or content
    if (projectData.endsWith(".md")) {
      // Treat as filename
      const filePath = path.join(process.cwd(), "src", "docs", projectData);
      const markdownContent = fs.readFileSync(filePath, "utf-8");
      return await processMarkdown(markdownContent);
    } else {
      // Treat as direct markdown content
      return await processMarkdown(projectData);
    }
  } catch (error) {
    console.error("Error processing markdown:", error);
    return null;
  }
}

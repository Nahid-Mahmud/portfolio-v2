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
    // Try to read from filesystem first
    const filePath = path.join(process.cwd(), "src", "docs", projectData);
    const markdownContent = fs.readFileSync(filePath, "utf-8");
    return await processMarkdown(markdownContent);
  } catch (error) {
    console.error("Error reading markdown file:", error);
    // Fallback: treat projectData as direct markdown content
    try {
      return await processMarkdown(projectData);
    } catch (fallbackError) {
      console.error("Error processing fallback markdown:", fallbackError);
      return null;
    }
  }
}

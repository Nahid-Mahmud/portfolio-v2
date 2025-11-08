"use client";

import { cn } from "@/lib/utils";
import { processMarkdown } from "@/utils/processMarkdown";
import { useEffect, useState } from "react";

interface MarkdownRendererProps {
  markdown: string;
  className?: string;
  placeholder?: string;
}

const MarkdownRenderer = ({ markdown, className, placeholder }: MarkdownRendererProps) => {
  const [processedHtml, setProcessedHtml] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!markdown.trim()) {
      setProcessedHtml("");
      setError(null);
      return;
    }

    setIsProcessing(true);
    setError(null);

    processMarkdown(markdown)
      .then((html) => {
        setProcessedHtml(html);
        setIsProcessing(false);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err: unknown) => {
        // console.error("Error processing markdown:", err);
        setError("Failed to process markdown");
        setProcessedHtml(markdown); // Fallback to original markdown
        setIsProcessing(false);
      });
  }, [markdown]);

  if (!markdown.trim()) {
    return (
      <div className={cn("text-muted-foreground italic p-4", className)}>
        {placeholder || "No markdown content to display..."}
      </div>
    );
  }

  if (isProcessing) {
    return <div className={cn("text-muted-foreground p-4", className)}>Processing markdown...</div>;
  }

  if (error) {
    return (
      <div className={cn("text-destructive p-4", className)}>
        <p className="font-semibold">Error: {error}</p>
        <pre className="mt-2 text-sm bg-muted p-2 rounded overflow-x-auto">{markdown}</pre>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "prose prose-sm max-w-none dark:prose-invert",
        "prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground",
        "prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground",
        "prose-blockquote:text-foreground prose-li:text-foreground",
        "prose-a:text-primary hover:prose-a:text-primary/80",
        className
      )}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
};

export default MarkdownRenderer;

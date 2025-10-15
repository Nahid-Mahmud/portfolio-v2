"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import MarkdownRenderer from "./MarkdownRenderer";
import { Copy, Download, Eye, FileText } from "lucide-react";

interface MarkdownInputProps {
  initialMarkdown?: string;
  className?: string;
  placeholder?: string;
  showTabs?: boolean;
  allowDownload?: boolean;
}

const MarkdownInput = ({
  initialMarkdown = "",
  className,
  placeholder = "Enter your markdown here...",
  showTabs = true,
  allowDownload = false,
}: MarkdownInputProps) => {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [activeTab, setActiveTab] = useState<"input" | "preview">("input");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      // You might want to add a toast notification here
      console.log("Markdown copied to clipboard");
    } catch (err) {
      console.error("Failed to copy markdown:", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "markdown-content.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!showTabs) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Markdown Input</h3>
          <div className="flex gap-2">
            {markdown && (
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            )}
            {allowDownload && markdown && (
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="text-sm font-medium mb-2">Input</h4>
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder={placeholder}
              className="min-h-[400px] resize-none font-mono text-sm"
            />
          </Card>

          <Card className="p-4">
            <h4 className="text-sm font-medium mb-2">Preview</h4>
            <div className="min-h-[400px] overflow-y-auto border rounded p-3 bg-background">
              <MarkdownRenderer markdown={markdown} placeholder="Preview will appear here..." />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Markdown Editor</h3>
        <div className="flex gap-2">
          {markdown && (
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          )}
          {allowDownload && markdown && (
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "input" | "preview")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Input
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="mt-4">
          <Card className="p-4">
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder={placeholder}
              className="min-h-[500px] resize-none font-mono text-sm"
            />
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <Card className="p-4">
            <div className="min-h-[500px] overflow-y-auto">
              <MarkdownRenderer markdown={markdown} placeholder="Preview will appear here..." />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarkdownInput;

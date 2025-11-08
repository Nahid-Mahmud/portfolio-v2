"use client";

import { cn } from "@/lib/utils";

import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  CreateLink,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  // MDXEditor,
  quotePlugin,
  Separator,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  InsertCodeBlock,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { Edit, Eye, FileText } from "lucide-react";
import { forwardRef, useState, useEffect, useMemo, Component, ErrorInfo, ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import MarkdownRenderer from "./MarkdownRenderer";

import dynamic from "next/dynamic";
const MDXEditor = dynamic(() => import("@mdxeditor/editor").then((mod) => ({ default: mod.MDXEditor })), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] border rounded-md flex items-center justify-center">Loading editor...</div>
  ),
});

// Error Boundary for MDXEditor
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  onError?: () => void;
}

class MDXEditorErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // console.error("MDXEditor Error Boundary caught an error:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

interface MDXEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  name?: string;
  renderMode?: "mdx" | "markdown"; // New prop to choose between MDX editor and simple markdown
}

const MDXEditorComponent = forwardRef<MDXEditorMethods, MDXEditorProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ value, onChange, onBlur, placeholder, className, readOnly = false, name, renderMode = "mdx" }, ref) => {
    const [activeTab, setActiveTab] = useState<"edit" | "preview" | "markdown">("edit");
    const [useFallback, setUseFallback] = useState(false);
    const [mdxError, setMdxError] = useState<string | null>(null);

    const handleEditorChange = (newValue: string) => {
      onChange(newValue);
      // Clear any previous errors when content changes
      setMdxError(null);
    };

    // Force fallback mode on initial render if needed (for pasted content)
    useEffect(() => {
      // If we have code blocks, preemptively use fallback mode
      if (value && value.includes("```") && activeTab === "edit" && !useFallback) {
        const hasComplexStructure =
          value.length > 1000 || // Long content
          (value.match(/```/g) || []).length > 3; // Multiple code blocks

        if (hasComplexStructure) {
          setUseFallback(true);
          setMdxError("Preemptively using fallback editor for complex markdown with code blocks");
        }
      }
    }, [value, activeTab, useFallback]);

    // Memoized markdown processing to avoid unnecessary re-renders
    const processedMarkdown = useMemo(() => {
      if (!value) return "";

      // If already in fallback mode, don't process further
      if (useFallback) return value;

      try {
        // Check for problematic patterns that might cause MDXEditor to fail
        const hasProblematicCodeBlocks =
          /```\s*\n\s*```/.test(value) || // Empty code blocks
          /```[^`]*$/.test(value) || // Unclosed code blocks at end
          /```\s*$/.test(value) || // Code blocks ending with just backticks
          /```[^`\n]*\n[^`]*$/.test(value) || // Code blocks that start but don't close
          /```[a-zA-Z0-9_-]*[^`]*$/.test(value) || // Code blocks with potential parsing issues
          value.includes('{"type":"code","name":"N/A"}'); // Specific error pattern you mentioned

        if (hasProblematicCodeBlocks) {
          // Use setTimeout to avoid setting state during render
          setTimeout(() => {
            setUseFallback(true);
            setMdxError("Detected potentially malformed code blocks that may cause parsing issues");
          }, 0);
          return value;
        }

        return value;
      } catch (error) {
        // console.error("Error processing markdown:", error);
        // Use setTimeout to avoid setting state during render
        setTimeout(() => {
          setUseFallback(true);
          setMdxError("Failed to process markdown content");
        }, 0);
        return value;
      }
    }, [value, useFallback]);

    // Reset fallback when switching tabs
    useEffect(() => {
      if (activeTab !== "edit") {
        setUseFallback(false);
        setMdxError(null);
      }
    }, [activeTab]);

    // Auto-detect and handle problematic content
    useEffect(() => {
      if (useFallback && activeTab === "edit") {
        // Don't auto-retry if we're already in fallback mode to avoid infinite loops
        return;
      }
    }, [value, useFallback, activeTab]);

    // Simple markdown mode
    if (renderMode === "markdown") {
      return (
        <div className={cn("markdown-editor-wrapper", className)}>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "edit" | "preview")}>
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="mt-0">
              <Textarea
                value={value}
                onChange={(e) => handleEditorChange(e.target.value)}
                placeholder={placeholder}
                readOnly={readOnly}
                className={cn(
                  "min-h-[200px] max-h-[500px] resize-none font-mono text-sm",
                  "focus:outline-none p-3 border border-input rounded-md bg-background"
                )}
              />
            </TabsContent>

            <TabsContent value="preview" className="mt-0">
              <Card className="min-h-[200px] max-h-[500px] overflow-y-auto p-4 border border-input bg-background">
                <MarkdownRenderer markdown={value} placeholder={placeholder} />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      );
    }

    return (
      <div className={cn("mdx-editor-wrapper", className)}>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "edit" | "preview" | "markdown")}>
          <TabsList className="grid w-full grid-cols-3 mb-2">
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="markdown" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Markdown
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-0 ">
            {useFallback ? (
              <div className="space-y-4">
                <div className="p-4 border border-orange-200 rounded-md bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
                  <div className="flex items-start gap-2">
                    <div className="text-orange-700 dark:text-orange-300 text-sm">
                      <strong>Using Fallback Editor:</strong> The rich text editor encountered an issue with the
                      markdown structure.
                    </div>
                  </div>
                  {mdxError && (
                    <div className="mt-2 text-xs text-orange-600 dark:text-orange-400 font-mono bg-orange-100 dark:bg-orange-900/30 p-2 rounded">
                      {mdxError}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    You can continue editing here, or switch to the &ldquo;Markdown&rdquo; tab for raw markdown editing.
                  </p>
                  <button
                    onClick={() => {
                      setUseFallback(false);
                      setMdxError(null);
                    }}
                    className="mt-2 text-xs text-orange-700 dark:text-orange-300 hover:text-orange-800 dark:hover:text-orange-200 underline"
                  >
                    Try Rich Text Editor Again
                  </button>
                </div>
                <Textarea
                  value={value}
                  onChange={(e) => handleEditorChange(e.target.value)}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  className={cn(
                    "min-h-[200px] max-h-[500px] resize-none font-mono text-sm",
                    "focus:outline-none p-3 border border-input rounded-md bg-background"
                  )}
                />
              </div>
            ) : (
              <div className="relative">
                <MDXEditorErrorBoundary
                  fallback={
                    <div className="space-y-4">
                      <div className="p-4 border border-destructive rounded-md bg-destructive/10">
                        <div className="text-destructive text-sm">
                          <strong>Editor Error:</strong> The rich text editor encountered an error. Using fallback
                          editor.
                        </div>
                      </div>
                      <Textarea
                        value={value}
                        onChange={(e) => handleEditorChange(e.target.value)}
                        placeholder={placeholder}
                        readOnly={readOnly}
                        className={cn(
                          "min-h-[200px] max-h-[500px] resize-none font-mono text-sm",
                          "focus:outline-none p-3 border border-input rounded-md bg-background"
                        )}
                      />
                    </div>
                  }
                  onError={() => {
                    setUseFallback(true);
                    setMdxError("The rich text editor encountered a parsing error and switched to fallback mode.");
                  }}
                >
                  <MDXEditor
                    key={useFallback ? "fallback" : "normal"}
                    ref={ref}
                    markdown={processedMarkdown}
                    onChange={handleEditorChange}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    plugins={[
                      // Essential plugins
                      headingsPlugin(),
                      listsPlugin(),
                      quotePlugin(),
                      thematicBreakPlugin(),
                      markdownShortcutPlugin(),
                      linkPlugin(),
                      linkDialogPlugin(),
                      imagePlugin(),
                      tablePlugin(),
                      codeBlockPlugin({
                        defaultCodeBlockLanguage: "text",
                      }),
                      codeMirrorPlugin({
                        codeBlockLanguages: {
                          text: "Plain Text",
                          javascript: "JavaScript",
                          typescript: "TypeScript",
                          jsx: "JSX",
                          tsx: "TSX",
                          python: "Python",
                          java: "Java",
                          c: "C",
                          cpp: "C++",
                          csharp: "C#",
                          go: "Go",
                          rust: "Rust",
                          php: "PHP",
                          ruby: "Ruby",
                          swift: "Swift",
                          kotlin: "Kotlin",
                          scala: "Scala",
                          clojure: "Clojure",
                          haskell: "Haskell",
                          erlang: "Erlang",
                          elixir: "Elixir",
                          dart: "Dart",
                          lua: "Lua",
                          r: "R",
                          matlab: "MATLAB",
                          css: "CSS",
                          scss: "SCSS",
                          sass: "Sass",
                          less: "Less",
                          html: "HTML",
                          xml: "XML",
                          svg: "SVG",
                          json: "JSON",
                          yaml: "YAML",
                          toml: "TOML",
                          ini: "INI",
                          sql: "SQL",
                          graphql: "GraphQL",
                          markdown: "Markdown",
                          tex: "LaTeX",
                          bash: "Bash",
                          sh: "Shell",
                          zsh: "Zsh",
                          fish: "Fish",
                          powershell: "PowerShell",
                          dockerfile: "Dockerfile",
                          docker: "Docker",
                          nginx: "Nginx",
                          apache: "Apache",
                          vim: "Vim",
                          makefile: "Makefile",
                          cmake: "CMake",
                          git: "Git",
                          diff: "Diff",
                          patch: "Patch",
                          plaintext: "Plain Text",
                        },
                      }),
                      diffSourcePlugin({
                        viewMode: "rich-text",
                        diffMarkdown: "",
                      }),
                      frontmatterPlugin(),
                      directivesPlugin(),
                      // Toolbar plugin with all tools
                      toolbarPlugin({
                        toolbarContents: () => (
                          <>
                            <UndoRedo />
                            <Separator />
                            <BoldItalicUnderlineToggles />
                            <CodeToggle />
                            <Separator />
                            <BlockTypeSelect />
                            <Separator />
                            <ListsToggle />
                            <Separator />
                            <CreateLink />
                            {/* <InsertImage /> */}
                            <Separator />
                            <InsertTable />
                            <InsertThematicBreak />
                            <InsertCodeBlock />
                          </>
                        ),
                      }),
                    ]}
                    contentEditableClassName={cn(
                      "min-h-[200px] max-h-[500px] overflow-y-auto prose prose-sm max-w-none",
                      "focus:outline-none",
                      "p-3 border border-input rounded-md bg-background text-foreground",
                      "prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground",
                      "prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground",
                      "prose-blockquote:text-foreground prose-li:text-foreground"
                    )}
                  />
                </MDXEditorErrorBoundary>
                {/* Button to manually switch to fallback if needed */}
                <button
                  onClick={() => setUseFallback(true)}
                  className="absolute top-2 right-2 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded bg-background/80 border border-border"
                >
                  Use fallback editor
                </button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="markdown" className="mt-0">
            <Textarea
              value={value}
              onChange={(e) => handleEditorChange(e.target.value)}
              placeholder={placeholder}
              readOnly={readOnly}
              className={cn(
                "min-h-[200px] max-h-[500px] resize-none font-mono text-sm",
                "focus:outline-none p-3 border border-input rounded-md bg-background"
              )}
            />
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <Card className="min-h-[200px] max-h-[500px] overflow-y-auto p-4 border border-input bg-background">
              <MarkdownRenderer
                markdown={value}
                placeholder={placeholder}
                className="prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:prose-code:bg-transparent prose-pre:prose-code:px-0 prose-pre:prose-code:py-0"
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }
);

MDXEditorComponent.displayName = "MDXEditor";

export { MDXEditorComponent as MDXEditor };

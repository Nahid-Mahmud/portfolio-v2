"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDriver } from "@/hooks/useDriver";
import { cn } from "@/lib/utils";
import { MessageCircle, RotateCw, Send, X } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "driver.js/dist/driver.css";

// Define the structure for a single message in the chat
interface Message {
  role: "user" | "model";
  text: string;
}

// Define the structure expected by our backend API route's body
interface ApiRequestBody {
  contents: Array<{
    role: "user" | "model";
    parts: Array<{ text: string }>;
  }>;
}

export default function FloatingChat() {
  // driver js
  const { startTour, destroyTour } = useDriver();

  const chatTourSteps = useMemo(
    () => [
      {
        element: "#chat-bubble",
        popover: {
          title: "Personalized AI Chat Bot",
          description: "Ask anything about this portfolio and the man behind it!",
        },
      },
    ],
    []
  );

  useEffect(() => {
    const hasShownTour = localStorage.getItem("chatTourShown");

    if (!hasShownTour) {
      startTour(chatTourSteps);
      localStorage.setItem("chatTourShown", "true");
    }

    return () => {
      destroyTour();
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const [history, setHistory] = useState<Message[]>([
    { role: "model", text: "Hello! Ask me anything about this portfolio or the person behind it." },
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to the bottom of the chat window when history updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [history]);
  // Focus textarea when chat is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScrollLock = () => {
      if (isOpen && window.matchMedia("(max-width: 768px)").matches) {
        document.body.style.overflow = "hidden"; // Disable scrolling
      } else {
        document.body.style.overflow = ""; // Enable scrolling
      }
    };

    handleScrollLock(); // Apply on mount or when `isOpen` changes

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const newUserMessage: Message = { role: "user", text: prompt };

    // Optimistically update history with the user's message
    const updatedHistory = [...history, newUserMessage];
    setHistory(updatedHistory);
    setPrompt(""); // Clear the input field
    setIsLoading(true);
    setError(null);

    // --- Prepare data for the API ---
    // Convert our simple Message[] history to the Gemini API's 'contents' structure
    const apiRequestBody: ApiRequestBody = {
      contents: updatedHistory.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    };

    try {
      const res = await fetch("/api/ask-ai", {
        // Call our backend API route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send the structured conversation history
        body: JSON.stringify(apiRequestBody),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      const modelResponse: Message = { role: "model", text: data.answer };

      // Update history with the model's response
      setHistory((prevHistory) => [...prevHistory, modelResponse]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error fetching from API route:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = (e.currentTarget as HTMLTextAreaElement).form;
      if (form) form.requestSubmit();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={cn(
          "bg-white dark:bg-blue-950 rounded-lg shadow-lg w-full max-w-[380px] mb-2 flex flex-col transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 scale-100 h-[500px] max-h-[80vh]" : "opacity-0 scale-95 h-0 pointer-events-none"
        )}
      >
        {/* Chat Header */}
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <div className="flex justify-between items-center gap-2 w-full">
            <h2 className="text-xl font-semibold">Ask me anything!</h2>
            <Button variant="destructive" size="icon" onClick={toggleChat} aria-label="Close chat">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div>{/* clear button to clear the chat and start form scratch */}</div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {history.map((msg, index) => (
            <div key={index} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[80%] p-3 rounded-lg w-full",
                  msg.role === "user"
                    ? "dark:bg-white dark:text-black bg-[#010313] text-white"
                    : "bg-gray-200 dark:bg-[#010313] text-gray-800 dark:text-gray-200"
                )}
              >
                {" "}
                <div className="text-sm sm:text-base whitespace-pre-wrap overflow-hidden overflow-x-auto break-words overflow-wrap-anywhere">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 animate-pulse">
                <p className="text-sm sm:text-base">Thinking...</p>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-wrap break-words dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-md">
              <p>
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t items-center dark:border-gray-700 flex gap-2">
          <div
            //   show tooltip on hover
            title="Clear chat"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setHistory([
                { role: "model", text: "Hello! Ask me anything about this portfolio or the person behind it." },
              ]);
              setPrompt("");
              setError(null);
            }}
            aria-label="Clear chat"
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 w-fit"
          >
            <RotateCw />
          </div>
          <Textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question..."
            className="resize-none min-h-[40px] max-h-[120px]"
            disabled={isLoading}
          />

          <Button
            type="submit"
            size="icon"
            disabled={!prompt.trim() || isLoading}
            aria-label="Send message"
            className={cn(
              isLoading || !prompt.trim()
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            )}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Chat Button */}
      <div
        onClick={toggleChat}
        className={cn(
          "rounded-full h-14 flex items-center justify-center w-14 shadow-lg transition-all duration-300 bg-[#010313] text-white dark:bg-white dark:text-[#010313] dark:hover:bg-slate-200 hover:shadow-xl cursor-pointer drop-shadow-2xl",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100",
          !isOpen && " animate-bounce"
        )}
        aria-label="Open chat"
      >
        <MessageCircle id="chat-bubble" className="h-6 w-6" />
      </div>
    </div>
  );
}

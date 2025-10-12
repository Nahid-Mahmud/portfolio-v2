"use client";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [characterAnimation, setCharacterAnimation] = useState("bounce");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Clear error messages when user starts typing
  const clearMessages = () => {
    if (errorMessage || successMessage) {
      setErrorMessage("");
      setSuccessMessage("");
    }
  };

  const welcomeMessage = "Hello Chief. Glad you are here. Let's do something unique today!";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < welcomeMessage.length) {
        setDisplayText(welcomeMessage.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
        // Start character celebration animation
        setCharacterAnimation("celebrate");
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await login(data);

      // If result is undefined, it means redirect happened on server side
      if (!result) {
        // Server-side redirect happened, show success message briefly
        setSuccessMessage("Login successful! Redirecting...");
        toast.success("Login successful!");
        setCharacterAnimation("celebrate");
        return;
      }

      if (result?.success) {
        setSuccessMessage("Login successful!");
        toast.success("Login successful!");
        setCharacterAnimation("celebrate");
      } else {
        setErrorMessage(result?.error || "Login failed. Please try again.");
        setCharacterAnimation("wave");
        toast.error(result?.error || "Login failed. Please try again.");
      }
    } catch (error) {
      // Check if it's a redirect error (which means success)
      if (
        error &&
        typeof error === "object" &&
        "digest" in error &&
        typeof error.digest === "string" &&
        error.digest.includes("NEXT_REDIRECT")
      ) {
        // This is actually a successful login with redirect
        setSuccessMessage("Login successful! Redirecting...");
        toast.success("Login successful!");
        setCharacterAnimation("celebrate");
        return;
      }

      console.error("Login error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setCharacterAnimation("wave");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040931] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-teal-400/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-400/20 rounded-full animate-ping delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-purple-400/20 rounded-full animate-pulse delay-500"></div>
        <div className="floating-shape absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-blue-400/10 to-teal-400/10 transform rotate-45"></div>
        <div className="floating-shape-reverse absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-blue-400/10 transform -rotate-45"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Character Section */}
        <div className="text-center mb-8">
          <div
            className={`inline-block text-6xl mb-4 ${
              characterAnimation === "bounce"
                ? "animate-bounce"
                : characterAnimation === "celebrate"
                ? "animate-pulse"
                : characterAnimation === "wave"
                ? "animate-bounce"
                : ""
            }`}
          >
            🚀
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <p className="text-white text-lg font-medium min-h-[3rem] flex items-center justify-center">
              {displayText}
              {isTyping && <span className="ml-1 animate-pulse">|</span>}
            </p>
          </div>
        </div>

        {/* Error and Success Messages */}
        {(errorMessage || successMessage) && (
          <div className="mb-6">
            {errorMessage && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl p-4 mb-4">
                <p className="text-red-200 text-center font-medium">{errorMessage}</p>
              </div>
            )}
            {successMessage && (
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-4 mb-4">
                <p className="text-green-200 text-center font-medium">{successMessage}</p>
              </div>
            )}
          </div>
        )}

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-blue-200">Sign in to continue your journey</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Input */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-blue-300 group-focus-within:text-blue-200 transition-colors" />
                        </div>
                        <Input
                          {...field}
                          type="email"
                          className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                          placeholder="Your email address"
                          onChange={(e) => {
                            field.onChange(e);
                            clearMessages();
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-yellow-500" />
                  </FormItem>
                )}
              />

              {/* Password Input */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-blue-300 group-focus-within:text-blue-200 transition-colors" />
                        </div>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                          placeholder="Your password"
                          onChange={(e) => {
                            field.onChange(e);
                            clearMessages();
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-blue-300 hover:text-blue-200" />
                          ) : (
                            <Eye className="h-5 w-5 text-blue-300 hover:text-blue-200" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-yellow-500" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center space-x-2 group"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span>Sign In</span>
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Footer */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-blue-200">
              Forgot your password?{" "}
              <Link
                href="/forgot-password"
                className="text-blue-300 hover:text-white font-semibold transition-colors hover:underline"
              >
                Reset it here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .floating-shape {
          animation: float 6s ease-in-out infinite;
        }

        .floating-shape-reverse {
          animation: float-reverse 8s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(45deg);
          }
          50% {
            transform: translateY(-20px) rotate(45deg);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px) rotate(-45deg);
          }
          50% {
            transform: translateY(20px) rotate(-45deg);
          }
        }
      `}</style>
    </div>
  );
}

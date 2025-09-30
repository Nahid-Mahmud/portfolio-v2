"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, LogIn, User, Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

  const handleSubmit = (data: LoginForm) => {
    setCharacterAnimation("wave");
    // Handle login logic here
    console.log("Login attempted with:", data);
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

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-blue-200">Sign in to continue your journey</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center space-x-2 group"
              >
                <LogIn className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Sign In</span>
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

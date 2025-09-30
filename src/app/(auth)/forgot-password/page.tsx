"use client";
import { useEffect, useState } from "react";
import { Mail, Send } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const heroMessage = "Forgot your password? No worries—let's get you back in.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < heroMessage.length) {
        setDisplayText(heroMessage.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: trigger forgot-password API
    console.log("Request password reset for:", { email });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-teal-400/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-400/20 rounded-full animate-ping delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-purple-400/20 rounded-full animate-pulse delay-500"></div>
        <div className="floating-shape absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-blue-400/10 to-teal-400/10 transform rotate-45"></div>
        <div className="floating-shape-reverse absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-blue-400/10 transform -rotate-45"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <p className="text-white text-lg font-medium min-h-[3rem] flex items-center justify-center">
              {displayText}
              {isTyping && <span className="ml-1 animate-pulse">|</span>}
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Forgot Password</h1>
            <p className="text-blue-200">Enter your email to receive a reset link</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-blue-300 group-focus-within:text-blue-200 transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                placeholder="Your email address"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center space-x-2 group"
            >
              <Send className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Send Reset Link</span>
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-blue-200">
              Remembered your password?{" "}
              <Link
                href="/login"
                className="text-blue-300 hover:text-white font-semibold transition-colors hover:underline"
              >
                Back to login
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

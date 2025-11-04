import Background from "@/components/Background";
import FloatingChat from "@/components/FloatingChat";
// import MouseFollower from "@/components/MouseFollower";
import Navbar from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-providers";
import { Toaster } from "sonner";

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ThemeProvider>
        <Navbar />
        <div className="bg-white relative dark:text-white min-h-screen h-full w-full dark:bg-[#010313] transition-colors duration-500">
          {children}
          <Toaster position="top-right" />
          <Background />
          {/* <MouseFollower /> */}
        </div>
        <FloatingChat />
      </ThemeProvider>
    </div>
  );
}

import FloatingChat from "@/components/AskGemini";
import Background from "@/components/Background";
import MouseFollower from "@/components/MouseFollower";
import Navbar from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Titillium_Web } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const titillium = Titillium_Web({
  variable: "--font-titillium",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Md. Nahid Mahmud",
  description:
    "I build exceptional digital experiences with modern technologies, focusing on clean code and user-centered design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script defer={true} async src="https://www.googletagmanager.com/gtag/js?id=G-WVGG88MLB0"></Script>
        <Script defer={true} id="google-analytics">
          {`
          
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

            gtag('config', 'G-WVGG88MLB0');
            
            `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}
      ${titillium.variable}
      antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <div className="bg-white dark:text-white min-h-screen dark:bg-[#010313] transition-colors duration-500">
            {children}
            <Background />
            <MouseFollower />
          </div>
          <FloatingChat />
        </ThemeProvider>
      </body>
    </html>
  );
}

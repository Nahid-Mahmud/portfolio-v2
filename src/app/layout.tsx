import type { Metadata } from "next";
import { Geist, Geist_Mono, Titillium_Web } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
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
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Preload critical CSS */}
        <link rel="preload" href="/globals.css" as="style" />

        <Script
          defer={true}
          strategy="lazyOnload"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WVGG88MLB0"
        ></Script>
        <Script defer={true} id="google-analytics" strategy="lazyOnload">
          {`
          
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

            gtag('config', 'G-WVGG88MLB0');
            
            `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${titillium.variable}
      antialiased`}
      >
        {children}
        <Toaster richColors={true} position="top-right" expand={true} closeButton />
      </body>
    </html>
  );
}

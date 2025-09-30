import type { Metadata } from "next";
import { Geist, Geist_Mono, Titillium_Web } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
      </body>
    </html>
  );
}

"use client";

import { Github, Linkedin, Mail, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useMobile } from "@/hooks/useMobile";
import Link from "next/link";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme(); // Use resolvedTheme for accurate theme state
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false); // Add mounted state

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true); // Set mounted to true after the component mounts
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50
        ${scrolled ? "bg-white dark:bg-slate-900 shadow-lg" : "bg-transparent"}
        transition-all duration-300 
       ${isMenuOpen ? "dark:bg-slate-900" : ""}
        `}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {/* <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white">
            Nahid<span className="text-emerald-600">Mahmud</span>
          </Link> */}

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  //prefetch the page
                  prefetch={true}
                  className={`transition-colors text-xl font-semibold ${
                    pathname === link.href
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Theme Toggle and Mobile Menu Button */}
          <div className={`flex items-center gap-4   ${isMobile && "w-full"} `}>
            {mounted && !isMobile && (
              <div className="flex items-center gap-5">
                {" "}
                {pathname !== "/" && (
                  <div className="flex gap-4 ">
                    <Link
                      className="text-md group h-10 w-10 rounded-full border flex items-center justify-center border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                      href="https://github.com/Nahid-Mahmud"
                      target="_blank"
                    >
                      <Github className="h-6 w-6 " />
                    </Link>
                    <Link
                      className="text-md group h-10 w-10 rounded-full border flex items-center justify-center border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                      href="https://www.linkedin.com/in/md-nahid-mahmud/"
                      target="_blank"
                    >
                      <Linkedin className="h-6 w-6 " />
                    </Link>
                    <Link
                      className="text-md group h-10 w-10 rounded-full border flex items-center justify-center border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                      href="mailto:nahidmahmudn@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Mail className="h-6 w-6" />
                    </Link>
                  </div>
                )}
                {/* Toggle button */}
                <label
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="relative inline-flex items-center cursor-pointer"
                >
                  <div
                    className={`w-24 h-10 rounded-full ring-0 peer duration-500 outline-none overflow-hidden shadow-lg shadow-gray-400 
                  ${resolvedTheme === "dark" ? "bg-[#010313]" : "bg-gray-200"} relative`}
                  >
                    <span
                      className={`absolute top-2 left-2 transition-all duration-500 ${
                        resolvedTheme === "dark" ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
                      }`}
                    >
                      <Sun className="h-6 w-6 text-slate-900 dark:text-slate-200" />
                    </span>
                    <span
                      className={`absolute top-2 right-2 transition-all duration-500 ${
                        resolvedTheme === "dark" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                      }`}
                    >
                      <Moon className="h-6 w-6 text-slate-900 dark:text-slate-200" />
                    </span>
                  </div>
                </label>
              </div>
            )}
            {isMobile && mounted && (
              <div className="flex items-center justify-between w-full">
                <div onClick={toggleMenu} className="md:hidden rounded-full">
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-9 w-9" />}
                </div>

                <div className="flex items-center gap-4">
                  {pathname !== "/" && (
                    <div className="flex gap-4 ">
                      <Link
                        className="text-md group h-10 w-10 rounded-full border flex items-center justify-center border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                        href="https://github.com/Nahid-Mahmud"
                        target="_blank"
                      >
                        <Github className="h-6 w-6 " />
                      </Link>
                      <Link
                        className="text-md group h-10 w-10 rounded-full border flex items-center justify-center border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                        href="https://www.linkedin.com/in/md-nahid-mahmud/"
                        target="_blank"
                      >
                        <Linkedin className="h-6 w-6 " />
                      </Link>
                      <Link
                        className="text-md group h-10 w-10 rounded-full border flex items-center justify-center border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                        href="mailto:nahidmahmudn2@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Mail className="h-6 w-6" />
                      </Link>
                    </div>
                  )}
                  <div onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="rounded-full">
                    {resolvedTheme === "dark" ? <Sun className="h-9 w-9" /> : <Moon className="h-9 w-9" />}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div
          className={`md:hidden absolute w-full bg-white dark:bg-slate-900 shadow-lg ${
            isMenuOpen ? "top-14" : "-top-96"
          } transition-all duration-300`}
        >
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 ${
                  pathname === link.href
                    ? "text-emerald-600 dark:text-emerald-400 bg-slate-50 dark:bg-slate-800/50"
                    : "text-slate-700 dark:text-slate-200"
                }`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

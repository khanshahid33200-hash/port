"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll handler for background change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: pathname === "/" ? "#home" : "/#home" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: pathname === "/" ? "#portfolio" : "/portfolio" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-xl border-border-custom/50 shadow-sm" 
            : "bg-white/80 backdrop-blur-xl border-border-custom/30"
        }`}
        id="main-nav"
      >
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-20">
          <Link 
            href="/" 
            className="font-headline-lg text-headline-lg font-black text-text-main tracking-tighter hover:opacity-80 transition-opacity"
          >
            Shahid Khan
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-semibold font-label-md text-label-md transition-colors duration-300 ${
                  pathname === link.href || (pathname === "/" && link.href === "#home")
                    ? "text-primary"
                    : "text-text-muted hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Let's Talk CTA */}
          <div className="flex items-center gap-4">
            <Link 
              href="/contact"
              className="hidden md:flex items-center justify-center bg-primary text-white font-label-md text-label-md px-6 py-2.5 rounded-lg font-semibold hover:bg-primary-hover transition-colors scale-95 active:scale-90 transition-transform"
            >
              Let&apos;s Talk
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-text-main p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">
                {isOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-white/95 backdrop-blur-xl md:hidden animate-fade-in-up">
          <nav className="flex flex-col p-6 gap-6 border-t border-border-custom">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-bold tracking-tight py-2 ${
                  pathname === link.href ? "text-primary" : "text-text-main"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-primary-hover transition-colors mt-4"
            >
              Let&apos;s Talk
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

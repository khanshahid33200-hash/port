"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-custom/50 w-full mt-auto">
      <div className="w-full py-stack-lg px-margin-mobile md:px-gutter max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-stack-sm opacity-80 hover:opacity-100 transition-opacity">
        <Link 
          href="/" 
          className="font-headline-xl text-headline-xl font-black text-text-main tracking-tighter hover:opacity-80 transition-opacity"
        >
          Shahid Khan
        </Link>
        <div className="font-body-md text-body-md text-text-muted text-center md:text-left">
          © 2026 Shahid Khan. All Rights Reserved.
        </div>
        <div className="flex flex-wrap justify-center gap-6 font-label-sm text-label-sm">
          <a href="#" className="text-text-muted hover:text-primary transition-all">Privacy Policy</a>
          <a href="#" className="text-text-muted hover:text-primary transition-all">Terms of Service</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-all">Github</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-all">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-utils";

export default function Toolbar() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full backdrop-blur-md bg-gray-100/15 border border-gray-200/15 shadow-lg pointer-events-none"
    >
      <div className="flex items-center gap-6 text-sm font-medium text-black">
        <a 
          href="/" 
          onClick={handleHomeClick}
          className="hover:text-[#F75C69] transition-colors pointer-events-auto"
        >
          Home
        </a>
        <a 
          href="#about" 
          onClick={(e) => handleSectionClick(e, 'about')}
          className="hover:text-[#F75C69] transition-colors pointer-events-auto"
        >
          About
        </a>
        <a 
          href="#faq" 
          onClick={(e) => handleSectionClick(e, 'faq')}
          className="hover:text-[#F75C69] transition-colors pointer-events-auto"
        >
          FAQ
        </a>
        <a 
          href={isAuthenticated ? "/dashboard" : "/signin"}
          className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors pointer-events-auto whitespace-nowrap"
        >
          {isAuthenticated ? "Dashboard" : "Sign In"}
        </a>
      </div>
    </motion.nav>
  );
}


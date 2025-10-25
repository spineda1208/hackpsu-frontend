"use client";

import { motion } from "motion/react";

export default function Toolbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full backdrop-blur-md bg-gray-200/60 border border-gray-300/40 shadow-lg pointer-events-none"
    >
      <div className="flex items-center gap-6 text-sm font-medium text-black">
        <a href="#" className="hover:text-[#F75C69] transition-colors pointer-events-auto">
          Home
        </a>
        <a href="#" className="hover:text-[#F75C69] transition-colors pointer-events-auto">
          About
        </a>
        <a href="/dashboard" className="hover:text-[#F75C69] transition-colors pointer-events-auto">
          Dashboard
        </a>
        <a href="#" className="hover:text-[#F75C69] transition-colors pointer-events-auto">
          Contact
        </a>
      </div>
    </motion.nav>
  );
}


"use client";

import { motion } from "motion/react";

interface AboutProps {
  title?: string;
  bodyText?: string;
  id?: string;
  index?: number;
}

export default function About({
  title = 'Build the perfect tools',
  bodyText = 'Our extension API is designed to allow anyone with web development skills to unleash the power of Raycast.',
  id = 'about',
  index = 1,
}: AboutProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-32 last:mb-0"
    >
      <div className="relative">
        {/* Index Number */}
        <div className="text-[#F75C69] font-mono text-sm mb-4 tracking-wider">
          [{String(index).padStart(2, '0')}]
        </div>
        
        {/* Title with animated underline */}
        <div className="relative inline-block">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-black uppercase tracking-tight leading-none mb-6">
            {title}
          </h2>
          <motion.div
            className="h-2 bg-[#F75C69] absolute bottom-0 left-0"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
        
        {/* Body Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl text-zinc-600 max-w-2xl mt-8 leading-relaxed"
        >
          {bodyText}
        </motion.p>
      </div>
    </motion.div>
  );
}


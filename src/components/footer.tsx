"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";

// Alternative 1: Current Classic Layout
function FooterClassic() {
  return (
    <footer className="w-full relative overflow-hidden border-t-4 border-black dark:border-zinc-50">
      <div className="w-full px-8 py-20 relative">
        <div className="max-w-3xl w-full mx-auto">
          <div className="flex items-start justify-between">
            <div className="shrink-0">
              <h1 className="relative text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-zinc-50 flex items-center gap-2">
                Watchout
                <span className="text-xl md:text-2xl" style={{ color: '#F75C69' }}>®</span>
              </h1>
            </div>

            <div className="grid grid-cols-3 gap-12 text-sm">
              <div className="space-y-3">
                <h3 className="font-semibold text-black dark:text-zinc-50 mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors">Features</a></li>
                  <li><a href="#pricing" className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors">Pricing</a></li>
                  <li><a href="#updates" className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors">Updates</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-black dark:text-zinc-50 mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#about" className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors">About</a></li>
                  <li><a href="#team" className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors">Team</a></li>
                  <li><a href="#careers" className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors">Careers</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-black dark:text-zinc-50 mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#docs" className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors">Docs</a></li>
                  <li><a href="#blog" className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors">Blog</a></li>
                  <li><a href="#support" className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors">Support</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Alternative 2: Scanning Line Surveillance Footer
function FooterScanning() {
  const [scanPosition, setScanPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPosition((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full relative overflow-hidden bg-black dark:bg-zinc-950">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute h-px w-full bg-[#F75C69] shadow-[0_0_20px_rgba(247,92,105,0.8)]"
          style={{ top: `${scanPosition}%` }}
        />
      </div>
      
      <div className="w-full px-8 py-20 relative">
        <div className="max-w-3xl w-full mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-50 mb-4">
              Watchout<span style={{ color: '#F75C69' }}>®</span>
            </h1>
            <div className="h-px bg-zinc-800 w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-zinc-400 text-sm font-mono">
            <div>
              <div className="text-[#F75C69] mb-3">[PRODUCT]</div>
              <div className="space-y-1">
                <div>→ Features</div>
                <div>→ Pricing</div>
                <div>→ Updates</div>
              </div>
            </div>
            <div>
              <div className="text-[#F75C69] mb-3">[COMPANY]</div>
              <div className="space-y-1">
                <div>→ About</div>
                <div>→ Team</div>
                <div>→ Careers</div>
              </div>
            </div>
            <div>
              <div className="text-[#F75C69] mb-3">[RESOURCES]</div>
              <div className="space-y-1">
                <div>→ Docs</div>
                <div>→ Blog</div>
                <div>→ Support</div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center text-zinc-600 text-xs font-mono">
            © 2025 WATCHOUT SYSTEMS // ALL MONITORED
          </div>
        </div>
      </div>
    </footer>
  );
}

// Alternative 3: Glitch/Distortion Footer
function FooterGlitch() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <footer className="w-full relative overflow-hidden">
      <div className="w-full px-8 py-20 relative">
        <div className="max-w-3xl w-full mx-auto">
          <div className="mb-16">
            <motion.h1 
              className="text-7xl md:text-9xl font-bold tracking-tighter text-black dark:text-zinc-50"
              whileHover={{
                x: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.5 }
              }}
            >
              WATCHOUT
              <motion.span 
                style={{ color: '#F75C69' }}
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                ®
              </motion.span>
            </motion.h1>
            <div className="flex gap-2 mt-4">
              <div className="h-2 w-32 bg-black dark:bg-zinc-50" />
              <div className="h-2 w-16 bg-[#F75C69]" />
              <div className="h-2 w-8 bg-black dark:bg-zinc-50" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Product', 'Company', 'Resources', 'Legal'].map((section) => (
              <div key={section}>
                <h3 className="text-xs font-bold mb-4 text-zinc-400 uppercase tracking-widest">
                  {section}
                </h3>
                <div className="space-y-2 text-lg">
                  {['Link 1', 'Link 2', 'Link 3'].map((link) => {
                    const key = `${section}-${link}`;
                    return (
                      <motion.a
                        key={key}
                        href="#"
                        className="block text-black dark:text-zinc-50 hover:text-[#F75C69] transition-colors"
                        onMouseEnter={() => setHoveredLink(key)}
                        onMouseLeave={() => setHoveredLink(null)}
                        animate={hoveredLink === key ? {
                          x: [0, -2, 2, -2, 2, 0],
                        } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {link}
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Alternative 4: Minimal Grid Footer
function FooterGrid() {
  return (
    <footer className="w-full relative overflow-hidden border-t border-black dark:border-zinc-50">
      <div className="w-full px-8 py-20 relative">
        <div className="max-w-3xl w-full mx-auto">
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-0 h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border border-black dark:border-zinc-50" />
              ))}
            </div>
          </div>

          <div className="relative space-y-8">
            {/* Top section */}
            <div className="flex items-start justify-between pb-8 border-b-2 border-black dark:border-zinc-50">
              <div>
                <div className="text-6xl font-bold text-black dark:text-zinc-50">W</div>
                <div className="text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mt-2">
                  Watchout Systems
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold mb-2" style={{ color: '#F75C69' }}>®</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">Est. 2025</div>
              </div>
            </div>

            {/* Links in table format */}
            <div className="space-y-0">
              {[
                ['01', 'Features', '#features'],
                ['02', 'Pricing', '#pricing'],
                ['03', 'About', '#about'],
                ['04', 'Team', '#team'],
                ['05', 'Docs', '#docs'],
                ['06', 'Support', '#support'],
              ].map(([num, label, href]) => (
                <motion.a
                  key={num}
                  href={href}
                  className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-800 group"
                  whileHover={{ x: 10 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-zinc-400 font-mono">{num}</span>
                    <span className="text-lg font-medium text-black dark:text-zinc-50 group-hover:text-[#F75C69] transition-colors">
                      {label}
                    </span>
                  </div>
                  <motion.span
                    className="text-[#F75C69]"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Alternative 5: Stacked Layers Footer
function FooterStacked() {
  const layers = [
    { text: 'WATCH', color: 'text-black dark:text-zinc-50', delay: 0 },
    { text: 'OUT', color: 'text-zinc-700 dark:text-zinc-300', delay: 0.1 },
    { text: 'WATCH', color: 'text-zinc-500 dark:text-zinc-500', delay: 0.2 },
    { text: 'OUT', color: 'text-zinc-300 dark:text-zinc-700', delay: 0.3 },
  ];

  return (
    <footer className="w-full relative overflow-hidden">
      <div className="w-full px-8 py-32 relative">
        <div className="max-w-3xl w-full mx-auto">
          <div className="relative h-32 mb-16">
            {layers.map((layer, i) => (
              <motion.div
                key={i}
                className={`absolute inset-0 text-8xl md:text-9xl font-black tracking-tighter ${layer.color}`}
                initial={{ y: 0, opacity: 0 }}
                animate={{ 
                  y: i * 8,
                  opacity: 1
                }}
                transition={{
                  delay: layer.delay,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: i * 12,
                  transition: { duration: 0.2 }
                }}
              >
                {layer.text}
                {i === 0 && <span style={{ color: '#F75C69' }}>®</span>}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-16">
            {['Product', 'Company', 'Legal'].map((section, idx) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                <div className="h-1 w-8 bg-[#F75C69] mb-4" />
                <h3 className="text-xs uppercase tracking-widest mb-4 text-black dark:text-zinc-50 font-bold">
                  {section}
                </h3>
                <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <div>Link One</div>
                  <div>Link Two</div>
                  <div>Link Three</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <div className="space-y-0">
      <div className="py-12 bg-zinc-100 dark:bg-zinc-900 text-center">
        <h2 className="text-2xl font-bold mb-2 text-black dark:text-zinc-50">Footer Design Alternatives</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Scroll to view different minimal brutalist footer concepts</p>
      </div>
      
      <div className="border-t-4 border-[#F75C69]">
        <div className="py-8 px-8 bg-white dark:bg-black text-center">
          <h3 className="text-lg font-bold mb-1 text-black dark:text-zinc-50">01 — Classic Layout</h3>
          <p className="text-xs text-zinc-500">Traditional grid structure with emphasis on hierarchy</p>
        </div>
        <FooterClassic />
      </div>

      <div className="border-t-4 border-[#F75C69]">
        <div className="py-8 px-8 bg-white dark:bg-black text-center">
          <h3 className="text-lg font-bold mb-1 text-black dark:text-zinc-50">02 — Scanning Surveillance</h3>
          <p className="text-xs text-zinc-500">Animated scan line with terminal-style aesthetic</p>
        </div>
        <FooterScanning />
      </div>

      <div className="border-t-4 border-[#F75C69]">
        <div className="py-8 px-8 bg-white dark:bg-black text-center">
          <h3 className="text-lg font-bold mb-1 text-black dark:text-zinc-50">03 — Glitch Effect</h3>
          <p className="text-xs text-zinc-500">Distortion and shake on interaction</p>
        </div>
        <FooterGlitch />
      </div>

      <div className="border-t-4 border-[#F75C69]">
        <div className="py-8 px-8 bg-white dark:bg-black text-center">
          <h3 className="text-lg font-bold mb-1 text-black dark:text-zinc-50">04 — Minimal Grid</h3>
          <p className="text-xs text-zinc-500">Table-like structure with numbered entries</p>
        </div>
        <FooterGrid />
      </div>

      <div className="border-t-4 border-[#F75C69]">
        <div className="py-8 px-8 bg-white dark:bg-black text-center">
          <h3 className="text-lg font-bold mb-1 text-black dark:text-zinc-50">05 — Stacked Layers</h3>
          <p className="text-xs text-zinc-500">Depth through overlapping text layers</p>
        </div>
        <FooterStacked />
      </div>
    </div>
  );
}


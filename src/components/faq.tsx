"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Watchout?",
    answer: "A surveillance awareness platform highlighting the disproportionate monitoring of underserved communities through interactive data visualization."
  },
  {
    question: "How does it work?",
    answer: "We aggregate public CCTV data and present it through an interactive map interface, revealing patterns of surveillance density across different neighborhoods."
  },
  {
    question: "Is this legal?",
    answer: "Yes. We only use publicly available information about surveillance cameras installed in public spaces. Our goal is transparency, not exploitation."
  },
  {
    question: "Can I contribute?",
    answer: "Absolutely. You can submit camera locations, report inaccuracies, or contribute to our open-source codebase on GitHub."
  },
  {
    question: "What's the goal?",
    answer: "To raise awareness about surveillance inequality and spark conversations about privacy rights in the age of constant monitoring."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center px-8 py-20">
      <div className="max-w-3xl w-full">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-zinc-50 mb-2">
          FAQ
        </h2>
        <div className="h-px bg-black dark:bg-zinc-50 mb-12" />

        <div className="space-y-0">
          {faqData.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-start justify-between text-left group"
              >
                <span className="text-lg md:text-xl font-medium text-black dark:text-zinc-50 group-hover:opacity-70 transition-opacity">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  className="text-2xl font-light ml-4 shrink-0"
                  style={{ color: '#F75C69' }}
                >
                  +
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="h-px bg-zinc-200 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

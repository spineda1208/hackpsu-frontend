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
    answer: "Watchout is an automated crime detection and alert system that leverages existing CCTV camera infrastructure, powered by advanced ML computer vision technology to detect suspicious activities in real-time and notify authorities instantly."
  },
  {
    question: "How does it work?",
    answer: "Our system integrates with existing CCTV cameras and uses machine learning algorithms to analyze video feeds in real-time. When suspicious behavior or criminal activity is detected, the system automatically generates alerts and notifies the appropriate authorities, reducing response time significantly."
  },
  {
    question: "What types of incidents can it detect?",
    answer: "Our ML models are trained to identify various criminal activities including theft, vandalism, assault, unauthorized access, suspicious loitering, and other anomalous behaviors. The system continuously learns and improves its detection accuracy over time."
  },
  {
    question: "Does it work with existing cameras?",
    answer: "Yes! Watchout is designed to integrate seamlessly with your existing CCTV infrastructure. There's no need for expensive camera replacements—our software layer adds intelligent detection capabilities to cameras you already have installed."
  },
  {
    question: "How accurate is the detection?",
    answer: "Our computer vision models achieve over 80% accuracy in controlled environments, with continuous improvements through machine learning. The system also includes confidence scoring to minimize false positives and allows for human verification of critical alerts."
  },
  {
    question: "Who can benefit from this system?",
    answer: "Law enforcement agencies, businesses, public facilities, campuses, parking structures, and residential communities can all benefit from Watchout's automated crime detection. Any organization with existing CCTV infrastructure looking to enhance security can leverage our platform."
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
                className="w-full py-6 flex items-start justify-between text-left group cursor-pointer"
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

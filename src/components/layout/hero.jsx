'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <section className="overflow-hidden py-10 md:py-14 mx-auto max-w-7xl px-6 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 text-start mt-8 md:mt-16"
        >
          <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white mb-6 max-w-5xl">
            Built to help you think faster during high-pressure interviews.
          </h1>

          <div className="flex flex-col lg:flex-row lg:items-end items-start justify-between gap-6 md:gap-4 mt-8">
            <p className="text-sm md:text-base leading-relaxed text-white/45 max-w-2xl font-normal tracking-tight">
              From coding challenges to system design questions, the app
              listens, analyzes, and responds instantly through a private
              on-screen overlay.
              <br className="hidden md:block" /> Lightweight, fast, and designed for seamless interview support.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center py-2.5 px-6 rounded-full bg-white text-black text-sm font-medium no-underline tracking-tight transition-all duration-200 hover:bg-white/90 whitespace-nowrap"
            >
              Try It Now
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mt-16 md:mt-24 h-[400px] md:h-[550px] lg:h-[600px] w-full"
        >
          <img
            src='/images/interview-2.png'
            alt="GhostInterview dashboard preview"
            draggable={false}
            className="w-full h-full object-cover pointer-events-none select-none block rounded-2xl border border-white/10"
          />
        </motion.div>
        <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[1200px] h-[300px] rounded-full bg-[#C4D9FF]/60 blur-[180px] pointer-events-none" />
      </section>
    </div>
  );
};

export default Hero;

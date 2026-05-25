'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Clock, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TRUST_SIGNALS = [
  { icon: Shield, label: 'No credit card required' },
  { icon: Clock, label: '14-day free trial' },
  { icon: Headphones, label: 'Cancel anytime' },
];

const Subscribe = () => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });

  return (
    <section
      className="py-24 md:py-32 px-6 md:px-12 bg-black text-white relative border-t border-white/[0.06]"
    >
      <div ref={cardRef} className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="border border-white/[0.06] rounded-2xl p-12 md:p-20 text-center bg-white/[0.015] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 mb-8">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-wider text-[#C4D9FF] uppercase bg-[#C4D9FF]/10 border border-[#C4D9FF]/20 rounded-full px-3.5 py-1.5">
              <Sparkles className="size-3 text-[#C4D9FF]" />
              Start your journey today
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 tracking-tight relative z-10 leading-[1.15] text-white">
            Ready to ace your <br />
            <span className="text-white/40 font-normal">next interview?</span>
          </h2>

          <p className="text-white/40 text-xs md:text-sm mb-10 max-w-xl mx-auto leading-relaxed relative z-10">
            Join thousands of candidates who landed their dream jobs at top tech companies.
            GhostInterview gives you the edge when it matters most — real-time AI assistance,
            invisible to everyone but you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-4 text-xs font-semibold group h-auto transition-all duration-200">
              Get started free
              <ArrowRight className="ml-1.5 w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
            <Button
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5 rounded-full px-6 py-4 text-xs font-semibold h-auto transition-all duration-200 hover:border-white/20"
            >
              Watch demo
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 relative z-10">
            {TRUST_SIGNALS.map((signal, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-white/30 text-[10px] font-semibold uppercase tracking-wider"
              >
                <signal.icon className="size-3" />
                <span>{signal.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Subscribe;

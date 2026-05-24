'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Is GhostInterview really invisible during screen sharing?',
    answer:
      'Yes. GhostInterview uses a proprietary overlay rendering technique that operates outside the standard screen-capture pipeline. It is completely invisible to Zoom, Google Meet, Microsoft Teams, and all known proctoring software. We test against 15+ screen-recording tools monthly to ensure zero detection.',
  },
  {
    question: 'How does the real-time transcription work?',
    answer:
      'Our AI listens to the interview audio stream in real-time using an optimized speech-to-text model fine-tuned for technical interviews. It captures both the interviewer\'s questions and your responses with 98.5% accuracy, then instantly generates context-aware suggestions. The entire pipeline runs in under 500ms.',
  },
  {
    question: 'Which programming languages and frameworks are supported?',
    answer:
      'GhostInterview supports all major languages including Python, JavaScript/TypeScript, Java, C++, Go, Rust, Ruby, and Swift. For frameworks, we cover React, Angular, Vue, Node.js, Django, Spring Boot, and 50+ more. Our AI is also trained on system design patterns, behavioral interview formats, and data structure problems.',
  },
  {
    question: 'Can I customize the AI for specific roles or companies?',
    answer:
      'Absolutely. Pro and Enterprise users can configure role-specific profiles (e.g., Senior Frontend Engineer, Staff ML Engineer) and target specific companies. The AI adapts its response style, depth, and technical vocabulary to match what top interviewers at those companies typically expect.',
  },
  {
    question: 'Is my interview data stored or shared?',
    answer:
      'No. We operate on a strict zero-log policy. Interview audio is processed in real-time and immediately discarded — nothing is stored on our servers. Session recordings (if enabled) are encrypted end-to-end and stored only on your local device. We never share, sell, or use your data for model training.',
  },
  {
    question: 'What happens if I run out of sessions on the free plan?',
    answer:
      'On the Starter plan, you get 3 interview sessions per month. Once used, you can upgrade to Pro for unlimited sessions instantly — no data loss, no interruption. Your custom profiles and preferences carry over automatically. We also offer a 14-day Pro trial so you can test everything before committing.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Sign up for free in under 30 seconds — no credit card required. Download our lightweight desktop app (macOS, Windows, Linux), configure your target role and tech stack, and you\'re ready for your next interview. The entire setup takes less than 2 minutes.',
  },
  {
    question: 'Does it work with phone/audio-only interviews?',
    answer:
      'Yes. GhostInterview works with any audio source on your computer. For phone interviews, simply put the call on speaker or route the audio through your computer. The AI will transcribe and assist in real-time, just like in a video call environment.',
  },
];

const FAQ = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-24 md:py-32 px-6 md:px-12 bg-black text-white overflow-hidden relative border-t border-white/6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-20 relative z-10">
        {/* Left side — Header */}
        <motion.div
          ref={headerRef}
          className="flex-1 md:sticky md:top-32 md:self-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/30 uppercase">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight leading-[1.15]">
              Questions?
              <br />
              <span className="text-white/40 font-normal">We&apos;ve got answers.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/45 text-xs md:text-sm mb-8 max-w-md leading-relaxed"
          >
            Everything you need to know about GhostInterview. Can&apos;t find what
            you&apos;re looking for? Reach out to our support team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              variant="outline"
              className="rounded-full px-5 py-4 border-white/10 hover:bg-white/5 hover:border-white/20 text-white transition-all duration-200 group text-xs h-auto font-medium"
            >
              <MessageCircle className="mr-2 size-3.5" />
              Contact support
              <ArrowRight className="ml-1.5 size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 gap-6"
          >
            {[
              { value: '< 4hr', label: 'Avg. response time' },
              { value: '98%', label: 'Satisfaction rate' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-xl font-bold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[10px] text-white/30 mt-1 uppercase tracking-wider font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side — Accordion */}
        <div className="flex-[1.5]">
          <Accordion
            type="single"
            collapsible
            className="border-none w-full space-y-1"
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border-b border-white/6 px-0 transition-colors duration-200 hover:border-white/10"
                >
                  <AccordionTrigger className="text-sm md:text-base font-semibold py-5 hover:no-underline hover:text-white/85 transition-all duration-200 text-white text-left">
                    <span className="flex items-start gap-4">
                      <span className="text-white/20 text-xs font-mono mt-0.5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/40 text-xs md:text-sm leading-relaxed pb-5 pl-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

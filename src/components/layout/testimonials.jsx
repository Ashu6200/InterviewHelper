'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Landed a Senior Frontend role at Google. The real-time suggestions during my system design round were game-changing.",
    author: 'Marcus Webb',
    role: 'Senior Frontend Engineer, Google',
    stars: 5,
  },
  {
    quote:
      "I was terrified of live coding interviews. GhostInterview gave me the confidence boost I needed — got offers from two FAANG companies.",
    author: 'Priya Nair',
    role: 'Software Engineer, Meta',
    stars: 5,
  },
  {
    quote:
      "The transcription accuracy is insane. It caught technical terms my interviewer used that I would've completely missed.",
    author: 'Jordan Ito',
    role: 'Staff Engineer, Stripe',
    stars: 5,
  },
  {
    quote:
      "Used it for 3 mock interviews and 2 real ones. The AI understood context from earlier in the conversation — felt like having a genius co-pilot.",
    author: 'Aria Chen',
    role: 'ML Engineer, OpenAI',
    stars: 5,
  },
  {
    quote:
      "Completely invisible. My interviewer shared their screen at one point and there was zero trace. Remarkable engineering.",
    author: 'Sam Rivera',
    role: 'Backend Engineer, Netflix',
    stars: 5,
  },
  {
    quote:
      "The screenshot-to-solution feature saved me during a tricky SQL question. One hotkey and I had the answer in seconds.",
    author: 'Lea Hoffmann',
    role: 'Data Engineer, Spotify',
    stars: 5,
  },
  {
    quote:
      "Went from bombing interviews to getting 4 offers in a month. The role-specific AI tuning for DevOps was incredibly accurate.",
    author: 'Kwame Asante',
    role: 'DevOps Engineer, Cloudflare',
    stars: 5,
  },
  {
    quote:
      "Best investment in my career. Period. The Teams integration worked flawlessly for my Microsoft final round.",
    author: 'Mei Zhang',
    role: 'Product Engineer, Microsoft',
    stars: 5,
  },
  {
    quote:
      "The system design templates and interactive diagrams helped me explain complex trade-offs clearly to the Principal architect.",
    author: 'Alex Mercer',
    role: 'Staff Architect, AWS',
    stars: 5,
  },
  {
    quote:
      "I went from junior to mid-level in record time. Practicing with the AI feedback is like having a staff engineer coach you 24/7.",
    author: 'Elena Rostova',
    role: 'Full Stack Engineer, Vercel',
    stars: 5,
  }
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <Card className="w-[320px] md:w-[380px] shrink-0 bg-white/[0.015] border-white/[0.06] p-6 flex flex-col justify-between hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 group h-[200px] md:h-[220px]">
      <div>
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: testimonial.stars }).map((_, i) => (
            <Star
              key={i}
              className="size-3 fill-[#f5c542] text-[#f5c542]"
            />
          ))}
        </div>

        <p className="text-white/70 text-xs md:text-sm leading-relaxed line-clamp-4">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-white/[0.04]">
        <Avatar className="w-7 h-7 border border-white/[0.06]">
          <AvatarFallback
            className="text-[9px] font-semibold bg-white/5 text-white/50"
          >
            {testimonial.author
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-xs font-semibold text-white">
            {testimonial.author}
          </h4>
          <p className="text-[9px] text-white/40">{testimonial.role}</p>
        </div>
      </div>
    </Card>
  );
};

const Marquee = ({ children, reverse = false, duration = '40s' }) => {
  return (
    <div className="flex overflow-hidden group select-none relative w-full">
      <div 
        className={`flex ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } group-hover:[animation-play-state:paused]`}
        style={{ '--duration': duration }}
      >
        <div className="flex gap-4 shrink-0 pr-4">
          {children}
        </div>
        <div className="flex gap-4 shrink-0 pr-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });

  const firstRow = testimonials.slice(0, 5);
  const secondRow = testimonials.slice(5, 10);

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 bg-black text-white relative overflow-hidden border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-4"
        >
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/30 uppercase">
            Testimonials
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15]"
          >
            Loved by candidates
            <br />
            <span className="text-white/40 font-normal">worldwide</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/45 text-xs md:text-sm max-w-sm leading-relaxed"
          >
            Over 12,000 candidates have used GhostInterview to land roles at
            top tech companies.
          </motion.p>
        </div>
      </div>

      <div className="relative flex flex-col gap-4 w-full overflow-hidden py-4">
        <Marquee duration="50s">
          {firstRow.map((t, i) => (
            <TestimonialCard key={`row1-${i}`} testimonial={t} />
          ))}
        </Marquee>

        <Marquee reverse duration="55s">
          {secondRow.map((t, i) => (
            <TestimonialCard key={`row2-${i}`} testimonial={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Testimonials;

'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import { ShieldCheck, LayoutDashboard, Ghost, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const FEATURES = [
  {
    step: '01',
    title: 'The Secure Entry',
    badge: 'ID Badge',
    description:
      'Before the app even starts, it requires a secure login — ensuring only the authorized user can access their personal interview settings and credits. Hardware fingerprinting verifies the specific machine, so your account can never be shared or misused.',
    bullets: [
      'Secure credential-based login',
      'Hardware fingerprint verification',
      'Account sharing prevention',
    ],
    image: '/images/interview-1.png',
    icon: ShieldCheck,
    color: '#a78bfa',
  },
  {
    step: '02',
    title: 'Setting the Stage',
    badge: 'Dashboard',
    description:
      'Once inside, the Command Center lets you configure everything before the interview starts. Pick your target role, dial in the exact technologies the interviewer will ask about, and choose how you want the AI to assist — automatic or on-demand.',
    bullets: [
      'Role picker — Senior Dev, Lead Manager, and more',
      'Tech stack targeting (React Native, Python, etc.)',
      'Auto-answer or manual trigger mode',
    ],
    image: '/images/interview-2.png',
    icon: LayoutDashboard,
    color: '#8b5cf6',
  },
  {
    step: '03',
    title: 'The Ghost Companion',
    badge: 'Overlay',
    description:
      'During the interview, a transparent overlay appears on your screen — completely invisible to anyone watching via Zoom or Teams. It listens in real-time, transcribes every word, and surfaces the perfect answer with bullet-point summaries and detailed explanations.',
    bullets: [
      'Screen-capture invisible overlay',
      'Real-time voice transcription & instant AI answers',
      'Screenshot-to-solution with a single shortcut key',
    ],
    image: '/images/interview-3.png',
    icon: Ghost,
    color: '#7c3aed',
  },
];

const SECTION_VH = FEATURES.length * 75 + 50;
const GRID_VH = FEATURES.length * 75;
const N = FEATURES.length;

const Feature = ({ className }) => {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ['start 40%', 'end 70%'],
  });

  const scrollYProgress = useSpring(rawProgress, {
    damping: 30,
    stiffness: 200,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(N - 1, Math.max(0, Math.floor(latest * N)));
    setActive(idx);
  });

  // FIX 4: Per-feature progress bar heights as MotionValues, NOT React state.
  // These pipe directly into style.height, bypassing React's render cycle entirely.
  // The old approach called setProgress on every scroll frame → re-render → new
  // animate value → Framer Motion restarts a 0.1s animation → stutter.
  // Now: zero React re-renders for bar fill. Must be declared at top-level (no map).
  const bar0 = useTransform(scrollYProgress, [0 / N, 1 / N], ['0%', '100%']);
  const bar1 = useTransform(scrollYProgress, [1 / N, 2 / N], ['0%', '100%']);
  const bar2 = useTransform(scrollYProgress, [2 / N, 3 / N], ['0%', '100%']);
  const featureBars = [bar0, bar1, bar2];

  // Card entrance animations (desktop sticky panel)
  const cardX = useTransform(scrollYProgress, [0, 0.45], ['120px', '0px']);
  const cardY = useTransform(scrollYProgress, [0, 1], ['60px', '-60px']);
  const cardRotate = useTransform(scrollYProgress, [0, 0.45], [3, 0]);

  return (
    <section
      ref={containerRef}
      className={cn('relative bg-black px-6 text-white border-t border-white/6 ', className)}
      style={{ minHeight: `${SECTION_VH}vh` }}
    >
      <div className="mx-auto max-w-7xl pt-32 pb-0">
        <div className="mb-24 text-start">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/30 uppercase">
            The Infrastructure
          </p>
          <h2 className="text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.15]">
            Your unfair advantage, <br />
            <span className="text-white/40 font-normal">built in three layers</span>
          </h2>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
          style={{ minHeight: `${GRID_VH}vh` }}
        >
          {/* ── Left: Feature list ── */}
          <div className="flex flex-col h-full">
            {FEATURES.map((feature, i) => {
              const isActive = active === i;
              const isPast = i < active;

              return (
                <div
                  key={i}
                  className={cn(
                    'relative flex flex-1 gap-6 py-12 transition-all duration-500 cursor-pointer',
                    i < FEATURES.length - 1 && 'border-b border-white/6'
                  )}
                  onClick={() => {
                    if (containerRef.current) {
                      const sectionTop =
                        containerRef.current.getBoundingClientRect().top + window.scrollY;
                      const sectionHeight = containerRef.current.offsetHeight;
                      const targetScroll =
                        sectionTop +
                        (i / N) * (sectionHeight - window.innerHeight * 0.3);
                      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                    }
                  }}
                >
                  {/* Progress bar column */}
                  <div className="relative flex flex-col items-center shrink-0 w-[2px]">
                    <div className="absolute inset-0 w-full rounded-full bg-white/5" />

                    {/* FIX 4 cont'd: height driven by MotionValue via style, not animate */}
                    <motion.div
                      className="absolute top-0 left-0 w-full rounded-full origin-top"
                      style={{
                        backgroundColor: feature.color,
                        height: featureBars[i],
                      }}
                      animate={{ opacity: isPast || isActive ? 1 : 0 }}
                      transition={{ opacity: { duration: 0.3 } }}
                    />

                    <motion.div
                      className="relative z-10 mt-2 size-2 rounded-full border"
                      animate={{
                        borderColor:
                          isActive || isPast ? feature.color : 'rgba(255,255,255,0.12)',
                        backgroundColor:
                          isActive || isPast ? feature.color : 'rgba(0,0,0,0)',
                        scale: isActive ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Feature text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={cn(
                          'flex size-8 items-center justify-center rounded-lg border transition-all duration-500',
                          isActive ? 'border-white/10' : 'border-white/4'
                        )}
                        style={{
                          backgroundColor: isActive
                            ? `${feature.color}08`
                            : 'rgba(0,0,0,0)',
                        }}
                      >
                        <feature.icon
                          className="size-3.5 transition-colors duration-500"
                          style={{
                            color: isActive ? feature.color : 'rgba(255,255,255,0.15)',
                          }}
                        />
                      </div>
                      <span
                        className={cn(
                          'font-mono text-[10px] tracking-widest transition-colors duration-500',
                          isActive ? 'text-white/45' : 'text-white/15'
                        )}
                      >
                        LAYER {feature.step}
                      </span>
                    </div>

                    <h3
                      className={cn(
                        'text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-500 mb-3',
                        isActive ? 'text-white' : 'text-white/15'
                      )}
                    >
                      {feature.title}
                    </h3>

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm leading-relaxed text-white/40 mb-6 max-w-lg">
                            {feature.description}
                          </p>
                          <ul className="space-y-3 mb-5">
                            {feature.bullets.map((bullet, bi) => (
                              <motion.li
                                key={bi}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: bi * 0.06 }}
                                className="flex items-center gap-3 text-xs text-white/35"
                              >
                                <div
                                  className="size-1 rounded-full shrink-0"
                                  style={{ backgroundColor: `${feature.color}60` }}
                                />
                                {bullet}
                              </motion.li>
                            ))}
                          </ul>
                          <div className="flex items-center gap-1.5 text-xs font-medium text-white/40 group/link cursor-pointer hover:text-white/60 transition-colors w-fit">
                            <span>Learn more about {feature.badge.toLowerCase()}</span>
                            <ChevronRight className="size-3 transition-transform group-hover/link:translate-x-0.5" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Right: Sticky image card (desktop) ── */}
          <div className="relative hidden lg:block">
            <div className="sticky top-32">
              <motion.div
                style={{ x: cardX, y: cardY, rotate: cardRotate, transformOrigin: 'center center' }}
                className="overflow-hidden rounded-2xl border border-white/6 bg-[#0a0a0a]"
              >
                <div className="relative h-[550px] w-full overflow-hidden">
                  {/* FIX 5: Removed mode="wait" so images crossfade instead of
                      sequencing (exit fully → then enter). Also dropped the scale
                      transform which compounded the jank. Plain opacity crossfade. */}
                  <AnimatePresence>
                    <motion.img
                      key={FEATURES[active].image}
                      src={FEATURES[active].image}
                      alt={FEATURES[active].title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="absolute inset-0 h-full w-full object-cover"
                      draggable={false}
                    />
                  </AnimatePresence>

                  <div className="absolute bottom-6 left-6 pointer-events-none">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-black/60 backdrop-blur-md"
                      >
                        <div
                          className="flex size-5 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${FEATURES[active].color}12` }}
                        >
                          {React.createElement(FEATURES[active].icon, {
                            className: 'size-3',
                            style: { color: FEATURES[active].color },
                          })}
                        </div>
                        <span className="text-white/80 text-[11px] font-medium tracking-tight">
                          {FEATURES[active].badge}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Mobile image ── */}
          <div className="lg:hidden relative overflow-hidden rounded-xl border border-white/6 bg-[#0a0a0a]">
            <div className="relative h-[280px] sm:h-[350px] w-full overflow-hidden">
              <AnimatePresence>
                <motion.img
                  key={FEATURES[active].image}
                  src={FEATURES[active].image}
                  alt={FEATURES[active].title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
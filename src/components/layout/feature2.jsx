'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
    motion,
    useInView,
    useScroll,
    useTransform,
} from 'framer-motion';

import {
    Monitor,
    Video,
    Users,
    Presentation,
    Mic,
    Shield,
    Zap,
    Eye,
} from 'lucide-react';

const PLATFORMS = [
    {
        label: 'Google Meet',
        accent: '#8b5cf6',
        img: '/images/interview-2.png',
        icon: Video,
        title: 'Built for modern remote interviews',
        description:
            'GhostInterview integrates directly into Google Meet sessions with instant AI-assisted interview support.',
    },
    {
        label: 'Zoom',
        accent: '#8b5cf6',
        img: '/images/interview-3.png',
        icon: Monitor,
        title: 'Ultra-fast response generation',
        description:
            'Get real-time contextual answers with near-zero latency during technical and behavioral interviews.',
    },
    {
        label: 'Microsoft Teams',
        accent: '#8b5cf6',
        img: '/images/interview-1.png',
        icon: Users,
        title: 'Enterprise ready compatibility',
        description:
            'Works seamlessly with Microsoft Teams for enterprise recruiting environments and remote hiring.',
    },
    {
        label: 'Webex',
        accent: '#8b5cf6',
        img: '/images/interview-4.png',
        icon: Presentation,
        title: 'Invisible interview assistance',
        description:
            'Undetectable overlay architecture designed for smooth interview experiences across Webex meetings.',
    },
];

const CAPABILITIES = [
    {
        icon: Mic,
        title: 'Real-Time Transcription',
        description:
            'Accurate multilingual transcription with instant AI understanding.',
    },
    {
        icon: Shield,
        title: 'Invisible Detection',
        description:
            'Designed to stay hidden from monitoring and screen-sharing systems.',
    },
    {
        icon: Zap,
        title: 'Instant AI Answers',
        description: 'Receive intelligent contextual responses in real time.',
    },
    {
        icon: Eye,
        title: 'Context Awareness',
        description:
            'AI understands the full interview flow and adapts dynamically.',
    },
];

const CapabilityCard = ({ capability, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.08 }}
            whileHover={{
                y: -5,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
            className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-7"
        >
            <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background:
                        'radial-gradient(circle at top left, rgba(139,92,246,0.15), transparent 60%)',
                }}
            />
            <div className="relative z-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#8b5cf6]/10 text-[#8b5cf6]">
                    <capability.icon className="size-5" />
                </div>
                <h3 className="mb-3 text-lg font-medium text-white">
                    {capability.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/45">
                    {capability.description}
                </p>
            </div>
        </motion.div>
    );
};

const PlatformStory = () => {
    const containerRef = useRef(null);
    const [current, setCurrent] = useState(0);
    const count = PLATFORMS.length;

    /*
     * FIX 1 — correct scroll offset.
     * 'end start' means progress hits 1.0 when the *bottom* of the
     * section reaches the *top* of the viewport, so the entire
     * 400 vh of content drives the animation before it scrolls away.
     * The original 'end end' fired too early, cutting off the last platform.
     */
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    /*
     * FIX 2 — evenly distribute scroll range across all platforms.
     * Each platform gets an equal 1/count slice of scroll progress.
     * The last input value stops slightly before 1.0 so the final
     * platform has a full dwell period rather than a single frame.
     */
    const segmentSize = 1 / count;
    const inputRange = PLATFORMS.map((_, i) => i * segmentSize);
    // Cap the last output at count - 1 (not count) so it never rounds up.
    const outputRange = PLATFORMS.map((_, i) => i);

    const activeIndex = useTransform(scrollYProgress, inputRange, outputRange, {
        clamp: true,
    });

    useEffect(() => {
        return activeIndex.on('change', (latest) => {
            // Use floor instead of round: a platform activates as soon as its
            // slice begins, and only gives way at the next exact boundary.
            setCurrent(Math.min(Math.floor(latest + 0.1), count - 1));
        });
    }, [activeIndex, count]);

    return (
        /*
         * FIX 3 — height must be strictly larger than the sticky viewport
         * to create scrollable room.  400 vh for 4 platforms (100 vh each).
         */
        <section ref={containerRef} className="relative h-[400vh] bg-black">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-20 px-6 lg:grid-cols-2">

                    {/* LEFT CONTENT
                        FIX 4 — the original container had no height, so all the
                        absolutely-positioned children collapsed to 0 px and were
                        invisible.  Adding an explicit h-[420px] gives them a
                        containing block to sit inside.
                    */}
                    <div className="relative flex flex-col justify-center">
                        <div className="relative h-[420px]">
                            {PLATFORMS.map((item, index) => {
                                const active = current === index;

                                return (
                                    <motion.div
                                        key={index}
                                        /*
                                         * FIX 5 — use animate with a visible pointer-events
                                         * guard so inactive slides don't intercept clicks.
                                         */
                                        animate={{
                                            opacity: active ? 1 : 0,
                                            y: active ? 0 : 30,
                                            pointerEvents: active ? 'auto' : 'none',
                                        }}
                                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute inset-0 flex flex-col justify-center"
                                    >
                                        <div
                                            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2"
                                            style={{ color: item.accent }}
                                        >
                                            <item.icon className="size-4" />
                                            <span className="text-xs uppercase tracking-[0.2em]">
                                                {item.label}
                                            </span>
                                        </div>

                                        <h2 className="mb-6 text-5xl font-medium leading-[1.05] tracking-tight text-white">
                                            {item.title}
                                        </h2>

                                        <p className="text-lg leading-relaxed text-white/45">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Progress dots — visual feedback for scroll position */}
                        <div className="mt-8 flex gap-2">
                            {PLATFORMS.map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        width: current === i ? 24 : 6,
                                        opacity: current === i ? 1 : 0.3,
                                    }}
                                    transition={{ duration: 0.35 }}
                                    className="h-1.5 rounded-full bg-[#8b5cf6]"
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative flex items-center justify-center">
                        <div className="relative h-[560px] max-h-[620px] w-full max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-white/3 shadow-2xl">
                            {PLATFORMS.map((item, index) => {
                                const active = current === index;

                                return (
                                    <motion.div
                                        key={index}
                                        initial={false}
                                        animate={{
                                            opacity: active ? 1 : 0,
                                            scale: active ? 1 : 1.08,
                                            filter: active ? 'blur(0px)' : 'blur(20px)',
                                        }}
                                        transition={{
                                            opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                                            scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                                            filter: { duration: 0.9 },
                                        }}
                                        className="absolute inset-0"
                                    >
                                        <div className="relative h-full w-full overflow-hidden">
                                            <motion.img
                                                src={item.img}
                                                alt={item.label}
                                                animate={{ scale: active ? 1 : 1.12 }}
                                                transition={{ duration: 6, ease: 'easeOut' }}
                                                className="h-full w-full object-cover"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                            <motion.div
                                                animate={{
                                                    opacity: active ? 1 : 0,
                                                    y: active ? 0 : 30,
                                                }}
                                                transition={{ duration: 0.7, delay: 0.2 }}
                                                className="absolute bottom-0 left-0 p-8"
                                            >
                                                <div
                                                    className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-xl"
                                                    style={{ color: item.accent }}
                                                >
                                                    <item.icon className="size-4" />
                                                    <span className="text-xs uppercase tracking-[0.2em]">
                                                        {item.label}
                                                    </span>
                                                </div>

                                                <h3 className="mb-3 text-3xl font-medium text-white">
                                                    {item.label}
                                                </h3>

                                                <p className="max-w-md text-sm leading-relaxed text-white/70">
                                                    {item.description}
                                                </p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Feature2 = () => {
    return (
        <>
            <section className="relative bg-black">
                <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-16">
                    <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white/30">
                        Platform Compatibility
                    </p>
                    <h2 className="max-w-5xl text-5xl font-medium leading-none tracking-tight text-white md:text-7xl">
                        A cinematic interview
                        <span className="block text-white/40">
                            assistance experience
                        </span>
                    </h2>
                    <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/45">
                        Scroll through a fully immersive product storytelling
                        experience designed for modern AI-powered interview workflows.
                    </p>
                </div>
            </section>

            <PlatformStory />

            <section className="relative overflow-hidden bg-black">
                <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-20">
                    <div className="mb-16">
                        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-white/30">
                            Core Capabilities
                        </p>
                        <h2 className="text-4xl font-medium tracking-tight text-white md:text-5xl">
                            Engineered for
                            <span className="block text-white/40">
                                seamless interview performance
                            </span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {CAPABILITIES.map((capability, index) => (
                            <CapabilityCard
                                key={index}
                                capability={capability}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Feature2;
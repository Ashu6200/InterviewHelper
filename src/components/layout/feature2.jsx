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
import { Badge } from '@/components/ui/badge';

const PLATFORMS = [
    {
        label: 'Google Meet',
        accent: '#C4D9FF',
        img: '/images/interview-2.png',
        icon: Video,
        title: 'Built for modern remote interviews',
        description:
            'GhostInterview integrates seamlessly with Google Meet to deliver real-time AI-powered interview assistance, helping candidates respond confidently during technical, behavioral, and system design discussions without interrupting the interview flow.',
    },
    {
        label: 'Zoom',
        accent: '#C4D9FF',
        img: '/images/interview-3.png',
        icon: Monitor,
        title: 'Ultra-fast response generation',
        description:
            'Generate highly contextual answers instantly with low-latency AI support designed for live Zoom interviews, enabling smoother communication, faster thinking, and improved performance under pressure.',
    },
    {
        label: 'Microsoft Teams',
        accent: '#C4D9FF',
        img: '/images/interview-1.png',
        icon: Users,
        title: 'Enterprise ready compatibility',
        description:
            'Optimized for Microsoft Teams environments, GhostInterview supports enterprise-level remote hiring workflows with reliable AI assistance tailored for professional recruiting and corporate interview processes.',
    },
    {
        label: 'Webex',
        accent: '#C4D9FF',
        img: '/images/interview-4.png',
        icon: Presentation,
        title: 'Invisible interview assistance',
        description:
            'Designed with a distraction-free overlay system, GhostInterview provides subtle and undetectable AI guidance during Webex meetings, ensuring a natural interview experience while maintaining candidate focus and confidence.',
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
            className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/3 p-7"
        >
            <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background:
                        'radial-gradient(circle at top left, rgba(139,92,246,0.15), transparent 60%)',
                }}
            />
            <div className="relative z-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#C4D9FF]/10 text-[#C4D9FF]">
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

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'], // ✅ Fix #2: covers exact sticky range
    });

    // ✅ Simplified — no useTransform needed
    useEffect(() => {
        return scrollYProgress.on('change', (v) => {
            const idx = Math.min(Math.floor(v * count), count - 1);
            setCurrent(Math.max(0, idx));
        });
    }, [scrollYProgress, count]);

    return (

        <section ref={containerRef} className="relative h-[300vh] md:h-[400vh] xl:h-[500vh]  bg-black">
            <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
                <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 md:gap-20 px-6 lg:grid-cols-2">

                    {/* LEFT TEXT */}
                    <div className="relative flex flex-col justify-center">
                        <div className="relative h-[180px] sm:h-[220px] md:h-[420px]">
                            {PLATFORMS.map((item, index) => {
                                const active = current === index;
                                return (
                                    <motion.div
                                        key={index}
                                        animate={{
                                            opacity: active ? 1 : 0,
                                            y: active ? 0 : 30,
                                            pointerEvents: active ? 'auto' : 'none',
                                        }}
                                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute inset-0 flex flex-col justify-center"
                                    >
                                        <h2 className="mb-3 md:mb-6 text-3xl md:text-5xl font-medium leading-[1.05] tracking-tight text-white">
                                            {item.title}
                                        </h2>
                                        <p className="text-xs md:text-base leading-relaxed text-white/45 max-w-2xl font-normal tracking-tight">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="mt-4 md:mt-8 flex gap-2">
                            {PLATFORMS.map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        width: current === i ? 24 : 6,
                                        opacity: current === i ? 1 : 0.3,
                                    }}
                                    transition={{ duration: 0.35 }}
                                    className="h-1.5 rounded-full bg-[#C4D9FF]"
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative flex items-center justify-center">
                        <div className="relative h-[250px] sm:h-[350px] md:h-[560px] max-h-[620px] w-full max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-white/3 shadow-2xl">
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
                                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                                            <motion.div
                                                animate={{
                                                    opacity: active ? 1 : 0,
                                                    y: active ? 0 : 30,
                                                }}
                                                transition={{ duration: 0.7, delay: 0.2 }}
                                                className="absolute bottom-0 left-0 p-8"
                                            >
                                                <Badge
                                                    variant="outline"
                                                    className="mb-4 h-auto gap-2 rounded-full border-white/10 bg-black/30 px-4 py-2 backdrop-blur-xl text-xs font-normal tracking-[0.2em] [&>svg]:size-4!"
                                                    style={{ color: item.accent }}
                                                >
                                                    <item.icon className="size-4" />
                                                    {item.label}
                                                </Badge>
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
// const PlatformStory = () => {
//     const containerRef = useRef(null);
//     const [current, setCurrent] = useState(0);
//     const count = PLATFORMS.length;

//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         offset: ['start start', 'end start'],
//     });

//     const segmentSize = 1 / count;
//     const inputRange = PLATFORMS.map((_, i) => i * segmentSize);
//     const outputRange = PLATFORMS.map((_, i) => i);

//     const activeIndex = useTransform(scrollYProgress, inputRange, outputRange, {
//         clamp: true,
//     });

//     useEffect(() => {
//         return activeIndex.on('change', (latest) => {
//             setCurrent(Math.min(Math.floor(latest + 0.1), count - 1));
//         });
//     }, [activeIndex, count]);

//     return (
//         <section ref={containerRef} className="relative h-[500vh] overflow-x-hidden bg-black">
//             <div className="sticky top-0 flex h-screen items-center overflow-hidden">
//                 <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 md:gap-20 px-6 lg:grid-cols-2">
//                     <div className="relative flex flex-col justify-center">
//                         <div className="relative h-[180px] sm:h-[220px] md:h-[420px]">
//                             {PLATFORMS.map((item, index) => {
//                                 const active = current === index;

//                                 return (
//                                     <motion.div
//                                         key={index}
//                                         animate={{
//                                             opacity: active ? 1 : 0,
//                                             y: active ? 0 : 30,
//                                             pointerEvents: active ? 'auto' : 'none',
//                                         }}
//                                         transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//                                         className="absolute inset-0 flex flex-col justify-center"
//                                     >
//                                         <h2 className="mb-3 md:mb-6 text-3xl md:text-5xl font-medium leading-[1.05] tracking-tight text-white">
//                                             {item.title}
//                                         </h2>

//                                         <p className="text-xs md:text-base leading-relaxed text-white/45 max-w-2xl font-normal tracking-tight">
//                                             {item.description}
//                                         </p>
//                                     </motion.div>
//                                 );
//                             })}
//                         </div>

//                         <div className="mt-4 md:mt-8 flex gap-2">
//                             {PLATFORMS.map((_, i) => (
//                                 <motion.div
//                                     key={i}
//                                     animate={{
//                                         width: current === i ? 24 : 6,
//                                         opacity: current === i ? 1 : 0.3,
//                                     }}
//                                     transition={{ duration: 0.35 }}
//                                     className="h-1.5 rounded-full bg-[#C4D9FF]"
//                                 />
//                             ))}
//                         </div>
//                     </div>

//                     {/* RIGHT IMAGE */}
//                     <div className="relative flex items-center justify-center">
//                         <div className="relative h-[250px] sm:h-[350px] md:h-[560px] max-h-[620px] w-full max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-white/3 shadow-2xl">
//                             {PLATFORMS.map((item, index) => {
//                                 const active = current === index;

//                                 return (
//                                     <motion.div
//                                         key={index}
//                                         initial={false}
//                                         animate={{
//                                             opacity: active ? 1 : 0,
//                                             scale: active ? 1 : 1.08,
//                                             filter: active ? 'blur(0px)' : 'blur(20px)',
//                                         }}
//                                         transition={{
//                                             opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
//                                             scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
//                                             filter: { duration: 0.9 },
//                                         }}
//                                         className="absolute inset-0"
//                                     >
//                                         <div className="relative h-full w-full overflow-hidden">
//                                             <motion.img
//                                                 src={item.img}
//                                                 alt={item.label}
//                                                 animate={{ scale: active ? 1 : 1.12 }}
//                                                 transition={{ duration: 6, ease: 'easeOut' }}
//                                                 className="h-full w-full object-cover"
//                                             />

//                                             <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

//                                             <motion.div
//                                                 animate={{
//                                                     opacity: active ? 1 : 0,
//                                                     y: active ? 0 : 30,
//                                                 }}
//                                                 transition={{ duration: 0.7, delay: 0.2 }}
//                                                 className="absolute bottom-0 left-0 p-8"
//                                             >
//                                                 <Badge
//                                                     variant="outline"
//                                                     className="mb-4 h-auto gap-2 rounded-full border-white/10 bg-black/30 px-4 py-2 backdrop-blur-xl text-xs font-normal tracking-[0.2em] [&>svg]:size-4!"
//                                                     style={{ color: item.accent }}
//                                                 >
//                                                     <item.icon className="size-4" />
//                                                     {item.label}
//                                                 </Badge>
//                                             </motion.div>
//                                         </div>
//                                     </motion.div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

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
                    <p className="mt-8 max-w-2xl text-sm md:text-base leading-relaxed text-white/45 font-normal tracking-tight">
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
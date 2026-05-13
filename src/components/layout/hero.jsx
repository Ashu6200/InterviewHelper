'use client';

import React, { useState } from 'react';

const CARDS = [
  { label: 'Google Meet', accent: '#6366f1', img: '/images/preview-2.png' },
  { label: 'Zoom', accent: '#8b5cf6', img: '/images/preview-3.png' },
  { label: 'Microsoft Teams', accent: '#06b6d4', img: '/images/preview-1.png' },
  { label: 'Webex', accent: '#f59e0b', img: '/images/preview-4.png' },
];

const CARD_PEEK = 80;
const CARD_WIDTH = 820;
const CARD_HEIGHT = 460;

const Hero = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className='relative overflow-hidden py-12 md:py-24 mx-auto max-w-7xl'>
      <div
        className='absolute top-[-20px] left-0 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0'
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(99,102,241,0.3) 0%, rgba(139,92,246,0.14) 35%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className='relative z-10 text-start mt-28'>
        <h1 className='font-semibold leading-[1.05] tracking-[-0.04em] text-white mb-6 max-w-3xl'>
          <span className='block text-[clamp(24px,6.5vw,48px)]'>
            Built to help you think faster during high-pressure interviews.
          </span>
        </h1>

        <div className='flex items-end justify-between gap-4'>
          <p className='text-[clamp(10px,1.8vw,16px)] leading-relaxed text-white/45 max-w-3xl font-normal tracking-[-0.01em]'>
            From coding challenges to system design questions, the app listens,
            analyzes, and responds instantly through a private on-screen
            overlay.
            <br /> Lightweight, fast, and designed for seamless interview
            support.
          </p>
          <a
            href='#'
            className='inline-flex items-center justify-center py-2.5 px-7 rounded-full bg-white text-black text-sm font-medium no-underline tracking-[-0.01em] transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:-translate-y-px whitespace-nowrap'
          >
            Try It Now
          </a>
        </div>
      </div>

      <div className='relative mt-20 flex flex-col items-center'>
        <div
          className='relative max-w-full'
          style={{
            width: CARD_WIDTH + (CARDS.length - 1) * CARD_PEEK,
            height: CARD_HEIGHT + 60,
          }}
        >
          {CARDS.map((card, index) => {
            const isHov = hovered === index;
            const offsetX = index * CARD_PEEK;

            return (
              <div
                key={index}
                className='absolute left-0 top-[30px] cursor-pointer transition-transform duration-450'
                style={{
                  transform: isHov
                    ? `translateX(${offsetX}px) translateY(-18px) scale(1.025)`
                    : `translateX(${offsetX}px) translateY(0px) scale(1)`,
                  zIndex: isHov ? 50 : CARDS.length - index,
                  transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)',
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className='relative overflow-hidden rounded-[20px] bg-[#0a0a0a] transition-[box-shadow,border-color] duration-400 ease-out'
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    border: isHov
                      ? `1.5px solid ${card.accent}55`
                      : '1px solid rgba(255,255,255,0.07)',
                    boxShadow: isHov
                      ? `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${card.accent}33, 0 8px 32px ${card.accent}22`
                      : '0 18px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.label}
                    draggable={false}
                    className='w-full h-full object-cover pointer-events-none select-none block'
                  />

                  {/* Label chip — fades in on hover */}
                  <div
                    className='absolute top-3.5 right-4 rounded-full py-1 px-3 text-[10px] uppercase tracking-[2px] pointer-events-none backdrop-blur-sm transition-all duration-300 ease-out'
                    style={{
                      background: `${card.accent}22`,
                      border: `1px solid ${card.accent}44`,
                      color: card.accent,
                      opacity: isHov ? 1 : 0,
                      transform: isHov ? 'translateY(0)' : 'translateY(-6px)',
                    }}
                  >
                    {card.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className='w-full h-20 -mt-5 pointer-events-none'
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)',
          }}
        />
      </div>
    </section>
  );
};

export default Hero;

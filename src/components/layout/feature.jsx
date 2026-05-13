'use client';

import { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  LayoutDashboard,
  Ghost,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
const LayerCard = ({
  step,
  icon: Icon,
  title,
  badge,
  description,
  bullets,
  imageSrc,
  imageAlt,
  isOpen,
  onToggle,
  isLast,
}) => {
  return (
    <div className='relative flex gap-6'>
      <div className='relative flex flex-col items-center'>
        <button
          onClick={onToggle}
          className={cn(
            'relative z-10 flex size-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 cursor-pointer',
            isOpen
              ? 'border-white/20 bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.06)]'
              : 'border-white/8 bg-white/3 text-white/30 hover:border-white/15 hover:bg-white/6 hover:text-white/50',
          )}
        >
          <Icon className='size-5' />
        </button>

        {!isLast && (
          <div
            className={cn(
              'w-px flex-1 transition-colors duration-300',
              isOpen
                ? 'bg-linear-to-b from-white/15 to-transparent'
                : 'bg-white/6',
            )}
          />
        )}
      </div>

      <div className='flex-1 pb-12'>
        <button
          onClick={onToggle}
          className='group flex w-full cursor-pointer items-center gap-3 text-left'
        >
          <div className='flex-1'>
            <div className='flex items-center gap-3'>
              <span
                className={cn(
                  'font-mono text-xs tracking-widest transition-colors',
                  isOpen ? 'text-white/30' : 'text-white/15',
                )}
              >
                0{step}
              </span>
              <span
                className={cn(
                  'rounded-full border px-2.5 py-0.5 text-[10px] tracking-widest uppercase transition-colors',
                  isOpen
                    ? 'border-white/15 text-white/45'
                    : 'border-white/6 text-white/20',
                )}
              >
                {badge}
              </span>
            </div>
            <h3
              className={cn(
                'mt-1.5 text-xl font-semibold tracking-tight transition-colors md:text-2xl',
                isOpen ? 'text-white' : 'text-white/35',
              )}
            >
              {title}
            </h3>
          </div>

          <ChevronDown
            className={cn(
              'size-4 shrink-0 transition-all duration-300',
              isOpen
                ? 'rotate-180 text-white/40'
                : 'rotate-0 text-white/15 group-hover:text-white/30',
            )}
          />
        </button>

        <div
          className={cn(
            'grid transition-all duration-500 ease-in-out',
            isOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className='overflow-hidden'>
            <p className='mt-4 max-w-xl text-sm leading-relaxed text-white/45 md:text-base md:leading-relaxed'>
              {description}
            </p>

            <ul className='mt-5 space-y-2.5'>
              {bullets.map((bullet, i) => (
                <li
                  key={i}
                  className='flex items-start gap-2.5 text-sm text-white/40'
                >
                  <span className='mt-2 size-1 shrink-0 rounded-full bg-white/25' />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className='mt-6 overflow-hidden rounded-xl border border-white/8 bg-white/3'>
              <div className='relative aspect-video'>
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className='h-full w-full object-cover'
                />
                <div className='absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent' />
                <div className='absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 backdrop-blur-md'>
                  <span className='size-1.5 rounded-full bg-emerald-400 animate-pulse' />
                  <span className='text-xs text-white/60'>{badge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ className }) => {
  const [openLayer, setOpenLayer] = useState(1);

  const toggle = (step) =>
    setOpenLayer((prev) => (prev === step ? null : step));

  return (
    <section
      className={cn(
        'relative overflow-hidden px-6 py-12 mx-auto max-w-7xl md:py-24',
        className,
      )}
    >
      <div className='mx-auto text-start max-w-7xl'>
        <div className='mb-12 lg:mb-16'>
          <p className='mb-3 text-sm font-medium tracking-widest text-white/40 uppercase'>
            How it works
          </p>
          <h2 className='mb-4 text-3xl font-semibold tracking-tight text-balance text-white md:text-4xl lg:text-5xl'>
            Your unfair advantage,{' '}
            <span className='text-white/50'>built in three layers</span>
          </h2>
          <p className='max-w-2xl text-white/40 lg:text-lg'>
            From secure login to a ghost overlay only you can see — every layer
            is designed to keep you calm, sharp, and one step ahead.
          </p>
        </div>

        <div className='relative'>
          <LayerCard
            step={1}
            icon={ShieldCheck}
            title='The Secure Entry'
            badge='ID Badge'
            description='Before the app even starts, it requires a secure login — ensuring only the authorized user can access their personal interview settings and credits. Hardware fingerprinting verifies the specific machine, so your account can never be shared or misused.'
            bullets={[
              'Secure credential-based login',
              'Hardware fingerprint verification',
              'Account sharing prevention',
            ]}
            imageSrc='/images/feature-login.png'
            imageAlt='Secure login screen'
            isOpen={openLayer === 1}
            onToggle={() => toggle(1)}
            isLast={false}
          />
          <LayerCard
            step={2}
            icon={LayoutDashboard}
            title='Setting the Stage'
            badge='Dashboard'
            description='Once inside, the Command Center lets you configure everything before the interview starts. Pick your target role, dial in the exact technologies the interviewer will ask about, and choose how you want the AI to assist — automatic or on-demand.'
            bullets={[
              'Role picker — Senior Dev, Lead Manager, and more',
              'Tech stack targeting (React Native, Python, etc.)',
              'Auto-answer or manual trigger mode',
            ]}
            imageSrc='/images/feature-dashboard.png'
            imageAlt='Interview command center dashboard'
            isOpen={openLayer === 2}
            onToggle={() => toggle(2)}
            isLast={false}
          />
          <LayerCard
            step={3}
            icon={Ghost}
            title='The Ghost Companion'
            badge='Overlay'
            description='During the interview, a transparent overlay appears on your screen — completely invisible to anyone watching via Zoom or Teams. It listens in real-time, transcribes every word, and surfaces the perfect answer with bullet-point summaries and detailed explanations.'
            bullets={[
              'Screen-capture invisible overlay',
              'Real-time voice transcription & instant AI answers',
              'Screenshot-to-solution with a single shortcut key',
            ]}
            imageSrc='/images/feature-overlay.png'
            imageAlt='Transparent overlay during interview'
            isOpen={openLayer === 3}
            onToggle={() => toggle(3)}
            isLast={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Feature;

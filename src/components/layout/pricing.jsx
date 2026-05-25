'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, Zap, Building2, Rocket, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' });

  const plans = [
    {
      name: 'Starter',
      icon: Rocket,
      price: 'Free',
      annualPrice: 'Free',
      period: '',
      description:
        'Perfect for first-time users preparing for upcoming interviews. Get a feel for the platform.',
      features: [
        '3 interview sessions/month',
        '1 active platform (Google Meet)',
        'Basic AI response mode',
        'Standard transcription accuracy',
        'Community Discord access',
        'Email support (48hr response)',
      ],
      cta: 'Start for free',
      highlighted: false,
      accent: '#a78bfa',
    },
    {
      name: 'Pro',
      icon: Zap,
      price: '$49',
      annualPrice: '$39',
      period: '/mo',
      description:
        'For serious candidates targeting FAANG and top-tier companies. Maximum AI power.',
      features: [
        'Unlimited interview sessions',
        'All platforms (Meet, Zoom, Teams, Webex)',
        'Advanced AI with GPT-4 + Claude',
        '98.5% transcription accuracy',
        'Screenshot-to-solution (instant)',
        'Custom role & tech stack profiles',
        'Priority support (4hr response)',
        'Session recording & playback',
      ],
      cta: 'Start free trial',
      highlighted: true,
      accent: '#C4D9FF',
    },
    {
      name: 'Enterprise',
      icon: Building2,
      price: 'Custom',
      annualPrice: 'Custom',
      period: '',
      description:
        'For recruiting agencies and career coaching organizations at scale.',
      features: [
        'Everything in Pro',
        'Unlimited team seats',
        'Dedicated AI model fine-tuning',
        'Custom API & webhook integrations',
        'Admin dashboard & analytics',
        'SSO / SAML authentication',
        'Dedicated account manager',
        'Custom SLA (99.99% uptime)',
      ],
      cta: 'Contact sales',
      highlighted: false,
      accent: '#6366f1',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 md:py-32 px-6 md:px-12 bg-black overflow-hidden relative border-t border-white/6"
    >
      <div className="max-w-7xl mx-auto flex flex-col relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/30 uppercase">
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 tracking-tight text-start leading-[1.15]">
            Simple, transparent <span className="text-white/40 font-normal">pricing</span>
          </h2>
          <p className="text-white/45 text-xs md:text-sm max-w-xl leading-relaxed mb-12">
            No hidden fees. No surprise charges. Choose the plan that fits your
            interview preparation needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-4 mb-16"
        >
          <span
            className={cn(
              'text-xs transition-colors duration-300',
              !isAnnual ? 'text-white' : 'text-white/40'
            )}
          >
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-checked:bg-white data-unchecked:bg-white/20"
          />
          <span
            className={cn(
              'text-xs transition-colors duration-300 flex items-center gap-2',
              isAnnual ? 'text-white' : 'text-white/40'
            )}
          >
            Annual
            <span className="text-[10px] font-semibold text-white bg-white/10 border border-white/20 rounded-full px-2.5 py-0.5">
              Save 20%
            </span>
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative group"
            >
              {plan.highlighted && (
                <>
                  <div className="absolute -inset-px rounded-[inherit] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_60%)] pointer-events-none" />
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                  >
                    <span className="bg-[#C4D9FF] text-white px-3.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                      Most Popular
                    </span>
                  </motion.div>
                </>
              )}

              <Card
                className={cn(
                  'h-full flex flex-col transition-all duration-300 border-white/6 bg-white/1.5 backdrop-blur-sm overflow-hidden',
                  plan.highlighted
                    ? 'border-white/15 bg-white/3'
                    : 'hover:bg-white/3 hover:border-white/10'
                )}
              >
                <CardHeader className="pt-8 px-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex size-8 items-center justify-center rounded-lg border border-white/6"
                      style={{ backgroundColor: `${plan.accent}12` }}
                    >
                      <plan.icon
                        className="size-4"
                        style={{ color: plan.accent }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                      {plan.name}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isAnnual ? plan.annualPrice : plan.price}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                        className="text-3xl md:text-4xl font-bold tracking-tight text-white"
                      >
                        {isAnnual ? plan.annualPrice : plan.price}
                      </motion.span>
                    </AnimatePresence>
                    {plan.period && (
                      <span className="text-white/40 text-xs">{plan.period}</span>
                    )}
                  </div>

                  <CardDescription className="text-white/40 mt-4 text-xs leading-relaxed">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="grow px-8 py-6 border-t border-white/4 mt-4">
                  <ul className="space-y-4">
                    {plan.features.map((feature, fi) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-xs text-white/50"
                      >
                        <Check
                          className="w-3.5 h-3.5 mt-0.5 shrink-0"
                          style={{ color: plan.accent }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="px-8 pb-8">
                  <Button
                    className={cn(
                      'w-full rounded-full py-5 transition-all duration-200 font-medium text-xs group h-auto',
                      plan.highlighted
                        ? 'bg-white text-black hover:bg-white/90'
                        : 'bg-white/6 text-white hover:bg-white/10 border border-white/6'
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-1.5 size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-white/20 text-[10px] mt-12 tracking-wider uppercase font-medium"
        >
          All plans include end-to-end encryption and zero-log policy.
          Prices in USD. Taxes may apply.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;

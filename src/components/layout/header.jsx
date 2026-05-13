'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-100 transition-all duration-300 ease-in-out ${
        scrolled
          ? 'backdrop-blur-[20px] backdrop-saturate-180 bg-black/40 border-b border-white/15'
          : 'backdrop-blur-md bg-black/40 border-b border-white/10'
      }`}
    >
      <nav className='mx-auto max-w-7xl flex items-center justify-between py-4'>
        <Link
          href='/'
          className='flex items-center gap-2.5 no-underline text-white shrink-0'
        >
          <span className='text-base font-semibold tracking-[-0.02em]'>
            GhostInterview
          </span>
        </Link>
        <div className='hidden md:flex items-center gap-6 text-[13px]'>
          {['Product', 'Features', 'Pricing', 'Resources', 'About'].map(
            (item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className='text-white/55 no-underline font-normal tracking-[-0.01em] transition-colors duration-200 hover:text-white'
              >
                {item}
              </Link>
            ),
          )}
          <div className='w-px h-[18px] bg-white/12' />
          <Link
            href='/login'
            className='text-white/55 no-underline font-normal  rounded-full transition-colors duration-200 hover:text-white'
          >
            Log in
          </Link>
          <Link
            href='/signup'
            className='bg-white text-black no-underline font-medium py-1.5 px-[18px] rounded-full tracking-[-0.01em] transition-all duration-200 hover:bg-white/85'
          >
            Sign up
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='md:hidden bg-transparent border-none cursor-pointer p-2 text-white'
          aria-label='Toggle menu'
        >
          <svg
            width='22'
            height='22'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
          >
            {mobileMenuOpen ? (
              <>
                <line x1='6' y1='6' x2='18' y2='18' />
                <line x1='6' y1='18' x2='18' y2='6' />
              </>
            ) : (
              <>
                <line x1='4' y1='7' x2='20' y2='7' />
                <line x1='4' y1='12' x2='20' y2='12' />
                <line x1='4' y1='17' x2='20' y2='17' />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden flex flex-col gap-1 pt-3 px-6 pb-6 bg-black/95 border-t border-white/6'>
          {['Product', 'Features', 'Pricing', 'Resources', 'About'].map(
            (item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className='text-white/60 no-underline text-[15px] font-normal py-2.5 border-b border-white/4 transition-colors duration-200 hover:text-white'
              >
                {item}
              </Link>
            ),
          )}
          <div className='flex gap-2.5 mt-3'>
            <Link
              href='/login'
              className='flex-1 text-center text-white/70 no-underline text-sm font-normal p-2.5 rounded-full border border-white/10'
            >
              Log in
            </Link>
            <Link
              href='/signup'
              className='flex-1 text-center bg-white text-black no-underline text-sm font-medium p-2.5 rounded-full'
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

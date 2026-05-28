'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Sparkles, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode, stats } = useApp();

  return (
    <header className="sticky top-0 w-full z-40 bg-white/70 backdrop-blur-md border-b border-neutral-200/50 dark:bg-[#09090b]/75 dark:border-neutral-800/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 font-bold text-white transition-all group-hover:scale-105 group-hover:rotate-3 shadow-lg shadow-rose-600/20">
            N
          </div>
          <div>
            <span className="text-xl font-bold tracking-wider text-neutral-900 dark:text-neutral-50 group-hover:text-rose-600 transition-colors">
              NihonPath
            </span>
            <span className="block text-[10px] tracking-widest text-rose-500 font-bold uppercase">
              日本パス
            </span>
          </div>
        </Link>

        {/* Middle Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/learn" className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
            Methodology
          </Link>
          <Link href="/jlpt" className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
            JLPT Roadmaps
          </Link>
          <Link href="/pricing" className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
            Pricing
          </Link>
          <Link href="/community" className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
            Community
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {stats.isLoggedIn ? (
            <Link
              href="/dashboard"
              className="relative inline-flex items-center justify-center rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-bold shadow-md hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hidden sm:inline-flex text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="relative inline-flex items-center justify-center rounded-xl bg-rose-600 text-white px-4 py-2 text-sm font-bold shadow-md shadow-rose-600/10 hover:bg-rose-500 hover:shadow-rose-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Start Free
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

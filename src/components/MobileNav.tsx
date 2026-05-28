'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Mic, 
  MessageSquareCode, 
  Menu,
  X,
  Flame,
  Settings,
  Trophy,
  User,
  GraduationCap,
  Sparkles,
  Compass
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { stats, toggleDarkMode, darkMode } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const mainTabs = [
    { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Learn', href: '/learn', icon: BookOpen },
    { name: 'Speak', href: '/learn/speaking', icon: Mic },
    { name: 'Tutor', href: '/ai-tutor', icon: MessageSquareCode },
  ];

  const fullMenu = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Learn Modules', href: '/learn', icon: BookOpen },
    { name: 'Speaking Practice', href: '/learn/speaking', icon: Mic },
    { name: 'JLPT Prep', href: '/jlpt', icon: GraduationCap },
    { name: 'AI Tutor', href: '/ai-tutor', icon: MessageSquareCode },
    { name: 'Community', href: '/community', icon: Compass },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Profile', href: `/profile/${stats.name.toLowerCase()}`, icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Bottom Nav Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 border-t border-neutral-200/50 bg-white/80 backdrop-blur-md dark:border-neutral-800/40 dark:bg-[#0c0c0e]/80 flex items-center justify-around px-2 z-30 lg:hidden shadow-lg">
        {mainTabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== '/dashboard' && pathname.startsWith(tab.href));
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-all ${
                isActive 
                  ? 'text-rose-600 dark:text-rose-400 font-bold scale-105' 
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-[10px] tracking-wide">{tab.name}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center gap-1 w-16 h-full text-neutral-500 dark:text-neutral-400"
        >
          <Menu className="h-5 w-5" />
          <span className="text-[10px] tracking-wide">Menu</span>
        </button>
      </div>

      {/* Drawer Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden flex justify-end transition-opacity duration-300">
          <div className="w-80 h-full bg-white dark:bg-[#0c0c0e] p-6 flex flex-col justify-between shadow-2xl relative animate-slide-in">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 font-bold text-white shadow-md">
                    N
                  </div>
                  <div>
                    <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
                      NihonPath
                    </span>
                    <span className="block text-[8px] tracking-widest text-rose-500 font-bold uppercase">
                      日本パス
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Quick Level Widget */}
              <div className="rounded-xl bg-neutral-100/50 dark:bg-neutral-900/50 p-4 border border-neutral-200/30 dark:border-neutral-800/30 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Level {stats.level}</span>
                  <div className="flex items-center gap-1 text-rose-500 font-bold text-xs">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{stats.streak} Day Streak</span>
                  </div>
                </div>
                <div className="h-1 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div 
                    className="h-full bg-rose-600 rounded-full" 
                    style={{ width: `${(stats.xp / (stats.level * 250)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1">
                {fullMenu.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400'
                          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900/50 dark:hover:text-neutral-100'
                      }`}
                    >
                      <item.icon className="h-4.5 w-4.5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Premium CTA & Theme Switcher */}
            <div className="space-y-4">
              {!stats.isPremium && (
                <Link
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl bg-gradient-to-br from-rose-600 to-rose-800 p-4 text-white shadow-md"
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-white/95 font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Upgrade to Premium</span>
                  </div>
                  <p className="text-xs text-white/80 leading-snug">
                    Unlock full voice analysis, AI chats & offline mock tests.
                  </p>
                </Link>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-neutral-200/50 dark:border-neutral-800/40">
                <span className="text-xs font-semibold text-neutral-500">Theme</span>
                <button
                  onClick={toggleDarkMode}
                  className="flex h-8 w-14 items-center rounded-full bg-neutral-200 p-1 transition-colors dark:bg-neutral-800"
                >
                  <div
                    className={`h-6 w-6 transform rounded-full bg-white shadow-md transition-transform dark:bg-[#0c0c0e] flex items-center justify-center ${
                      darkMode ? 'translate-x-6' : ''
                    }`}
                  >
                    {darkMode ? '🌙' : '☀️'}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

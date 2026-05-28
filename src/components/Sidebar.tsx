'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquareCode, 
  Compass, 
  Trophy, 
  User, 
  Settings, 
  Flame, 
  Sparkles, 
  Mic, 
  GraduationCap, 
  ChevronRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { stats, toggleDarkMode, darkMode } = useApp();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Learn Modules', href: '/learn', icon: BookOpen },
    { name: 'Speaking AI', href: '/learn/speaking', icon: Mic },
    { name: 'JLPT Prep', href: '/jlpt', icon: GraduationCap },
    { name: 'AI Tutor', href: '/ai-tutor', icon: MessageSquareCode },
    { name: 'Community', href: '/community', icon: Compass },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Profile', href: `/profile/${stats.name.toLowerCase()}`, icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-neutral-200/50 bg-white/70 backdrop-blur-md dark:border-neutral-800/40 dark:bg-[#0c0c0e]/80 lg:flex lg:flex-col justify-between p-6 z-30">
      <div className="space-y-6">
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

        {/* User Quick Stats */}
        <div className="rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/50 p-4 border border-neutral-200/30 dark:border-neutral-800/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Level {stats.level}</span>
            <div className="flex items-center gap-1 text-rose-500 font-bold text-sm">
              <Flame className="w-4 h-4 animate-bounce" />
              <span>{stats.streak} Days</span>
            </div>
          </div>
          
          {/* XP Progress Bar */}
          <div className="h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
            <div 
              className="h-full bg-rose-600 rounded-full transition-all duration-500" 
              style={{ width: `${(stats.xp / (stats.level * 250)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
            <span>{stats.xp} XP</span>
            <span>{stats.level * 250} XP</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900/50 dark:hover:text-neutral-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-rose-600 dark:text-rose-400' : 'text-neutral-400'}`} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer / Theme switcher & Premium CTA */}
      <div className="space-y-4">
        {!stats.isPremium && (
          <Link href="/pricing" className="block relative overflow-hidden group rounded-2xl bg-gradient-to-br from-rose-600 to-rose-800 p-4 shadow-md shadow-rose-600/10 hover:shadow-rose-600/20 transition-all duration-300">
            <div className="absolute top-0 right-0 p-1 opacity-10 transform translate-x-2 -translate-y-2 select-none font-bold text-7xl text-white pointer-events-none">
              極
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-xs text-white/95 font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Go Premium</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-medium">
                Unlock AI speaking roleplays, advanced grammar insights & full mock exams.
              </p>
            </div>
          </Link>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-neutral-200/50 dark:border-neutral-800/40">
          <span className="text-xs font-semibold text-neutral-500">Theme</span>
          <button
            onClick={toggleDarkMode}
            className="flex h-8 w-14 items-center rounded-full bg-neutral-200 p-1 transition-colors duration-300 dark:bg-neutral-800"
          >
            <div
              className={`h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 dark:bg-[#0c0c0e] flex items-center justify-center ${
                darkMode ? 'translate-x-6' : ''
              }`}
            >
              {darkMode ? '🌙' : '☀️'}
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
};

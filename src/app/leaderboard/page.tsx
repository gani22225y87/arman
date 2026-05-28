'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  Trophy, 
  ArrowUp, 
  Flame, 
  TrendingUp, 
  Award
} from 'lucide-react';

export default function LeaderboardPage() {
  const { stats } = useApp();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');

  const weeklyUsers = [
    { rank: 1, name: 'Satoshi Nakamoto', level: 'N2', xp: 4520, streak: 84, avatar: '🦊', badge: 'Kanji Titan' },
    { rank: 2, name: 'Rin Tohsaka', level: 'N3', xp: 3200, streak: 50, avatar: '🌸', badge: 'Grammar Sage' },
    { rank: 3, name: `${stats.name} (You)`, level: stats.currentLevel, xp: stats.xp, streak: stats.streak, avatar: '🥋', badge: 'Streak Legend', isSelf: true },
    { rank: 4, name: 'Kenji Suzuki', level: 'N4', xp: 1200, streak: 12, avatar: '🍜', badge: 'Speaking Rookie' },
    { rank: 5, name: 'Hana Kimura', level: 'N5', xp: 850, streak: 8, avatar: '🍣', badge: 'Hiragana Master' }
  ].sort((a, b) => b.xp - a.xp);

  const monthlyUsers = [
    { rank: 1, name: 'Satoshi Nakamoto', level: 'N2', xp: 18450, streak: 84, avatar: '🦊', badge: 'Kanji Titan' },
    { rank: 2, name: 'Rin Tohsaka', level: 'N3', xp: 12400, streak: 50, avatar: '🌸', badge: 'Grammar Sage' },
    { rank: 3, name: 'Kenji Suzuki', level: 'N4', xp: 5400, streak: 12, avatar: '🍜', badge: 'Speaking Rookie' },
    { rank: 4, name: `${stats.name} (You)`, level: stats.currentLevel, xp: stats.xp + 800, streak: stats.streak, avatar: '🥋', badge: 'Streak Legend', isSelf: true },
    { rank: 5, name: 'Hana Kimura', level: 'N5', xp: 3850, streak: 8, avatar: '🍣', badge: 'Hiragana Master' }
  ].sort((a, b) => b.xp - a.xp);

  const allTimeUsers = [
    { rank: 1, name: 'Satoshi Nakamoto', level: 'N2', xp: 154300, streak: 84, avatar: '🦊', badge: 'Kanji Titan' },
    { rank: 2, name: 'Rin Tohsaka', level: 'N3', xp: 98200, streak: 50, avatar: '🌸', badge: 'Grammar Sage' },
    { rank: 3, name: 'Kenji Suzuki', level: 'N4', xp: 45000, streak: 12, avatar: '🍜', badge: 'Speaking Rookie' },
    { rank: 4, name: 'Hana Kimura', level: 'N5', xp: 31200, streak: 8, avatar: '🍣', badge: 'Hiragana Master' },
    { rank: 5, name: `${stats.name} (You)`, level: stats.currentLevel, xp: stats.xp + 5000, streak: stats.streak, avatar: '🥋', badge: 'Streak Legend', isSelf: true }
  ].sort((a, b) => b.xp - a.xp);

  const currentUsers = timeframe === 'weekly' 
    ? weeklyUsers 
    : timeframe === 'monthly' 
      ? monthlyUsers 
      : allTimeUsers;

  // Re-calculate ranks based on sorted XP lists
  const rankedUsers = currentUsers.map((user, idx) => ({
    ...user,
    rank: idx + 1
  }));

  const userRankData = rankedUsers.find(u => u.isSelf);
  const nextUser = userRankData ? rankedUsers[userRankData.rank - 2] : null;
  const xpDifference = (nextUser && userRankData) ? nextUser.xp - userRankData.xp : 0;

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>Global Immersion League</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
              Leaderboards
            </h1>
            <p className="text-xs text-neutral-500 max-w-lg leading-relaxed">
              Compare your progress against other active Japanese learners. Rank up by immersion, SRS reviews, and AI speaking practice.
            </p>
          </div>

          {/* Timeframe Selectors */}
          <div className="flex rounded-xl bg-neutral-100 p-1 dark:bg-neutral-900/60 border border-neutral-200/30 dark:border-neutral-800/30 w-fit self-start sm:self-center">
            {([
              { id: 'weekly', label: 'Weekly' },
              { id: 'monthly', label: 'Monthly' },
              { id: 'all-time', label: 'All-Time' }
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTimeframe(tab.id)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 ${
                  timeframe === tab.id
                    ? 'bg-white text-rose-600 shadow-sm dark:bg-neutral-800 dark:text-rose-400'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Global Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Current Rank */}
          <div className="rounded-2xl border border-neutral-200/50 bg-white p-6 shadow-sm dark:border-neutral-800/40 dark:bg-[#121215]/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Your Position</span>
                <span className="text-2xl font-black text-neutral-900 dark:text-neutral-50">
                  #{userRankData?.rank || 3} <span className="text-xs font-medium text-neutral-500">of 142</span>
                </span>
              </div>
            </div>
          </div>

          {/* XP Required */}
          <div className="rounded-2xl border border-neutral-200/50 bg-white p-6 shadow-sm dark:border-neutral-800/40 dark:bg-[#121215]/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Next Rank Gap</span>
                <span className="text-2xl font-black text-neutral-900 dark:text-neutral-50">
                  {xpDifference > 0 ? `${xpDifference} XP` : 'Top Rank! 🏆'}
                </span>
              </div>
            </div>
          </div>

          {/* Active League */}
          <div className="rounded-2xl border border-neutral-200/50 bg-white p-6 shadow-sm dark:border-neutral-800/40 dark:bg-[#121215]/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Current Division</span>
                <span className="text-2xl font-black text-neutral-900 dark:text-neutral-50">
                  Shogun League
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Standings Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Board */}
          <div className="lg:col-span-2 rounded-3xl border border-neutral-200/50 bg-white p-6 shadow-sm dark:border-neutral-800/40 dark:bg-[#121215]/50 backdrop-blur-md space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
              <span>Standings Overview</span>
              <span className="inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 uppercase">
                Active Division
              </span>
            </h2>

            <div className="space-y-2">
              {rankedUsers.map((user) => {
                const medal = user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : null;

                return (
                  <div
                    key={user.name}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                      user.isSelf
                        ? 'bg-rose-50/40 border-rose-300/40 dark:bg-rose-950/10 dark:border-rose-900/30 shadow-sm'
                        : 'border-neutral-100 hover:border-neutral-200 dark:border-neutral-900/30 dark:hover:border-neutral-800/30 bg-neutral-50/20 dark:bg-[#0c0c0e]/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Indicator */}
                      <span className={`w-8 text-center text-sm font-bold ${
                        user.rank === 1 ? 'text-amber-500 text-lg' : user.rank === 2 ? 'text-slate-400 text-lg' : user.rank === 3 ? 'text-amber-700 text-lg' : 'text-neutral-400'
                      }`}>
                        {medal || `#${user.rank}`}
                      </span>

                      {/* Avatar */}
                      <span className="text-2xl">{user.avatar}</span>

                      {/* User Info */}
                      <div>
                        <span className="block font-bold text-sm text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                          {user.name}
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                            {user.level}
                          </span>
                        </span>
                        <span className="block text-[10px] text-neutral-400">{user.badge}</span>
                      </div>
                    </div>

                    {/* XP & Streak details */}
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="block font-black text-sm text-neutral-900 dark:text-neutral-50">{user.xp.toLocaleString()}</span>
                        <span className="block text-[9px] text-neutral-400 uppercase tracking-wider font-semibold">XP</span>
                      </div>

                      <div className="flex items-center gap-1 text-rose-500 font-bold text-xs bg-rose-500/5 px-2.5 py-1 rounded-xl">
                        <Flame className="w-3.5 h-3.5" />
                        <span>{user.streak}d</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Tips & Diagnostics */}
          <div className="space-y-6">
            {/* Promo Box */}
            {nextUser && (
              <div className="rounded-3xl bg-gradient-to-br from-rose-600 to-rose-800 p-6 text-white shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-200">
                    Overtake Target!
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">
                    <ArrowUp className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black leading-tight">
                    Catch {nextUser.name.split(' ')[0]}!
                  </h3>
                  <p className="text-xs text-rose-100 leading-relaxed">
                    You are just **{xpDifference} XP** behind the rank above you! Practice 10 minutes of Speaking practice or complete 1 Graded lesson to bridge the gap.
                  </p>
                </div>
              </div>
            )}

            {/* Division Promotion Box */}
            <div className="rounded-3xl border border-neutral-200/50 bg-white p-6 shadow-sm dark:border-neutral-800/40 dark:bg-[#121215]/50 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-50">
                  Division Promotion Zone
                </h3>
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">
                  Safe Zone
                </span>
              </div>

              <div className="space-y-3">
                <div className="h-2 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[80%]" />
                </div>
                <p className="text-[11px] text-neutral-500 leading-normal">
                  The top 5 learners in this division will be promoted to the **Daimyo League** in 3 days. Keep studying consistently to retain your position!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

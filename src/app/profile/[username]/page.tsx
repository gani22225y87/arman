'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  Flame, 
  Award, 
  Activity, 
  Sliders,
  CheckCircle2
} from 'lucide-react';

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { stats, setStats } = useApp();
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('🥋');

  const avatarsList = ['🥋', '🦊', '🌸', '🍜', '🍣', '🎏', '🏯', '🍵'];

  const badges = [
    { id: 'first_steps', title: 'First Steps 🥋', desc: 'Started your Japanese journey', unlocked: stats.badgeIds.includes('first_steps') },
    { id: 'streak_3', title: 'Streak Master ⚡', desc: 'Achieved a 3-day study streak', unlocked: stats.badgeIds.includes('streak_3') },
    { id: 'kanji_titan', title: 'Kanji Titan ⛰️', desc: 'Mastered more than 10 Kanji', unlocked: stats.wordsLearned >= 10 },
    { id: 'speaker_rookie', title: 'Shadowing Pro 🎙️', desc: 'Completed speaking roleplays', unlocked: true },
    { id: 'grammar_sage', title: 'Grammar Sage 📜', desc: 'Built N5-N4 particle matches', unlocked: false }
  ];

  const handleAvatarChange = (avatar: string) => {
    setSelectedAvatar(avatar);
    setStats({
      ...stats,
      name: stats.name
    });
    setEditingAvatar(false);
  };

  // Capitalize Username
  const capitalizedUsername = params.username.charAt(0).toUpperCase() + params.username.slice(1);

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Cover Sheet & Learner Passport Banner */}
        <div className="relative rounded-3xl border border-neutral-200/50 bg-white p-6 shadow-sm dark:border-neutral-800/40 dark:bg-[#121215]/50 backdrop-blur-md overflow-hidden">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-40 w-40 rounded-full bg-rose-600/10 blur-3xl" />
          
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            {/* Avatar Picker Widget */}
            <div className="relative group">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-5xl border-2 border-rose-500/20 shadow-md">
                {selectedAvatar}
              </div>
              <button 
                onClick={() => setEditingAvatar(!editingAvatar)}
                className="absolute -bottom-1.5 -right-1.5 rounded-lg bg-rose-600 px-2 py-1 text-[9px] font-black uppercase text-white hover:bg-rose-700 transition shadow"
              >
                Change
              </button>
            </div>

            {/* User Bio Details */}
            <div className="text-center md:text-left space-y-2 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center md:justify-start">
                <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
                  {capitalizedUsername}
                </h1>
                <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 self-center">
                  {stats.currentLevel} Level
                </span>
              </div>
              <p className="text-xs text-neutral-500 max-w-sm">
                Determined language learner tracking structured immersion progress. Level N3-N2 Candidate.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="flex gap-4 self-center md:self-end">
              <div className="text-center bg-neutral-50 dark:bg-[#0c0c0e]/50 px-4 py-2.5 rounded-xl border border-neutral-100 dark:border-neutral-900/30">
                <span className="block text-[9px] text-neutral-400 uppercase font-bold tracking-wider">Active Streak</span>
                <span className="text-lg font-black text-rose-500 flex items-center gap-1 justify-center">
                  <Flame className="w-4 h-4 fill-rose-500/10" />
                  {stats.streak} Days
                </span>
              </div>

              <div className="text-center bg-neutral-50 dark:bg-[#0c0c0e]/50 px-4 py-2.5 rounded-xl border border-neutral-100 dark:border-neutral-900/30">
                <span className="block text-[9px] text-neutral-400 uppercase font-bold tracking-wider">Total XP</span>
                <span className="text-lg font-black text-amber-500">
                  {stats.xp} XP
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Avatar Picker List */}
          {editingAvatar && (
            <div className="mt-6 p-4 rounded-2xl bg-neutral-50 dark:bg-[#0c0c0e]/40 border border-neutral-200/50 dark:border-neutral-800/40 animate-slide-in space-y-3">
              <span className="block text-[10px] font-bold text-neutral-400 uppercase">Select Avatar Style:</span>
              <div className="flex flex-wrap gap-2.5">
                {avatarsList.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => handleAvatarChange(avatar)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white hover:bg-rose-50 dark:bg-neutral-800 dark:hover:bg-rose-950/20 text-2xl transition border border-neutral-200/50 dark:border-neutral-800/30 shadow-sm"
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Diagnostics & Badges */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Unlocked Badges */}
          <div className="lg:col-span-2 rounded-3xl border border-neutral-200/50 bg-white p-6 shadow-sm dark:border-neutral-800/40 dark:bg-[#121215]/50 backdrop-blur-md space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                <Award className="w-5 h-5 text-rose-500" />
                <span>Earned Badges</span>
              </h2>
              <p className="text-xs text-neutral-500">
                Progress milestones unlocked through structured daily review sessions.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {badges.map((badge) => (
                <div 
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    badge.unlocked
                      ? 'border-emerald-200/50 bg-emerald-50/10 dark:border-emerald-900/30 dark:bg-emerald-950/5'
                      : 'border-neutral-100 bg-neutral-50/20 dark:border-neutral-900/20 dark:bg-neutral-900/10 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-neutral-800 dark:text-neutral-200">
                      {badge.title}
                    </span>
                    {badge.unlocked ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                    ) : (
                      <span className="text-[9px] font-black uppercase text-neutral-400">Locked</span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Circular Areas Diagnostic Widget */}
          <div className="rounded-3xl border border-neutral-200/50 bg-white p-6 shadow-sm dark:border-neutral-800/40 dark:bg-[#121215]/50 backdrop-blur-md space-y-6">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-500" />
              <span>Language Diagnostics</span>
            </h2>

            <div className="space-y-4">
              {([
                { name: 'AI Speaking & Shadowing', value: stats.weakAreas.speaking },
                { name: 'Listening Theater', value: stats.weakAreas.listening },
                { name: 'Kanji Writing Stroke', value: stats.weakAreas.kanji },
                { name: 'Grammar Puzzles Builder', value: stats.weakAreas.grammar },
                { name: 'Vocabulary Spaced Repetition', value: stats.weakAreas.vocabulary }
              ]).map((area) => (
                <div key={area.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600 dark:text-neutral-400 font-medium">{area.name}</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{area.value}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        area.value >= 75 
                          ? 'bg-emerald-500' 
                          : area.value >= 50 
                            ? 'bg-amber-500' 
                            : 'bg-rose-500'
                      }`}
                      style={{ width: `${area.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Study History logs */}
        <div className="rounded-3xl border border-neutral-200/50 bg-white p-6 shadow-sm dark:border-neutral-800/40 dark:bg-[#121215]/50 backdrop-blur-md space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-rose-500" />
              <span>Recent Activity Logs</span>
            </h2>
            <p className="text-xs text-neutral-500">
              Audit log of completed quizzes, grammar drills, and immersion lessons.
            </p>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800/40">
            {stats.history.map((log) => (
              <div key={log.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                <div>
                  <span className="block font-bold text-sm text-neutral-800 dark:text-neutral-200">
                    {log.title}
                  </span>
                  <span className="block text-[10px] text-neutral-400 mt-0.5">
                    Completed on {log.date} • Type: <span className="uppercase">{log.type}</span>
                  </span>
                </div>
                
                <div className="text-right">
                  <span className="block text-xs font-bold text-emerald-500">+{log.xpGained} XP</span>
                  <span className="block text-[9px] text-neutral-400 font-semibold">{log.score}% Score</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

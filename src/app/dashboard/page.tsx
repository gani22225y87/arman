'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  Flame, 
  Sparkles, 
  Hourglass, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

export default function DashboardPage() {
  const { stats, streakHistory } = useApp();

  // Helper to generate calendar grids for study heatmap
  // Let's render 12 weeks of grids for a premium, compact look!
  const generateHeatmapDays = () => {
    const days = [];
    const today = new Date();
    // Generate last 84 days (12 weeks)
    for (let i = 83; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const active = streakHistory.includes(dateStr);
      days.push({ date: dateStr, active });
    }
    return days;
  };

  const heatmapDays = generateHeatmapDays();

  // Weak areas percentage levels mapped to color codes
  const getWeakAreaColor = (score: number) => {
    if (score < 50) return 'bg-rose-500';
    if (score < 75) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 dark:from-neutral-900/60 dark:to-neutral-950/60 border border-neutral-800 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-2 opacity-5 select-none font-bold text-[10rem] pointer-events-none font-serif leading-none">
            道
          </div>
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-rose-500 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcome back, {stats.name}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Ready to construct real fluency today?
            </h1>
            <p className="text-xs text-neutral-400 max-w-lg leading-relaxed font-semibold">
              Today&apos;s spaced repetition session is ready. You have upcoming grammar structures and pronunciation accents to review.
            </p>
          </div>

          <Link
            href="/learn"
            className="self-start md:self-auto shrink-0 inline-flex items-center justify-center rounded-xl bg-rose-600 text-white px-5 py-3 font-bold text-xs shadow-md shadow-rose-600/10 hover:bg-rose-500 transition-all gap-1.5 group"
          >
            <span>Start Review Queue</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'Current Level', val: `JLPT ${stats.currentLevel}`, sub: `Level ${stats.level}`, icon: Award, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/20' },
            { label: 'Active Streak', val: `${stats.streak} Days`, sub: 'Active learner status', icon: Flame, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' },
            { label: 'Words Mastered', val: stats.wordsLearned, sub: 'SRS Stage 5+', icon: BookOpen, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20' },
            { label: 'Total Study Time', val: `${stats.studyTime} mins`, sub: 'Speaking & grammar sessions', icon: Hourglass, color: 'text-green-500 bg-green-50 dark:bg-green-950/20' },
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 md:p-6 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider block">{item.label}</span>
                <span className="text-lg md:text-xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
                  {item.val}
                </span>
                <span className="text-[10px] text-neutral-500 font-semibold block">{item.sub}</span>
              </div>
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center ${item.color} shrink-0`}>
                <item.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Diagnostics (Quests, Weak areas, Heatmaps) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Daily Quests Checklist (left, 7cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-base">Daily Study Quests</h3>
              </div>
              <span className="text-xs font-semibold text-neutral-400">XP gains auto-applied</span>
            </div>

            <div className="space-y-3">
              {stats.dailyQuests.map((q) => (
                <div 
                  key={q.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    q.completed
                      ? 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 opacity-70'
                      : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${q.completed ? 'bg-green-500 border-green-500 text-white' : 'border-neutral-300 dark:border-neutral-700'}`}>
                        {q.completed && <span className="text-[8px] font-bold">✓</span>}
                      </div>
                      <span className={`text-sm font-semibold leading-none ${q.completed ? 'line-through text-neutral-400' : ''}`}>
                        {q.title}
                      </span>
                    </div>
                    {/* Goal Progress bar */}
                    <div className="flex items-center gap-2 max-w-xs">
                      <div className="h-1 flex-1 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                        <div 
                          className="h-full bg-rose-500 rounded-full" 
                          style={{ width: `${(q.current / q.target) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono font-semibold shrink-0">
                        {q.current}/{q.target}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-rose-500 bg-rose-50 dark:bg-rose-950/20 px-2 py-1 rounded-lg shrink-0">
                    +{q.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Stats & Weak Areas (right, 5cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-base">Immersion Diagnostics</h3>
              </div>
              <span className="text-xs text-neutral-400 font-bold uppercase font-mono">JLPT {stats.currentLevel}</span>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Listening Accents', val: stats.weakAreas.listening, key: 'listening' },
                { name: 'Speaking Pitch Accent', val: stats.weakAreas.speaking, key: 'speaking' },
                { name: 'Kanji Radical recall', val: stats.weakAreas.kanji, key: 'kanji' },
                { name: 'Grammar Nuance Builder', val: stats.weakAreas.grammar, key: 'grammar' },
                { name: 'Contextual Vocabulary', val: stats.weakAreas.vocabulary, key: 'vocabulary' },
              ].map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-neutral-700 dark:text-neutral-300">{item.name}</span>
                    <span className="font-mono text-neutral-500 font-bold">{item.val}% Accuracy</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${getWeakAreaColor(item.val)}`} 
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* SRS warning if some area is extremely weak */}
            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="block text-xs font-bold text-amber-800 dark:text-amber-400">Kanji recall attention required</span>
                <span className="block text-[10px] text-amber-600 dark:text-amber-500 leading-normal font-semibold">
                  Radical accuracy drops below 50%. Focus reviews on N5 Kanji writing stroke order drills to correct pattern memory.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Heatmap study log section */}
        <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-rose-500" />
              <h3 className="font-bold text-base">Annual Immersion Grid</h3>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800" />
                <span>Rest</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded bg-rose-600/20 border border-rose-500/20" />
                <span>Partial</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded bg-rose-600 border border-rose-600 shadow shadow-rose-600/20" />
                <span>Active study</span>
              </div>
            </div>
          </div>

          {/* Custom study calendar log mapping 12 weeks of grids */}
          <div className="space-y-4">
            <div className="overflow-x-auto pb-2">
              <div className="grid grid-cols-12 gap-2 min-w-[600px] select-none">
                {Array.from({ length: 12 }).map((_, weekIndex) => (
                  <div key={weekIndex} className="space-y-1">
                    <span className="block text-[9px] text-neutral-400 font-bold uppercase tracking-wider text-center mb-1">
                      Wk {12 - weekIndex}
                    </span>
                    <div className="grid grid-rows-7 gap-1">
                      {heatmapDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day) => (
                        <div
                          key={day.date}
                          title={`${day.date}: ${day.active ? 'Study session completed' : 'No logs recorded'}`}
                          className={`w-7 h-7 rounded-lg border transition-all ${
                            day.active
                              ? 'bg-rose-600 border-rose-600 shadow shadow-rose-600/10 scale-105'
                              : 'bg-neutral-100 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-850 hover:bg-neutral-200 dark:hover:bg-neutral-900'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-neutral-500 font-semibold text-center italic">
              Your immersion grid maps actual active sessions (such as AI audio shadowing or mock quizzes). Feel-good streaks are disabled, focusing purely on consistency checks.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

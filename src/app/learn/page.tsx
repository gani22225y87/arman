'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Sparkles, 
  Lock,
  ChevronRight
} from 'lucide-react';

export default function LearnPortalPage() {

  const learnModules = [
    {
      id: 'hiragana',
      name: 'Hiragana Basics',
      jp: 'ひらがな',
      desc: 'Master the 46 core phonetic characters, stroke order, and pronunciation.',
      progress: 100,
      path: '/learn/hiragana',
      locked: false,
      tag: 'Foundations',
      icon: 'あ',
    },
    {
      id: 'katakana',
      name: 'Katakana Loanwords',
      jp: 'カタカナ',
      desc: 'Master writing loanwords, foreign terminology, and sound combinations.',
      progress: 60,
      path: '/learn/katakana',
      locked: false,
      tag: 'Foundations',
      icon: 'ア',
    },
    {
      id: 'kanji',
      name: 'Kanji Radical SRS',
      jp: '漢字',
      desc: 'WaniKani-style radical study. Onyomi, Kunyomi readings & flashcard recall.',
      progress: 25,
      path: '/learn/kanji',
      locked: false,
      tag: 'Core Vocabulary',
      icon: '字',
    },
    {
      id: 'grammar',
      name: 'Nuance Grammar Map',
      jp: '文法',
      desc: 'Interactive grammar roadmaps N5 to N1. Build sentences and check errors.',
      progress: 40,
      path: '/learn/grammar',
      locked: false,
      tag: 'Structures',
      icon: 'の',
    },
    {
      id: 'vocabulary',
      name: 'Visual Vocabulary',
      jp: '単語',
      desc: 'Association flashcards, pitch accent audios, synonyms/antonyms system.',
      progress: 35,
      path: '/learn/vocabulary',
      locked: false,
      tag: 'Core Vocabulary',
      icon: '語',
    },
    {
      id: 'speaking',
      name: 'Speaking AI Coach',
      jp: '会話',
      desc: 'Mic shadowing drills. AI audio roleplay at airports, restaurants, conventions.',
      progress: 15,
      path: '/learn/speaking',
      locked: false,
      tag: 'Communication',
      icon: '🎙️',
    },
    {
      id: 'listening',
      name: 'Listening Theater',
      jp: '聴解',
      desc: 'Podcast drills, subtitle switch anime dialogues, slow/normal audio speeds.',
      progress: 50,
      path: '/learn/listening',
      locked: false,
      tag: 'Communication',
      icon: '🎧',
    },
    {
      id: 'reading',
      name: 'Manga Graded Readers',
      jp: '読解',
      desc: 'Graded articles & news. Toggle furigana and click words for instant translations.',
      progress: 20,
      path: '/learn/reading',
      locked: false,
      tag: 'Immersion',
      icon: '📖',
    },
    {
      id: 'writing',
      name: 'Handwriting & Typing',
      jp: '書記',
      desc: 'Interactive digital canvas pad to trace Kanji. AI stroke correction.',
      progress: 8,
      path: '/learn/writing',
      locked: false,
      tag: 'Immersion',
      icon: '✍️',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs font-bold text-rose-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Japanese learning modules</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Structured Fluency Curriculum</h1>
          <p className="text-xs text-neutral-500 max-w-xl font-semibold leading-relaxed">
            Select a module below to start practice. Your progress dynamically adjusts your weak area radar card on the home dashboard.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learnModules.map((m) => (
            <div 
              key={m.id}
              className={`bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[280px] hover:border-rose-500/40 dark:hover:border-rose-500/30 transition-all hover:scale-[1.01] group ${
                m.locked ? 'opacity-50 select-none' : ''
              }`}
            >
              <div className="space-y-4">
                {/* Module Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 font-extrabold text-2xl flex items-center justify-center border border-rose-100 dark:border-rose-900/30">
                      {m.icon}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base leading-snug group-hover:text-rose-600 transition-colors">
                        {m.name}
                      </h3>
                      <span className="block text-[10px] tracking-widest text-neutral-400 font-bold uppercase">
                        {m.jp}
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-500 uppercase tracking-wider">
                    {m.tag}
                  </span>
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-semibold">
                  {m.desc}
                </p>
              </div>

              {/* Progress & CTAs */}
              <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-900">
                <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400">
                  <span>Module Progress</span>
                  <span>{m.progress}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-neutral-150 dark:bg-neutral-950 overflow-hidden">
                  <div 
                    className="h-full bg-rose-600 rounded-full" 
                    style={{ width: `${m.progress}%` }}
                  />
                </div>

                <div className="flex justify-between items-center pt-1">
                  {m.locked ? (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-semibold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked (Complete Katakana)</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">
                        {m.progress === 100 ? '✓ Complete' : m.progress > 0 ? 'In Progress' : 'Start now'}
                      </span>
                      <Link 
                        href={m.path}
                        className="inline-flex items-center gap-1 text-xs font-bold text-neutral-800 hover:text-rose-600 dark:text-neutral-200 dark:hover:text-rose-400 transition-colors"
                      >
                        <span>Practice</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

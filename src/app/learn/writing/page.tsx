'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  ArrowLeft, 
  PenTool, 
  Award
} from 'lucide-react';

interface CorrectionItem {
  original: string;
  corrected: string;
  reason: string;
}

interface JournalFeedback {
  grade: string;
  wordCount: number;
  corrections: CorrectionItem[];
  feedback: string;
  expansion: string;
}

export default function WritingPage() {
  const { addHistoryItem } = useApp();
  const [activeTab, setActiveTab] = useState<'journal' | 'typing'>('journal');
  
  // Journal States
  const [journalText, setJournalText] = useState('');
  const [journalFeedback, setJournalFeedback] = useState<JournalFeedback | null>(null);
  const [loadingReview, setLoadingReview] = useState(false);

  // Typing Game States
  const [typingIndex, setTypingIndex] = useState(0);
  const [typingInput, setTypingInput] = useState('');
  const [typingFeedback, setTypingFeedback] = useState('');
  const [typingScore, setTypingScore] = useState(0);
  const [typingFinished, setTypingFinished] = useState(false);

  const typingLessons = [
    { jp: 'おはようございます', romaji: 'ohayougozaimasu', meaning: 'Good morning' },
    { jp: 'ありがとうございます', romaji: 'arigatougozaimasu', meaning: 'Thank you very much' },
    { jp: 'お元気ですか', romaji: 'ogenkidesuka', meaning: 'How are you?' },
    { jp: 'はじめまして', romaji: 'hajimemashite', meaning: 'Nice to meet you' }
  ];

  const currentTyping = typingLessons[typingIndex] || typingLessons[0];

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalText) return;

    setLoadingReview(true);
    // Simulate AI Essay parsing feedback
    setTimeout(() => {
      setJournalFeedback({
        grade: 'B+ (Upper Intermediate)',
        wordCount: journalText.length,
        corrections: [
          { original: '私は日本語が勉強します。', corrected: '私は日本語を勉強します。', reason: '勉強します (to study) is a transitive verb that requires direct object particle を instead of が.' },
          { original: 'ラーメンは美味しいです。', corrected: 'ラーメンが美味しいです。', reason: 'If emphasizing a specific personal preference, subject marker が creates a cleaner natural accent.' }
        ],
        feedback: 'Excellent narrative fluidity. Your vocabulary selection demonstrates good starter fluency. Make sure to audit direct object particles (を) when introducing active verbs.',
        expansion: 'Consider using "大変 (taihen / very)" or "本当に (hontou ni / really)" in front of "美味しい" to add emotional range.'
      });
      setLoadingReview(false);
      addHistoryItem('writing', 'Japanese Journal Essay entry', 50);
    }, 1500);
  };

  const handleTypingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = typingInput.toLowerCase().trim() === currentTyping.romaji;
    
    if (correct) {
      setTypingScore(typingScore + 1);
      setTypingFeedback('✨ Correct! Flawless input speed.');
    } else {
      setTypingFeedback(`❌ Close! Correct romaji transcription: "${currentTyping.romaji}"`);
    }

    setTimeout(() => {
      setTypingInput('');
      setTypingFeedback('');
      if (typingIndex < typingLessons.length - 1) {
        setTypingIndex(typingIndex + 1);
      } else {
        setTypingFinished(true);
        addHistoryItem('writing', 'Phonetic Typing Speed drill', 30, Math.round(((typingScore + (correct ? 1 : 0)) / typingLessons.length) * 100));
      }
    }, 1500);
  };

  const resetTyping = () => {
    setTypingIndex(0);
    setTypingInput('');
    setTypingScore(0);
    setTypingFeedback('');
    setTypingFinished(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link 
            href="/learn" 
            className="inline-flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Modules</span>
          </Link>
          <span className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/20 rounded-lg px-2 py-0.5 uppercase tracking-wider">
            Sentence Composition
          </span>
        </div>

        {/* Header Title */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Writing & Typing System (書記)</h1>
          <p className="text-xs text-neutral-500 max-w-xl font-semibold leading-relaxed">
            Practice Japanese sentence construction. Compose daily journals for automated grammatical audit reviews or speed-drill typing inputs.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-px">
          {([
            { id: 'journal', name: 'AI Immersion Journal' },
            { id: 'typing', name: 'Typing Speed Drill' }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-semibold transition-all relative px-2 ${
                activeTab === tab.id
                  ? 'text-rose-500 font-extrabold'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
              }`}
            >
              <span>{tab.name}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: AI Journal Diary Composition */}
        {activeTab === 'journal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Composition Pad (8cols) */}
            <div className="lg:col-span-8 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
                <span className="text-xs font-bold text-neutral-400 uppercase">Japanese Essay Entry</span>
                <span className="text-xs font-mono font-bold text-rose-500">{journalText.length} Chars</span>
              </div>

              <form onSubmit={handleJournalSubmit} className="space-y-4">
                <textarea
                  rows={6}
                  required
                  placeholder="Type your daily Japanese thoughts here... (e.g. 今日はとても天気がいいです。友達とラーメンを食べました。)"
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-855 bg-transparent text-sm focus:outline-none focus:border-rose-500 transition-all font-semibold font-serif leading-relaxed"
                />

                <button
                  type="submit"
                  disabled={loadingReview || !journalText}
                  className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  <PenTool className="w-4 h-4" />
                  <span>{loadingReview ? 'Analyzing grammar sequence...' : 'Submit Essay for AI audit'}</span>
                </button>
              </form>

              {/* AI review feedback cards display */}
              {journalFeedback && (
                <div className="space-y-6 pt-6 border-t border-neutral-105 dark:border-neutral-900 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">AI Composition Assessment</h3>
                    <span className="text-xs font-extrabold text-green-500 bg-green-50 dark:bg-green-950/20 px-2 py-0.5 rounded-lg">
                      {journalFeedback.grade}
                    </span>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <span className="block text-[10px] text-rose-500 font-bold uppercase tracking-wide">Grammar Particle Corrections</span>
                    {journalFeedback.corrections.map((corr: CorrectionItem, idx: number) => (
                      <div key={idx} className="p-4 bg-rose-50/20 dark:bg-rose-950/10 rounded-2xl border border-rose-100/50 dark:border-rose-900/30 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-neutral-500 font-semibold">
                          <span className="line-through">Original: {corr.original}</span>
                          <span className="text-rose-600 dark:text-rose-450 font-bold">➔ Corrected: {corr.corrected}</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 font-semibold leading-normal">
                          {corr.reason}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-150 dark:border-neutral-850 space-y-1 text-xs">
                    <span className="block text-[10px] text-neutral-400 uppercase tracking-wide font-bold">Vocabulary Expansion Suggestion</span>
                    <p className="text-neutral-600 dark:text-neutral-400 font-semibold leading-normal">
                      {journalFeedback.expansion}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Side guidelines (4cols) */}
            <div className="lg:col-span-4 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold text-sm">Journal Writing Rules</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                  NihonPath AI auditor evaluates grammatical sentence composition. Focus on authentic expression.
                </p>
              </div>

              <ul className="space-y-3.5 text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center shrink-0 text-[10px] font-bold">1</span>
                  <span>Use polite forms (です/ます) to maintain proper N5 structure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center shrink-0 text-[10px] font-bold">2</span>
                  <span>Double check object markers (を) vs topic markers (は).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center shrink-0 text-[10px] font-bold">3</span>
                  <span>Introduce simple radical Kanji where possible to simplify reading.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Typing Speed Drill Game */}
        {activeTab === 'typing' && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              {!typingFinished ? (
                <>
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
                    <span className="text-xs font-bold text-neutral-400 uppercase">Phrase {typingIndex + 1} of {typingLessons.length}</span>
                    <span className="text-xs font-extrabold text-rose-500">Phonetic Inputs</span>
                  </div>

                  <div className="space-y-6 text-center">
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Target Japanese Text</span>
                      <h2 className="text-2xl font-extrabold font-serif tracking-wide">{currentTyping.jp}</h2>
                      <span className="block text-xs text-neutral-500 font-semibold">&quot;{currentTyping.meaning}&quot;</span>
                    </div>

                    {typingFeedback && (
                      <div className={`p-3 rounded-xl text-xs font-bold ${typingFeedback.includes('Correct') ? 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400' : 'bg-rose-100 text-rose-800 dark:bg-rose-950/20 dark:text-rose-400'}`}>
                        {typingFeedback}
                      </div>
                    )}

                    <form onSubmit={handleTypingSubmit} className="space-y-3 max-w-sm mx-auto">
                      <input
                        type="text"
                        required
                        placeholder="transcribe romaji (e.g. ohayougozaimasu)"
                        value={typingInput}
                        onChange={(e) => setTypingInput(e.target.value)}
                        disabled={!!typingFeedback}
                        className="w-full text-center px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-850 bg-transparent text-sm focus:outline-none focus:border-rose-500 transition-all font-semibold font-mono"
                      />
                      <button
                        type="submit"
                        disabled={!!typingFeedback || !typingInput}
                        className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow shadow-rose-600/10"
                      >
                        Submit transcription
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-6 py-4 animate-fade-in">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400">
                    <Award className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-bold">Typing session complete</h2>
                    <p className="text-xs text-neutral-500">
                      Outstanding input accuracy! You matched <span className="font-bold text-neutral-950 dark:text-neutral-50">{typingScore} / {typingLessons.length}</span> romaji transcriptions quickly.
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-150 dark:border-neutral-850 flex items-center justify-between max-w-xs mx-auto text-xs font-semibold">
                    <span>XP Gained:</span>
                    <span className="font-mono text-rose-500 font-extrabold">+30 XP</span>
                  </div>

                  <div className="flex gap-3 max-w-sm mx-auto">
                    <button
                      onClick={resetTyping}
                      className="flex-1 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-bold transition-all"
                    >
                      Practice again
                    </button>
                    <Link
                      href="/learn"
                      className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all"
                    >
                      Return to Portal
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

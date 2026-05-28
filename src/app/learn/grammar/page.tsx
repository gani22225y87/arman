'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  ArrowLeft, 
  Volume2, 
  Sparkles
} from 'lucide-react';

export default function GrammarPage() {
  const { addHistoryItem } = useApp();
  const [activeTab, setActiveTab] = useState<'lessons' | 'builder'>('lessons');
  const [activeLesson, setActiveLesson] = useState({
    title: 'N5 Particles: は vs が',
    structure: 'Noun + は / Noun + が',
    explanation: 'は is the topic marker, introducing what the sentence is about. が is the subject marker, highlighting a specific entity that performs the action.',
    nuance: 'は points to the action/description following it (focus is on the back). が highlights the subject itself (focus is on the front). For example, "私はケンです" means "As for me, I am Ken." while "私がケンです" means "I (specifically) am the one who is Ken."',
    mistake: 'Using は when introducing new information or pointing to a question word. You should say "誰が来ましたか" (Who came?) instead of "誰は来ましたか" since the focus is on "who".',
    examples: [
      { jp: 'これは私の本です。', en: 'This is my book.' },
      { jp: '猫が好きです。', en: 'I like cats (specifically).' }
    ]
  });

  const grammarLessons = [
    {
      title: 'N5 Particles: は vs が',
      structure: 'Noun + は / Noun + が',
      explanation: 'は is the topic marker, introducing what the sentence is about. が is the subject marker, highlighting a specific entity.',
      nuance: 'は focuses on the description (back of sentence). が focuses on the subject (front of sentence).',
      mistake: 'Using は with question words like 誰 (who). Say 誰が, never 誰は.',
      examples: [{ jp: 'これは私の本です。', en: 'This is my book.' }, { jp: '猫が好きです。', en: 'I like cats.' }]
    },
    {
      title: 'N5 State: ~ている',
      structure: 'Verb [Te-form] + いる',
      explanation: 'Indicates a continuous state or an action currently in progress (similar to English "-ing" form).',
      nuance: 'For continuous actions (like walking), it means "is doing". For state-change verbs (like sitting or marrying), it means "is in the state of having done".',
      mistake: 'Using ~ている for future plans instead of raw dictionary forms.',
      examples: [{ jp: '本を読んでいます。', en: 'I am reading a book.' }, { jp: '東京に住んでいます。', en: 'I live in Tokyo.' }]
    },
    {
      title: 'N4 Decision: ~にする vs ~になる',
      structure: 'Noun + にする / Noun + になる',
      explanation: 'にする indicates an active personal choice (to decide on). になる indicates a natural state change (to become).',
      nuance: 'にする is active decision. になる is passive change.',
      mistake: 'Confusing personal selection with environmental change. Say コーラにする (I decide on cola) in restaurants.',
      examples: [{ jp: 'これにします。', en: 'I will decide on this.' }, { jp: '医者になります。', en: 'I will become a doctor.' }]
    }
  ];

  // Sentence Builder Puzzle States
  const [puzzleAnswer, setPuzzleAnswer] = useState<string[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<string[]>(['私', 'は', 'ビール', 'が', '好き', 'です']);
  const [puzzleFeedback, setPuzzleFeedback] = useState('');
  const [puzzleAnswered, setPuzzleAnswered] = useState(false);

  const correctSequence = ['私', 'は', 'ビール', 'が', '好き', 'です'];

  const playSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      window.speechSynthesis.speak(u);
    }
  };

  const handleBlockClick = (block: string, isAnswer: boolean) => {
    if (puzzleAnswered) return;
    if (isAnswer) {
      setPuzzleAnswer(puzzleAnswer.filter((b) => b !== block));
      setAvailableBlocks([...availableBlocks, block]);
    } else {
      setPuzzleAnswer([...puzzleAnswer, block]);
      setAvailableBlocks(availableBlocks.filter((b) => b !== block));
    }
  };

  const checkPuzzleAnswer = () => {
    const isCorrect = JSON.stringify(puzzleAnswer) === JSON.stringify(correctSequence);
    setPuzzleAnswered(true);
    if (isCorrect) {
      setPuzzleFeedback('✨ Correct! The sentence structure matches native grammar rules.');
      addHistoryItem('grammar', 'N5 Particles Sentence Builder', 30, 100);
    } else {
      setPuzzleFeedback('❌ Incorrect block sequence. Remember: Topic (は) ➔ Object (が) ➔ Predicate (好きです).');
    }
  };

  const resetPuzzle = () => {
    setPuzzleAnswer([]);
    setAvailableBlocks(['私', 'は', 'ビール', 'が', '好き', 'です']);
    setPuzzleFeedback('');
    setPuzzleAnswered(false);
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
            Sentence Structures
          </span>
        </div>

        {/* Header Title */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Nuance Grammar Map (文法)</h1>
          <p className="text-xs text-neutral-500 max-w-xl font-semibold leading-relaxed">
            Construct natural Japanese sentences using structured N5 to N1 templates. Understand real native nuance and avoid textbooks traps.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-px">
          {([
            { id: 'lessons', name: 'Roadmap Lessons' },
            { id: 'builder', name: 'Sentence Builder Puzzle' }
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

        {/* Tab 1: Roadmap Lessons */}
        {activeTab === 'lessons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Lessons list */}
            <div className="lg:col-span-4 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-4 h-[420px] overflow-y-auto">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wide block border-b border-neutral-100 dark:border-neutral-900 pb-2">
                N5/N4 Grammar set
              </span>
              <div className="space-y-2">
                {grammarLessons.map((l) => (
                  <button
                    key={l.title}
                    onClick={() => setActiveLesson(l)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      activeLesson.title === l.title
                        ? 'border-rose-500 bg-rose-50/20 dark:border-rose-600 dark:bg-rose-950/10 text-rose-600 dark:text-rose-450 font-bold'
                        : 'border-neutral-150 dark:border-neutral-850 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                    }`}
                  >
                    <span className="block text-xs font-extrabold">{l.title}</span>
                    <span className="block text-[10px] text-neutral-400 font-mono font-bold mt-1 uppercase">{l.structure}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lesson details Panel */}
            <div className="lg:col-span-8 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="space-y-3 pb-4 border-b border-neutral-100 dark:border-neutral-900">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold">{activeLesson.title}</h2>
                  <span className="text-xs font-bold text-rose-500 font-mono bg-rose-50 dark:bg-rose-950/20 px-2 py-0.5 rounded-lg border border-rose-100 dark:border-rose-900/30">
                    {activeLesson.structure}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
                  {activeLesson.explanation}
                </p>
              </div>

              {/* Native Nuance Section */}
              <div className="p-4 bg-rose-50/20 dark:bg-rose-950/10 rounded-2xl border border-rose-100/50 dark:border-rose-900/30 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>Native Nuance & Context</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-semibold">
                  {activeLesson.nuance}
                </p>
              </div>

              {/* Common Mistakes */}
              <div className="p-4 bg-amber-50/20 dark:bg-amber-950/10 rounded-2xl border border-amber-200/30 dark:border-amber-900/30 space-y-1.5 text-xs">
                <span className="block text-[10px] text-amber-800 dark:text-amber-400 uppercase tracking-wider font-bold">Common Traps</span>
                <p className="text-neutral-600 dark:text-neutral-450 leading-relaxed font-semibold">
                  {activeLesson.mistake}
                </p>
              </div>

              {/* Sentence examples */}
              <div className="space-y-3">
                <span className="block text-[10px] text-neutral-400 uppercase tracking-wide font-bold">Contextual Examples</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeLesson.examples.map((ex, idx) => (
                    <div key={idx} className="p-3.5 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1 text-xs">
                      <div className="flex items-center justify-between font-serif font-extrabold">
                        <span className="text-neutral-900 dark:text-neutral-50 text-sm">{ex.jp}</span>
                        <button 
                          onClick={() => playSpeech(ex.jp.split(' ')[0])}
                          className="text-rose-500 hover:text-rose-600"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="block text-neutral-500 font-semibold">{ex.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Sentence Builder */}
        {activeTab === 'builder' && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
                <span className="text-xs font-bold text-neutral-400 uppercase">Grammar Assembly Builder</span>
                <span className="text-xs font-extrabold text-rose-500">Sentence Builder</span>
              </div>

              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Translate English Sentence</span>
                  <h2 className="text-lg font-bold">&quot;I like beer.&quot;</h2>
                </div>

                {/* Answer Area (Reordered blocks) */}
                <div className="p-4 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl min-h-[64px] flex flex-wrap gap-2 items-center justify-center bg-neutral-50 dark:bg-neutral-950/40">
                  {puzzleAnswer.length === 0 ? (
                    <span className="text-xs text-neutral-400 font-bold uppercase select-none">Click blocks below to construct sentence</span>
                  ) : (
                    puzzleAnswer.map((block) => (
                      <button
                        key={block}
                        onClick={() => handleBlockClick(block, true)}
                        className="px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold text-sm shadow hover:bg-rose-500 transition-all scale-105 active:scale-95"
                      >
                        {block}
                      </button>
                    ))
                  )}
                </div>

                {/* Available Blocks Pool */}
                <div className="space-y-2">
                  <span className="block text-[10px] text-neutral-400 uppercase tracking-wide font-bold text-center">Word Blocks Pool</span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {availableBlocks.map((block) => (
                      <button
                        key={block}
                        onClick={() => handleBlockClick(block, false)}
                        className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 font-semibold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all scale-100 active:scale-95 shadow-sm"
                      >
                        {block}
                      </button>
                    ))}
                  </div>
                </div>

                {puzzleFeedback && (
                  <div className={`p-3 rounded-xl text-xs font-bold text-center ${puzzleFeedback.includes('Correct') ? 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400' : 'bg-rose-100 text-rose-800 dark:bg-rose-950/20 dark:text-rose-400'}`}>
                    {puzzleFeedback}
                  </div>
                )}

                <div className="flex gap-3 max-w-xs mx-auto">
                  <button
                    onClick={resetPuzzle}
                    className="flex-1 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-bold transition-all"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={checkPuzzleAnswer}
                    disabled={puzzleAnswered || puzzleAnswer.length === 0}
                    className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow shadow-rose-600/10"
                  >
                    Validate Sequence
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

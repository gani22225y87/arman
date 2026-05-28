'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  ArrowRight, 
  GraduationCap, 
  Volume2,
  CheckCircle2
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { stats, setStats, setOnboardingComplete } = useApp();
  const [step, setStep] = useState(1); // 1: goal, 2: path, 3: quiz, 4: result
  const [goal, setGoal] = useState('serious'); // casual, serious, intense
  const [path, setPath] = useState('beginner'); // beginner, experienced
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState('');
  const [score, setScore] = useState(0);

  const quizQuestions = [
    {
      q: 'Which character represents the sound "ka" in Hiragana?',
      options: ['さ (sa)', 'か (ka)', 'た (ta)', 'な (na)'],
      answer: 'か (ka)',
    },
    {
      q: 'What is the meaning of "ありがとう" (arigatou)?',
      options: ['Hello', 'Excuse me', 'Thank you', 'Goodbye'],
      answer: 'Thank you',
    },
    {
      q: 'Which particle is used to mark the direct object of a verb?',
      options: ['は (wa)', 'が (ga)', 'を (o/wo)', 'に (ni)'],
      answer: 'を (o/wo)',
    },
    {
      q: 'What does the Kanji "水" (mizu) mean?',
      options: ['Fire', 'Water', 'Tree', 'Gold'],
      answer: 'Water',
    },
    {
      q: 'Translate: "この本は美味しいです" (Wait... is this cringe or wrong?)',
      options: ['This book is delicious', 'This book is beautiful', 'This is wrong (delicious is for food!)', 'This book is interesting'],
      answer: 'This is wrong (delicious is for food!)',
    },
  ];

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (path === 'beginner') {
        // Skip placement quiz, set N5 level, complete onboarding
        handleFinishOnboarding('N5');
      } else {
        setStep(3);
      }
    }
  };

  const handleQuizAnswer = (option: string) => {
    setSelectedAns(option);
    const correct = option === quizQuestions[quizIndex].answer;
    if (correct) setScore(score + 1);

    setTimeout(() => {
      setSelectedAns('');
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex(quizIndex + 1);
      } else {
        setStep(4);
      }
    }, 800);
  };

  const handleFinishOnboarding = (level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1') => {
    // Save choices to Context
    const updatedStats = {
      ...stats,
      currentLevel: level,
      // If casual: goal = 15 mins. serious: 30 mins. intense: 60 mins.
      studyTime: 0,
      xp: 0,
      level: level === 'N3' ? 5 : level === 'N4' ? 3 : 1,
    };
    
    setStats(updatedStats);
    setOnboardingComplete(true);
    router.push('/dashboard');
  };

  const playSound = (text: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-neutral-50 text-neutral-900 dark:bg-[#09090b] dark:text-neutral-50 overflow-hidden">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute text-[18rem] font-serif top-0 left-0">路</div>
        <div className="absolute text-[18rem] font-serif bottom-0 right-0">導</div>
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] -z-20 pointer-events-none" />

      <div className="w-full max-w-lg space-y-8">
        {/* Step Progress indicators */}
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                s === step
                  ? 'bg-rose-600 w-8'
                  : s < step
                  ? 'bg-rose-600/50'
                  : 'bg-neutral-200 dark:bg-neutral-800'
              }`}
            />
          ))}
        </div>

        <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          {/* Step 1: Goal Select */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 font-bold text-lg">
                  🎯
                </div>
                <h1 className="text-xl font-bold tracking-tight">Set your Japanese study pace</h1>
                <p className="text-xs text-neutral-500">Pick a goal that matches your current commitment.</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'casual', label: 'Casual immersion', time: '10–15 mins / day', desc: 'Perfect for building initial familiarity.' },
                  { id: 'serious', label: 'Rigorous capability', time: '20–30 mins / day', desc: 'Standard target for solid conversational path.' },
                  { id: 'intense', label: 'JLPT Immersion sprint', time: '45–60 mins / day', desc: 'High-speed progression for relocatees.' }
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      goal === g.id
                        ? 'border-rose-500 bg-rose-50/20 dark:border-rose-600 dark:bg-rose-950/10'
                        : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                    }`}
                  >
                    <div>
                      <span className="block font-bold text-sm">{g.label}</span>
                      <span className="block text-xs text-neutral-500 font-semibold mt-0.5">{g.desc}</span>
                    </div>
                    <span className="text-xs font-bold text-rose-500 border border-rose-200 dark:border-rose-800/40 rounded-lg px-2 py-0.5 shrink-0">
                      {g.time}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextStep}
                className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Path Select */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 font-bold text-lg">
                  🗺️
                </div>
                <h1 className="text-xl font-bold tracking-tight">What is your current level?</h1>
                <p className="text-xs text-neutral-500">We will configure your curriculum roadmap based on this.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setPath('beginner')}
                  className={`text-center p-6 rounded-2xl border transition-all flex flex-col items-center justify-between h-48 ${
                    path === 'beginner'
                      ? 'border-rose-500 bg-rose-50/20 dark:border-rose-600 dark:bg-rose-950/10'
                      : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                  }`}
                >
                  <span className="text-3xl">あ</span>
                  <div className="space-y-1">
                    <span className="block font-bold text-sm">Absolute Beginner</span>
                    <span className="block text-[10px] text-neutral-500 leading-normal font-semibold">
                      Start from Hiragana, Katakana & core sounds.
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setPath('experienced')}
                  className={`text-center p-6 rounded-2xl border transition-all flex flex-col items-center justify-between h-48 ${
                    path === 'experienced'
                      ? 'border-rose-500 bg-rose-50/20 dark:border-rose-600 dark:bg-rose-950/10'
                      : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                  }`}
                >
                  <span className="text-3xl">漢字</span>
                  <div className="space-y-1">
                    <span className="block font-bold text-sm">Have prior experience</span>
                    <span className="block text-[10px] text-neutral-500 leading-normal font-semibold">
                      Take our 5-question Placement Test to skip N5.
                    </span>
                  </div>
                </button>
              </div>

              <button
                onClick={handleNextStep}
                className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>
                  {path === 'beginner' ? 'Finish & Open N5 Roadmap' : 'Start Placement Quiz'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 3: Placement Quiz */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
                <div className="flex items-center gap-1 text-xs font-bold text-neutral-400 uppercase">
                  <GraduationCap className="w-4 h-4" />
                  <span>Question {quizIndex + 1} of {quizQuestions.length}</span>
                </div>
                <span className="text-xs font-extrabold text-rose-500">Placement Test</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold leading-snug">
                  {quizQuestions[quizIndex].q}
                </h2>

                <div className="space-y-2">
                  {quizQuestions[quizIndex].options.map((opt) => {
                    let btnClass = "border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50";
                    if (selectedAns) {
                      if (opt === quizQuestions[quizIndex].answer) {
                        btnClass = "bg-green-500 text-white border-green-500";
                      } else if (selectedAns === opt) {
                        btnClass = "bg-rose-600 text-white border-rose-600";
                      } else {
                        btnClass = "opacity-50 border-neutral-200 dark:border-neutral-800";
                      }
                    }
                    return (
                      <button
                        key={opt}
                        disabled={!!selectedAns}
                        onClick={() => handleQuizAnswer(opt)}
                        className={`w-full text-left p-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {opt.includes('美味しい') && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playSound('美味しい');
                            }}
                            className="p-1 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-rose-500"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Results Display */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-9 h-9 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h1 className="text-xl font-bold tracking-tight">Placement Complete!</h1>
                <p className="text-xs text-neutral-500">
                  You answered <span className="font-bold text-neutral-900 dark:text-neutral-50">{score} / {quizQuestions.length}</span> questions correctly.
                </p>
              </div>

              {/* Evaluated Level display */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 max-w-sm mx-auto space-y-2">
                <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider block">Recommended Track</span>
                <span className="block text-4xl font-extrabold text-neutral-950 dark:text-neutral-50 font-mono tracking-wide">
                  JLPT {score >= 4 ? 'N3' : score >= 2 ? 'N4' : 'N5'}
                </span>
                <span className="block text-xs text-neutral-500 font-semibold leading-relaxed">
                  {score >= 4 
                    ? 'Intermediate status unlocked! Standard vocabulary and particles skipped.' 
                    : score >= 2 
                    ? 'Upper beginner status unlocked! Sounds and letters skipped.' 
                    : 'Fundamental starter set chosen. Full immersion enabled.'}
                </span>
              </div>

              <button
                onClick={() => handleFinishOnboarding(score >= 4 ? 'N3' : score >= 2 ? 'N4' : 'N5')}
                className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Enter Dashboard & Begin</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

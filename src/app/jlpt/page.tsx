'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  Award,
  FileText,
  Clock
} from 'lucide-react';

export default function JlptPrepPage() {
  const { addHistoryItem } = useApp();
  const [activeTab, setActiveTab] = useState<'roadmap' | 'mock'>('roadmap');
  
  // Mock Exam States
  const [examStarted, setExamStarted] = useState(false);
  const [examLevel, setExamLevel] = useState<'N5' | 'N4' | 'N3'>('N5');
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 minutes timer
  const [step, setStep] = useState(0);
  const [selectedAns, setSelectedAns] = useState('');
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const n5Questions = [
    { q: 'Which particle marks the direct object of an action?', options: ['は (wa)', 'を (o)', 'が (ga)', 'に (ni)'], answer: 'を (o)' },
    { q: 'What is the Onyomi reading of the Kanji "日"?', options: ['ひ (hi)', 'ニチ (nichi)', 'た (ta)', 'もと (moto)'], answer: 'ニチ (nichi)' },
    { q: 'How do you say "tomorrow" in Japanese?', options: ['きょう (kyou)', 'あした (ashita)', 'きのう (kinou)', 'おととい (ototoi)'], answer: 'あした (ashita)' },
    { q: 'Which Verb form denotes active continuous progress?', options: ['Dictionary form', '~ている form', '~た form', '~ない form'], answer: '~ている form' }
  ];

  // Timer Effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (examStarted && !finished && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setFinished(true);
    }
    return () => clearInterval(timer);
  }, [examStarted, finished, secondsLeft]);

  const startExam = (level: 'N5' | 'N4' | 'N3') => {
    setExamLevel(level);
    setExamStarted(true);
    setSecondsLeft(600);
    setStep(0);
    setScore(0);
    setFinished(false);
    setSelectedAns('');
  };

  const handleAnsClick = (opt: string) => {
    setSelectedAns(opt);
    const correct = opt === n5Questions[step].answer;
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedAns('');
      if (step < n5Questions.length - 1) {
        setStep(step + 1);
      } else {
        setFinished(true);
        addHistoryItem('quiz', `JLPT ${examLevel} Mock Exam`, 100, Math.round(((score + (correct ? 1 : 0)) / n5Questions.length) * 100));
      }
    }, 1200);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured JLPT path</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">JLPT Prep Center</h1>
          <p className="text-xs text-neutral-500 max-w-xl font-semibold leading-relaxed">
            Audit your progress against standardized JLPT criteria (N5 to N1). Take interactive mock exams under standard pressure timing to unlock levels.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-px">
          {([
            { id: 'roadmap', name: 'Standard JLPT Roadmap' },
            { id: 'mock', name: 'Mock Examination Center' }
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

        {/* Tab 1: Roadmap */}
        {activeTab === 'roadmap' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { level: 'N5', name: 'Foundational Kanji & Grammar', desc: 'Read basic kana, understand 100 simple Kanji, and direct particle rules.', unlocked: true, progress: 85 },
              { level: 'N4', name: 'Everyday Communications', desc: 'Identify 300 Kanji, understand natural state changes and dictionary forms.', unlocked: false, progress: 0 },
              { level: 'N3', name: 'Intermediate Nuances', desc: 'Bridge to real fluency. Read complex news articles and express opinions.', unlocked: false, progress: 0 },
              { level: 'N2', name: 'Business Competence', desc: 'Standard business conversation fluency. Read literature essays.', unlocked: false, progress: 0 },
              { level: 'N1', name: 'Complete Native Mastery', desc: 'Understand deep socio-economic articles, newspapers and slang nuances.', unlocked: false, progress: 0 },
            ].map((r) => (
              <div 
                key={r.level}
                className={`bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[250px] relative overflow-hidden transition-all hover:scale-[1.01] ${
                  !r.unlocked ? 'opacity-60 select-none' : ''
                }`}
              >
                {!r.unlocked && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-450 text-[9px] font-bold uppercase tracking-wider">
                    Locked
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center text-lg font-extrabold border border-rose-100/50 dark:border-rose-900/30">
                      {r.level}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-900 dark:text-neutral-50">{r.name}</h3>
                      <span className="block text-[9px] text-neutral-400 font-bold uppercase tracking-wider">JLPT Stage</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                    {r.desc}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-900">
                  <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400">
                    <span>Curriculum Progress</span>
                    <span>{r.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-950 overflow-hidden">
                    <div 
                      className="h-full bg-rose-600 rounded-full animate-pulse" 
                      style={{ width: `${r.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Mock Exam Center */}
        {activeTab === 'mock' && (
          <div className="max-w-xl mx-auto">
            {!examStarted ? (
              <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500">
                  <FileText className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-bold">Standard Mock Exams</h2>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                    Test your reading, vocabulary, and sentence structures under standardized countdown limits. Promotes real consistency audits.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                  {(['N5', 'N4', 'N3'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => startExam(lvl)}
                      className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-rose-500 hover:bg-rose-50/10 transition-all font-bold text-xs flex flex-col items-center justify-center gap-1 group"
                    >
                      <span className="text-sm font-extrabold text-neutral-950 dark:text-neutral-50 group-hover:text-rose-500 transition-colors">{lvl} Exam</span>
                      <span className="text-[9px] text-neutral-400 font-bold uppercase font-mono">10 Mins</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : !finished ? (
              <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
                  <div className="flex items-center gap-1 text-xs font-mono text-neutral-400 font-bold uppercase">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    <span>Time Left: {formatTime(secondsLeft)}</span>
                  </div>
                  <span className="text-xs font-bold text-rose-500">Question {step + 1} of {n5Questions.length}</span>
                </div>

                <div className="space-y-6 text-center">
                  <h3 className="text-lg font-bold">{n5Questions[step].q}</h3>

                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                    {n5Questions[step].options.map((opt) => {
                      let btnClass = "border border-neutral-200 dark:border-neutral-850 hover:bg-neutral-50 dark:hover:bg-neutral-900/50";
                      if (selectedAns) {
                        if (opt === n5Questions[step].answer) {
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
                          onClick={() => handleAnsClick(opt)}
                          className={`p-3.5 rounded-xl text-center text-xs font-bold transition-all ${btnClass}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-center animate-fade-in">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400">
                  <Award className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Exam Finished</h2>
                  <p className="text-xs text-neutral-500">
                    Your mock exam results are finalized. You answered <span className="font-bold text-neutral-950 dark:text-neutral-50">{score} / {n5Questions.length}</span> questions accurately.
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-150 dark:border-neutral-850 flex items-center justify-between max-w-xs mx-auto text-xs font-semibold">
                  <span>Audit Verdict:</span>
                  <span className={`font-mono font-extrabold ${score >= 3 ? 'text-green-500' : 'text-rose-500'}`}>
                    {score >= 3 ? 'PASS (+100 XP)' : 'FAIL (Keep reviewing)'}
                  </span>
                </div>

                <div className="flex gap-3 max-w-xs mx-auto">
                  <button
                    onClick={() => setExamStarted(false)}
                    className="flex-1 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-bold transition-all"
                  >
                    Finish Exam
                  </button>
                  <button
                    onClick={() => startExam(examLevel)}
                    className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all"
                  >
                    Retake test
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

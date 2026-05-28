'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  GraduationCap, 
  BookOpen, 
  Compass, 
  Award,
  Volume2
} from 'lucide-react';

export default function LandingPage() {
  const [demoState, setDemoState] = useState({
    flipped: false,
    answered: false,
    selectedOption: '',
    correct: false,
  });

  const demoVocab = {
    japanese: '美味しい',
    kana: 'おいしい',
    romaji: 'oishii',
    english: 'delicious / tasty',
    pitch: 'L-H-H-L',
    example: 'このラーメンは本当に美味しいです。',
    exampleTranslation: 'This ramen is really delicious.',
  };

  const handleDemoAnswer = (option: string) => {
    if (demoState.answered) return;
    const isCorrect = option === 'delicious';
    setDemoState({
      ...demoState,
      answered: true,
      selectedOption: option,
      correct: isCorrect,
    });
  };

  const playSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      window.speechSynthesis.speak(utterance);
    }
  };

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Software Engineer in Tokyo',
      avatar: '👩‍💻',
      text: 'I wasted 2 years on Duolingo streaks and couldn\'t even order coffee. NihonPath\'s speaking drills got me speaking confidently in 3 months.',
      level: 'Passed JLPT N3',
    },
    {
      name: 'Yuki Sato',
      role: 'Ex-pat English Teacher',
      avatar: '🧑‍🏫',
      text: 'The anime immersion module is pure genius. It extracts real vocabulary without the childish gamification. Best Kanji tool on the market.',
      level: 'Mastered 800+ Kanji',
    },
    {
      name: 'Alex Rivera',
      role: 'Language Enthusiast',
      avatar: '🧑‍🚀',
      text: 'Structured, rigorous, and beautiful. The writing recognition and speech analyzer actually correct you, unlike flashcard-only apps.',
      level: 'Passed JLPT N2',
    },
  ];

  const modules = [
    { name: 'Hiragana Basics', desc: 'Master all 46 core characters with handwriting stroke practice.', level: 'N5', icon: 'あ' },
    { name: 'Katakana System', desc: 'Learn loanwords and foreign names used in modern society.', level: 'N5', icon: 'ア' },
    { name: 'Radical Kanji SRS', desc: 'WaniKani-style spaced repetition to recall meaning and readings.', level: 'N5-N1', icon: '学' },
    { name: 'Grammar Engine', desc: 'Interactive N5 to N1 maps with native nuance & builder quizzes.', level: 'N5-N1', icon: 'の' },
    { name: 'Speaking AI Coach', desc: 'Real-time mic feedback on pitch accents & phrasing correction.', level: 'All Levels', icon: '🎙️' },
    { name: 'Listening Theater', desc: 'Slow & native speeds, podcast drills, and audio transcriptions.', level: 'All Levels', icon: '🎧' },
    { name: 'JLPT Mock Exams', desc: 'Under-timer real simulation tests for grammar, kanji & listening.', level: 'N5-N1', icon: '📝' },
    { name: 'Anime Immersion', desc: 'Learn slang and natural dialogue directly from pop culture clips.', level: 'Inter/Adv', icon: '🌸' },
    { name: 'Travel Blueprint', desc: 'Practical phrases for transit, restaurants, hotels, and emergencies.', level: 'Beginner', icon: '✈️' },
    { name: 'Business Japanese', desc: 'Keigo honorifics, corporate mail composition & speech drills.', level: 'N2-N1', icon: '💼' },
  ];

  return (
    <div className="min-h-screen relative bg-neutral-50 text-neutral-900 dark:bg-[#09090b] dark:text-neutral-50 overflow-hidden">
      <Navbar />

      {/* Hero section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Japanese typography animated background */}
        <div className="absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden opacity-[0.03] dark:opacity-[0.04]">
          <div className="absolute text-9xl font-bold font-serif top-10 left-10 animate-pulse-slow">あ</div>
          <div className="absolute text-9xl font-bold font-serif bottom-20 left-1/4 animate-pulse-slow" style={{ animationDelay: '2s' }}>日本語</div>
          <div className="absolute text-[12rem] font-bold font-serif top-20 right-1/4 animate-pulse-slow" style={{ animationDelay: '4s' }}>道</div>
          <div className="absolute text-9xl font-bold font-serif bottom-10 right-10 animate-pulse-slow" style={{ animationDelay: '1s' }}>漢字</div>
          <div className="absolute text-8xl font-bold font-serif top-1/2 left-10 animate-pulse-slow" style={{ animationDelay: '3s' }}>夢</div>
        </div>

        {/* Decorative Grid and Ambient Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] -z-20 pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/30 animate-fade-in shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Japanese Learning Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight select-none">
            Learn Real Japanese. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500 dark:from-rose-500 dark:to-pink-400">
              Not Just Random Words.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Master speaking, kanji, listening, grammar, and JLPT with structured immersion. Designed for students who want deep capability, not just feel-good daily streaks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/auth/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-rose-600 text-white px-8 py-4 font-bold text-base shadow-lg shadow-rose-600/20 hover:bg-rose-500 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2"
            >
              <span>Start Free Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/onboarding"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 px-8 py-4 font-bold text-base shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/70 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2"
            >
              <span>Take Placement Test</span>
              <GraduationCap className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm">
              <span className="block text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">20,000+</span>
              <span className="text-xs text-neutral-500 font-semibold tracking-wide uppercase">Active Learners</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm">
              <span className="block text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">98%</span>
              <span className="text-xs text-neutral-500 font-semibold tracking-wide uppercase">Speaking Score</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm">
              <span className="block text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">N5 → N1</span>
              <span className="text-xs text-neutral-500 font-semibold tracking-wide uppercase">Structured Paths</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm">
              <span className="block text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">AI Tutor</span>
              <span className="text-xs text-neutral-500 font-semibold tracking-wide uppercase">24/7 Coaching</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Lesson Preview (Interactive Card Game) */}
      <section className="bg-neutral-100/50 dark:bg-neutral-900/20 py-20 px-4 sm:px-6 lg:px-8 border-y border-neutral-200/40 dark:border-neutral-800/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/30">
              <Play className="w-3.5 h-3.5" />
              <span>Interactive Demo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Test Drive Your First NihonPath SRS Lesson
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Unlike other apps that just show flashcards, NihonPath utilizes premium pitch accent diagrams, handwriting recognition, native auditory reinforcement, and native example context.
            </p>
            <ul className="space-y-3 font-semibold text-neutral-700 dark:text-neutral-300">
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 dark:text-rose-400 text-xs">✓</div>
                <span>Spaced Repetition System (SRS) integration</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 dark:text-rose-400 text-xs">✓</div>
                <span>Pitch accent guides for natural inflection</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 dark:text-rose-400 text-xs">✓</div>
                <span>Contextual native speaker examples</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            {/* The interactive Flashcard */}
            <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xl relative overflow-hidden transition-all duration-300">
              <div className="absolute top-4 right-4">
                <span className="text-xs font-bold text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-lg px-2 py-0.5 uppercase">
                  SRS Stage 1
                </span>
              </div>

              {/* Card Front */}
              <div className="space-y-6 pt-4">
                <div className="text-center space-y-2">
                  <div className="text-5xl font-extrabold text-neutral-950 dark:text-neutral-50 tracking-wide select-all font-serif">
                    {demoVocab.japanese}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-neutral-500 font-semibold text-sm">
                    <span>{demoVocab.kana}</span>
                    <span>•</span>
                    <span>{demoVocab.romaji}</span>
                    <button 
                      onClick={() => playSpeech(demoVocab.japanese)}
                      className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-rose-500"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Pitch Accent Widget */}
                <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-900 text-center">
                  <span className="text-xs font-bold text-neutral-400 uppercase block mb-1">Pitch Accent</span>
                  <div className="flex items-center justify-center gap-1 font-mono text-sm text-rose-500 dark:text-rose-400 font-bold">
                    <span>Low</span>
                    <span>➔</span>
                    <span>High</span>
                    <span>➔</span>
                    <span>High</span>
                    <span>➔</span>
                    <span>Low</span>
                  </div>
                </div>

                {/* Interactive Question */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-neutral-400 uppercase">What is the meaning of this word?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['beautiful', 'delicious', 'expensive', 'difficult'].map((option) => {
                      let btnClass = "border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50";
                      if (demoState.answered) {
                        if (option === 'delicious') {
                          btnClass = "bg-green-500 text-white border-green-500";
                        } else if (demoState.selectedOption === option) {
                          btnClass = "bg-rose-600 text-white border-rose-600";
                        } else {
                          btnClass = "opacity-50 border-neutral-200 dark:border-neutral-800";
                        }
                      }
                      return (
                        <button
                          key={option}
                          disabled={demoState.answered}
                          onClick={() => handleDemoAnswer(option)}
                          className={`p-3 rounded-xl text-center text-sm font-semibold transition-all duration-200 ${btnClass}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback area */}
                {demoState.answered && (
                  <div className="space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 animate-fade-in">
                    <div className={`p-3 rounded-xl text-xs font-bold ${demoState.correct ? 'bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400' : 'bg-rose-100 text-rose-800 dark:bg-rose-950/30 dark:text-rose-400'}`}>
                      {demoState.correct ? '✨ Correct! Outstanding pitch memory.' : '❌ Close, but that means "expensive".'}
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-bold text-neutral-400 uppercase block">Context Sentence</span>
                      <p className="text-sm font-medium text-neutral-950 dark:text-neutral-100 font-serif leading-relaxed">
                        {demoVocab.example}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {demoVocab.exampleTranslation}
                      </p>
                    </div>

                    <button
                      onClick={() => setDemoState({ flipped: false, answered: false, selectedOption: '', correct: false })}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
                    >
                      Reset card & practice again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Graded Roadmaps N5 -> N1 */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/30">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Structured roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Clear Roadmaps for Every Level
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            From complete absolute beginner (N5) to business native fluency (N1). Every step has dedicated listening, speaking, kanji, and grammar sets.
          </p>
        </div>

        <div className="relative">
          {/* Connecting roadmap line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2 hidden lg:block -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { level: 'N5', title: 'Absolute Beginner', vocab: '600 words', kanji: '100 kanji', bg: 'from-amber-500/20 to-orange-500/20', desc: 'Can understand basic phrases. Simple daily interactions.' },
              { level: 'N4', title: 'Upper Beginner', vocab: '1500 words', kanji: '300 kanji', bg: 'from-orange-500/20 to-rose-500/20', desc: 'Basic conversations. Can read simple sentences with furigana.' },
              { level: 'N3', title: 'Intermediate', vocab: '3700 words', kanji: '650 kanji', bg: 'from-rose-500/20 to-pink-500/20', desc: 'Can read newspaper headlines. Follow daily casual conversation speed.' },
              { level: 'N2', title: 'Pre-Advanced', vocab: '6000 words', kanji: '1000 kanji', bg: 'from-pink-500/20 to-purple-500/20', desc: 'Professional fluency. Understand natural speed dialogue & essays.' },
              { level: 'N1', title: 'Advanced Native', vocab: '10000+ words', kanji: '2000+ kanji', bg: 'from-purple-500/20 to-indigo-500/20', desc: 'Absolute mastery. Can write formal essays, read literature & contract texts.' }
            ].map((item, index) => (
              <div 
                key={item.level} 
                className="relative bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between h-80 overflow-hidden"
              >
                {/* Visual Level indicator badge */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${item.bg} rounded-bl-[100px] opacity-30 group-hover:opacity-50 transition-opacity -z-10`} />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 font-mono">
                      {item.level}
                    </span>
                    <span className="text-xs font-bold text-neutral-400">Step 0{index + 1}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold">{item.title}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-neutral-100 dark:border-neutral-900">
                  <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 font-semibold">
                    <span>Vocabulary:</span>
                    <span className="font-mono text-neutral-800 dark:text-neutral-200 font-bold">{item.vocab}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 font-semibold">
                    <span>Kanji Mastered:</span>
                    <span className="font-mono text-neutral-800 dark:text-neutral-200 font-bold">{item.kanji}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of Modules */}
      <section className="bg-neutral-100/50 dark:bg-neutral-900/10 py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-200/40 dark:border-neutral-800/40">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full learning suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              10 Fully Integrated Learning Systems
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              No disconnected learning tracks. Vocabulary maps to grammar, which connects to speech roleplay, feeding your Spaced Repetition queue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m) => (
              <div 
                key={m.name}
                className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 flex gap-4 hover:border-rose-500/40 dark:hover:border-rose-500/30 transition-all hover:scale-[1.01]"
              >
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 font-bold text-xl flex items-center justify-center border border-rose-100 dark:border-rose-900/30">
                  {m.icon}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base leading-snug">{m.name}</h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-500 uppercase tracking-wider">
                      {m.level}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-semibold">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/30">
            <Compass className="w-3.5 h-3.5" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Loved by Learners Moving to Japan
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Hear from developers, students, expats, and teachers who unlocked genuine conversational capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div 
              key={t.name}
              className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 space-y-4 relative"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{t.name}</h4>
                  <span className="text-[10px] text-neutral-500 font-semibold">{t.role}</span>
                </div>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 italic leading-relaxed">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center gap-1 text-[10px] text-rose-500 font-bold uppercase tracking-wider pt-2 border-t border-neutral-100 dark:border-neutral-900">
                <Award className="w-3.5 h-3.5" />
                <span>{t.level}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#09090b] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 font-bold text-white shadow-md">
                N
              </div>
              <span className="text-lg font-bold tracking-wider text-neutral-900 dark:text-neutral-50">
                NihonPath
              </span>
            </Link>
            <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
              Master premium real-world Japanese with advanced pitch accent charts, writing recognition, AI speakers & JLPT prep templates.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-neutral-400 tracking-wider mb-4">Learning Portals</h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-500">
              <li><Link href="/learn" className="hover:text-rose-500">Hiragana & Katakana</Link></li>
              <li><Link href="/learn" className="hover:text-rose-500">JLPT Kanji SRS</Link></li>
              <li><Link href="/learn" className="hover:text-rose-500">Nuance Grammar Map</Link></li>
              <li><Link href="/learn/speaking" className="hover:text-rose-500">Interactive Speaking Coach</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-neutral-400 tracking-wider mb-4">System Differentiators</h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-500">
              <li><Link href="/learn" className="hover:text-rose-500">Zero Cringe Gamification</Link></li>
              <li><Link href="/ai-tutor" className="hover:text-rose-500">AI Transcription Analysis</Link></li>
              <li><Link href="/jlpt" className="hover:text-rose-500">N5–N1 Structured Immersion</Link></li>
              <li><Link href="/learn" className="hover:text-rose-500">Anime Clip Subtitles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-neutral-400 tracking-wider mb-4">Company & Mission</h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-500">
              <li><Link href="/pricing" className="hover:text-rose-500">Premium Membership</Link></li>
              <li><Link href="/pricing" className="hover:text-rose-500">Subscription Plans</Link></li>
              <li><a href="#" className="hover:text-rose-500">Privacy & Terms</a></li>
              <li><a href="#" className="hover:text-rose-500">Support Center</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-neutral-100 dark:border-neutral-900 text-center text-xs text-neutral-500 font-semibold flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 NihonPath Co. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="text-[10px] text-rose-500 font-bold uppercase">Fluent in Japanese</span>
            <span>•</span>
            <span className="text-[10px] text-rose-500 font-bold uppercase">JLPT Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

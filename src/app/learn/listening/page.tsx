'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Subtitles, 
  ChevronRight
} from 'lucide-react';

export default function ListeningPage() {
  const { addHistoryItem } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState<0.8 | 1.0 | 1.2>(1.0);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [activeClip, setActiveClip] = useState({
    title: 'Daily Life: Ordering Ramen at Diner',
    category: 'Casual Tokyo',
    duration: '0:45',
    audioText: 'すみません、豚骨ラーメンを一つお願いします。あと、生ビールも！',
    translation: 'Excuse me, one tonkotsu ramen please. Also, draft beer!',
    romaji: 'Sumimasen, tonkotsu raamen wo hitotsu onegai shimasu. Ato, nama biiru mo!'
  });

  const listeningClips = [
    {
      title: 'Daily Life: Ordering Ramen at Diner',
      category: 'Casual Tokyo',
      duration: '0:45',
      audioText: 'すみません、豚骨ラーメンを一つお願いします。あと、生ビールも！',
      translation: 'Excuse me, one tonkotsu ramen please. Also, draft beer!',
      romaji: 'Sumimasen, tonkotsu raamen wo hitotsu onegai shimasu. Ato, nama biiru mo!'
    },
    {
      title: 'Anime Style: Heroic Speech',
      category: 'Immersion Anime',
      duration: '0:30',
      audioText: '諦めるな！僕たちの未来は、自分自身の手で切り拓くんだ！',
      translation: 'Do not give up! We will open up our future with our own hands!',
      romaji: 'Akirameru na! Bokutachi no mirai wa, jibun jishin no te de kiri hiraku n da!'
    },
    {
      title: 'Business: Introducing new partners',
      category: 'Honorific Keigo',
      duration: '1:10',
      audioText: '初めまして、山田と申します。本日はよろしくお願いいたします。',
      translation: 'Nice to meet you, my name is Yamada. Please treat me well today.',
      romaji: 'Hajimemashite, Yamada to moushimasu. Honjitsu wa yoroshiku onegai itashimasu.'
    }
  ];

  const playSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(activeClip.audioText);
      u.lang = 'ja-JP';
      u.rate = playSpeed;
      
      u.onstart = () => setIsPlaying(true);
      u.onend = () => {
        setIsPlaying(false);
        addHistoryItem('listening', `Listen: ${activeClip.title}`, 20);
      };
      
      window.speechSynthesis.speak(u);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
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
            Audio Immersion
          </span>
        </div>

        {/* Header Title */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Listening Theater (聴解)</h1>
          <p className="text-xs text-neutral-500 max-w-xl font-semibold leading-relaxed">
            Practice auditory comprehension under adjustable speech rates. Toggle subtitles, read along with romaji parsing & listen to natural Japanese.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Audio player card panel (8cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wide">{activeClip.category}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-colors ${
                    showSubtitles 
                      ? 'bg-rose-50 border-rose-200 text-rose-500' 
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-400'
                  }`}
                >
                  <Subtitles className="w-4 h-4" />
                  <span>Subtitles</span>
                </button>
              </div>
            </div>

            {/* Video Clip Anime Mock Frame */}
            <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-850 aspect-video flex flex-col justify-between p-6">
              {/* Top ambient lights */}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/40 text-[9px] text-white/95 font-bold uppercase tracking-wider">
                Immersion Player
              </div>

              {/* Center Play Graphic */}
              <div className="flex-1 flex items-center justify-center relative">
                <button
                  onClick={isPlaying ? stopSpeech : playSpeech}
                  className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-all scale-100 hover:scale-105 active:scale-95 shadow-lg shadow-rose-600/30 z-10"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                </button>
              </div>

              {/* Subtitles Overlay */}
              {showSubtitles && (
                <div className="bg-black/60 border border-white/5 backdrop-blur-sm rounded-xl p-3.5 text-center max-w-xl mx-auto space-y-1 z-10">
                  <p className="font-serif font-extrabold text-sm text-white tracking-wide">
                    {activeClip.audioText}
                  </p>
                  <p className="text-[10px] text-white/70">
                    {activeClip.translation}
                  </p>
                </div>
              )}
            </div>

            {/* Speed Adjust controls */}
            <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-900 pt-4 text-xs font-semibold">
              <span className="text-neutral-400">Play Rate Speed:</span>
              <div className="flex gap-1.5">
                {([0.8, 1.0, 1.2] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaySpeed(spd)}
                    className={`px-3 py-1.5 rounded-lg border font-mono font-bold transition-all ${
                      playSpeed === spd
                        ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-black'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                    }`}
                  >
                    {spd}x {spd === 0.8 ? '(Slow)' : spd === 1.2 ? '(Fast)' : '(Normal)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Complete Text Script Detail */}
            <div className="space-y-2">
              <span className="block text-[10px] text-neutral-400 uppercase tracking-wide font-bold">Dialogue Script Transcript</span>
              <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2 text-xs">
                <p className="font-serif font-extrabold text-sm text-neutral-900 dark:text-neutral-100 leading-relaxed">
                  {activeClip.audioText}
                </p>
                <p className="font-mono text-[10px] text-rose-500 font-bold leading-relaxed">{activeClip.romaji}</p>
                <p className="text-neutral-500 font-semibold leading-relaxed border-t border-neutral-100 dark:border-neutral-900 pt-2">
                  {activeClip.translation}
                </p>
              </div>
            </div>
          </div>

          {/* Side clip browser (4cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="space-y-1">
              <h3 className="font-bold text-sm">Select Audio Scene</h3>
              <p className="text-xs text-neutral-500 leading-normal font-semibold">
                Practice daily, anime, or keigo honorific dialects. Review vocab from script text to advance recall.
              </p>
            </div>

            <div className="space-y-2.5">
              {listeningClips.map((clip) => (
                <button
                  key={clip.title}
                  onClick={() => {
                    stopSpeech();
                    setActiveClip(clip);
                  }}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex justify-between items-center ${
                    activeClip.title === clip.title
                      ? 'border-rose-500 bg-rose-50/20 dark:border-rose-600 dark:bg-rose-950/10 text-rose-600 font-bold'
                      : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="block text-xs font-bold">{clip.title}</span>
                    <span className="block text-[9px] text-neutral-400 font-bold uppercase">{clip.category}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0 text-neutral-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

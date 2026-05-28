'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  ChevronRight
} from 'lucide-react';

export default function ReadingPage() {
  const { addHistoryItem } = useApp();
  const [showFurigana, setShowFurigana] = useState(true);
  const [selectedWord, setSelectedWord] = useState({ word: '日本', reading: 'にほん', meaning: 'Japan' });
  const [selectedArticle, setSelectedArticle] = useState({
    title: 'Ramen Culture in Tokyo (東京のラーメン)',
    difficulty: 'N5 Beginner',
    text: [
      { word: '日本', reading: 'にほん', meaning: 'Japan' },
      { word: 'には、', reading: '', meaning: 'particle (as for)' },
      { word: '美味しい', reading: 'おいしい', meaning: 'delicious' },
      { word: 'ラーメン', reading: 'らーめん', meaning: 'ramen' },
      { word: 'が', reading: 'が', meaning: 'particle (subject marker)' },
      { word: 'たくさん', reading: 'たくさん', meaning: 'many / a lot' },
      { word: 'あります。', reading: 'あります', meaning: 'exist / there is' },
      { word: '特に', reading: 'とくに', meaning: 'especially' },
      { word: '東京', reading: 'とうきょう', meaning: 'Tokyo' },
      { word: 'には、', reading: '', meaning: 'particle' },
      { word: '有名', reading: 'ゆうめい', meaning: 'famous' },
      { word: 'な', reading: 'な', meaning: 'adjective particle' },
      { word: '店', reading: 'みせ', meaning: 'shop' },
      { word: 'が', reading: 'が', meaning: 'particle' },
      { word: '多い', reading: 'おおい', meaning: 'many' },
      { word: 'です。', reading: 'です', meaning: 'is / polite' }
    ]
  });

  const articles = [
    {
      title: 'Ramen Culture in Tokyo (東京のラーメン)',
      difficulty: 'N5 Beginner',
      text: [
        { word: '日本', reading: 'にほん', meaning: 'Japan' },
        { word: 'には、', reading: '', meaning: 'particle (as for)' },
        { word: '美味しい', reading: 'おいしい', meaning: 'delicious' },
        { word: 'ラーメン', reading: 'らーめん', meaning: 'ramen' },
        { word: 'が', reading: 'が', meaning: 'particle (subject marker)' },
        { word: 'たくさん', reading: 'たくさん', meaning: 'many / a lot' },
        { word: 'あります。', reading: 'あります', meaning: 'exist' },
        { word: '特に', reading: 'とくに', meaning: 'especially' },
        { word: '東京', reading: 'とうきょう', meaning: 'Tokyo' },
        { word: 'には、', reading: '', meaning: 'particle' },
        { word: '有名', reading: 'ゆうめい', meaning: 'famous' },
        { word: 'な', reading: 'な', meaning: 'particle' },
        { word: '店', reading: 'みせ', meaning: 'shop' },
        { word: 'が', reading: 'が', meaning: 'particle' },
        { word: '多い', reading: 'おおい', meaning: 'many' },
        { word: 'です。', reading: 'です', meaning: 'copula' }
      ]
    },
    {
      title: 'Manga Icon: Tezuka Osamu (手塚治虫)',
      difficulty: 'N3 Intermediate',
      text: [
        { word: '手塚治虫', reading: 'てづかおさむ', meaning: 'Osamu Tezuka (manga artist)' },
        { word: 'は、', reading: '', meaning: 'particle' },
        { word: '日本', reading: 'にほん', meaning: 'Japan' },
        { word: 'の', reading: 'の', meaning: 'particle (possessive)' },
        { word: 'マンガ', reading: 'まんが', meaning: 'manga' },
        { word: 'の', reading: 'の', meaning: 'particle' },
        { word: '神様', reading: 'かみさま', meaning: 'god / pioneer' },
        { word: 'と', reading: 'と', meaning: 'particle (called as)' },
        { word: '呼ばれて', reading: 'よばれて', meaning: 'called / named' },
        { word: 'います。', reading: 'います', meaning: 'is in state of' }
      ]
    }
  ];

  const handleWordClick = (item: { word: string; reading: string; meaning: string }) => {
    if (!item.reading) return; // skip punctuation particles
    setSelectedWord(item);
    addHistoryItem('reading', `Read: ${selectedArticle.title}`, 20);
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
            Graded Readers
          </span>
        </div>

        {/* Header Title */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Graded Reading Practice (読解)</h1>
          <p className="text-xs text-neutral-500 max-w-xl font-semibold leading-relaxed">
            Read comprehensive articles targeted to your JLPT milestones. Toggle Furigana scripts & hover over vocabulary terms for instant dictionary lookup definitions.
          </p>
        </div>

        {/* Action Toggles bar */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => setShowFurigana(!showFurigana)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-colors ${
              showFurigana 
                ? 'bg-rose-50 border-rose-200 text-rose-500' 
                : 'border-neutral-250 dark:border-neutral-800 text-neutral-400 bg-white dark:bg-[#0c0c0e]/80'
            }`}
          >
            {showFurigana ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{showFurigana ? 'Hide Furigana' : 'Show Furigana'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main text graded reader (8cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
              <h2 className="text-base font-extrabold">{selectedArticle.title}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-500 uppercase tracking-wider">
                {selectedArticle.difficulty}
              </span>
            </div>

            {/* The Text Layout with custom Furigana Ruby nodes */}
            <div className="p-6 bg-neutral-50 dark:bg-neutral-950/40 rounded-2xl border border-neutral-150 dark:border-neutral-850 leading-loose tracking-wide font-serif text-lg md:text-xl flex flex-wrap gap-x-2 gap-y-4">
              {selectedArticle.text.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleWordClick(item)}
                  className={`text-left transition-all hover:text-rose-500 focus:text-rose-600 focus:outline-none`}
                >
                  <ruby className="ruby-position">
                    <span className="font-serif font-extrabold text-neutral-900 dark:text-neutral-50 hover:underline">
                      {item.word}
                    </span>
                    {showFurigana && item.reading && (
                      <rt className="text-[10px] text-neutral-400 font-mono tracking-widest font-semibold text-center select-none block mb-0.5">
                        {item.reading}
                      </rt>
                    )}
                  </ruby>
                </button>
              ))}
            </div>
            
            <p className="text-[10px] text-neutral-500 font-semibold italic text-center">
              Click on any character structure or Kanji word within the reader to update the dictionary lookup card.
            </p>
          </div>

          {/* Dictionary lookup glossary panel & articles selection (4cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Dictionary Panel */}
            <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="space-y-1 pb-3 border-b border-neutral-100 dark:border-neutral-900">
                <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider block">Instant Dictionary</span>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-serif font-extrabold text-neutral-950 dark:text-neutral-50">{selectedWord.word}</h3>
                  {selectedWord.reading && <span className="text-xs text-neutral-400 font-bold font-mono">({selectedWord.reading})</span>}
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-semibold">
                <span className="text-neutral-400 uppercase tracking-wide">Definition:</span>
                <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  {selectedWord.meaning}
                </p>
              </div>

              <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-150 dark:border-neutral-850 text-[10px] text-neutral-500 leading-normal font-semibold">
                This item is bookmarked to your learning history stats automatically for weak-area assessments.
              </div>
            </div>

            {/* Articles Picker */}
            <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="space-y-1">
                <h4 className="font-bold text-xs uppercase text-neutral-400 tracking-wider">Select Graded Reader</h4>
                <p className="text-[10px] text-neutral-500 leading-normal font-semibold">Switch to different literature difficulty sets.</p>
              </div>

              <div className="space-y-2">
                {articles.map((art) => (
                  <button
                    key={art.title}
                    onClick={() => {
                      setSelectedArticle(art);
                      setSelectedWord(art.text[0]);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex justify-between items-center ${
                      selectedArticle.title === art.title
                        ? 'border-rose-500 bg-rose-50/20 dark:border-rose-600 dark:bg-rose-950/10 text-rose-600 font-bold'
                        : 'border-neutral-250 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <span className="block text-xs font-bold leading-snug">{art.title.split(' (')[0]}</span>
                      <span className="block text-[9px] text-neutral-400 font-bold uppercase">{art.difficulty}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

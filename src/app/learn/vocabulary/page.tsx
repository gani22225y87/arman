'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  ArrowLeft, 
  Volume2, 
  Bookmark, 
  ChevronRight
} from 'lucide-react';

export default function VocabularyPage() {
  const { stats, toggleSaveVocab, addHistoryItem } = useApp();
  const [activeTab, setActiveTab] = useState<'flashcard' | 'browse'>('flashcard');
  const [selectedTopic, setSelectedTopic] = useState<'daily' | 'anime' | 'food' | 'business'>('food');
  const [flipped, setFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  // Vocabulary Database mapped by topics
  const vocabDb = {
    food: [
      { kanji: '美味しい', kana: 'おいしい', romaji: 'oishii', meaning: 'delicious / tasty', pitch: 'L-H-H-L', synonym: 'うまい (casual)', antonym: '不味い (bad-tasting)', icon: '🍜' },
      { kanji: '食べる', kana: 'たべる', romaji: 'taberu', meaning: 'to eat', pitch: 'L-H-L', synonym: '召し上がる (honorific)', antonym: '吐く (vomit)', icon: '🍱' },
      { kanji: '飲み物', kana: 'のみもの', romaji: 'nomimono', meaning: 'beverage / drink', pitch: 'L-H-H-H', synonym: 'ドリンク (loanword)', antonym: '食べ物 (food)', icon: '🍵' }
    ],
    anime: [
      { kanji: '可愛い', kana: 'かわいい', romaji: 'kawaii', meaning: 'cute / adorable', pitch: 'L-H-H-H', synonym: 'キュート', antonym: 'ブサイク (ugly)', icon: '🌸' },
      { kanji: '凄い', kana: 'すごい', romaji: 'sugoi', meaning: 'amazing / awesome', pitch: 'L-H-L', synonym: '素晴らしい', antonym: '酷い (terrible)', icon: '⚡' }
    ],
    daily: [
      { kanji: '学校', kana: 'がっこう', romaji: 'gakkou', meaning: 'school', pitch: 'L-H-H-H', synonym: '校舎', antonym: '塾 (cram school)', icon: '🏫' },
      { kanji: '友達', kana: 'ともだち', romaji: 'tomodachi', meaning: 'friend', pitch: 'L-H-H-H', synonym: '友人', antonym: '敵 (enemy)', icon: '🧑‍🤝‍🧑' }
    ],
    business: [
      { kanji: '名刺', kana: 'めいし', romaji: 'meishi', meaning: 'business card', pitch: 'L-H-L', synonym: 'カード', antonym: '—', icon: '💼' },
      { kanji: '会議', kana: 'かいぎ', romaji: 'kaigi', meaning: 'meeting / conference', pitch: 'L-H-L', synonym: 'ミーティング', antonym: '休憩 (break)', icon: '📈' }
    ]
  };

  const currentDeck = vocabDb[selectedTopic] || [];
  const activeVocab = currentDeck[cardIndex] || currentDeck[0];

  const playSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      window.speechSynthesis.speak(u);
    }
  };

  const handleNextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      if (cardIndex < currentDeck.length - 1) {
        setCardIndex(cardIndex + 1);
      } else {
        setCardIndex(0);
        addHistoryItem('quiz', `Vocab Review: ${selectedTopic.toUpperCase()}`, 25, 100);
      }
    }, 200);
  };

  const isSaved = stats.savedVocab.includes(activeVocab.kanji);

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
            Phonetic Vocabulary
          </span>
        </div>

        {/* Header Title */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Visual Vocabulary Deck (単語)</h1>
          <p className="text-xs text-neutral-500 max-w-xl font-semibold leading-relaxed">
            Spaced repetition deck powered by image association. Learn synonyms, pitch accents, and toggle bookmarks to save items into your study list.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-px">
          {([
            { id: 'flashcard', name: 'SRS Flashcards' },
            { id: 'browse', name: 'Topic Catalog Browser' }
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

        {/* Topic Selector */}
        <div className="flex flex-wrap gap-2">
          {([
            { id: 'food', label: 'Food & Dining 🍱' },
            { id: 'anime', label: 'Anime & Slang 🌸' },
            { id: 'daily', label: 'School & Life 🏫' },
            { id: 'business', label: 'Business & Office 💼' }
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTopic(t.id);
                setCardIndex(0);
                setFlipped(false);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                selectedTopic === t.id
                  ? 'bg-rose-600 border-rose-600 text-white shadow shadow-rose-600/10'
                  : 'border-neutral-250 dark:border-neutral-800 bg-white dark:bg-[#0c0c0e]/80 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 text-neutral-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab 1: SRS Flashcards */}
        {activeTab === 'flashcard' && (
          <div className="max-w-md mx-auto space-y-6">
            {/* The Flipping Card Wrapper */}
            <div 
              onClick={() => setFlipped(!flipped)}
              className={`w-full aspect-[4/3] relative cursor-pointer select-none transition-all duration-500 preserve-3d ${
                flipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Card Front Side */}
              <div className="absolute inset-0 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl backface-hidden z-20">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase">Flashcard Deck</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveVocab(activeVocab.kanji);
                    }}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isSaved
                        ? 'bg-rose-50 border-rose-200 text-rose-500'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <div className="text-center space-y-4">
                  <div className="text-6xl font-extrabold tracking-wide font-serif">{activeVocab.kanji}</div>
                  <div className="text-3xl text-neutral-400 select-none pointer-events-none">{activeVocab.icon}</div>
                  <span className="block text-xs text-neutral-400 font-bold uppercase tracking-wider">Click to reveal meaning</span>
                </div>

                <div className="text-center text-[10px] font-bold text-neutral-400">
                  Card {cardIndex + 1} of {currentDeck.length}
                </div>
              </div>

              {/* Card Back Side */}
              <div className="absolute inset-0 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl backface-hidden rotate-y-180 z-10">
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
                  <span className="text-xs font-mono text-neutral-400 font-bold uppercase">{activeVocab.kana} / {activeVocab.romaji}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playSpeech(activeVocab.kanji);
                    }}
                    className="p-1 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-rose-500"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 py-2">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wide block">Definition</span>
                    <span className="text-lg font-extrabold text-neutral-900 dark:text-neutral-50">{activeVocab.meaning}</span>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-150 dark:border-neutral-850 text-[10px] font-semibold text-center leading-relaxed">
                    <span className="text-rose-500 font-bold block uppercase tracking-wider mb-0.5">Pitch Accent Contour</span>
                    <span className="font-mono font-bold text-neutral-600 dark:text-neutral-400">{activeVocab.pitch}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold">
                    <div className="p-2 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-0.5">
                      <span className="text-neutral-400 uppercase tracking-wide">Synonym:</span>
                      <span className="block text-neutral-800 dark:text-neutral-200 font-bold">{activeVocab.synonym}</span>
                    </div>
                    <div className="p-2 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-0.5">
                      <span className="text-neutral-400 uppercase tracking-wide">Antonym:</span>
                      <span className="block text-neutral-800 dark:text-neutral-200 font-bold">{activeVocab.antonym}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextCard();
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow shadow-rose-600/10 flex items-center justify-center gap-1"
                >
                  <span>Promote in SRS queue</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Catalog Browser */}
        {activeTab === 'browse' && (
          <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentDeck.map((vocab) => {
                const alreadyBookmarked = stats.savedVocab.includes(vocab.kanji);
                return (
                  <div 
                    key={vocab.kanji}
                    className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl w-12 h-12 rounded-xl bg-neutral-105 dark:bg-neutral-900 flex items-center justify-center">
                        {vocab.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm font-serif">{vocab.kanji}</h4>
                          <span className="text-[10px] text-neutral-400 font-semibold">({vocab.kana})</span>
                        </div>
                        <span className="block text-[11px] text-neutral-500 mt-0.5">{vocab.meaning}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => playSpeech(vocab.kanji)}
                        className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-rose-500"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => toggleSaveVocab(vocab.kanji)}
                        className={`p-2 rounded-lg border transition-colors ${
                          alreadyBookmarked
                            ? 'bg-rose-50 border-rose-200 text-rose-500'
                            : 'border-neutral-200 dark:border-neutral-800 text-neutral-400'
                        }`}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

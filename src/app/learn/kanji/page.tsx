'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  ArrowLeft, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  Award
} from 'lucide-react';

interface KanjiItem {
  kanji: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  strokes: number;
  radicals: string;
  frequency: string;
  mnemonic: string;
  examples: Array<{ jp: string; en: string }>;
}

export default function KanjiPage() {
  const { addHistoryItem } = useApp();
  const [activeTab, setActiveTab] = useState<'browse' | 'srs' | 'trace'>('browse');
  const [selectedLevel, setSelectedLevel] = useState<'N5' | 'N4' | 'N3'>('N5');
  const [selectedKanji, setSelectedKanji] = useState<KanjiItem>({
    kanji: '日',
    meaning: 'Sun / Day',
    onyomi: 'ニチ, ジツ',
    kunyomi: 'ひ, -び, -か',
    strokes: 4,
    radicals: '日 (sun)',
    mnemonic: 'This Kanji is a representation of the sun with a line across the center.',
    frequency: '1st in common use',
    examples: [
      { jp: '今日 (きょう)', en: 'Today' },
      { jp: '日本 (にほん)', en: 'Japan' }
    ]
  });

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Kanji database
  const kanjiDb: Record<'N5' | 'N4' | 'N3', KanjiItem[]> = {
    N5: [
      { kanji: '日', meaning: 'Sun / Day', onyomi: 'ニチ, ジツ', kunyomi: 'ひ, -び', strokes: 4, radicals: '日', frequency: '1st', mnemonic: 'A perfect picture of the sun.', examples: [{ jp: '日本', en: 'Japan' }, { jp: '今日', en: 'Today' }] },
      { kanji: '本', meaning: 'Book / Origin', onyomi: 'ホン', kunyomi: 'もと', strokes: 5, radicals: '木', frequency: '10th', mnemonic: 'A tree marked with a line at the root to show origin.', examples: [{ jp: '日本語', en: 'Japanese' }, { jp: '本屋', en: 'Bookstore' }] },
      { kanji: '人', meaning: 'Person', onyomi: 'ジン, ニン', kunyomi: 'ひと', strokes: 2, radicals: '人', frequency: '5th', mnemonic: 'A person standing on two legs.', examples: [{ jp: '日本人', en: 'Japanese person' }, { jp: '三人', en: 'Three people' }] },
      { kanji: '水', meaning: 'Water', onyomi: 'スイ', kunyomi: 'みず', strokes: 4, radicals: '水', frequency: '223rd', mnemonic: 'Drops of water splashing off a stream.', examples: [{ jp: '水曜日', en: 'Wednesday' }, { jp: 'お水', en: 'Water' }] }
    ],
    N4: [
      { kanji: '国', meaning: 'Country', onyomi: 'コク', kunyomi: 'くに', strokes: 8, radicals: '囗', frequency: '3rd', mnemonic: 'A king with a jewel inside borders represents country.', examples: [{ jp: '外国人', en: 'Foreigner' }, { jp: '国籍', en: 'Nationality' }] },
      { kanji: '会', meaning: 'Meeting', onyomi: 'カイ', kunyomi: 'あ-う', strokes: 6, radicals: '人', frequency: '4th', mnemonic: 'People assembling together under a roof.', examples: [{ jp: '会社', en: 'Company' }, { jp: '会話', en: 'Conversation' }] }
    ],
    N3: [
      { kanji: '道', meaning: 'Road / Path', onyomi: 'ドウ', kunyomi: 'みち', strokes: 12, radicals: '辵', frequency: '201st', mnemonic: 'Walking on a road with a leader.', examples: [{ jp: '北海道', en: 'Hokkaido' }, { jp: '茶道', en: 'Tea ceremony' }] }
    ]
  };

  // SRS States
  const [srsStep, setSrsStep] = useState(0);
  const [srsAnswer, setSrsAnswer] = useState('');
  const [srsFeedback, setSrsFeedback] = useState('');
  const [srsAnswered, setSrsAnswered] = useState(false);
  const [srsFinished, setSrsFinished] = useState(false);

  const srsQuestions = [
    { kanji: '日', meaning: 'sun', kana: 'にち' },
    { kanji: '本', meaning: 'book', kana: 'ほん' },
    { kanji: '人', meaning: 'person', kana: 'ひと' }
  ];

  const playSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      window.speechSynthesis.speak(u);
    }
  };

  // Canvas drawing
  useEffect(() => {
    if (activeTab === 'trace' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineWidth = 14;
        ctx.strokeStyle = '#dc2626';
      }
    }
  }, [activeTab, selectedKanji]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    canvasRef.current?.getContext('2d')?.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSrsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srsAnswer) return;

    const current = srsQuestions[srsStep];
    const isCorrect = srsAnswer.toLowerCase().trim() === current.meaning.toLowerCase();
    
    setSrsAnswered(true);
    if (isCorrect) {
      setSrsFeedback('✨ Correct! Radical meaning unlocked.');
    } else {
      setSrsFeedback(`❌ Incorrect. Correct meaning is "${current.meaning}".`);
    }

    setTimeout(() => {
      setSrsAnswer('');
      setSrsAnswered(false);
      setSrsFeedback('');
      if (srsStep < srsQuestions.length - 1) {
        setSrsStep(srsStep + 1);
      } else {
        setSrsFinished(true);
        addHistoryItem('quiz', 'Kanji SRS Radical Drills', 40, 100);
      }
    }, 1500);
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
            Radicals & Kanji
          </span>
        </div>

        {/* Header Title */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Radical Kanji SRS (漢字)</h1>
          <p className="text-xs text-neutral-500 max-w-xl font-semibold leading-relaxed">
            Spaced Repetition System optimized for visual radical breakdowns. Review meanings, readings, and write Kanji dynamically.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-px">
          {([
            { id: 'browse', name: 'Kanji Browser' },
            { id: 'srs', name: 'SRS Review Queue' },
            { id: 'trace', name: 'Stroke Writing practice' }
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

        {/* Tab 1: Kanji Browser */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            {/* Level selector buttons */}
            <div className="flex gap-2">
              {(['N5', 'N4', 'N3'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedLevel === lvl
                      ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-black'
                      : 'border-neutral-250 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 text-neutral-500'
                  }`}
                >
                  {lvl} Kanji Set
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Kanji list */}
              <div className="lg:col-span-7 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
                <div className="grid grid-cols-4 gap-4">
                  {(kanjiDb[selectedLevel] || []).map((k) => (
                    <button
                      key={k.kanji}
                      onClick={() => setSelectedKanji(k)}
                      className={`aspect-square rounded-2xl border transition-all flex flex-col items-center justify-center p-3 relative group ${
                        selectedKanji.kanji === k.kanji
                          ? 'border-rose-500 bg-rose-50/20 dark:border-rose-600 dark:bg-rose-950/10'
                          : 'border-neutral-150 dark:border-neutral-850 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                      }`}
                    >
                      <span className="text-3xl font-extrabold font-serif">{k.kanji}</span>
                      <span className="text-[10px] text-neutral-400 font-bold uppercase mt-1">{k.meaning}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Kanji Card Panel details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="text-center space-y-2 pb-4 border-b border-neutral-100 dark:border-neutral-900">
                    <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-center justify-center mx-auto text-4xl font-extrabold text-rose-600 dark:text-rose-400 font-serif">
                      {selectedKanji.kanji}
                    </div>
                    <h3 className="text-base font-extrabold">{selectedKanji.meaning}</h3>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-500 font-bold">
                      <span>Strokes: {selectedKanji.strokes}</span>
                      <span>•</span>
                      <span>Usage: {selectedKanji.frequency}</span>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-xs font-semibold">
                    <div className="flex justify-between">
                      <span className="text-neutral-400 uppercase tracking-wide">Onyomi:</span>
                      <span className="font-mono text-neutral-800 dark:text-neutral-200 font-bold">{selectedKanji.onyomi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 uppercase tracking-wide">Kunyomi:</span>
                      <span className="font-mono text-neutral-800 dark:text-neutral-200 font-bold">{selectedKanji.kunyomi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 uppercase tracking-wide">Radical:</span>
                      <span className="font-mono text-rose-500 font-bold">{selectedKanji.radicals}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-150 dark:border-neutral-850 text-xs font-semibold leading-relaxed">
                    <span className="block text-[10px] text-neutral-400 uppercase tracking-wide mb-1 font-bold">Radical Mnemonic</span>
                    <p className="text-neutral-600 dark:text-neutral-400">{selectedKanji.mnemonic}</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="block text-[10px] text-neutral-400 uppercase tracking-wide font-bold">Usage Examples</span>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedKanji.examples.map((ex, idx) => (
                        <div key={idx} className="p-2 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-0.5 text-xs">
                          <div className="flex items-center justify-between font-serif font-extrabold">
                            <span>{ex.jp}</span>
                            <button 
                              onClick={() => playSpeech(ex.jp.split(' ')[0])}
                              className="text-rose-500 hover:text-rose-600"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="block text-[10px] text-neutral-500 font-semibold">{ex.en}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('trace')}
                    className="w-full py-3 rounded-xl bg-neutral-950 hover:bg-neutral-850 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black font-bold text-xs shadow-md transition-all"
                  >
                    Open Writing Practice Canvas
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SRS Spaced Repetition Queue */}
        {activeTab === 'srs' && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              {!srsFinished ? (
                <>
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
                    <span className="text-xs font-bold text-neutral-400 uppercase">Item {srsStep + 1} of {srsQuestions.length}</span>
                    <span className="text-xs font-extrabold text-rose-500">SRS Stage: Guru</span>
                  </div>

                  <div className="space-y-6 text-center">
                    <div className="w-24 h-24 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-850 flex items-center justify-center mx-auto text-5xl font-extrabold font-serif relative group shadow-inner">
                      {srsQuestions[srsStep].kanji}
                    </div>

                    <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                      Input the english meaning of this radical kanji.
                    </p>

                    {srsFeedback && (
                      <div className={`p-3 rounded-xl text-xs font-bold ${srsFeedback.includes('Correct') ? 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400' : 'bg-rose-100 text-rose-800 dark:bg-rose-950/20 dark:text-rose-400'}`}>
                        {srsFeedback}
                      </div>
                    )}

                    <form onSubmit={handleSrsSubmit} className="space-y-3 max-w-xs mx-auto">
                      <input
                        type="text"
                        required
                        placeholder="meaning (e.g. sun)"
                        value={srsAnswer}
                        onChange={(e) => setSrsAnswer(e.target.value)}
                        disabled={srsAnswered}
                        className="w-full text-center px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-850 bg-transparent text-sm focus:outline-none focus:border-rose-500 transition-all font-semibold uppercase"
                      />
                      <button
                        type="submit"
                        disabled={srsAnswered || !srsAnswer}
                        className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow shadow-rose-600/10"
                      >
                        Submit Radical Recall
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
                    <h2 className="text-xl font-bold">Review Queue Clean</h2>
                    <p className="text-xs text-neutral-500">
                      Excellent consistency. 3 radical kanji items promoted to &quot;Master&quot; stage in Spaced Repetition log.
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-150 dark:border-neutral-850 flex items-center justify-between max-w-xs mx-auto text-xs font-semibold">
                    <span>XP Gained:</span>
                    <span className="font-mono text-rose-500 font-extrabold">+40 XP</span>
                  </div>

                  <div className="flex gap-3 max-w-sm mx-auto">
                    <button
                      onClick={() => {
                        setSrsFinished(false);
                        setSrsStep(0);
                      }}
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

        {/* Tab 3: Writing Canvas */}
        {activeTab === 'trace' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-400 uppercase">Kanji Writing Canvas</span>
                <button
                  onClick={clearCanvas}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Pad</span>
                </button>
              </div>

              {/* Tracing Grid Layer */}
              <div className="relative border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-950/40 aspect-square max-w-md mx-auto kana-practice-grid">
                <div className="absolute inset-0 flex items-center justify-center text-[11rem] md:text-[15rem] text-neutral-350 dark:text-neutral-800/30 select-none pointer-events-none font-serif opacity-75">
                  {selectedKanji.kanji}
                </div>

                <canvas
                  ref={canvasRef}
                  width={400}
                  height={400}
                  onMouseDown={startDrawing}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onMouseMove={draw}
                  onTouchStart={startDrawing}
                  onTouchEnd={stopDrawing}
                  onTouchMove={draw}
                  className="absolute inset-0 w-full h-full cursor-crosshair z-10Touch"
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold text-sm">Select Kanji character to practice</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                  Select a character from N5 set to practice handwriting correct stroke sequences. Clear the pad to reset.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {kanjiDb.N5.map((k) => (
                  <button
                    key={k.kanji}
                    onClick={() => setSelectedKanji(k)}
                    className={`p-3 rounded-xl border font-bold font-serif text-lg transition-all ${
                      selectedKanji.kanji === k.kanji
                        ? 'border-rose-500 bg-rose-50/20 dark:border-rose-600 dark:bg-rose-950/10 text-rose-600'
                        : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                    }`}
                  >
                    {k.kanji}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-rose-50 dark:bg-rose-950/20 rounded-2xl border border-rose-200/50 dark:border-rose-900/30 flex items-start gap-2.5 text-xs font-semibold leading-normal">
                <Sparkles className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="block text-[10px] font-bold text-rose-800 dark:text-rose-400">Writing tracker ready</span>
                  <span className="block text-[10px] text-neutral-500 leading-normal">
                    Correct stroke order makes your writing readable. Japanese calligraphers rely on curves to identify meaning.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

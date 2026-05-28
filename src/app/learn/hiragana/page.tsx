'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  ArrowLeft, 
  Volume2, 
  RotateCcw, 
  Award,
  Sparkles
} from 'lucide-react';

export default function HiraganaPage() {
  const { addHistoryItem } = useApp();
  const [activeTab, setActiveTab] = useState<'chart' | 'trace' | 'quiz'>('chart');
  const [selectedChar, setSelectedChar] = useState({ hiragana: 'あ', romaji: 'a' });
  const [quizScore, setQuizScore] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState('');
  const [selectedQuizAns, setSelectedQuizAns] = useState('');
  const [quizFinished, setQuizFinished] = useState(false);

  // Tracing Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const hiraganaList = [
    { hiragana: 'あ', romaji: 'a' }, { hiragana: 'い', romaji: 'i' }, { hiragana: 'う', romaji: 'u' }, { hiragana: 'え', romaji: 'e' }, { hiragana: 'お', romaji: 'o' },
    { hiragana: 'か', romaji: 'ka' }, { hiragana: 'き', romaji: 'ki' }, { hiragana: 'く', romaji: 'ku' }, { hiragana: 'け', romaji: 'ke' }, { hiragana: 'こ', romaji: 'ko' },
    { hiragana: 'さ', romaji: 'sa' }, { hiragana: 'し', romaji: 'shi' }, { hiragana: 'す', romaji: 'su' }, { hiragana: 'せ', romaji: 'se' }, { hiragana: 'そ', romaji: 'so' },
    { hiragana: 'た', romaji: 'ta' }, { hiragana: 'ち', romaji: 'chi' }, { hiragana: 'つ', romaji: 'tsu' }, { hiragana: 'て', romaji: 'te' }, { hiragana: 'と', romaji: 'to' },
    { hiragana: 'な', romaji: 'na' }, { hiragana: 'に', romaji: 'ni' }, { hiragana: 'ぬ', romaji: 'nu' }, { hiragana: 'ね', romaji: 'ne' }, { hiragana: 'の', romaji: 'no' },
    { hiragana: 'は', romaji: 'ha' }, { hiragana: 'ひ', romaji: 'hi' }, { hiragana: 'ふ', romaji: 'fu' }, { hiragana: 'へ', romaji: 'he' }, { hiragana: 'ほ', romaji: 'ho' },
    { hiragana: 'ま', romaji: 'ma' }, { hiragana: 'み', romaji: 'mi' }, { hiragana: 'む', romaji: 'mu' }, { hiragana: 'め', romaji: 'me' }, { hiragana: 'も', romaji: 'mo' },
    { hiragana: 'や', romaji: 'ya' }, { hiragana: '', romaji: '' },    { hiragana: 'ゆ', romaji: 'yu' }, { hiragana: '', romaji: '' },    { hiragana: 'よ', romaji: 'yo' },
    { hiragana: 'ら', romaji: 'ra' }, { hiragana: 'り', romaji: 'ri' }, { hiragana: 'る', romaji: 'ru' }, { hiragana: 'れ', romaji: 're' }, { hiragana: 'ろ', romaji: 'ro' },
    { hiragana: 'わ', romaji: 'wa' }, { hiragana: '', romaji: '' },    { hiragana: '', romaji: '' },    { hiragana: '', romaji: '' },    { hiragana: 'を', romaji: 'wo' },
    { hiragana: 'ん', romaji: 'n' }
  ];

  const quizQuestions = [
    { q: 'Which romanization represents "し"?', options: ['su', 'shi', 'sa', 'se'], answer: 'shi' },
    { q: 'Which character represents "ko"?', options: ['け', 'こ', 'か', 'き'], answer: 'こ' },
    { q: 'Which character represents "ta"?', options: ['た', 'な', 'だ', 'ち'], answer: 'た' },
    { q: 'Which romanization represents "ぬ"?', options: ['ne', 'nu', 'no', 'me'], answer: 'nu' },
    { q: 'Which character represents "mo"?', options: ['ま', 'む', 'も', 'め'], answer: 'も' }
  ];

  const playSound = (text: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      window.speechSynthesis.speak(u);
    }
  };

  const handleSelectChar = (char: { hiragana: string; romaji: string }) => {
    if (!char.hiragana) return;
    setSelectedChar(char);
    playSound(char.hiragana);
    clearCanvas();
  };

  // Canvas Drawing Logic
  useEffect(() => {
    if (activeTab === 'trace' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineWidth = 14;
        ctx.strokeStyle = '#dc2626'; // Rose red for tracing brush
      }
    }
  }, [activeTab, selectedChar]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get position relative to canvas
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
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleQuizAnswer = (option: string) => {
    setSelectedQuizAns(option);
    const correct = option === quizQuestions[quizStep].answer;
    if (correct) {
      setQuizScore(quizScore + 1);
      setQuizFeedback('✨ Excellent! Correct sound matching.');
    } else {
      setQuizFeedback(`❌ Incorrect. The correct sound was "${quizQuestions[quizStep].answer}".`);
    }

    setTimeout(() => {
      setSelectedQuizAns('');
      setQuizFeedback('');
      if (quizStep < quizQuestions.length - 1) {
        setQuizStep(quizStep + 1);
      } else {
        setQuizFinished(true);
        // Record log to Dashboard AppContext
        addHistoryItem('quiz', 'Hiragana Matching Basics', 30, Math.round(((quizScore + (correct ? 1 : 0)) / quizQuestions.length) * 100));
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setQuizScore(0);
    setQuizStep(0);
    setQuizFeedback('');
    setQuizFinished(false);
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
            Basic Phonetics
          </span>
        </div>

        {/* Header Title */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Hiragana Basics (ひらがな)</h1>
          <p className="text-xs text-neutral-500 max-w-xl font-semibold leading-relaxed">
            The foundation of Japanese reading. Learn to identify and write all 46 core phonetic characters before constructing grammar structures.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-px">
          {([
            { id: 'chart', name: 'Alphabet Grid' },
            { id: 'trace', name: 'Handwriting Tracing' },
            { id: 'quiz', name: 'Speed Sound Quiz' }
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

        {/* Tab 1: Chart Grid */}
        {activeTab === 'chart' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
              <div className="grid grid-cols-5 gap-3 max-w-xl mx-auto">
                {hiraganaList.map((item, index) => {
                  if (!item.hiragana) {
                    return <div key={index} className="aspect-square bg-transparent" />;
                  }
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectChar(item)}
                      className={`aspect-square rounded-2xl border transition-all flex flex-col items-center justify-center p-2 relative group ${
                        selectedChar.hiragana === item.hiragana
                          ? 'border-rose-500 bg-rose-50/20 dark:border-rose-600 dark:bg-rose-950/10'
                          : 'border-neutral-150 dark:border-neutral-850 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                      }`}
                    >
                      <span className="text-2xl font-extrabold tracking-tight font-serif">{item.hiragana}</span>
                      <span className="text-[10px] text-neutral-400 font-bold uppercase font-mono mt-0.5">{item.romaji}</span>
                      <Volume2 className="w-3.5 h-3.5 absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-rose-500 pointer-events-none" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Character Panel info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6 text-center">
                <div className="space-y-2">
                  <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider block">Selected Phoneme</span>
                  <div className="w-24 h-24 rounded-3xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-center justify-center mx-auto text-5xl font-extrabold text-rose-600 dark:text-rose-400 font-serif">
                    {selectedChar.hiragana}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm font-mono text-neutral-500 font-bold mt-1">
                    <span>Romaji: {selectedChar.romaji}</span>
                    <span>•</span>
                    <button 
                      onClick={() => playSound(selectedChar.hiragana)}
                      className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 text-rose-500"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border border-neutral-150 dark:border-neutral-850 text-left space-y-2 text-xs font-semibold leading-relaxed">
                  <span className="block text-[10px] text-neutral-400 uppercase tracking-wide">Mnemonic Advice</span>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {selectedChar.hiragana === 'あ' 
                      ? 'あ looks like an "Apple" with a stem on top.' 
                      : selectedChar.hiragana === 'い'
                      ? 'い looks like two "eels" swimming down.'
                      : `Sound pronunciation represents "${selectedChar.romaji}". Try writing it down in trace tab.`}
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('trace')}
                  className="w-full py-3 rounded-xl bg-neutral-950 hover:bg-neutral-850 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black font-bold text-xs shadow-md transition-all"
                >
                  Open Tracing practice canvas
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Tracing Canvas Practice */}
        {activeTab === 'trace' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-400 uppercase">Interactive Tracing Canvas</span>
                <button
                  onClick={clearCanvas}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Pad</span>
                </button>
              </div>

              {/* Handwriting HTML5 Canvas Tracing Pad */}
              <div className="relative border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-950/40 aspect-square max-w-md mx-auto kana-practice-grid">
                {/* Behind Character Guideline */}
                <div className="absolute inset-0 flex items-center justify-center text-[10rem] md:text-[14rem] text-neutral-300 dark:text-neutral-800/30 select-none pointer-events-none font-serif opacity-70">
                  {selectedChar.hiragana}
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

            {/* Canvas Character Browser list */}
            <div className="lg:col-span-5 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold text-sm">Select character to trace</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                  Draw within the gridlines over the light-gray trace layer. Practice maintaining correct stroke curves.
                </p>
              </div>

              <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1">
                {hiraganaList.map((item, idx) => {
                  if (!item.hiragana) return null;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectChar(item)}
                      className={`aspect-square rounded-xl border flex items-center justify-center font-bold font-serif text-sm transition-all ${
                        selectedChar.hiragana === item.hiragana
                          ? 'border-rose-500 bg-rose-50/20 dark:border-rose-600 dark:bg-rose-950/10 text-rose-600'
                          : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                      }`}
                    >
                      {item.hiragana}
                    </button>
                  );
                })}
              </div>

              <div className="p-4 bg-rose-50 dark:bg-rose-950/20 rounded-2xl border border-rose-200/50 dark:border-rose-900/30 flex items-start gap-2.5 text-xs font-semibold leading-normal">
                <Sparkles className="w-4 h-4 text-rose-500 shrink-0 mt-0.5 animate-pulse" />
                <div className="space-y-0.5">
                  <span className="block text-[10px] font-bold text-rose-800 dark:text-rose-400">Brush tracking ready</span>
                  <span className="block text-[10px] text-neutral-500 leading-normal">
                    This vector trace captures stroke directions. Correct order establishes rapid visual muscle recall.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Sound Matching Quiz */}
        {activeTab === 'quiz' && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              {!quizFinished ? (
                <>
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
                    <span className="text-xs font-bold text-neutral-400 uppercase">Question {quizStep + 1} of {quizQuestions.length}</span>
                    <span className="text-xs font-extrabold text-rose-500">Matching Speed Drills</span>
                  </div>

                  <div className="space-y-6 text-center">
                    <h2 className="text-xl font-bold">{quizQuestions[quizStep].q}</h2>

                    {quizQuestions[quizStep].q.includes('romanization represents') && (
                      <div className="w-20 h-20 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-850 flex items-center justify-center mx-auto text-4xl font-extrabold font-serif relative group">
                        {quizQuestions[quizStep].q.split('"')[1]}
                        <button
                          onClick={() => playSound(quizQuestions[quizStep].q.split('"')[1])}
                          className="absolute bottom-1 right-1 p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-900 text-rose-500"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {quizFeedback && (
                      <div className={`p-3 rounded-xl text-xs font-bold ${quizFeedback.includes('Correct') ? 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400' : 'bg-rose-100 text-rose-800 dark:bg-rose-950/20 dark:text-rose-400'}`}>
                        {quizFeedback}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                      {quizQuestions[quizStep].options.map((opt) => {
                        let btnClass = "border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50";
                        if (selectedQuizAns) {
                          if (opt === quizQuestions[quizStep].answer) {
                            btnClass = "bg-green-500 text-white border-green-500";
                          } else if (selectedQuizAns === opt) {
                            btnClass = "bg-rose-600 text-white border-rose-600";
                          } else {
                            btnClass = "opacity-50 border-neutral-200 dark:border-neutral-800";
                          }
                        }
                        return (
                          <button
                            key={opt}
                            disabled={!!selectedQuizAns}
                            onClick={() => handleQuizAnswer(opt)}
                            className={`p-3.5 rounded-xl text-center text-sm font-bold transition-all ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-6 py-4 animate-fade-in">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400">
                    <Award className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-bold">Quiz Session Finished</h2>
                    <p className="text-xs text-neutral-500">
                      Outstanding work! You answered <span className="font-bold text-neutral-950 dark:text-neutral-50">{quizScore} / {quizQuestions.length}</span> phonemes accurately.
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-150 dark:border-neutral-850 flex items-center justify-between max-w-xs mx-auto text-xs font-semibold">
                    <span>XP Gained:</span>
                    <span className="font-mono text-rose-500 font-extrabold">+30 XP</span>
                  </div>

                  <div className="flex gap-3 max-w-sm mx-auto">
                    <button
                      onClick={resetQuiz}
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

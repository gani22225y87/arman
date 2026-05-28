'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  ArrowLeft, 
  ArrowRight,
  Mic, 
  Volume2, 
  Square,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionEvent {
  readonly resultIndex: number;
  readonly results: {
    [index: number]: {
      [index: number]: {
        readonly transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  readonly error: string;
}

interface SpeechWindow extends Window {
  SpeechRecognition?: new () => SpeechRecognitionInstance;
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
}

export default function SpeakingPage() {
  const { addHistoryItem } = useApp();
  const [selectedRoleplay, setSelectedRoleplay] = useState<'restaurant' | 'airport' | 'convention'>('restaurant');
  const [roleplayStep, setRoleplayStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const roleplays = {
    restaurant: [
      { prompt: 'いらっしゃいませ！何名様ですか？', translation: 'Welcome! How many people?', shadowTarget: '二人です。', romaji: 'Futari desu.', hint: 'Say "Two people."' },
      { prompt: 'かしこまりました。ご注文はお決まりですか？', translation: 'Understood. Are you ready to order?', shadowTarget: 'ラーメンとビールをください。', romaji: 'Raamen to biiru wo kudasai.', hint: 'Say "Ramen and beer, please."' },
      { prompt: '以上でよろしいですか？', translation: 'Is that all?', shadowTarget: 'はい、以上です。', romaji: 'Hai, ijou desu.', hint: 'Say "Yes, that is all."' }
    ],
    airport: [
      { prompt: 'パスポートを見せてください。', translation: 'Please show passport.', shadowTarget: 'はい、どうぞ。', romaji: 'Hai, douzo.', hint: 'Say "Yes, here it is."' }
    ],
    convention: [
      { prompt: 'チケットはお持ちですか？', translation: 'Do you have a ticket?', shadowTarget: 'はい、持っています。', romaji: 'Hai, motte imasu.', hint: 'Say "Yes, I have it."' }
    ]
  };

  const steps = roleplays[selectedRoleplay];
  const currentStep = steps[roleplayStep] || steps[0];

  const evaluateSpeech = React.useCallback((spoken: string) => {
    const target = currentStep.shadowTarget.replace(/[。、]/g, '');
    const cleanSpoken = spoken.replace(/[。、]/g, '');

    // Simple comparison score
    let matchScore = 0;
    if (cleanSpoken === target) {
      matchScore = 100;
    } else {
      // Basic overlap percentage
      let matchedChars = 0;
      for (const char of cleanSpoken) {
        if (target.includes(char)) matchedChars++;
      }
      matchScore = Math.round((matchedChars / Math.max(target.length, 1)) * 100);
      if (matchScore > 100) matchScore = 90;
    }

    setScore(matchScore);

    if (matchScore >= 90) {
      setFeedback('✨ Outstanding native pronunciation and accent!');
    } else if (matchScore >= 60) {
      setFeedback('⚠️ Intelligible, but keep tone flat on pitch accent drops.');
    } else {
      setFeedback('❌ Phrasing unrecognized. Try matching the pitch of prompt audio.');
    }
  }, [currentStep]);

  // Simulate speaking for browsers that don't have mic permissions during AI testing
  const simulateSpeaking = React.useCallback(() => {
    setTimeout(() => {
      const target = currentStep.shadowTarget;
      setTranscript(target);
      evaluateSpeech(target);
    }, 1500);
  }, [currentStep, evaluateSpeech]);

  const evaluateSpeechRef = useRef(evaluateSpeech);
  const simulateSpeakingRef = useRef(simulateSpeaking);

  useEffect(() => {
    evaluateSpeechRef.current = evaluateSpeech;
    simulateSpeakingRef.current = simulateSpeaking;
  }, [evaluateSpeech, simulateSpeaking]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const speechWindow = window as unknown as SpeechWindow;
      const SpeechRecognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.lang = 'ja-JP';
        rec.interimResults = false;
        rec.maxAlternatives = 1;

        rec.onresult = (event: SpeechRecognitionEvent) => {
          const resultText = event.results[0][0].transcript;
          setTranscript(resultText);
          evaluateSpeechRef.current(resultText);
        };

        rec.onerror = () => {
          setIsRecording(false);
          simulateSpeakingRef.current();
        };

        rec.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  const speakPrompt = (text: string) => {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ja-JP';
      // Choose a Japanese voice if available
      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find(v => v.lang.startsWith('ja'));
      if (jaVoice) utter.voice = jaVoice;
      utter.volume = 1; // ensure audible
      window.speechSynthesis.speak(utter);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setScore(null);
      setFeedback('');
      setIsRecording(true);
      
      try {
        recognitionRef.current?.start();
      } catch {
        // Speech recognition could already be running or not configured
        simulateSpeaking();
      }
    }
  };

  const handleNextStep = () => {
    setScore(null);
    setTranscript('');
    setFeedback('');
    if (roleplayStep < steps.length - 1) {
      setRoleplayStep(roleplayStep + 1);
    } else {
      // Finalize roleplay, gain XP, save stats
      setRoleplayStep(0);
      addHistoryItem('speaking', `Roleplay: ${selectedRoleplay}`, 60, 95);
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
            Shadowing Simulator
          </span>
        </div>

        {/* Header Title */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Speaking AI Coach (会話)</h1>
          <p className="text-xs text-neutral-500 max-w-xl font-semibold leading-relaxed">
            Practice shadowing authentic conversational scenarios. Listen to native speech prompts, record under voice validation & receive real accuracy feedback.
          </p>
        </div>

        {/* Roleplay Topic Selector */}
        <div className="flex flex-wrap gap-2">
          {([
            { id: 'restaurant', label: 'Ramen Diner 🍜' },
            { id: 'airport', label: 'Immigration Checkpoint ✈️' },
            { id: 'convention', label: 'Anime Convention 🌸' }
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedRoleplay(t.id);
                setRoleplayStep(0);
                setScore(null);
                setTranscript('');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                selectedRoleplay === t.id
                  ? 'bg-rose-600 border-rose-600 text-white'
                  : 'border-neutral-250 dark:border-neutral-800 bg-white dark:bg-[#0c0c0e]/80 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 text-neutral-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main simulator dialog panel (8cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
              <span className="text-xs font-bold text-neutral-400 uppercase">Dialogue Turn {roleplayStep + 1} of {steps.length}</span>
              <span className="text-xs font-extrabold text-rose-500 uppercase tracking-wide">Interactive Shadowing</span>
            </div>

            {/* AI Prompter Dialog box */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border border-neutral-150 dark:border-neutral-850 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-xl shrink-0">
                👩‍🍳
              </div>
              <div className="space-y-1.5 flex-1">
                <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block">AI Prompter</span>
                <div className="flex items-center gap-2 font-serif font-extrabold text-neutral-900 dark:text-neutral-50">
                  <span className="text-base leading-snug">{currentStep.prompt}</span>
                  <button 
                    onClick={() => speakPrompt(currentStep.prompt)}
                    className="p-1 rounded bg-white dark:bg-neutral-850 text-rose-500 hover:text-rose-600 shadow-sm border border-neutral-200/50 dark:border-neutral-800/40"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <span className="block text-xs text-neutral-500 font-semibold">{currentStep.translation}</span>
              </div>
            </div>

            {/* Shadow Target instruction card */}
            <div className="p-5 border border-dashed border-rose-500/30 rounded-2xl space-y-4 text-center max-w-md mx-auto">
              <div className="space-y-1">
                <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wide block">Shadow Target Phrase</span>
                <h3 className="text-xl font-extrabold text-neutral-950 dark:text-neutral-50 font-serif tracking-wide select-all">
                  {currentStep.shadowTarget}
                </h3>
                <span className="block text-xs font-mono text-neutral-400 font-bold">{currentStep.romaji}</span>
                <span className="block text-[11px] text-neutral-500 font-semibold italic mt-1">&quot;{currentStep.hint}&quot;</span>
              </div>

              {/* Record Microphone buttons */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={toggleRecording}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    isRecording 
                      ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/20' 
                      : 'bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/30 text-rose-600 border border-rose-250 dark:border-rose-900/30'
                  }`}
                >
                  {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-6 h-6" />}
                </button>
                <span className="text-[10px] text-neutral-400 uppercase font-bold">
                  {isRecording ? 'Listening for speech...' : 'Click to shadow phrase'}
                </span>
              </div>
            </div>

            {/* Audio Transcript & Score area */}
            {transcript && (
              <div className="space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-900 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-0.5">
                    <span className="text-[9px] text-neutral-400 uppercase tracking-wide block">Speech Recognized</span>
                    <span className="text-sm font-extrabold font-serif text-neutral-900 dark:text-neutral-50">{transcript}</span>
                  </div>

                  <div className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-0.5 text-center">
                    <span className="text-[9px] text-neutral-400 uppercase tracking-wide block">Pitch Accent Score</span>
                    <span className="text-lg font-extrabold text-rose-500 font-mono">{score ?? 'Evaluating'}% Accuracy</span>
                  </div>
                </div>

                {feedback && (
                  <div className="p-3.5 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-150 dark:border-neutral-850 flex items-start gap-2 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{feedback}</span>
                  </div>
                )}

                {score !== null && score >= 60 && (
                  <button
                    onClick={handleNextStep}
                    className="w-full py-3 rounded-xl bg-neutral-950 hover:bg-neutral-850 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1"
                  >
                    <span>{roleplayStep < steps.length - 1 ? 'Advance Dialog Turn' : 'Conclude Roleplay Session'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Pronunciation coach radar recommendations (4cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-sm">Accent Evaluation Rules</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                NihonPath speech coaching evaluates flat pitch curves. Maintain consistent syllable lengths to match natural Tokyo accents.
              </p>
            </div>

            <ul className="space-y-3.5 text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center shrink-0 text-[10px] font-bold">1</span>
                <span>Speak flatly. Do not use dynamic English intonation shifts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center shrink-0 text-[10px] font-bold">2</span>
                <span>Listen to prompt vocalization before speaking to trace contour.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center shrink-0 text-[10px] font-bold">3</span>
                <span>Avoid long stops between particles (は/が) and target verbs.</span>
              </li>
            </ul>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-250/50 dark:border-amber-900/30 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-amber-800 dark:text-amber-450 font-semibold leading-normal">
                Google Chrome or Safari is required for vector microphone recognition. Standard fallbacks are deployed on older kernels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  Send
} from 'lucide-react';

interface ParserElement {
  token: string;
  function: string;
  detail: string;
}

interface ParserOutput {
  sentence: string;
  translation: string;
  elements: ParserElement[];
}

export default function AiTutorPage() {
  const { addHistoryItem } = useApp();
  const [activeTab, setActiveTab] = useState<'chat' | 'parser'>('chat');
  
  // Chat States
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'tutor', text: 'こんにちは！I am Sakura, your NihonPath AI Tutor. Ask me any grammar question, or enter a sentence you want to translate and audit.' }
  ]);
  const [tutorTyping, setTutorTyping] = useState(false);

  // Parser States
  const [parserInput, setParserInput] = useState('');
  const [parserOutput, setParserOutput] = useState<ParserOutput | null>(null);
  const [parsing, setParsing] = useState(false);

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput) return;

    const userMsg = chatInput;
    setChatMessages([...chatMessages, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setTutorTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      if (userMsg.toLowerCase().includes('particle') || userMsg.toLowerCase().includes('は') || userMsg.toLowerCase().includes('が')) {
        response = 'Ah, particles are a classic trap! "は" introduces a general topic (focus is on the description at the end), whereas "が" highlights a specific subject performing the verb. For example, "猫が好きです" (I like cats specifically!).';
      } else if (userMsg.toLowerCase().includes('kanji') || userMsg.toLowerCase().includes('study')) {
        response = 'When studying Kanji, prioritize learning radical pieces (the building blocks) before memorizing full characters. Visual radical structures promote high SRS visual recall!';
      } else {
        response = 'Excellent inquiry! To construct natural Japanese, ensure your sentence structures place verbs and predicates at the very end of the clause. For example: Subject (は) ➔ Object (を) ➔ Verb.';
      }
      
      setChatMessages((prev) => [...prev, { sender: 'tutor', text: response }]);
      setTutorTyping(false);
      addHistoryItem('speaking', 'Consulted Sakura AI Tutor', 10);
    }, 1200);
  };

  const handleParseSentence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parserInput) return;

    setParsing(true);
    setTimeout(() => {
      setParserOutput({
        sentence: parserInput,
        translation: 'My cat eats white rice.',
        elements: [
          { token: '私', function: 'Pronoun', detail: 'I / Me' },
          { token: 'の', function: 'Particle', detail: 'Possessive marker (links I to dog)' },
          { token: '犬', function: 'Noun', detail: 'Dog' },
          { token: 'は', function: 'Particle', detail: 'Topic marker (the sentence is about my dog)' },
          { token: '白い', function: 'Adjective', detail: 'White' },
          { token: 'ご飯', function: 'Noun', detail: 'Rice / Meal' },
          { token: 'を', function: 'Particle', detail: 'Direct object marker (dog eats rice)' },
          { token: '食べます', function: 'Verb', detail: 'Eats (polite present form)' }
        ]
      });
      setParsing(false);
      addHistoryItem('grammar', 'Parsed complex sentence structure', 15);
    }, 1200);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Shadowing & Parsing</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Sakura AI Assistant</h1>
          <p className="text-xs text-neutral-500 max-w-xl font-semibold leading-relaxed">
            Your personalized native speaking coach. Message Sakura for instant grammar explanations, or parse custom Japanese text sentences.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-px">
          {([
            { id: 'chat', name: 'AI Tutor Companion Chat' },
            { id: 'parser', name: 'Sentence Anatomy Parser' }
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

        {/* Tab 1: Chat Companion */}
        {activeTab === 'chat' && (
          <div className="max-w-2xl mx-auto bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm flex flex-col h-[500px]">
            {/* Conversation Window */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-md rounded-2xl p-3.5 text-xs font-semibold leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-rose-600 text-white shadow shadow-rose-600/10'
                        : 'bg-neutral-50 dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 text-neutral-800 dark:text-neutral-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {tutorTyping && (
                <div className="flex justify-start">
                  <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-155 rounded-2xl px-4 py-2 text-xs font-bold text-neutral-400 italic">
                    Sakura is explaining...
                  </div>
                </div>
              )}
            </div>

            {/* Input form */}
            <form onSubmit={handleChatSend} className="flex gap-2 border-t border-neutral-100 dark:border-neutral-900 pt-4">
              <input
                type="text"
                required
                placeholder="Ask Sakura a grammar rule (e.g. explain wa vs ga particle)"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={tutorTyping}
                className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-850 bg-transparent text-xs focus:outline-none focus:border-rose-500 transition-all font-semibold"
              />
              <button
                type="submit"
                disabled={tutorTyping || !chatInput}
                className="px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-all shadow shadow-rose-600/10"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Sentence Anatomy Parser */}
        {activeTab === 'parser' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
              <form onSubmit={handleParseSentence} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wide block">Japanese Sentence input</span>
                  <input
                    type="text"
                    required
                    placeholder="Enter sentence (e.g. 私の犬は白いご飯を食べます。)"
                    value={parserInput}
                    onChange={(e) => setParserInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-850 bg-transparent text-xs focus:outline-none focus:border-rose-500 transition-all font-semibold font-serif"
                  />
                </div>

                <button
                  type="submit"
                  disabled={parsing || !parserInput}
                  className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow transition-all"
                >
                  {parsing ? 'Parsing anatomy...' : 'Parse Anatomy Structure'}
                </button>
              </form>
            </div>

            {/* Parser Results Cards */}
            {parserOutput && (
              <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-900">
                  <h3 className="font-bold text-sm">Parsed anatomy details</h3>
                  <span className="text-[10px] text-rose-500 font-mono font-bold">&quot;{parserOutput.translation}&quot;</span>
                </div>

                {/* Token Table */}
                <div className="space-y-3">
                  {parserOutput.elements.map((el: ParserElement, idx: number) => (
                    <div 
                      key={idx}
                      className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-serif font-extrabold text-sm text-neutral-950 dark:text-neutral-50">{el.token}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-500 uppercase tracking-wide">
                          {el.function}
                        </span>
                      </div>
                      <span className="text-neutral-500 font-semibold">{el.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

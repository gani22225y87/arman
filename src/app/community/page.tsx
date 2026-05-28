'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  ChevronRight, 
  MessageSquare,
  TrendingUp
} from 'lucide-react';

export default function CommunityPage() {
  const { stats } = useApp();
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'forum'>('leaderboard');

  const leaderboardUsers = [
    { rank: 1, name: 'Satoshi (N2)', xp: 4500, streak: 84, avatar: '🦊' },
    { rank: 2, name: 'Rin (N3)', xp: 3200, streak: 50, avatar: '🌸' },
    { rank: 3, name: stats.name + ' (You)', xp: stats.xp, streak: stats.streak, avatar: '🥋', isSelf: true },
    { rank: 4, name: 'Kenji (N4)', xp: 1200, streak: 12, avatar: '🍜' },
    { rank: 5, name: 'Hana (N5)', xp: 850, streak: 8, avatar: '🍣' }
  ].sort((a, b) => b.xp - a.xp);

  const forumThreads = [
    {
      id: 1,
      title: 'Nuance of using ~やがる vs ~やがる in casual anime Japanese',
      author: 'OtakuFluency (N2)',
      replies: 14,
      category: 'Anime/immersion',
      likes: 32
    },
    {
      id: 2,
      title: 'Recommendations for graded readers before transitioning to raw manga?',
      author: 'KanjiMaster (N3)',
      replies: 8,
      category: 'Immersion Graded',
      likes: 19
    },
    {
      id: 3,
      title: 'Is it normal to struggle with listening speed in N3 podcasts?',
      author: 'ListeningStruggles (N4)',
      replies: 22,
      category: 'Listening Comprehension',
      likes: 45
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fluency Study Groups</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">NihonPath Community</h1>
          <p className="text-xs text-neutral-500 max-w-xl font-semibold leading-relaxed">
            Pair program your fluency progress. Compare streaks on the active weekly leaderboards, join study groups, and discuss anime translation nuances.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-px">
          {([
            { id: 'leaderboard', name: 'Weekly Study Leaderboards' },
            { id: 'forum', name: 'Immersion Discussion Boards' }
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

        {/* Tab 1: Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-xl mx-auto bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-base">Weekly XP Leaderboard</h3>
              </div>
              <span className="text-xs text-neutral-400 font-bold uppercase">Resetting in 3 Days</span>
            </div>

            <div className="space-y-3">
              {leaderboardUsers.map((user, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    user.isSelf
                      ? 'border-rose-500/40 bg-rose-50/20 dark:border-rose-600/30 dark:bg-rose-950/10'
                      : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm font-extrabold text-neutral-400 w-4">
                      #{idx + 1}
                    </span>
                    <span className="text-2xl select-none">{user.avatar}</span>
                    <div>
                      <span className={`text-sm font-semibold leading-none ${user.isSelf ? 'font-extrabold text-rose-600' : ''}`}>
                        {user.name}
                      </span>
                      <span className="block text-[10px] text-neutral-400 font-semibold mt-0.5">{user.streak} Days active streak</span>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200 font-mono">
                    {user.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Forum */}
        {activeTab === 'forum' && (
          <div className="max-w-2xl mx-auto space-y-4">
            {forumThreads.map((thread) => (
              <div 
                key={thread.id}
                className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-sm space-y-4 hover:border-rose-500/40 transition-colors group cursor-pointer"
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-500 uppercase tracking-wider">
                      {thread.category}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-semibold">Posted by {thread.author}</span>
                  </div>

                  <h3 className="font-extrabold text-sm text-neutral-900 dark:text-neutral-50 group-hover:text-rose-600 transition-colors leading-snug">
                    {thread.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-900 pt-3 text-[10px] text-neutral-400 font-bold uppercase">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{thread.replies} Replies</span>
                    </span>
                    <span>{thread.likes} Likes</span>
                  </div>

                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

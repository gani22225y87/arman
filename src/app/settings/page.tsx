'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { 
  Settings,
  Volume2,
  User,
  SunMoon
} from 'lucide-react';

export default function SettingsPage() {
  const { stats, setStats } = useApp();
  const [nameInput, setNameInput] = useState(stats.name);
  const [dailyGoalInput, setDailyGoalInput] = useState(stats.dailyGoal);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStats({
      ...stats,
      name: nameInput,
      dailyGoal: dailyGoalInput
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-wider">
            <Settings className="w-3.5 h-3.5" />
            <span>Preferences Panel</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">System Preferences</h1>
          <p className="text-xs text-neutral-500 max-w-xl font-semibold leading-relaxed">
            Audit your username credentials, adjust standard daily study goals, set speech syntheses voice speeds, and configure light/dark mode overrides.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Account details (8cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-rose-500" />
                  <h3 className="font-bold text-base">Account Credentials</h3>
                </div>
                {success && (
                  <span className="text-xs font-bold text-green-500 animate-fade-in">Preferences saved successfully ✓</span>
                )}
              </div>

              {/* Username Input */}
              <div className="space-y-1.5 max-w-sm">
                <span className="block text-[10px] text-neutral-400 font-bold uppercase tracking-wide">Display Username</span>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-850 bg-transparent text-xs focus:outline-none focus:border-rose-500 transition-all font-semibold"
                />
              </div>

              {/* Daily Goal Input */}
              <div className="space-y-2">
                <span className="block text-[10px] text-neutral-400 font-bold uppercase tracking-wide">Daily Immersion Goal</span>
                <div className="flex gap-2">
                  {[
                    { val: 10, label: 'Casual (10 min)' },
                    { val: 30, label: 'Serious (30 min)' },
                    { val: 60, label: 'Intense (60 min)' }
                  ].map((goal) => (
                    <button
                      key={goal.val}
                      type="button"
                      onClick={() => setDailyGoalInput(goal.val)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        dailyGoalInput === goal.val
                          ? 'bg-neutral-950 border-neutral-950 text-white dark:bg-white dark:border-white dark:text-black shadow-sm'
                          : 'border-neutral-250 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 text-neutral-500'
                      }`}
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow hover:scale-[1.01] transition-all"
              >
                Save Preferences
              </button>
            </form>
          </div>

          {/* Voice Speech Control Panel (4cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
            {/* Voice Audio settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-neutral-105 dark:border-neutral-900 pb-3">
                <Volume2 className="w-5 h-5 text-rose-500" />
                <h4 className="font-bold text-sm">Vocal Syntheses</h4>
              </div>

              <div className="space-y-3 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Default Rate Speed:</span>
                  <span className="font-mono text-neutral-800 dark:text-neutral-200 font-bold">{speechRate}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-rose-650"
                />
              </div>
            </div>

            {/* Theme switcher */}
            <div className="space-y-4 pt-4 border-t border-neutral-105 dark:border-neutral-900">
              <div className="flex items-center gap-2 pb-2">
                <SunMoon className="w-5 h-5 text-rose-500" />
                <h4 className="font-bold text-sm">Interface Skins</h4>
              </div>

              <div className="flex gap-2">
                {(['dark', 'light'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all uppercase ${
                      theme === t
                        ? 'bg-neutral-950 border-neutral-950 text-white dark:bg-white dark:border-white dark:text-black shadow'
                        : 'border-neutral-250 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                    }`}
                  >
                    {t} Mode
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

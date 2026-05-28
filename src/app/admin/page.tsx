'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Sliders,
  ShieldCheck,
  Activity
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'cms' | 'logs'>('cms');
  const [successMsg, setSuccessMsg] = useState('');

  // Course Management State
  const [courseList, setCourseList] = useState([
    { id: 1, name: 'Hiragana Basics', level: 'N5 Foundations', lessons: 8 },
    { id: 2, name: 'Katakana Loanwords', level: 'N5 Foundations', lessons: 6 },
    { id: 3, name: 'Radical Kanji SRS', level: 'N5 Core Vocabulary', lessons: 12 },
    { id: 4, name: 'State Verb Nuances', level: 'N4 Structures', lessons: 15 }
  ]);

  const handleLessonUpdate = (id: number, val: number) => {
    setCourseList(courseList.map((c) => c.id === id ? { ...c, lessons: val } : c));
    setSuccessMsg('Lesson parameters updated successfully ✓');
    setTimeout(() => setSuccessMsg(''), 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Root Admin Console</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Admin Dashboard & CMS</h1>
          <p className="text-xs text-neutral-500 max-w-xl font-semibold leading-relaxed">
            Manage course curriculum lesson metrics, check active mock server telemetry streams, audit moderator actions, and control schedule parameters.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-px">
          {([
            { id: 'cms', name: 'Curriculum Content CMS' },
            { id: 'logs', name: 'Server Telemetry Logs' }
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

        {/* Tab 1: CMS */}
        {activeTab === 'cms' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* List Course Card (8cols) */}
            <div className="lg:col-span-8 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-rose-500" />
                  <h3 className="font-bold text-base">Active Course Parameters</h3>
                </div>
                {successMsg && (
                  <span className="text-xs font-bold text-green-500 animate-fade-in">{successMsg}</span>
                )}
              </div>

              <div className="space-y-4">
                {courseList.map((course) => (
                  <div 
                    key={course.id}
                    className="p-4 border border-neutral-200 dark:border-neutral-850 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs font-semibold"
                  >
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-sm text-neutral-900 dark:text-neutral-50 leading-none">{course.name}</h4>
                      <span className="block text-[9px] text-neutral-400 font-bold uppercase tracking-wider">{course.level}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-neutral-500">Active Lessons:</span>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={course.lessons}
                        onChange={(e) => handleLessonUpdate(course.id, parseInt(e.target.value) || 1)}
                        className="w-16 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-center font-mono font-bold focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats Panel (4cols) */}
            <div className="lg:col-span-4 bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold text-sm">Course Editor Notes</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                  Updating curriculum items automatically syncs with user radar progress targets on the homepage. Change lessons carefully.
                </p>
              </div>

              <div className="p-4 bg-rose-50 dark:bg-rose-950/20 rounded-2xl border border-rose-200/50 dark:border-rose-900/30 text-[10px] text-neutral-500 font-semibold leading-normal">
                Curriculum updates commit instantly to local catalog databases. Backup procedures run daily at 04:00 UTC.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Logs */}
        {activeTab === 'logs' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-rose-500" />
                  <h3 className="font-bold text-base">Server Health Telemetry</h3>
                </div>
                <span className="text-xs font-mono font-bold text-green-500 animate-pulse">SYSTEMS OPERATIONAL</span>
              </div>

              {/* Server metrics */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Server Latency', val: '12ms', sub: 'Priority Tokyo Edge' },
                  { label: 'Active Learners', val: '450k', sub: 'Live sockets streams' },
                  { label: 'Mock Scheduler', val: 'Idle', sub: 'Cron logs verified' }
                ].map((stat, idx) => (
                  <div key={idx} className="p-3 border border-neutral-250 dark:border-neutral-800 rounded-2xl space-y-0.5 text-center">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wide block">{stat.label}</span>
                    <span className="text-base font-extrabold text-neutral-900 dark:text-neutral-50 font-mono">{stat.val}</span>
                    <span className="block text-[9px] text-neutral-500 font-semibold">{stat.sub}</span>
                  </div>
                ))}
              </div>

              {/* Logs output */}
              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-850 space-y-2 text-[10px] font-mono text-neutral-450 leading-relaxed max-h-40 overflow-y-auto">
                <p className="text-green-500">[04:00:12] Cron scheduled logs initialized.</p>
                <p className="text-green-500">[04:00:15] Backup databases archive saved to s3://nihonpath/backups.</p>
                <p className="text-blue-500">[04:12:44] User upgraded plan to Pro. Stripe callback verified.</p>
                <p className="text-amber-500">[04:15:32] Warn: speechSyntheses voice speed adjustment threshold warning.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

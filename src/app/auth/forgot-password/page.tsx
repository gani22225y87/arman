'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-neutral-50 text-neutral-900 dark:bg-[#09090b] dark:text-neutral-50">
      {/* Background Decorative */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute text-[15rem] font-bold font-serif top-0 left-0">鍵</div>
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-rose-500/10 rounded-full blur-[100px] -z-20 pointer-events-none" />

      <div className="w-full max-w-md space-y-6">
        <Link 
          href="/auth/login" 
          className="inline-flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>

        <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center space-y-1">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900 text-rose-500 font-bold mb-2">
                  🔑
                </div>
                <h1 className="text-xl font-bold tracking-tight">Reset your Password</h1>
                <p className="text-xs text-neutral-500">We will send a secure link to restore access</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm focus:outline-none focus:border-rose-500/50 dark:focus:border-rose-500/30 transition-all font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/10 hover:shadow-rose-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? 'Sending link...' : 'Send Recovery Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4 py-4 animate-fade-in">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold">Email Sent Successfully</h2>
                <p className="text-xs text-neutral-500">
                  We sent a recovery email to <span className="font-bold text-neutral-900 dark:text-neutral-50">{email}</span>. Please check your inbox and follow the instructions.
                </p>
              </div>
              <Link
                href="/auth/login"
                className="block w-full py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-bold transition-all"
              >
                Return to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { stats, setStats } = useApp();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate login
    setTimeout(() => {
      setStats({
        ...stats,
        email: formData.email,
        name: formData.email.split('@')[0],
        isLoggedIn: true,
      });
      router.push('/dashboard');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setStats({
        ...stats,
        email: 'learner.google@gmail.com',
        name: 'GoogleLearner',
        isLoggedIn: true,
      });
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-neutral-50 text-neutral-900 dark:bg-[#09090b] dark:text-neutral-50">
      {/* Background Decorative */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute text-[15rem] font-bold font-serif top-0 left-0">登</div>
        <div className="absolute text-[15rem] font-bold font-serif bottom-0 right-0">録</div>
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-rose-500/10 rounded-full blur-[100px] -z-20 pointer-events-none" />

      <div className="w-full max-w-md space-y-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing</span>
        </Link>

        <div className="bg-white dark:bg-[#0c0c0e]/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <Link href="/" className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-rose-600 font-bold text-white shadow-md mb-2">
              N
            </Link>
            <h1 className="text-xl font-bold tracking-tight">Welcome back to NihonPath</h1>
            <p className="text-xs text-neutral-500">Pick up where you left off on your fluency path</p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-100 text-rose-800 dark:bg-rose-950/30 dark:text-rose-400 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm focus:outline-none focus:border-rose-500/50 dark:focus:border-rose-500/30 transition-all font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Password</label>
                <Link href="/auth/forgot-password" className="text-[10px] font-bold text-rose-500 hover:text-rose-600">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm focus:outline-none focus:border-rose-500/50 dark:focus:border-rose-500/30 transition-all font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/10 hover:shadow-rose-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Logging you in...' : 'Sign In'}
            </button>
          </form>

          {/* Social Separator */}
          <div className="flex items-center gap-3 py-2">
            <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-800" />
            <span className="text-[10px] font-bold text-neutral-400 uppercase">Or continue with</span>
            <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-800" />
          </div>

          {/* Social Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900/50 font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            {/* Google Icon SVG */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-xs text-neutral-500">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-bold text-rose-500 hover:text-rose-600">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

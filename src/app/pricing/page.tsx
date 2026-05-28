'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Sparkles, 
  CheckCircle2,
  CreditCard
} from 'lucide-react';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const plans = [
    {
      name: 'Free Path',
      desc: 'Build foundational kana and study up to 5 Kanji per day.',
      price: 0,
      features: [
        'Complete Hiragana & Katakana',
        'Daily quest logs checks',
        'Radical WaniKani SRS (N5 only)',
        'Basic speech recognition shadowing'
      ],
      cta: 'Current Plan',
      isPremium: false,
      locked: false
    },
    {
      name: 'Pro Immersion',
      desc: 'Access complete N5-N1 roadmaps, unlimited AI shadowing & graded readers.',
      price: billingPeriod === 'yearly' ? 9 : 14,
      features: [
        'Everything in Free',
        'Complete JLPT N5-N1 roadmaps',
        'Unlimited AI Speech Shadows',
        'Unlimited Graded Manga Readers',
        'Unlimited AI Tutor explains questions',
        'Stripe billing priority diagnostics'
      ],
      cta: 'Upgrade to Pro',
      isPremium: true,
      popular: true
    }
  ];

  const handleCheckout = () => {
    setProcessing(true);
    // Simulate Stripe payment checkout screen
    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
    }, 1800);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header Title */}
        <div className="space-y-2 text-center max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-wider bg-rose-50 dark:bg-rose-950/20 px-2 py-0.5 rounded-lg border border-rose-100 dark:border-rose-900/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premium Fluency Accel</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Structured Fluency Plans</h1>
          <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
            Unlock complete N5 to N1 graded roadmaps and native speech audios. Invest in real consistency, not gamified addictions.
          </p>
        </div>

        {/* Toggle Period Controls */}
        <div className="flex justify-center">
          <div className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-1 flex gap-1 border border-neutral-200/50 dark:border-neutral-800/40 select-none">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white dark:bg-black text-rose-600 shadow'
                  : 'text-neutral-500 hover:text-neutral-850 dark:hover:text-neutral-250'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingPeriod === 'yearly'
                  ? 'bg-white dark:bg-black text-rose-600 shadow'
                  : 'text-neutral-500 hover:text-neutral-850 dark:hover:text-neutral-250'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="text-[9px] bg-rose-50 dark:bg-rose-950 text-rose-600 font-extrabold px-1.5 py-0.5 rounded">Save 35%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
          {plans.map((p) => (
            <div 
              key={p.name}
              className={`bg-white dark:bg-[#0c0c0e]/80 border rounded-3xl p-6 flex flex-col justify-between relative transition-all hover:scale-[1.01] ${
                p.popular 
                  ? 'border-rose-500 shadow-xl shadow-rose-500/5 ring-1 ring-rose-500/20' 
                  : 'border-neutral-200 dark:border-neutral-800 shadow-sm'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-rose-600 text-white text-[9px] font-extrabold uppercase tracking-widest shadow shadow-rose-600/10">
                  Most Popular Accel
                </div>
              )}

              <div className="space-y-6">
                {/* Title & Desc */}
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-neutral-900 dark:text-neutral-50">{p.name}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-semibold">{p.desc}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-50 font-mono">${p.price}</span>
                  <span className="text-xs text-neutral-400 font-bold uppercase">/ {billingPeriod === 'yearly' ? 'year billed annually' : 'month'}</span>
                </div>

                {/* Features checklist */}
                <ul className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-900">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="pt-8">
                {p.isPremium ? (
                  <button
                    disabled={paymentSuccess}
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow shadow-rose-600/10 flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{paymentSuccess ? 'Premium Active ✓' : p.cta}</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-500 font-bold text-xs cursor-default"
                  >
                    {p.cta}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mock Checkout Overlay Modal */}
        {processing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl animate-scale-up">
              <div className="w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center mx-auto animate-pulse">
                <CreditCard className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base">Processing stripe order...</h3>
                <p className="text-xs text-neutral-500 leading-normal font-semibold">
                  Validating standard mock ledger credit parameters. Securing SSL handshake logs.
                </p>
              </div>
              <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                <div className="h-full bg-rose-600 w-2/3 rounded-full animate-marquee" />
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {paymentSuccess && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl animate-scale-up">
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base">Premium Upgrade Success!</h3>
                <p className="text-xs text-neutral-500 leading-normal font-semibold">
                  Outstanding selection! You have successfully upgraded to NihonPath Pro. All graded roadmaps are fully unlocked.
                </p>
              </div>
              <button
                onClick={() => setPaymentSuccess(false)}
                className="w-full py-3 rounded-xl bg-neutral-950 hover:bg-neutral-850 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black font-bold text-xs shadow-md transition-all"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

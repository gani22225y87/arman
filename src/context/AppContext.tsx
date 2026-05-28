'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserStats {
  name: string;
  email: string;
  isLoggedIn: boolean;
  currentLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'Beginner';
  xp: number;
  streak: number;
  wordsLearned: number;
  kanjiMastered: number;
  studyTime: number; // in minutes
  dailyGoal: number; // in minutes
  level: number;
  badgeIds: string[];
  weakAreas: {
    speaking: number;
    listening: number;
    kanji: number;
    grammar: number;
    vocabulary: number;
  };
  savedVocab: string[];
  bookmarks: string[];
  history: Array<{
    id: string;
    date: string;
    type: 'quiz' | 'listening' | 'speaking' | 'writing' | 'reading' | 'grammar';
    title: string;
    score?: number;
    xpGained: number;
  }>;
  dailyQuests: Array<{
    id: string;
    title: string;
    xp: number;
    target: number;
    current: number;
    completed: boolean;
  }>;
  isPremium: boolean;
}

interface AppContextType {
  stats: UserStats;
  streakHistory: string[]; // dates of study
  darkMode: boolean;
  onboardingComplete: boolean;
  activeTheme: string;
  setStats: React.Dispatch<React.SetStateAction<UserStats>>;
  toggleDarkMode: () => void;
  setOnboardingComplete: (val: boolean) => void;
  setActiveTheme: (theme: string) => void;
  addXP: (amount: number) => void;
  addStudyTime: (minutes: number) => void;
  toggleSaveVocab: (word: string) => boolean;
  addHistoryItem: (type: UserStats['history'][0]['type'], title: string, xp: number, score?: number) => void;
  recordStudySession: () => void;
}

const defaultQuests = [
  { id: '1', title: 'Complete a speaking roleplay', xp: 50, target: 1, current: 0, completed: false },
  { id: '2', title: 'Learn 5 new Kanji characters', xp: 40, target: 5, current: 0, completed: false },
  { id: '3', title: 'Practice listening for 5 minutes', xp: 30, target: 5, current: 0, completed: false },
];

const initialStats: UserStats = {
  name: 'Kenji',
  email: 'learner@nihonpath.com',
  isLoggedIn: true,
  currentLevel: 'N5',
  xp: 420,
  streak: 5,
  wordsLearned: 32,
  kanjiMastered: 12,
  studyTime: 45,
  dailyGoal: 30,
  level: 3,
  badgeIds: ['first_steps', 'streak_3'],
  weakAreas: {
    speaking: 65,
    listening: 78,
    kanji: 45,
    grammar: 70,
    vocabulary: 82,
  },
  savedVocab: ['食べる', '美味しい', '日本語'],
  bookmarks: ['N5 Grammar: particles は vs が'],
  history: [
    { id: 'h1', date: '2026-05-17', type: 'quiz', title: 'Hiragana Basics', score: 90, xpGained: 30 },
    { id: 'h2', date: '2026-05-17', type: 'grammar', title: 'N5 Grammar particles', score: 100, xpGained: 50 },
    { id: 'h3', date: '2026-05-18', type: 'speaking', title: 'Restaurant Order Roleplay', score: 85, xpGained: 60 },
  ],
  dailyQuests: defaultQuests,
  isPremium: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(initialStats);
  const [streakHistory, setStreakHistory] = useState<string[]>(['2026-05-14', '2026-05-15', '2026-05-16', '2026-05-17', '2026-05-18']);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(false);
  const [activeTheme, setActiveTheme] = useState<string>('minimalist');

  // Load from LocalStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('nihonpath_stats');
    const savedStreak = localStorage.getItem('nihonpath_streak');
    const savedDarkMode = localStorage.getItem('nihonpath_dark');
    const savedOnboarding = localStorage.getItem('nihonpath_onboarding');
    const savedTheme = localStorage.getItem('nihonpath_theme');

    if (savedStats) setStats(JSON.parse(savedStats));
    if (savedStreak) setStreakHistory(JSON.parse(savedStreak));
    if (savedDarkMode) {
      const isDark = JSON.parse(savedDarkMode);
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Default to dark mode for premium look
      document.documentElement.classList.add('dark');
    }
    if (savedOnboarding) setOnboardingComplete(JSON.parse(savedOnboarding));
    if (savedTheme) setActiveTheme(savedTheme);
  }, []);

  // Save to LocalStorage helper
  const saveState: React.Dispatch<React.SetStateAction<UserStats>> = (value) => {
    setStats((prev) => {
      const next = typeof value === 'function' ? (value as (prev: UserStats) => UserStats)(prev) : value;
      localStorage.setItem('nihonpath_stats', JSON.stringify(next));
      return next;
    });
  };

  const toggleDarkMode = () => {
    const nextVal = !darkMode;
    setDarkMode(nextVal);
    localStorage.setItem('nihonpath_dark', JSON.stringify(nextVal));
    if (nextVal) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setOnboarding = (val: boolean) => {
    setOnboardingComplete(val);
    localStorage.setItem('nihonpath_onboarding', JSON.stringify(val));
  };

  const setTheme = (theme: string) => {
    setActiveTheme(theme);
    localStorage.setItem('nihonpath_theme', theme);
  };

  const addXP = (amount: number) => {
    const nextXP = stats.xp + amount;
    const currentLevel = stats.level;
    // Simple level progression: level * 200 XP needed to level up
    const xpNeededForNext = currentLevel * 250;
    let nextLevel = currentLevel;
    let finalXP = nextXP;

    if (finalXP >= xpNeededForNext) {
      finalXP -= xpNeededForNext;
      nextLevel += 1;
    }

    const updated = {
      ...stats,
      xp: finalXP,
      level: nextLevel,
    };
    saveState(updated);
  };

  const addStudyTime = (minutes: number) => {
    const updated = {
      ...stats,
      studyTime: stats.studyTime + minutes,
    };
    saveState(updated);
  };

  const toggleSaveVocab = (word: string): boolean => {
    const alreadySaved = stats.savedVocab.includes(word);
    let updatedVocab = [];
    if (alreadySaved) {
      updatedVocab = stats.savedVocab.filter((v) => v !== word);
    } else {
      updatedVocab = [...stats.savedVocab, word];
    }
    const updated = {
      ...stats,
      savedVocab: updatedVocab,
    };
    saveState(updated);
    return !alreadySaved;
  };

  const addHistoryItem = (type: UserStats['history'][0]['type'], title: string, xp: number, score?: number) => {
    const today = new Date().toISOString().split('T')[0];
    const newHistory: UserStats['history'][0] = {
      id: `h-${Date.now()}`,
      date: today,
      type,
      title,
      score,
      xpGained: xp,
    };

    // Update daily quests
    const updatedQuests = stats.dailyQuests.map((q) => {
      let current = q.current;
      if (q.id === '1' && type === 'speaking') {
        current += 1;
      }
      if (q.id === '2' && type === 'quiz' && title.includes('Kanji')) {
        current += 5; // Simulating mastering kanji
      }
      if (q.id === '3' && type === 'listening') {
        current += 5; // Simulating 5 minutes
      }
      const completed = current >= q.target;
      return {
        ...q,
        current: Math.min(current, q.target),
        completed,
      };
    });

    const updated = {
      ...stats,
      history: [newHistory, ...stats.history].slice(0, 50), // keep last 50
      dailyQuests: updatedQuests,
    };

    saveState(updated);
    addXP(xp);
    recordStudySession();
  };

  const recordStudySession = () => {
    const today = new Date().toISOString().split('T')[0];
    if (!streakHistory.includes(today)) {
      const newStreakHistory = [...streakHistory, today];
      setStreakHistory(newStreakHistory);
      localStorage.setItem('nihonpath_streak', JSON.stringify(newStreakHistory));

      // Calculate streak
      const updated = {
        ...stats,
        streak: stats.streak + 1,
      };
      saveState(updated);
    }
  };

  return (
    <AppContext.Provider
      value={{
        stats,
        streakHistory,
        darkMode,
        onboardingComplete,
        activeTheme,
        setStats: saveState,
        toggleDarkMode,
        setOnboardingComplete: setOnboarding,
        setActiveTheme: setTheme,
        addXP,
        addStudyTime,
        toggleSaveVocab,
        addHistoryItem,
        recordStudySession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

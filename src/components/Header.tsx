import React from 'react';
import { useStudy } from '../context/StudyContext';
import { Moon, Sun, Timer, Flame, Sparkles, BookOpen, Languages } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    isDarkMode,
    toggleDarkMode,
    stats,
    currentSession,
    setShowZenTimer,
    startFull100Mock,
    setShowLanguageModal,
    language
  } = useStudy();

  const getBreadcrumbTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Study Dashboard';
      case 'test-series':
        return 'Test Series Hub (GS, CSAT, State PSC & NCERT)';
      case 'simulator':
        return currentSession ? currentSession.title : '100-Question Prelims Simulator';
      case 'practice':
        return 'Practice & PYQ Filter Engine';
      case 'current-affairs':
        return 'Current Affairs Compendium (GS 1-2-3)';
      case 'csat-tricks':
        return 'CSAT Easy Tricks: Zero to Hero (Paper-II 66+)';
      case 'ai-mentor':
        return 'Drishti AI Mentor (Search Grounded)';
      case 'syllabus':
        return 'UPSC CSE Syllabus Coverage';
      case 'saved':
        return 'Revision Vault & Bookmarks';
      case 'account':
        return 'Aspirant Profile & Attempt Records';
      default:
        return 'ZenUPSC';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-6 py-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Zone 1: Brand / Active Section Indicator */}
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap">
          ZenUPSC
        </span>
        <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">/</span>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 truncate">
          {getBreadcrumbTitle()}
        </span>
      </div>

      {/* Zone 2: Exam Milestone & Quick Actions */}
      <div className="hidden lg:flex items-center gap-5 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span className="font-medium text-slate-700 dark:text-slate-300">Prelims 2027:</span>
          <span className="font-mono font-semibold text-slate-900 dark:text-slate-100 tabular-nums">206 Days Left</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-medium">Streak:</span>
          <span className="font-mono font-semibold tabular-nums">{stats.streakDays} Days</span>
        </div>

        {!currentSession && activeView !== 'simulator' && (
          <button
            onClick={startFull100Mock}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Launch 100-Q Mock</span>
          </button>
        )}
      </div>

      {/* Zone 3: Utility Controls (Language Switcher, Zen Timer, Theme Toggle) */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setShowLanguageModal(true)}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg transition-colors cursor-pointer border border-indigo-200/50 dark:border-indigo-800/50"
          title="Switch to any of the 22 Eighth Schedule Constitutional Languages"
        >
          <Languages className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Change Language</span>
          <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-indigo-200/60 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 uppercase font-bold">
            {language}
          </span>
        </button>

        <button
          onClick={() => setShowZenTimer(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          title="Open Distraction-Free Study Timer"
        >
          <Timer className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="hidden sm:inline">Zen Focus</span>
        </button>

        <button
          onClick={toggleDarkMode}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>
      </div>
    </header>
  );
};

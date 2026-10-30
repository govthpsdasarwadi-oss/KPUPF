import React from 'react';
import { useStudy } from '../context/StudyContext';
import {
  LayoutDashboard,
  Clock,
  Filter,
  Newspaper,
  CheckSquare,
  Bookmark,
  Compass,
  Zap,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

import { AppView } from '../context/StudyContext';

interface NavItem {
  id: AppView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { activeView, setActiveView, currentSession, startFull100Mock } = useStudy();

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Study Dashboard',
      icon: LayoutDashboard,
      description: 'Overview, stats & streaks',
    },
    {
      id: 'test-series',
      label: 'Test Series Hub',
      icon: CheckSquare,
      description: 'GS, CSAT, State PSC & NCERT',
    },
    {
      id: 'csat-tricks',
      label: 'CSAT Easy Tricks',
      icon: Zap,
      description: 'Zero to Hero hacks & memory tips',
      badge: '66+ QUALIFY',
    },
    {
      id: 'simulator',
      label: '100-Q Mock Simulator',
      icon: Clock,
      description: '2-hour timed Prelims test',
      badge: currentSession ? 'IN PROGRESS' : undefined,
    },
    {
      id: 'practice',
      label: 'Practice & PYQ Engine',
      icon: Filter,
      description: 'Subject, section & year filters',
    },
    {
      id: 'current-affairs',
      label: 'Current Affairs',
      icon: Newspaper,
      description: 'GS 1, 2, 3 & Daily bullets',
    },
    {
      id: 'ai-mentor',
      label: 'AI Mentor (Gemini)',
      icon: Sparkles,
      description: 'Search grounded doubt solver',
    },
    {
      id: 'syllabus',
      label: 'Syllabus Tracker',
      icon: BookOpen,
      description: 'Prelims & Mains checklist',
    },
    {
      id: 'saved',
      label: 'Revision Vault',
      icon: Bookmark,
      description: 'Bookmarked questions & notes',
    },
  ];

  const handleNavClick = (id: typeof activeView) => {
    setActiveView(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Lockup */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Compass className="w-5 h-5 text-indigo-100" />
            </div>
            <div>
              <div className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                ZenUPSC
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Civil Services Prelims Studio
              </div>
            </div>
          </div>
        </div>

        {/* Quick Simulator CTA Card */}
        <div className="px-4 pt-4 pb-2">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
                Exam Simulation
              </span>
              <Award className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
              Standard 100-question paper, 200 marks with -0.66 negative scoring.
            </p>
            <button
              onClick={() => {
                startFull100Mock();
                setMobileOpen(false);
              }}
              className="w-full py-2 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{currentSession ? 'Resume Mock Test' : 'Start 100-Q Mock'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Zen Mindset Card at Bottom */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
            "Satyameva Jayate. Calm minds analyze options with utmost clarity."
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span>UPSC CSE Prelims 2027</span>
            <span className="font-mono tabular-nums">Paper 1 + 2</span>
          </div>
        </div>
      </aside>
    </>
  );
};

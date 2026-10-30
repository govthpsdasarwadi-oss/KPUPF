import React from 'react';
import { useStudy } from '../context/StudyContext';
import { Home, CheckSquare, Sparkles, User } from 'lucide-react';

export const BottomNavBar: React.FC = () => {
  const { activeView, setActiveView } = useStudy();

  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Home',
      icon: Home,
    },
    {
      id: 'test-series' as const,
      label: 'Test Series',
      icon: CheckSquare,
    },
    {
      id: 'ai-mentor' as const,
      label: 'AI Mentor',
      icon: Sparkles,
    },
    {
      id: 'account' as const,
      label: 'Account',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden py-1 px-3">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeView === item.id ||
            (item.id === 'test-series' && (activeView === 'simulator' || activeView === 'practice'));

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 scale-105'
                    : 'bg-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

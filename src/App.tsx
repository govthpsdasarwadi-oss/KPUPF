/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudyProvider, useStudy } from './context/StudyContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { MockTestSimulator } from './components/MockTestSimulator';
import { PracticeFilterEngine } from './components/PracticeFilterEngine';
import { CurrentAffairsModule } from './components/CurrentAffairsModule';
import { CsatEasyTricksView } from './components/CsatEasyTricksView';
import { SyllabusTrackerView } from './components/SyllabusTrackerView';
import { BookmarksView } from './components/BookmarksView';
import { TestResultsModal } from './components/TestResultsModal';
import { ZenTimerModal } from './components/ZenTimerModal';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { TestSeriesHub } from './components/TestSeriesHub';
import { GeminiMentorChat } from './components/GeminiMentorChat';
import { AccountView } from './components/AccountView';
import { BottomNavBar } from './components/BottomNavBar';
import { Menu } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeView } = useStudy();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Desktop & Mobile Sidebar */}
      <Sidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-72 flex flex-col min-w-0 min-h-screen pb-16 md:pb-0">
        {/* Mobile Header Bar with Hamburger */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-slate-100">
            ZenUPSC
          </span>
          <div className="w-7" />
        </div>

        {/* Global Desktop Header */}
        <Header />

        {/* Page View Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'test-series' && <TestSeriesHub />}
          {activeView === 'simulator' && <MockTestSimulator />}
          {activeView === 'practice' && <PracticeFilterEngine />}
          {activeView === 'current-affairs' && <CurrentAffairsModule />}
          {activeView === 'csat-tricks' && <CsatEasyTricksView />}
          {activeView === 'ai-mentor' && <GeminiMentorChat />}
          {activeView === 'syllabus' && <SyllabusTrackerView />}
          {activeView === 'saved' && <BookmarksView />}
          {activeView === 'account' && <AccountView />}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar matching screenshot */}
      <BottomNavBar />

      {/* Global Modals */}
      <TestResultsModal />
      <ZenTimerModal />
      <LanguageSelectorModal />
    </div>
  );
};

export default function App() {
  return (
    <StudyProvider>
      <AppContent />
    </StudyProvider>
  );
}

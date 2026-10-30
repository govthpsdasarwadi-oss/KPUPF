import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import {
  Shield,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Bell,
  HelpCircle,
  Clock,
  Award,
  FileText,
  CheckCircle2,
  ListFilter,
  Play,
  Zap
} from 'lucide-react';
import { NCERT_TEST_CARDS, STATE_PSC_TEST_CARDS, TestSeriesCard } from '../data/ncertAndPscData';

type SeriesCategory = 'home-selection' | 'gs-pyq' | 'csat' | 'ncert' | 'bpsc' | 'mppsc' | 'uppsc' | 'kpsc' | 'kea';

export const TestSeriesHub: React.FC = () => {
  const {
    startFilteredPractice,
    startFull100Mock,
    startCsatMock80,
    setActiveView,
    completedSessions,
    openResultsModalForSession,
    setShowLanguageModal,
    t
  } = useStudy();

  const [activeCategory, setActiveCategory] = useState<SeriesCategory>('home-selection');
  
  // Tabs within PYQ view: 'pyq' | 'subject' | 'topic'
  const [pyqTab, setPyqTab] = useState<'pyq' | 'subject' | 'topic'>('pyq');
  const [pyqExam, setPyqExam] = useState<string>('General Studies Paper I');

  // Tabs within NCERT view: 'class' | 'subject' | 'book' | 'chapter'
  const [ncertTab, setNcertTab] = useState<'class' | 'subject' | 'book' | 'chapter'>('class');

  // Modal to view attempted tests
  const [showAttemptedModal, setShowAttemptedModal] = useState<boolean>(false);

  // Notification alert toast
  const [showNotificationToast, setShowNotificationToast] = useState<boolean>(false);

  const categories = [
    {
      id: 'gs-pyq' as const,
      title: 'GS Paper I',
      subtitle: 'Civil Services (Preliminary) Examination',
      icon: Shield,
      iconColor: 'bg-blue-600 text-white',
    },
    {
      id: 'csat' as const,
      title: 'GS Paper II (CSAT)',
      subtitle: 'Civil Services (Preliminary) Examination',
      icon: Shield,
      iconColor: 'bg-amber-600 text-white',
    },
    {
      id: 'kpsc' as const,
      title: 'Karnataka (KPSC KAS)',
      subtitle: 'Karnataka Public Service Commission (KAS Prelims)',
      icon: Shield,
      iconColor: 'bg-yellow-500 text-white',
    },
    {
      id: 'kea' as const,
      title: 'Karnataka KEA Board',
      subtitle: 'Karnataka Examination Authority (FDA, SDA, VAO, PDO, PSI)',
      icon: BookOpen,
      iconColor: 'bg-indigo-600 text-white',
    },
    {
      id: 'bpsc' as const,
      title: 'Bihar',
      subtitle: 'Bihar Public Service Commission',
      icon: BookOpen,
      iconColor: 'bg-cyan-500 text-white',
    },
    {
      id: 'mppsc' as const,
      title: 'Madhya Pradesh',
      subtitle: 'Madhya Pradesh Public Service Commission',
      icon: BookOpen,
      iconColor: 'bg-red-500 text-white',
    },
    {
      id: 'uppsc' as const,
      title: 'Uttar Pradesh',
      subtitle: 'Uttar Pradesh Public Service Commission',
      icon: BookOpen,
      iconColor: 'bg-emerald-500 text-white',
    },
    {
      id: 'ncert' as const,
      title: 'NCERT MCQs',
      subtitle: 'Class VI - XII',
      icon: BookOpen,
      iconColor: 'bg-green-600 text-white',
    },
  ];

  const handleStartTest = (card: TestSeriesCard) => {
    startFilteredPractice({
      title: card.title,
      count: Math.min(card.totalQuestions, 100),
      year: card.year,
      subject: card.subject ? card.subject.toLowerCase() : undefined,
    });
  };

  const handleStartYearPYQ = (year: number) => {
    if (activeCategory === 'csat' || pyqExam.includes('CSAT')) {
      startCsatMock80();
    } else {
      startFilteredPractice({
        title: `${year}: General Studies Paper I`,
        year,
        count: 100,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-16 space-y-6">
      {/* Category Selection View (Matches Screenshot 2) */}
      {activeCategory === 'home-selection' && (
        <div className="space-y-4">
          {/* Top Bar matching screenshot */}
          <div className="flex items-center justify-between pb-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Test Series
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Select a category to start the test series
              </p>
            </div>
            <button
              onClick={() => {
                setShowNotificationToast(true);
                setTimeout(() => setShowNotificationToast(false), 3000);
              }}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="w-2 h-2 rounded-full bg-indigo-500 absolute top-1.5 right-1.5 ring-2 ring-white dark:ring-slate-900" />
            </button>
          </div>

          {showNotificationToast && (
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between">
              <span>New Prelims 2026 GS Paper 1 Mock series added with authentic UPSC -0.66 negative marking.</span>
              <button onClick={() => setShowNotificationToast(false)} className="font-bold ml-2">✕</button>
            </div>
          )}

          {/* Category Cards List (Exact matching dark cards with chevron) */}
          <div className="space-y-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (cat.id === 'csat') {
                      setActiveCategory('csat');
                      setPyqExam('GS Paper II (CSAT)');
                    } else {
                      setActiveCategory(cat.id);
                    }
                  }}
                  className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all flex items-center justify-between gap-4 cursor-pointer text-left shadow-xs group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${cat.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {cat.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {cat.subtitle}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* GS Paper I / CSAT PYQ View */}
      {(activeCategory === 'gs-pyq' || activeCategory === 'csat') && (
        <div className="space-y-4">
          {/* Top Bar with Back Button */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveCategory('home-selection')}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer transition-colors"
                title="Back to Categories"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {activeCategory === 'csat' ? 'Test Series - CSAT Paper II' : 'Test Series - PYQ'}
              </h1>
            </div>

            <button
              onClick={() => setShowAttemptedModal(true)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
          </div>

          {/* Segmented Top Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              onClick={() => setPyqTab('pyq')}
              className={`py-2 px-3 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                pyqTab === 'pyq'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span>Previous Year Papers</span>
            </button>

            <button
              onClick={() => setPyqTab('subject')}
              className={`py-2 px-3 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                pyqTab === 'subject'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span>Subject Wise Tests</span>
            </button>

            <button
              onClick={() => setPyqTab('topic')}
              className={`py-2 px-3 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                pyqTab === 'topic'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span>Topic Wise Tests</span>
            </button>
          </div>

          {/* Attempted Tests Banner */}
          <button
            onClick={() => setShowAttemptedModal(true)}
            className="w-full p-3.5 rounded-2xl bg-blue-600/90 hover:bg-blue-600 text-white transition-all flex items-center justify-between gap-3 shadow-xs cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold">Attempted Tests</div>
                <div className="text-xs text-blue-100">View All Attempted Test Results</div>
              </div>
            </div>
            <div className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-white/20">
              {completedSessions.length} Tests »
            </div>
          </button>

          {/* CSAT Zero to Hero Alert Banner */}
          {(activeCategory === 'csat' || pyqExam.includes('CSAT')) && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300 dark:border-amber-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>CSAT Easy Tricks: Zero to Hero Section</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                  Study unit digit shortcuts, alligation cross rules, syllogisms elimination, and interactive memory flashcards.
                </p>
              </div>
              <button
                onClick={() => setActiveView('csat-tricks')}
                className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shrink-0 shadow-xs cursor-pointer transition-colors"
              >
                Open CSAT Hacks
              </button>
            </div>
          )}

          {/* Exam Dropdown Selector */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Exam
            </label>
            <select
              value={pyqExam}
              onChange={(e) => setPyqExam(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold bg-transparent text-slate-900 dark:text-slate-100 focus:outline-hidden cursor-pointer"
            >
              <option value="General Studies Paper I">General Studies Paper I</option>
              <option value="GS Paper II (CSAT)">General Studies Paper II (CSAT)</option>
            </select>
          </div>

          {/* PYQ Cards List */}
          {pyqTab === 'pyq' && (
            <div className="space-y-3.5">
              {[2026, 2025, 2024, 2023, 2022, 2021].map((year) => {
                const isCsat = activeCategory === 'csat' || pyqExam.includes('CSAT');
                return (
                  <div
                    key={year}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                  >
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {year}: {isCsat ? 'General Studies Paper II (CSAT)' : pyqExam}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono">
                      <div className="flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                        <span>{isCsat ? '80 Questions' : '100 Questions'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-slate-400" />
                        <span>{isCsat ? '200 Marks (+2.50 / -0.833)' : '200 Marks (+2.00 / -0.66)'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>120 Mins</span>
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => handleStartYearPYQ(year)}
                        className={`px-5 py-2 text-xs font-semibold text-white rounded-xl transition-colors cursor-pointer shadow-xs ${
                          isCsat ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        Start Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Subject Wise Cards */}
          {pyqTab === 'subject' && (
            <div className="space-y-3.5">
              {[
                { name: 'Indian Polity & Governance', qs: 100, marks: 200, mins: 120, subj: 'polity' },
                { name: 'Modern History of India', qs: 100, marks: 200, mins: 120, subj: 'history' },
                { name: 'Indian & World Geography', qs: 100, marks: 200, mins: 120, subj: 'geography' },
                { name: 'Indian Economy & Social Development', qs: 100, marks: 200, mins: 120, subj: 'economy' },
                { name: 'Environment, Ecology & Climate', qs: 100, marks: 200, mins: 120, subj: 'environment' },
                { name: 'General Science & Emerging Tech', qs: 100, marks: 200, mins: 120, subj: 'science' },
              ].map((subj) => (
                <div
                  key={subj.subj}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {subj.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                      <span>{subj.qs} Questions</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-slate-400" />
                      <span>{subj.marks} Marks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{subj.mins} Mins</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <button
                      onClick={() =>
                        startFilteredPractice({
                          title: `${subj.name} Subject Test`,
                          subject: subj.subj,
                          count: 100,
                        })
                      }
                      className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      Start Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Topic Wise Cards */}
          {pyqTab === 'topic' && (
            <div className="space-y-3.5">
              {[
                { name: 'Fundamental Rights & Judicial Review', qs: 25, marks: 50, mins: 30, sec: 'Fundamental Rights', subj: 'polity' },
                { name: 'Parliament & Legislative Procedures', qs: 25, marks: 50, mins: 30, sec: 'Parliament', subj: 'polity' },
                { name: 'Monetary Policy & RBI Framework', qs: 25, marks: 50, mins: 30, sec: 'Monetary Policy & Banking', subj: 'economy' },
                { name: 'Indian River Systems & Drainage', qs: 25, marks: 50, mins: 30, sec: 'Indian River Systems', subj: 'geography' },
                { name: 'Biodiversity, National Parks & WPA', qs: 25, marks: 50, mins: 30, sec: 'Biodiversity & Protected Areas', subj: 'environment' },
              ].map((topic, tIdx) => (
                <div
                  key={tIdx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {topic.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                      <span>{topic.qs} Questions</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-slate-400" />
                      <span>{topic.marks} Marks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{topic.mins} Mins</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <button
                      onClick={() =>
                        startFilteredPractice({
                          title: topic.name,
                          subject: topic.subj,
                          section: topic.sec,
                          count: topic.qs,
                        })
                      }
                      className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      Start Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* NCERT MCQs View (Matches Screenshot 1) */}
      {activeCategory === 'ncert' && (
        <div className="space-y-4">
          {/* Top Bar with Back Button */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveCategory('home-selection')}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer transition-colors"
                title="Back to Categories"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Test Series - NCERT
              </h1>
            </div>

            <button
              onClick={() => setShowAttemptedModal(true)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
          </div>

          {/* Segmented Top Tabs matching Screenshot 1 */}
          <div className="grid grid-cols-4 gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              onClick={() => setNcertTab('class')}
              className={`py-2 px-2 rounded-lg transition-colors cursor-pointer text-center ${
                ncertTab === 'class'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Class Wise Tests
            </button>

            <button
              onClick={() => setNcertTab('subject')}
              className={`py-2 px-2 rounded-lg transition-colors cursor-pointer text-center ${
                ncertTab === 'subject'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Subject Wise Tests
            </button>

            <button
              onClick={() => setNcertTab('book')}
              className={`py-2 px-2 rounded-lg transition-colors cursor-pointer text-center ${
                ncertTab === 'book'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Book Wise Tests
            </button>

            <button
              onClick={() => setNcertTab('chapter')}
              className={`py-2 px-2 rounded-lg transition-colors cursor-pointer text-center ${
                ncertTab === 'chapter'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Chapter Wise Tests
            </button>
          </div>

          {/* Attempted Tests Banner */}
          <button
            onClick={() => setShowAttemptedModal(true)}
            className="w-full p-3.5 rounded-2xl bg-blue-600/90 hover:bg-blue-600 text-white transition-all flex items-center justify-between gap-3 shadow-xs cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold">Attempted Tests</div>
                <div className="text-xs text-blue-100">View All Attempted Test Results</div>
              </div>
            </div>
            <div className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-white/20">
              {completedSessions.length} Tests »
            </div>
          </button>

          {/* NCERT Class Wise Cards List (Exact matching screenshot 1) */}
          {ncertTab === 'class' && (
            <div className="space-y-3.5">
              {NCERT_TEST_CARDS.filter((c) => c.type === 'class-wise').map((card) => (
                <div
                  key={card.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {card.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                      <span>{card.totalQuestions} Questions</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-slate-400" />
                      <span>{card.totalMarks} Marks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{card.durationMinutes} Mins</span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={() => handleStartTest(card)}
                      className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      Start Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* NCERT Subject Wise Cards */}
          {ncertTab === 'subject' && (
            <div className="space-y-3.5">
              {NCERT_TEST_CARDS.filter((c) => c.type === 'subject-wise').map((card) => (
                <div
                  key={card.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500">{card.subtitle}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                      <span>{card.totalQuestions} Questions</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-slate-400" />
                      <span>{card.totalMarks} Marks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{card.durationMinutes} Mins</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <button
                      onClick={() => handleStartTest(card)}
                      className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      Start Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* NCERT Book Wise Cards */}
          {(ncertTab === 'book' || ncertTab === 'chapter') && (
            <div className="space-y-3.5">
              {NCERT_TEST_CARDS.filter((c) => c.type === 'book-wise').map((card) => (
                <div
                  key={card.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500">{card.subtitle}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                      <span>{card.totalQuestions} Questions</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-slate-400" />
                      <span>{card.totalMarks} Marks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{card.durationMinutes} Mins</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <button
                      onClick={() => handleStartTest(card)}
                      className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      Start Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* State PSC Views (BPSC, MPPSC, UPPSC, CSAT, KPSC, KEA) */}
      {['bpsc', 'mppsc', 'uppsc', 'csat', 'kpsc', 'kea'].includes(activeCategory) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveCategory('home-selection')}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer transition-colors"
                title="Back to Categories"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 uppercase">
                Test Series - {activeCategory}
              </h1>
            </div>

            <button
              onClick={() => setShowAttemptedModal(true)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {(STATE_PSC_TEST_CARDS[activeCategory] || []).map((card) => (
              <div
                key={card.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500">{card.subtitle}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                    <span>{card.totalQuestions} Questions</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-slate-400" />
                    <span>{card.totalMarks} Marks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{card.durationMinutes} Mins</span>
                  </div>
                </div>
                <div className="pt-1">
                  <button
                    onClick={() => handleStartTest(card)}
                    className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Start Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attempted Tests Modal */}
      {showAttemptedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-2xl max-h-[85vh] flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Attempted Tests History ({completedSessions.length})
                </h2>
              </div>
              <button
                onClick={() => setShowAttemptedModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {completedSessions.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  No attempted tests yet. Start any test above to see performance records here!
                </div>
              ) : (
                completedSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {session.title}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono mt-1">
                        <span>Score: <strong className="text-emerald-600">{session.score}</strong></span>
                        <span>·</span>
                        <span>{session.accuracyPercentage}% Accuracy</span>
                        <span>·</span>
                        <span>{session.totalQuestions} Questions</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowAttemptedModal(false);
                        openResultsModalForSession(session);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer shrink-0"
                    >
                      View Report
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import {
  Clock,
  Target,
  Flame,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  TrendingUp,
  History,
  FileText,
  Calendar,
  Layers,
  Sparkles,
  Lightbulb,
  Puzzle,
  Image as ImageIcon,
  Edit3,
  Bookmark,
  FileDown,
  Send,
  Languages,
  Share2,
  Zap
} from 'lucide-react';
import { SubjectId } from '../types';
import {
  GkTricksModal,
  MatchColumnsModal,
  LearnByImageModal,
  FreePdfsModal
} from './StudyToolsModals';

export const DashboardView: React.FC = () => {
  const {
    stats,
    setActiveView,
    startFull100Mock,
    startFilteredPractice,
    completedSessions,
    openResultsModalForSession,
    incrementStreak,
    setShowLanguageModal,
    language,
    t
  } = useStudy();

  // Modals state
  const [openTricks, setOpenTricks] = useState<boolean>(false);
  const [openMatch, setOpenMatch] = useState<boolean>(false);
  const [openVisuals, setOpenVisuals] = useState<boolean>(false);
  const [openPdfs, setOpenPdfs] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  const totalAttempted = stats.correctCount + stats.incorrectCount;
  const accuracy = totalAttempted > 0 ? ((stats.correctCount / totalAttempted) * 100).toFixed(1) : '74.2';

  const subjectMeta: Record<SubjectId, { label: string; color: string; icon: string }> = {
    polity: { label: 'Indian Polity & Governance', color: 'indigo', icon: '🏛️' },
    history: { label: 'Modern & Ancient History', color: 'amber', icon: '📜' },
    geography: { label: 'Indian & Physical Geography', color: 'blue', icon: '🌍' },
    economy: { label: 'Indian Economy & Budget', color: 'emerald', icon: '📈' },
    environment: { label: 'Environment & Climate Change', color: 'teal', icon: '🌿' },
    science: { label: 'Science & Emerging Tech', color: 'purple', icon: '🔬' },
    csat: { label: 'CSAT Paper-II Aptitude', color: 'amber', icon: '⚡' },
  };

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'ZenUPSC - Distraction-Free UPSC CSE & State PSC Preparation',
        text: 'Practice 100-Question Prelims simulations, NCERT MCQs, KPSC KAS & KEA board tests in 22 constitutional languages!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* 22 Constitutional Languages & Exam Quick Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Languages className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-semibold text-indigo-950 dark:text-indigo-200">
            {t.changeLanguage}
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold">
            {language.toUpperCase()}
          </span>
        </div>

        <button
          onClick={() => setShowLanguageModal(true)}
          className="px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer shadow-xs"
        >
          {language === 'kn' ? 'ಭಾಷೆ ಬದಲಿಸಿ (22)' : 'Change Language'}
        </button>
      </div>

      {/* Top Class XI & Class XII Quick Launch (Matching Screenshot 4) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() =>
            startFilteredPractice({
              title: 'NCERT Class XI Indian Constitution & Physical Geography',
              count: 100,
            })
          }
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 transition-all flex items-center gap-3 cursor-pointer shadow-xs text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-xs">
            11
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600">
              Class XI
            </div>
            <div className="text-[11px] text-slate-500">100 Questions · NCERT</div>
          </div>
        </button>

        <button
          onClick={() =>
            startFilteredPractice({
              title: 'NCERT Class XII Themes in Indian History & Macroeconomics',
              count: 100,
            })
          }
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-400 transition-all flex items-center gap-3 cursor-pointer shadow-xs text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-xs">
            12
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-orange-500">
              Class XII
            </div>
            <div className="text-[11px] text-slate-500">100 Questions · NCERT</div>
          </div>
        </button>

        <button
          onClick={() => setActiveView('test-series')}
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-yellow-400 transition-all flex items-center gap-3 cursor-pointer shadow-xs text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-yellow-500 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
            KAS
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-yellow-600">
              Karnataka PSC
            </div>
            <div className="text-[11px] text-slate-500">KPSC KAS Prelims</div>
          </div>
        </button>

        <button
          onClick={() => setActiveView('test-series')}
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-all flex items-center gap-3 cursor-pointer shadow-xs text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
            KEA
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600">
              Karnataka KEA
            </div>
            <div className="text-[11px] text-slate-500">FDA / SDA / PDO / VAO</div>
          </div>
        </button>
      </div>

      {/* Hero Zen Study Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
                <span>Civil Services Examination 2027</span>
                <span aria-hidden="true">·</span>
                <span>General Studies Paper-I</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance mb-3">
                Distraction-Free UPSC Prelims Preparation
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Master standard multi-statement questions, eliminate negative marking (-0.66 penalty),
                and build an unshakeable knowledge baseline across Static Subjects, Daily Current Affairs,
                and State PSC / KEA examination syllabi.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={startFull100Mock}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                <span>Launch 100-Question Mock Test</span>
              </button>
              <button
                onClick={() => setActiveView('csat-tricks')}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Zap className="w-4 h-4" />
                <span>CSAT Easy Tricks (Zero to Hero)</span>
              </button>
              <button
                onClick={() => setActiveView('test-series')}
                className="px-4 py-2.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Layers className="w-4 h-4" />
                <span>Test Series Hub (KPSC, KEA & NCERT)</span>
              </button>
              <button
                onClick={() => setActiveView('ai-mentor')}
                className="px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>AI Mentor Doubt Solver</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full">
            <img
              src="/src/assets/images/upsc_zen_study_desk_1793377286627.jpg"
              alt="UPSC preparation study desk with Polity books and notes"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white dark:lg:from-slate-900 lg:to-transparent" />
          </div>
        </div>
      </div>

      {/* CSAT Zero to Hero Shortcut & Mock Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-200 dark:border-amber-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                CSAT Easy Tricks: Zero to Hero Section
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                66+ QUALIFYING ROADMAP
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Unit digit cyclicity, remainder modulo hacks, alligation cross rules, syllogism elimination & flip flashcards with attached mock drills.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveView('csat-tricks')}
          className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-colors flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
        >
          <span>Open CSAT Hacks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Section: STUDY TOOLS (Exact matching Screenshot 4) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-cyan-500 rounded-full" />
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {t.studyTools}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Tool 1: Current Affairs */}
          <button
            onClick={() => setActiveView('current-affairs')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-all flex flex-col items-center justify-center text-center gap-2 cursor-pointer shadow-xs group"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              {t.currentAffairs}
            </div>
          </button>

          {/* Tool 2: GK Trick / Mnemonics */}
          <button
            onClick={() => setOpenTricks(true)}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 transition-all flex flex-col items-center justify-center text-center gap-2 cursor-pointer shadow-xs group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              {t.gkTricks}
            </div>
          </button>

          {/* Tool 3: Match The Columns */}
          <button
            onClick={() => setOpenMatch(true)}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 transition-all flex flex-col items-center justify-center text-center gap-2 cursor-pointer shadow-xs group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
              <Puzzle className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              {t.matchColumns}
            </div>
          </button>

          {/* Tool 4: Learn By Image */}
          <button
            onClick={() => setOpenVisuals(true)}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-400 transition-all flex flex-col items-center justify-center text-center gap-2 cursor-pointer shadow-xs group"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/60 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-105 transition-transform">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              {t.learnByImage}
            </div>
          </button>

          {/* Tool 5: Notes */}
          <button
            onClick={() => setActiveView('saved')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 transition-all flex flex-col items-center justify-center text-center gap-2 cursor-pointer shadow-xs group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
              <Edit3 className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              {t.notes}
            </div>
          </button>

          {/* Tool 6: My Bookmarks */}
          <button
            onClick={() => setActiveView('saved')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 transition-all flex flex-col items-center justify-center text-center gap-2 cursor-pointer shadow-xs group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform">
              <Bookmark className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              {t.myBookmarks}
            </div>
          </button>
        </div>
      </div>

      {/* Section: RESOURCES (Matching Screenshot 4) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-cyan-500 rounded-full" />
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {t.resources}
          </h2>
        </div>

        <button
          onClick={() => setOpenPdfs(true)}
          className="w-full p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-400 transition-all flex flex-col items-center justify-center text-center gap-2.5 cursor-pointer shadow-xs group"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
            <FileDown className="w-6 h-6" />
          </div>
          <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
            {t.freePdfs}
          </div>
          <span className="px-3 py-0.5 rounded-full bg-orange-500 text-white font-bold text-[11px] uppercase tracking-wider">
            Free
          </span>
        </button>
      </div>

      {/* Section: FOLLOW US ON (Matching Screenshot 4) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-cyan-500 rounded-full" />
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {t.followUs}
          </h2>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-around gap-2">
          {/* Telegram */}
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
            title="Telegram Channel"
          >
            <Send className="w-5 h-5 -rotate-45" />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity font-bold"
            title="Instagram"
          >
            IG
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity font-bold text-lg"
            title="Facebook"
          >
            f
          </a>

          {/* WhatsApp */}
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center hover:opacity-90 transition-opacity font-bold text-xs"
            title="WhatsApp Channel"
          >
            WA
          </a>

          {/* X */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center hover:opacity-90 transition-opacity font-bold"
            title="X (Twitter)"
          >
            X
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity font-bold text-xs"
            title="YouTube"
          >
            YT
          </a>
        </div>
      </div>

      {/* Share This App Banner (Matching Screenshot 4) */}
      <button
        onClick={handleShareApp}
        className="w-full p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all flex items-center justify-between gap-4 shadow-sm cursor-pointer text-left"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold">{t.shareWithFriends}</div>
            <div className="text-xs text-blue-100">
              Connect with fellow aspirants and practice together!
            </div>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-white/20 text-xs font-semibold shrink-0">
          {copiedShare ? 'Link Copied!' : 'Share Now'}
        </div>
      </button>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-medium">Tests Completed</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
            {stats.testsCompleted}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {stats.totalQuestionsSolved} questions evaluated
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-medium">Average Accuracy</span>
            <Target className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
            {accuracy}%
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">{stats.correctCount} Correct</span>
            <span className="mx-1">·</span>
            <span className="text-rose-600 dark:text-rose-400">{stats.incorrectCount} Incorrect</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-medium">Daily CA Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
              {stats.streakDays} <span className="text-xs font-sans font-normal text-slate-500">Days</span>
            </div>
            <button
              onClick={incrementStreak}
              className="text-[10px] font-medium px-2 py-1 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 hover:bg-amber-200 cursor-pointer transition-colors"
            >
              +1 Today
            </button>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Consecutive study consistency
          </div>
        </div>

        {/* Stat 4 */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-medium">Net Estimated Marks</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
            {(stats.correctCount * 2.0 - stats.incorrectCount * 0.66).toFixed(1)}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Applying UPSC +2 / -0.66 penalty
          </div>
        </div>
      </div>

      {/* Subject Performance & Recent Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left */}
        <div className="lg:col-span-6 p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
            Subject-Wise Accuracy
          </h3>
          <p className="text-xs text-slate-500 mb-4">Core General Studies breakdown</p>
          <div className="space-y-3.5">
            {(Object.keys(subjectMeta) as SubjectId[]).map((subjKey) => {
              const meta = subjectMeta[subjKey];
              const perf = stats.subjectPerformance[subjKey] || { attempted: 0, correct: 0 };
              const subjAcc = perf.attempted > 0 ? Math.round((perf.correct / perf.attempted) * 100) : 0;

              return (
                <div key={subjKey} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {meta.label}
                    </span>
                    <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400">
                      {perf.correct}/{perf.attempted} ({subjAcc}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                      style={{ width: `${subjAcc}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-6 p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Recent Test Attempts
              </h3>
              <p className="text-xs text-slate-500">Completed tests with score analysis</p>
            </div>
          </div>

          <div className="space-y-3">
            {completedSessions.slice(0, 4).map((session) => (
              <div
                key={session.id}
                className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between"
              >
                <div className="min-w-0 flex-1 pr-3">
                  <div className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">
                    {session.title}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span className="font-mono">{session.totalQuestions} Questions</span>
                    <span>·</span>
                    <span className="font-mono text-emerald-600 font-medium">Score: {session.score}</span>
                    <span>·</span>
                    <span className="font-mono">{session.accuracyPercentage}% Acc</span>
                  </div>
                </div>

                <button
                  onClick={() => openResultsModalForSession(session)}
                  className="px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded cursor-pointer"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Study Tools Modals */}
      <GkTricksModal isOpen={openTricks} onClose={() => setOpenTricks(false)} />
      <MatchColumnsModal isOpen={openMatch} onClose={() => setOpenMatch(false)} />
      <LearnByImageModal isOpen={openVisuals} onClose={() => setOpenVisuals(false)} />
      <FreePdfsModal isOpen={openPdfs} onClose={() => setOpenPdfs(false)} />
    </div>
  );
};

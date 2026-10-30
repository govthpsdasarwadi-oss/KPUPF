import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import {
  User,
  Award,
  CheckCircle2,
  XCircle,
  FileText,
  Target,
  Flame,
  Settings,
  Download,
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const { stats, completedSessions, openResultsModalForSession, setActiveView } = useStudy();

  const [aspirantName, setAspirantName] = useState<string>('UPSC CSE Aspirant');
  const [optionalSubject, setOptionalSubject] = useState<string>('Political Science & IR (PSIR)');
  const [targetYear, setTargetYear] = useState<string>('2027');

  const totalAttempted = stats.correctCount + stats.incorrectCount;
  const accuracy = totalAttempted > 0 ? ((stats.correctCount / totalAttempted) * 100).toFixed(1) : '74.2';

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ stats, completedSessions }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `zen_upsc_report_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-4xl mx-auto pb-16 space-y-6">
      {/* Profile Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-xs">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {aspirantName}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>Target: UPSC CSE {targetYear}</span>
              <span aria-hidden="true">·</span>
              <span>{optionalSubject}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleExportData}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics</span>
        </button>
      </div>

      {/* Aggregate Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-center font-mono">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400">Tests Completed</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            {stats.testsCompleted}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400">Total Solved</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            {stats.totalQuestionsSolved}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400">Accuracy</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {accuracy}%
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400">Daily Streak</div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
            {stats.streakDays}d
          </div>
        </div>
      </div>

      {/* Attempted Tests List */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Completed Test History & Reports
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {completedSessions.length} recorded
          </span>
        </div>

        {completedSessions.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No tests attempted yet. Start from the Test Series hub!
          </div>
        ) : (
          <div className="space-y-3">
            {completedSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center justify-between gap-4 hover:border-slate-200 transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {session.title}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mt-1">
                    <span className="text-emerald-600 font-semibold">Score: {session.score}</span>
                    <span>·</span>
                    <span>{session.accuracyPercentage}% Accuracy</span>
                    <span>·</span>
                    <span>{session.totalQuestions} Questions</span>
                  </div>
                </div>

                <button
                  onClick={() => openResultsModalForSession(session)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer shrink-0"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Aspirant Preferences Form */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Exam Preferences & Targets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Target Year
            </label>
            <select
              value={targetYear}
              onChange={(e) => setTargetYear(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <option value="2027">UPSC CSE 2027</option>
              <option value="2026">UPSC CSE 2026</option>
              <option value="2028">UPSC CSE 2028</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Optional Subject
            </label>
            <select
              value={optionalSubject}
              onChange={(e) => setOptionalSubject(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <option value="Political Science & IR (PSIR)">Political Science & IR</option>
              <option value="Sociology">Sociology</option>
              <option value="Geography">Geography</option>
              <option value="History">History</option>
              <option value="Public Administration">Public Administration</option>
              <option value="Anthropology">Anthropology</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              State PSC Target
            </label>
            <select
              defaultValue="bihar"
              className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <option value="bihar">Bihar (BPSC)</option>
              <option value="mppsc">Madhya Pradesh (MPPSC)</option>
              <option value="uppsc">Uttar Pradesh (UPPSC)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

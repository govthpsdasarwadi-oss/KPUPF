import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Send,
  Flag,
  HelpCircle,
  Pause,
  Play,
  Languages
} from 'lucide-react';
import { Question } from '../types';

export const MockTestSimulator: React.FC = () => {
  const {
    currentSession,
    currentQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    recordAnswer,
    clearAnswer,
    toggleMarkForReview,
    submitTest,
    cancelTest,
    toggleBookmarkQuestion,
    isQuestionBookmarked,
    language,
    setShowLanguageModal
  } = useStudy();

  const [paletteFilter, setPaletteFilter] = useState<'all' | 'answered' | 'unanswered' | 'review'>('all');
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [forceKannada, setForceKannada] = useState<boolean>(false);

  if (!currentSession || currentQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          No Active Mock Test
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Start a 100-Question Prelims Simulation or a sectional practice test from the dashboard.
        </p>
      </div>
    );
  }

  const currentQ: Question = currentQuestions[currentQuestionIndex] || currentQuestions[0];
  const totalQ = currentQuestions.length;

  // Format countdown timer (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Status counters
  const answeredCount = Object.keys(currentSession.answers).length;
  const reviewCount = Object.keys(currentSession.markedForReview).filter(
    (id) => currentSession.markedForReview[id]
  ).length;
  const unansweredCount = totalQ - answeredCount;

  // Question state helper
  const getQuestionStatus = (qId: string) => {
    const isAnswered = !!currentSession.answers[qId];
    const isMarked = !!currentSession.markedForReview[qId];
    const isVisited = !!currentSession.visitedQuestions[qId];

    if (isAnswered && isMarked) return 'review-answered';
    if (isMarked) return 'review';
    if (isAnswered) return 'answered';
    if (isVisited) return 'unanswered';
    return 'unvisited';
  };

  const handleOptionSelect = (option: 'A' | 'B' | 'C' | 'D') => {
    recordAnswer(currentQ.id, option);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQ - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleMarkAndNext = () => {
    toggleMarkForReview(currentQ.id);
    if (currentQuestionIndex < totalQ - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const filteredQuestionIndices = currentQuestions
    .map((q, idx) => ({ q, idx }))
    .filter(({ q }) => {
      const status = getQuestionStatus(q.id);
      if (paletteFilter === 'answered') return status === 'answered' || status === 'review-answered';
      if (paletteFilter === 'unanswered') return status === 'unanswered' || status === 'unvisited';
      if (paletteFilter === 'review') return status === 'review' || status === 'review-answered';
      return true;
    });

  const isCurrentMarked = !!currentSession.markedForReview[currentQ.id];
  const currentSelectedOption = currentSession.answers[currentQ.id];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-12">
      {/* Top Examination Status Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{currentSession.mode === 'csat-mock-80' ? 'UPSC Paper-II CSAT Simulation' : 'UPSC CSE Prelims Simulation'}</span>
            <span aria-hidden="true">·</span>
            <span>{currentSession.mode === 'csat-mock-80' ? 'Quant, Reasoning & Reading Comprehension' : 'Paper-I General Studies'}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              {currentSession.mode === 'csat-mock-80' ? '+2.50 / -0.833 (Pass: 66.67)' : '+2.00 / -0.66'}
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">
            {currentSession.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* 2-Hour Timer Indicator */}
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border font-mono tabular-nums text-sm font-semibold transition-colors ${
              currentSession.timeRemainingSeconds < 600
                ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-300'
                : currentSession.timeRemainingSeconds < 1800
                ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-900/60 dark:text-amber-300'
                : 'bg-slate-100 border-slate-200 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{formatTime(currentSession.timeRemainingSeconds)}</span>
          </div>

          <button
            onClick={() => setIsTimerPaused(!isTimerPaused)}
            className="p-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title={isTimerPaused ? 'Resume exam clock' : 'Pause exam clock'}
          >
            {isTimerPaused ? <Play className="w-4 h-4 text-emerald-600" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Test</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Question Presentation Area (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            {/* Question Header & Metadata */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                  Q.{currentQuestionIndex + 1}
                </span>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">
                    {currentQ.subjectName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{currentQ.section}</span>
                  {currentQ.isPYQ && currentQ.pyqYear && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-amber-600 dark:text-amber-400">
                        PYQ {currentQ.pyqYear}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {currentQ.kannadaText && (
                  <button
                    onClick={() => setForceKannada(!forceKannada)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Languages className="w-3 h-3" />
                    <span>{(forceKannada || language === 'kn') ? 'English' : 'ಕನ್ನಡ (Kannada)'}</span>
                  </button>
                )}

                <button
                  onClick={() => setShowLanguageModal(true)}
                  className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Change Language (22 Languages)"
                >
                  <Languages className="w-4 h-4" />
                </button>

                <button
                  onClick={() => toggleBookmarkQuestion(currentQ.id)}
                  className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                    isQuestionBookmarked(currentQ.id)
                      ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                  title="Bookmark question for review vault"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Question Stem */}
            <div className="space-y-4 text-slate-800 dark:text-slate-200">
              <p className="text-sm sm:text-base font-medium leading-relaxed">
                {(forceKannada || language === 'kn') && currentQ.kannadaText
                  ? currentQ.kannadaText
                  : currentQ.questionText}
              </p>

              {/* Statements List if any (shown in English or translated if statements exist) */}
              {currentQ.statements && currentQ.statements.length > 0 && (
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2.5 my-3">
                  {currentQ.statements.map((stmt, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                      <span className="font-mono font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                        {sIdx + 1}.
                      </span>
                      <span className="leading-relaxed text-slate-700 dark:text-slate-300">
                        {stmt}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Question Kicker */}
              {currentQ.questionKicker && (
                <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 italic pt-1">
                  {currentQ.questionKicker}
                </p>
              )}

              {/* Options Layout (A, B, C, D) */}
              <div className="space-y-2.5 pt-2">
                {((forceKannada || language === 'kn') && currentQ.kannadaOptions
                  ? currentQ.kannadaOptions
                  : currentQ.options
                ).map((opt) => {
                  const isSelected = currentSelectedOption === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleOptionSelect(opt.label)}
                      className={`w-full p-3.5 rounded-lg border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50/80 border-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-500 text-indigo-950 dark:text-indigo-100 shadow-xs'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-semibold shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {opt.label}
                      </div>
                      <span className="text-xs sm:text-sm leading-relaxed pt-0.5">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => clearAnswer(currentQ.id)}
                  disabled={!currentSelectedOption}
                  className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Choice</span>
                </button>

                <button
                  onClick={handleMarkAndNext}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isCurrentMarked
                      ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                      : 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{isCurrentMarked ? 'Unmark Review' : 'Mark for Review & Next'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === totalQ - 1}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  <span>Save & Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Question Palette Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            {/* Palette Summary Header */}
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Question Palette
              </h3>
              <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Answered: <strong className="font-mono">{answeredCount}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                  <span>Review: <strong className="font-mono">{reviewCount}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
                  <span>Unanswered: <strong className="font-mono">{unansweredCount}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full border border-slate-400 shrink-0" />
                  <span>Total: <strong className="font-mono">{totalQ}</strong></span>
                </div>
              </div>
            </div>

            {/* Filter Tabs for Palette */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-3">
              <button
                onClick={() => setPaletteFilter('all')}
                className={`flex-1 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                  paletteFilter === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPaletteFilter('answered')}
                className={`flex-1 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                  paletteFilter === 'answered'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Ans
              </button>
              <button
                onClick={() => setPaletteFilter('unanswered')}
                className={`flex-1 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                  paletteFilter === 'unanswered'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Unans
              </button>
              <button
                onClick={() => setPaletteFilter('review')}
                className={`flex-1 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                  paletteFilter === 'review'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Review
              </button>
            </div>

            {/* 100-Question Interactive Grid */}
            <div className="max-h-[360px] overflow-y-auto pr-1">
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-1.5">
                {filteredQuestionIndices.map(({ q, idx }) => {
                  const status = getQuestionStatus(q.id);
                  const isCurrent = idx === currentQuestionIndex;

                  let statusClasses = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
                  if (status === 'answered') {
                    statusClasses = 'bg-emerald-600 text-white font-semibold';
                  } else if (status === 'review') {
                    statusClasses = 'bg-purple-600 text-white font-semibold';
                  } else if (status === 'review-answered') {
                    statusClasses = 'bg-purple-700 text-white font-semibold ring-2 ring-emerald-400';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-9 text-xs font-mono rounded transition-all flex items-center justify-center cursor-pointer relative ${statusClasses} ${
                        isCurrent
                          ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900 font-bold scale-105 z-10'
                          : 'hover:opacity-90'
                      }`}
                      title={`Question ${idx + 1} (${status})`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Submit Block */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Finish & Calculate Score</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Submit Examination?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  UPSC Prelims negative marking will be calculated immediately.
                </p>
              </div>
            </div>

            {/* Attempt Summary */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center font-mono text-xs">
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-sans">Answered</div>
                <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {answeredCount}
                </div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-sans">Left</div>
                <div className="text-base font-bold text-slate-600 dark:text-slate-300 tabular-nums">
                  {unansweredCount}
                </div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-sans">Review</div>
                <div className="text-base font-bold text-purple-600 dark:text-purple-400 tabular-nums">
                  {reviewCount}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Are you sure you want to finalize your answers? You will receive full score analytics,
              expected cutoff evaluation, and expandable explanations for each question.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Return to Paper
              </button>
              <button
                onClick={() => {
                  setShowSubmitConfirm(false);
                  submitTest();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

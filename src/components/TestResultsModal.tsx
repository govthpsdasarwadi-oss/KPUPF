import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  Award
} from 'lucide-react';
import { ALL_QUESTIONS } from '../data/questionsData';
import { Question } from '../types';

export const TestResultsModal: React.FC = () => {
  const {
    lastCompletedSession,
    showResultsModal,
    closeResultsModal,
    currentQuestions,
    startFull100Mock,
    startFilteredPractice
  } = useStudy();

  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'correct' | 'unattempted' | 'marked'>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

  if (!showResultsModal || !lastCompletedSession) return null;

  const session = lastCompletedSession;
  const questionsToReview: Question[] = currentQuestions.length > 0
    ? currentQuestions
    : ALL_QUESTIONS.slice(0, session.totalQuestions);

  // Score calculations
  const isCsat = session.mode === 'csat-mock-80' || session.marksPerCorrect === 2.5;
  const marksPerCorrect = session.marksPerCorrect ?? (isCsat ? 2.5 : 2.0);
  const negativePerIncorrect = session.negativePerIncorrect ?? (isCsat ? 0.833 : 0.66);
  const correctCount = session.correctCount ?? 0;
  const incorrectCount = session.incorrectCount ?? 0;
  const unattemptedCount = session.unattemptedCount ?? (session.totalQuestions - correctCount - incorrectCount);
  const netScore = session.score ?? Number((correctCount * marksPerCorrect - incorrectCount * negativePerIncorrect).toFixed(2));
  const maxPossible = session.totalQuestions * marksPerCorrect;
  const cutoffEstimate = isCsat ? 66.67 : Math.round(maxPossible * 0.44); // 66.67 for CSAT; ~88 marks for GS 200 marks paper
  const isQualified = netScore >= cutoffEstimate;

  const toggleExpand = (qId: string) => {
    setExpandedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const expandAll = () => {
    const allExp: Record<string, boolean> = {};
    questionsToReview.forEach((q) => { allExp[q.id] = true; });
    setExpandedQuestions(allExp);
  };

  const collapseAll = () => {
    setExpandedQuestions({});
  };

  // Filter questions for detailed review
  const filteredReviewList = questionsToReview.filter((q) => {
    const userAns = session.answers[q.id];
    const isMarked = !!session.markedForReview[q.id];
    const isCorrect = userAns === q.correctOption;

    if (reviewFilter === 'correct') return isCorrect;
    if (reviewFilter === 'incorrect') return !!userAns && !isCorrect;
    if (reviewFilter === 'unattempted') return !userAns;
    if (reviewFilter === 'marked') return isMarked;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isQualified
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
            }`}>
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                {isCsat ? 'CSAT Paper-II Evaluation Report' : 'Examination Evaluation Report'}
              </h2>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {session.title} · {isCsat ? 'CSAT Marking (+2.50 / -0.833 · Cutoff 66.67)' : 'UPSC CSE Marking (+2.00 / -0.66)'}
              </div>
            </div>
          </div>

          <button
            onClick={closeResultsModal}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Main Score & Cutoff Banner */}
          <div className={`p-5 rounded-2xl border ${
            isQualified
              ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-900/60'
              : 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200/80 dark:border-amber-900/60'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Net Calculated Score
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-slate-100">
                    {netScore}
                  </span>
                  <span className="text-sm font-mono text-slate-500">
                    / {maxPossible} Marks
                  </span>
                </div>
                <div className="mt-2 text-xs font-medium flex items-center gap-2">
                  <span className={isQualified ? 'text-emerald-700 dark:text-emerald-300 font-semibold' : 'text-amber-700 dark:text-amber-300 font-semibold'}>
                    {isQualified
                      ? (isCsat ? '✓ CSAT QUALIFIED (≥ 66.67 Marks Threshold Achieved)' : '✓ Above Expected GS Prelims Cutoff (~88.0)')
                      : (isCsat ? '! Below CSAT Qualifying Cutoff (Requires 66.67 Marks)' : '! Below Expected GS Prelims Cutoff (~88.0)')}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    Accuracy: <strong>{session.accuracyPercentage}%</strong>
                  </span>
                </div>
              </div>

              {/* Quick Retake Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    closeResultsModal();
                    startFull100Mock();
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Fresh 100-Q Mock</span>
                </button>
              </div>
            </div>
          </div>

          {/* Breakdown Matrix Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400">Correct (+2.00)</div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {correctCount}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                +{(correctCount * 2.0).toFixed(1)} Marks
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400">Incorrect (-0.66)</div>
              <div className="text-xl font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                {incorrectCount}
              </div>
              <div className="text-[11px] text-rose-500 mt-0.5">
                -{(incorrectCount * 0.66).toFixed(2)} Penalty
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400">Unattempted (0.00)</div>
              <div className="text-xl font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                {unattemptedCount}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                No penalty
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400">Total Paper Questions</div>
              <div className="text-xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                {session.totalQuestions}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                200 Marks Paper
              </div>
            </div>
          </div>

          {/* Detailed Question Review Section */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Question-by-Question Detailed Review & Explanations
                </h3>
              </div>

              {/* Review Filter Segments */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    reviewFilter === 'all'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  All ({questionsToReview.length})
                </button>
                <button
                  onClick={() => setReviewFilter('incorrect')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    reviewFilter === 'incorrect'
                      ? 'bg-white dark:bg-slate-900 text-rose-600 font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Incorrect ({incorrectCount})
                </button>
                <button
                  onClick={() => setReviewFilter('correct')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    reviewFilter === 'correct'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Correct ({correctCount})
                </button>
                <button
                  onClick={() => setReviewFilter('unattempted')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    reviewFilter === 'unattempted'
                      ? 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Left ({unattemptedCount})
                </button>
              </div>
            </div>

            {/* Quick Expand / Collapse */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredReviewList.length} questions:</span>
              <div className="flex items-center gap-3">
                <button onClick={expandAll} className="hover:text-indigo-600 cursor-pointer">
                  Expand All
                </button>
                <span>·</span>
                <button onClick={collapseAll} className="hover:text-indigo-600 cursor-pointer">
                  Collapse All
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {filteredReviewList.map((q, idx) => {
                const userAns = session.answers[q.id];
                const isMarked = !!session.markedForReview[q.id];
                const isCorrect = userAns === q.correctOption;
                const isExpanded = !!expandedQuestions[q.id];

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                          Q.{questionsToReview.indexOf(q) + 1}
                        </span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                          {q.subjectName}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500">{q.section}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {userAns ? (
                          isCorrect ? (
                            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+2.0)
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> Incorrect (-0.66)
                            </span>
                          )
                        ) : (
                          <span className="text-xs text-slate-400">
                            Left Unattempted (0.0)
                          </span>
                        )}
                        <button
                          onClick={() => toggleExpand(q.id)}
                          className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                      {q.questionText}
                    </p>

                    {q.statements && (
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {q.statements.map((s, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2">
                            <span className="font-mono font-semibold text-slate-400">{sIdx + 1}.</span>
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Answer Comparison Strip */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-sans">Your Answer:</span>
                        <strong className={`px-2 py-0.5 rounded ${
                          isCorrect
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700'
                            : userAns
                            ? 'bg-rose-100 dark:bg-rose-950 text-rose-700'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}>
                          {userAns || 'None'}
                        </strong>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-sans">Correct Answer:</span>
                        <strong className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700">
                          {q.correctOption}
                        </strong>
                      </div>
                    </div>

                    {/* Expandable Explanation */}
                    {isExpanded && (
                      <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          Official Reference & Rationale:
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {q.explanation}
                        </p>
                        {q.kannadaExplanation && (
                          <div className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 border border-indigo-200/50">
                            <strong className="block text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mb-0.5">
                              ಕನ್ನಡ ವಿವರಣೆ (Kannada Explanation):
                            </strong>
                            <p className="leading-relaxed font-sans">{q.kannadaExplanation}</p>
                          </div>
                        )}
                        {q.keyTakeaway && (
                          <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200">
                            <strong>Takeaway:</strong> {q.keyTakeaway}
                          </div>
                        )}
                        <div className="text-[11px] text-slate-400">
                          Source: {q.source}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={closeResultsModal}
            className="px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Close & Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

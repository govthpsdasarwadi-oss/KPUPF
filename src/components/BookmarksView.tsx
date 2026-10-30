import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { ALL_QUESTIONS } from '../data/questionsData';
import { CURRENT_AFFAIRS_ARTICLES } from '../data/currentAffairsData';
import {
  Bookmark,
  Trash2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
  Layers
} from 'lucide-react';

export const BookmarksView: React.FC = () => {
  const {
    stats,
    toggleBookmarkQuestion,
    toggleSaveArticle,
    startFilteredPractice,
    setActiveView
  } = useStudy();

  const [activeTab, setActiveTab] = useState<'questions' | 'articles'>('questions');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const bookmarkedQuestions = ALL_QUESTIONS.filter((q) =>
    stats.bookmarkedQuestionIds.includes(q.id)
  );

  const savedArticles = CURRENT_AFFAIRS_ARTICLES.filter((a) =>
    stats.savedArticleIds.includes(a.id)
  );

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <span>High-Yield Revision Vault</span>
            <span aria-hidden="true">·</span>
            <span>Personal Notes</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Saved Questions & Current Affairs Articles
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Quickly revise questions you flagged during mock simulations and saved editorials.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Saved Questions ({bookmarkedQuestions.length})
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Saved Articles ({savedArticles.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Bookmarked Questions */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          {bookmarkedQuestions.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <Bookmark className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Your question vault is currently empty.
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                While taking mock tests or browsing practice questions, tap the bookmark icon to save questions for rapid pre-exam revision.
              </p>
              <button
                onClick={() => setActiveView('practice')}
                className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
              >
                Browse Practice Engine
              </button>
            </div>
          ) : (
            bookmarkedQuestions.map((q, idx) => {
              const isExpanded = !!expandedItems[q.id];

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                        #{idx + 1}
                      </span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {q.subjectName}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{q.section}</span>
                      {q.isPYQ && q.pyqYear && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-amber-600">PYQ {q.pyqYear}</span>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => toggleBookmarkQuestion(q.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md transition-colors cursor-pointer"
                      title="Remove from vault"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                    {q.questionText}
                  </p>

                  {q.statements && (
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-1 text-xs">
                      {q.statements.map((s, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                          <span className="font-mono font-semibold text-slate-400">{sIdx + 1}.</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {q.questionKicker && (
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 italic">
                      {q.questionKicker}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs font-mono">
                      Correct Answer: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">({q.correctOption})</strong>
                    </div>

                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Solution' : 'View Full Solution'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        Explanation & Standard References:
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {q.explanation}
                      </p>
                      {q.keyTakeaway && (
                        <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200">
                          <strong>Key Takeaway:</strong> {q.keyTakeaway}
                        </div>
                      )}
                      <div className="text-[11px] text-slate-400">Source: {q.source}</div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Saved Current Affairs Articles */}
      {activeTab === 'articles' && (
        <div className="space-y-4">
          {savedArticles.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <FileText className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                No articles saved in your revision vault yet.
              </p>
              <button
                onClick={() => setActiveView('current-affairs')}
                className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
              >
                Browse Current Affairs
              </button>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {article.gsCategory}
                      </span>
                      <span>·</span>
                      <span>{article.displayDate}</span>
                      <span>·</span>
                      <span>{article.source}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {article.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleSaveArticle(article.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md transition-colors cursor-pointer"
                    title="Remove from saved articles"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {article.leadParagraph}
                </p>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Key Prelims Pointers:
                  </div>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    {article.keyPoints.slice(0, 2).map((pt, i) => (
                      <li key={i}>• {pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

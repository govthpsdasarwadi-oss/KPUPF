import React, { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { CURRENT_AFFAIRS_ARTICLES } from '../data/currentAffairsData';
import { CurrentAffairsArticle, GSCategory } from '../types';
import {
  Calendar,
  Layers,
  Search,
  BookOpen,
  Bookmark,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  ExternalLink,
  Flame,
  Check
} from 'lucide-react';

export const CurrentAffairsModule: React.FC = () => {
  const { toggleSaveArticle, isArticleSaved, stats, incrementStreak } = useStudy();

  // Feed view mode: 'date-timeline' | 'month-compilation' | 'year-archive'
  const [feedMode, setFeedMode] = useState<'date-timeline' | 'month-compilation' | 'year-archive'>('month-compilation');

  // Filters
  const [selectedGsCategory, setSelectedGsCategory] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Attached MCQ practice state: articleId -> { qId: selectedOption }
  const [mcqUserAnswers, setMcqUserAnswers] = useState<Record<string, Record<string, 'A' | 'B' | 'C' | 'D'>>>({});
  const [expandedMcqs, setExpandedMcqs] = useState<Record<string, boolean>>({});

  // Extracted distinct months and years
  const availableMonths = useMemo(() => {
    return Array.from(new Set(CURRENT_AFFAIRS_ARTICLES.map((a) => a.month)));
  }, []);

  const availableYears = useMemo(() => {
    return Array.from(new Set(CURRENT_AFFAIRS_ARTICLES.map((a) => a.year.toString()))).sort().reverse();
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return CURRENT_AFFAIRS_ARTICLES.filter((article) => {
      if (selectedGsCategory !== 'all' && article.gsCategory !== selectedGsCategory) return false;
      if (selectedMonth !== 'all' && article.month !== selectedMonth) return false;
      if (selectedYear !== 'all' && article.year.toString() !== selectedYear) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const fullContent = (
          article.title +
          ' ' +
          article.leadParagraph +
          ' ' +
          article.tags.join(' ') +
          ' ' +
          article.source
        ).toLowerCase();
        if (!fullContent.includes(query)) return false;
      }
      return true;
    });
  }, [selectedGsCategory, selectedMonth, selectedYear, searchQuery]);

  const handleSelectArticleMcq = (articleId: string, qId: string, opt: 'A' | 'B' | 'C' | 'D') => {
    setMcqUserAnswers((prev) => ({
      ...prev,
      [articleId]: {
        ...(prev[articleId] || {}),
        [qId]: opt,
      },
    }));
  };

  const toggleMcqExpand = (articleId: string) => {
    setExpandedMcqs((prev) => ({ ...prev, [articleId]: !prev[articleId] }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header & Streak Tracker */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <span>UPSC Prelims & Mains Current Affairs</span>
            <span aria-hidden="true">·</span>
            <span>GS-1, GS-2 & GS-3</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Current Affairs Compendium & Prelims MCQs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Read high-yield editorial summaries with attached UPSC-standard MCQs directly under each issue.
            Eliminate cognitive overload with structured GS paper categorization.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 flex items-center gap-3">
            <Flame className="w-6 h-6 text-amber-500" />
            <div>
              <div className="text-[11px] font-medium text-amber-800 dark:text-amber-300">
                Current Affairs Streak
              </div>
              <div className="text-base font-bold font-mono text-amber-900 dark:text-amber-200 tabular-nums">
                {stats.streakDays} Days Active
              </div>
            </div>
            <button
              onClick={incrementStreak}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer"
            >
              Check-in
            </button>
          </div>
        </div>
      </div>

      {/* Feed View Switcher & Category Filters */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
          {/* View Modes */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-full sm:w-auto">
            <button
              onClick={() => {
                setFeedMode('month-compilation');
                setSelectedMonth('all');
                setSelectedYear('all');
              }}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                feedMode === 'month-compilation'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Month-Wise Magazine (GS 1/2/3)
            </button>
            <button
              onClick={() => {
                setFeedMode('date-timeline');
                setSelectedMonth('all');
                setSelectedYear('all');
              }}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                feedMode === 'date-timeline'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Date-Wise Timeline
            </button>
            <button
              onClick={() => {
                setFeedMode('year-archive');
                setSelectedMonth('all');
                setSelectedYear('2026');
              }}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                feedMode === 'year-archive'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Year-Wise Archives
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics, acts, treaties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* GS Paper & Date/Year Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* GS Category Segments */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 text-[11px] font-medium mr-1">Paper:</span>
            {['all', 'GS-1', 'GS-2', 'GS-3'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGsCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedGsCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All GS Papers' : cat}
              </button>
            ))}
          </div>

          {/* Month / Year Specific Dropdowns */}
          <div className="flex items-center gap-2">
            {feedMode === 'month-compilation' && (
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 cursor-pointer"
              >
                <option value="all">All Months</option>
                {availableMonths.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            )}

            {feedMode === 'year-archive' && (
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 cursor-pointer"
              >
                <option value="all">All Years</option>
                {availableYears.map((y) => (
                  <option key={y} value={y}>
                    Year {y}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Articles Feed */}
      <div className="space-y-6">
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              No current affairs articles match the selected criteria.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Reset filters or clear your search query to see recent compilations.
            </p>
          </div>
        ) : (
          filteredArticles.map((article) => {
            const isSaved = isArticleSaved(article.id);
            const isMcqOpen = !!expandedMcqs[article.id];
            const articleAnswers = mcqUserAnswers[article.id] || {};

            return (
              <article
                key={article.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                {/* Header & Meta (Zero-Pill discipline) */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {/* Unboxed Metadata with · separator */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {article.gsCategory}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{article.displayDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.source}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {article.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => toggleSaveArticle(article.id)}
                    className={`p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                      isSaved
                        ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title="Bookmark article for quick revision"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                {/* Lead Summary */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {article.leadParagraph}
                </p>

                {/* Key Prelims Pointers */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    High-Yield Prelims Takeaways:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    {article.keyPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400 mt-0.5">•</span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mains Perspective Box */}
                <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-xs space-y-1">
                  <span className="font-semibold text-indigo-900 dark:text-indigo-200">
                    Mains Question Perspective:
                  </span>
                  <p className="text-indigo-950 dark:text-indigo-300 leading-relaxed italic">
                    "{article.mainsPerspective}"
                  </p>
                </div>

                {/* Built-in Practice MCQs directly attached to Article */}
                {article.practiceMCQs && article.practiceMCQs.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      onClick={() => toggleMcqExpand(article.id)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>Attached Prelims Practice MCQ ({article.practiceMCQs.length} Question)</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <span>{isMcqOpen ? 'Collapse Practice' : 'Test Your Understanding'}</span>
                        {isMcqOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    {isMcqOpen && (
                      <div className="mt-3 space-y-4">
                        {article.practiceMCQs.map((q) => {
                          const userAns = articleAnswers[q.id];
                          const hasAnswered = !!userAns;
                          const isCorrect = userAns === q.correctOption;

                          return (
                            <div
                              key={q.id}
                              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
                            >
                              <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                                {q.questionText}
                              </p>

                              {q.statements && (
                                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-1.5 text-xs">
                                  {q.statements.map((s, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                      <span className="font-mono text-slate-400 font-semibold">{idx + 1}.</span>
                                      <span className="text-slate-700 dark:text-slate-300">{s}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {q.questionKicker && (
                                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 italic">
                                  {q.questionKicker}
                                </p>
                              )}

                              {/* Options */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {q.options.map((opt) => {
                                  const isSelected = userAns === opt.label;
                                  const isRightOpt = opt.label === q.correctOption;

                                  let optClasses = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200';
                                  if (hasAnswered) {
                                    if (isRightOpt) {
                                      optClasses = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200';
                                    } else if (isSelected && !isRightOpt) {
                                      optClasses = 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200';
                                    }
                                  }

                                  return (
                                    <button
                                      key={opt.label}
                                      onClick={() => handleSelectArticleMcq(article.id, q.id, opt.label)}
                                      className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-start gap-2 cursor-pointer ${optClasses}`}
                                    >
                                      <span
                                        className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                                          hasAnswered && isRightOpt
                                            ? 'bg-emerald-600 text-white'
                                            : hasAnswered && isSelected
                                            ? 'bg-rose-600 text-white'
                                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                        }`}
                                      >
                                        {opt.label}
                                      </span>
                                      <span className="leading-relaxed">{opt.text}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Feedback & Explanation */}
                              {hasAnswered && (
                                <div className="mt-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-xs space-y-1.5">
                                  <div className="flex items-center gap-1.5">
                                    {isCorrect ? (
                                      <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+2.00)
                                      </span>
                                    ) : (
                                      <span className="flex items-center gap-1 text-rose-600 font-semibold">
                                        <XCircle className="w-3.5 h-3.5" /> Incorrect (-0.66) · Correct Option: ({q.correctOption})
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {q.explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};

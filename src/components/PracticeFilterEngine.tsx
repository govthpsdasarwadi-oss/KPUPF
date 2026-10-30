import React, { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { ALL_QUESTIONS } from '../data/questionsData';
import { Question, SubjectId } from '../types';
import {
  Filter,
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

export const PracticeFilterEngine: React.FC = () => {
  const { startFilteredPractice, toggleBookmarkQuestion, isQuestionBookmarked } = useStudy();

  // Multi-layered filters
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<number>(10);

  // Practice mode: 'practice-set' (timed test) or 'interactive-cards' (learn right here)
  const [studyMode, setStudyMode] = useState<'interactive-cards' | 'test-drill'>('interactive-cards');

  // Interactive Card answers state: questionId -> selectedOption
  const [interactiveAnswers, setInteractiveAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  // Expanded explanations state
  const [expandedExplanations, setExpandedExplanations] = useState<Record<string, boolean>>({});

  // Distinct subjects
  const subjects: { id: string; label: string }[] = [
    { id: 'all', label: 'All Subjects' },
    { id: 'polity', label: 'Indian Polity & Constitution' },
    { id: 'history', label: 'Modern History of India' },
    { id: 'geography', label: 'Geography (Indian & World)' },
    { id: 'economy', label: 'Indian Economy & Banking' },
    { id: 'environment', label: 'Environment & Climate Ecology' },
    { id: 'science', label: 'Science & Emerging Tech' },
  ];

  // Derive available sections based on selected subject
  const availableSections = useMemo(() => {
    let pool = ALL_QUESTIONS;
    if (selectedSubject !== 'all') {
      pool = pool.filter((q) => q.subject === selectedSubject);
    }
    const sections = Array.from(new Set(pool.map((q) => q.section)));
    return ['all', ...sections];
  }, [selectedSubject]);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return ALL_QUESTIONS.filter((q) => {
      if (selectedSubject !== 'all' && q.subject !== selectedSubject) return false;
      if (selectedSection !== 'all' && q.section !== selectedSection) return false;
      if (selectedYear !== 'all') {
        if (!q.isPYQ || q.pyqYear?.toString() !== selectedYear) return false;
      }
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchText = (q.questionText + ' ' + q.topic + ' ' + (q.statements || []).join(' ')).toLowerCase();
        if (!matchText.includes(query)) return false;
      }
      return true;
    });
  }, [selectedSubject, selectedSection, selectedYear, selectedDifficulty, searchQuery]);

  const handleLaunchTest = () => {
    const yearNum = selectedYear !== 'all' ? parseInt(selectedYear, 10) : undefined;
    const subjTitle = selectedSubject !== 'all' ? subjects.find(s => s.id === selectedSubject)?.label : 'Mixed';
    
    startFilteredPractice({
      subject: selectedSubject !== 'all' ? selectedSubject : undefined,
      section: selectedSection !== 'all' ? selectedSection : undefined,
      year: yearNum,
      count: questionCount,
      title: `${subjTitle} Prelims Drill (${questionCount} Qs)`
    });
  };

  const handleSelectInteractiveOption = (qId: string, opt: 'A' | 'B' | 'C' | 'D') => {
    setInteractiveAnswers((prev) => ({ ...prev, [qId]: opt }));
    // Auto expand explanation on selection
    setExpandedExplanations((prev) => ({ ...prev, [qId]: true }));
  };

  const toggleExplanation = (qId: string) => {
    setExpandedExplanations((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Mock Test & Practice Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Multi-layered filters across Subjects, Sections, Sub-topics, and PYQ Years (2021-2026)
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => setStudyMode('interactive-cards')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              studyMode === 'interactive-cards'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Interactive Cards
          </button>
          <button
            onClick={() => setStudyMode('test-drill')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              studyMode === 'test-drill'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Timed Test Drill
          </button>
        </div>
      </div>

      {/* Filter Control Console */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <Filter className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Multi-Layer Filter Selectors</span>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Matching Questions: <strong className="text-indigo-600 dark:text-indigo-400">{filteredQuestions.length}</strong>
          </span>
        </div>

        {/* Layer 1 to 4: Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Layer 1: Subject */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              1. Subject Domain
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedSection('all');
              }}
              className="w-full text-xs px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Layer 2: Section / Sub-domain */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              2. Section / Pillar
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">All Sections</option>
              {availableSections.filter(s => s !== 'all').map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          {/* Layer 3: PYQ Year Mode */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              3. Year (PYQ Mode)
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">All Question Types</option>
              <option value="2026">UPSC Prelims 2026</option>
              <option value="2025">UPSC Prelims 2025</option>
              <option value="2024">UPSC Prelims 2024</option>
              <option value="2023">UPSC Prelims 2023</option>
              <option value="2022">UPSC Prelims 2022</option>
              <option value="2021">UPSC Prelims 2021</option>
            </select>
          </div>

          {/* Layer 4: Question Count or Difficulty */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              4. Test Question Count
            </label>
            <div className="flex gap-1.5">
              {[10, 25, 50, 100].map((cnt) => (
                <button
                  key={cnt}
                  onClick={() => setQuestionCount(cnt)}
                  className={`flex-1 py-1.5 text-xs font-mono font-medium rounded-lg border transition-colors cursor-pointer ${
                    questionCount === cnt
                      ? 'bg-indigo-600 border-indigo-600 text-white font-semibold'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {cnt} Qs
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Launch Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts (e.g., Article 21, Repo, GLOF)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setSelectedSubject('all');
                setSelectedSection('all');
                setSelectedYear('all');
                setSelectedDifficulty('all');
                setSearchQuery('');
              }}
              className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>

            <button
              onClick={handleLaunchTest}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Launch Timed Drill ({questionCount} Qs)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filtered Content View */}
      {studyMode === 'interactive-cards' ? (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Showing {filteredQuestions.length} practice questions matching active criteria. Click an option to test your understanding and unlock standard references:
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                No questions found matching your filter selection.
              </p>
              <p className="text-xs text-slate-500">
                Try loosening your filters or resetting the search query.
              </p>
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const userChoice = interactiveAnswers[q.id];
              const isAnswered = !!userChoice;
              const isCorrect = userChoice === q.correctOption;
              const isExpanded = !!expandedExplanations[q.id];

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                        #{idx + 1}
                      </span>
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">
                        {q.subjectName}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{q.section}</span>
                      {q.isPYQ && q.pyqYear && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-amber-600 dark:text-amber-400">
                            UPSC Prelims {q.pyqYear}
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => toggleBookmarkQuestion(q.id)}
                      className={`p-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                        isQuestionBookmarked(q.id)
                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title="Bookmark question"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Question Body */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                      {q.questionText}
                    </p>

                    {q.statements && q.statements.length > 0 && (
                      <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                        {q.statements.map((stmt, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                            <span className="font-mono font-semibold text-slate-400">{sIdx + 1}.</span>
                            <span className="leading-relaxed">{stmt}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {q.questionKicker && (
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 italic">
                        {q.questionKicker}
                      </p>
                    )}

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt) => {
                        const isSelected = userChoice === opt.label;
                        const isRightOpt = opt.label === q.correctOption;

                        let optionStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-300';
                        if (isAnswered) {
                          if (isRightOpt) {
                            optionStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-medium';
                          } else if (isSelected && !isRightOpt) {
                            optionStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-950 dark:text-rose-200';
                          }
                        }

                        return (
                          <button
                            key={opt.label}
                            onClick={() => handleSelectInteractiveOption(q.id, opt.label)}
                            className={`p-3 rounded-lg border text-left text-xs transition-colors flex items-start gap-2.5 cursor-pointer ${optionStyle}`}
                          >
                            <span
                              className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${
                                isAnswered && isRightOpt
                                  ? 'bg-emerald-600 text-white'
                                  : isAnswered && isSelected
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                              }`}
                            >
                              {opt.label}
                            </span>
                            <span className="leading-relaxed pt-0.5">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback & Expandable Rationale */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between">
                      {isAnswered ? (
                        <div className="flex items-center gap-2 text-xs">
                          {isCorrect ? (
                            <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Correct (+2.00)</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
                              <XCircle className="w-4 h-4" />
                              <span>Incorrect (-0.66 penalty) · Correct is ({q.correctOption})</span>
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">
                          Click an option above to test your answer
                        </span>
                      )}

                      <button
                        onClick={() => toggleExplanation(q.id)}
                        className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Analysis' : 'Show Analysis'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                        <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Detailed Conceptual Explanation:</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {q.explanation}
                        </p>
                        {q.keyTakeaway && (
                          <div className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200">
                            <strong>Prelims Elimination Rule:</strong> {q.keyTakeaway}
                          </div>
                        )}
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                          Source Reference: {q.source}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Test Drill Launch View */
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center max-w-xl mx-auto space-y-5 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Ready to Launch Timed Practice Drill
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Simulates real UPSC Prelims conditions with timed countdown, negative marking (-0.66),
              and an interactive question palette.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-2 text-left">
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Selected Subject:</span>
              <strong className="text-slate-900 dark:text-slate-100">
                {subjects.find((s) => s.id === selectedSubject)?.label}
              </strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Section:</span>
              <strong className="text-slate-900 dark:text-slate-100">
                {selectedSection === 'all' ? 'All Sections' : selectedSection}
              </strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Exam Year:</span>
              <strong className="text-slate-900 dark:text-slate-100">
                {selectedYear === 'all' ? 'All Years / New Pattern' : `PYQ ${selectedYear}`}
              </strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Questions & Time Limit:</span>
              <strong className="text-indigo-600 dark:text-indigo-400 font-mono">
                {questionCount} Questions ({Math.round(questionCount * 1.2)} Minutes)
              </strong>
            </div>
          </div>

          <button
            onClick={handleLaunchTest}
            className="w-full py-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Play className="w-4 h-4" />
            <span>Start Practice Drill Now</span>
          </button>
        </div>
      )}
    </div>
  );
};

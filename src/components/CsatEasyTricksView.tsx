import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import {
  CSAT_ROADMAP,
  CSAT_TRICKS,
  CSAT_MEMORY_CARDS,
  getCsatMockQuestions
} from '../data/csatData';
import { CsatTrick, CsatMemoryCard } from '../types';
import {
  Zap,
  Clock,
  Target,
  Trophy,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Brain,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Filter,
  Layers,
  ArrowRight,
  Flame,
  Award,
  BookOpen,
  Calculator,
  Compass,
  Shuffle
} from 'lucide-react';

export const CsatEasyTricksView: React.FC = () => {
  const { startCsatMock80, startCsatMiniMock, setActiveView } = useStudy();

  const [activeTab, setActiveTab] = useState<'tricks' | 'memory-tips' | 'mock-drills'>('tricks');
  const [trickFilter, setTrickFilter] = useState<'all' | 'quant' | 'reasoning' | 'reading-comprehension'>('all');
  
  // Interactive per-trick practice answers state: { [qId]: selectedOption }
  const [trickAnswers, setTrickAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Flashcards active card index
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardCategory, setCardCategory] = useState<string>('all');

  const filteredTricks = trickFilter === 'all'
    ? CSAT_TRICKS
    : CSAT_TRICKS.filter((t) => t.category === trickFilter);

  const filteredMemoryCards = cardCategory === 'all'
    ? CSAT_MEMORY_CARDS
    : CSAT_MEMORY_CARDS.filter((c) => c.category === cardCategory);

  const activeCard: CsatMemoryCard = filteredMemoryCards[currentCardIndex % filteredMemoryCards.length] || CSAT_MEMORY_CARDS[0];

  const handleSelectOption = (qId: string, opt: 'A' | 'B' | 'C' | 'D') => {
    setTrickAnswers((prev) => ({ ...prev, [qId]: opt }));
    setRevealedSolutions((prev) => ({ ...prev, [qId]: true }));
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % filteredMemoryCards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + filteredMemoryCards.length) % filteredMemoryCards.length);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Hero Zero-to-Hero Roadmap Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-200/80 dark:border-amber-900/50 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-6 sm:p-8 backdrop-blur-xs shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-xs flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Zero to Hero CSAT
              </span>
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                UPSC Paper-II (Qualifying 66.67 Marks)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              CSAT Easy Tricks & Speed Hacks Vault
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Designed for non-math and humanities background aspirants. Eliminate algebra dread,
              master 10-second shortcuts for high-yield questions, test yourself via instant interactive mini mocks,
              and cross the 66.67 marks qualifying cutoff with absolute confidence.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-500" />
                <span>Cutoff: <strong>33% (66.67 / 200)</strong></span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-500" />
                <span>Marking: <strong>+2.50 / -0.833</strong></span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Time: <strong>80 Qs in 120 Mins</strong></span>
              </div>
            </div>
          </div>

          {/* Action Callout Box */}
          <div className="w-full lg:w-auto p-5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/80 shadow-md space-y-3 shrink-0 text-center lg:text-left">
            <div className="text-xs text-slate-500">
              Complete UPSC CSAT Paper-II Simulator
            </div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              Full 80-Question Mock
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-medium">
              2-Hour Clock · Real-Time 66.67 Qualifying Indicator
            </div>
            <button
              onClick={startCsatMock80}
              className="w-full px-5 py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Launch 80-Q CSAT Mock</span>
            </button>
          </div>
        </div>

        {/* 3 Pillars Roadmap Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-6 pt-6 border-t border-slate-200/60 dark:border-slate-800">
          {CSAT_ROADMAP.triagePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5"
            >
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{pillar.title}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                {pillar.focus}
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-emerald-600 dark:text-emerald-400 pt-1">
                <span>Safe: {pillar.safeScore}</span>
                <span>{pillar.speedBenchmark}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Tab Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('tricks')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'tricks'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Shortcut Tricks & Mock Practice</span>
          </button>

          <button
            onClick={() => setActiveTab('memory-tips')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'memory-tips'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Memory Tips & Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab('mock-drills')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'mock-drills'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>CSAT Mock Test Simulator</span>
          </button>
        </div>

        {activeTab === 'tricks' && (
          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={trickFilter}
              onChange={(e) => setTrickFilter(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-hidden"
            >
              <option value="all">All Topics (8 Hacks)</option>
              <option value="quant">Quantitative Aptitude</option>
              <option value="reasoning">Logical Reasoning</option>
              <option value="reading-comprehension">Reading Comprehension</option>
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: SHORTCUT TRICKS & MOCK PRACTICE */}
      {activeTab === 'tricks' && (
        <div className="space-y-6">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Showing {filteredTricks.length} high-yield CSAT shortcut techniques with attached mock MCQs:</span>
            <span>Click any option to test your speed!</span>
          </div>

          <div className="space-y-6">
            {filteredTricks.map((trick, tIdx) => (
              <div
                key={trick.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5"
              >
                {/* Trick Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                        Trick #{tIdx + 1}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {trick.category}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {trick.difficulty}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                      {trick.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {trick.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold">
                      ⚡ {trick.timeSaved}
                    </div>

                    <button
                      onClick={() => startCsatMiniMock(`${trick.title} Mini Mock`, trick.mockQuestions)}
                      className="px-3 py-1.5 text-xs font-bold rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Timed Mock Drill</span>
                    </button>
                  </div>
                </div>

                {/* Side-by-Side: Traditional Way vs Trick Shortcut */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Traditional */}
                  <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-1.5 text-xs">
                    <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-500" />
                      <span>Traditional Long Way (Avoid on Exam Day)</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-mono text-[11px]">
                      {trick.traditionalApproach}
                    </p>
                  </div>

                  {/* Trick Shortcut */}
                  <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1.5 text-xs">
                    <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Zero-to-Hero Shortcut (Master This)</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-mono text-[11px]">
                      {trick.trickShortcutApproach}
                    </p>
                  </div>
                </div>

                {/* Golden Formula & Memory Mnemonic */}
                <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 flex items-start gap-3 text-xs">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-950 dark:text-amber-200">
                      Rule / Formula:
                    </span>{' '}
                    <span className="font-mono text-slate-800 dark:text-slate-200">
                      {trick.formulaOrRule}
                    </span>
                    <div className="text-[11px] text-amber-800 dark:text-amber-300 font-medium mt-1">
                      💡 Mnemonic: <em>"{trick.memoryMnemonic}"</em>
                    </div>
                  </div>
                </div>

                {/* Attached Interactive Mock Test Questions */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-3.5 bg-indigo-500 rounded-full" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Try Mock Test on this Trick ({trick.mockQuestions.length} Questions)
                    </h3>
                  </div>

                  {trick.mockQuestions.map((q, qIdx) => {
                    const userSelected = trickAnswers[q.id];
                    const isRevealed = revealedSolutions[q.id];
                    const isCorrect = userSelected === q.correctOption;

                    return (
                      <div
                        key={q.id}
                        className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            Mock MCQ {qIdx + 1} {q.isPYQ && `· PYQ ${q.pyqYear}`}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            Marks: +2.50 / -0.833
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                          {q.questionText}
                        </p>

                        {/* Options Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {q.options.map((opt) => {
                            const isChosen = userSelected === opt.label;
                            let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200';

                            if (isRevealed) {
                              if (opt.label === q.correctOption) {
                                btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold';
                              } else if (isChosen && !isCorrect) {
                                btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100';
                              }
                            } else if (isChosen) {
                              btnStyle = 'bg-indigo-50 border-indigo-500 text-indigo-900 dark:text-indigo-100';
                            }

                            return (
                              <button
                                key={opt.label}
                                onClick={() => handleSelectOption(q.id, opt.label)}
                                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                              >
                                <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-mono font-bold shrink-0 text-[11px]">
                                  {opt.label}
                                </span>
                                <span className="pt-0.5 leading-relaxed">{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Instant Trick Explanation */}
                        {isRevealed && (
                          <div className={`p-3.5 rounded-xl text-xs space-y-1.5 transition-all ${
                            isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                              : 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-100'
                          }`}>
                            <div className="font-bold flex items-center gap-1.5">
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                  <span>Spot on! (+2.50 Marks)</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-4 h-4 text-rose-500" />
                                  <span>Correct Answer is Option {q.correctOption} (-0.833 Penalty)</span>
                                </>
                              )}
                            </div>
                            <p className="leading-relaxed text-[11px]">
                              {q.explanation}
                            </p>
                            {q.keyTakeaway && (
                              <div className="font-mono text-[10px] text-slate-600 dark:text-slate-300 pt-0.5">
                                💡 Shortcut Insight: {q.keyTakeaway}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MEMORY TIPS & FORMULA FLASHCARDS */}
      {activeTab === 'memory-tips' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                CSAT Memory Vault & Flashcards
              </h2>
              <p className="text-xs text-slate-500">
                Active recall memory training for percentages, squares, cubes, divisibility, and clock frequencies.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {['all', 'fraction-percent', 'squares-cubes', 'divisibility', 'geometry-triplets'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCardCategory(cat);
                    setCurrentCardIndex(0);
                    setIsFlipped(false);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer ${
                    cardCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {cat.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Flip Flashcard */}
          <div className="max-w-xl mx-auto">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[260px] p-8 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-2 border-indigo-300 dark:border-indigo-800 shadow-xl flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {activeCard.category.replace('-', ' ')} · Flashcard {currentCardIndex + 1}/{filteredMemoryCards.length}
                </span>
                <span className="font-sans italic">Click card to flip ↺</span>
              </div>

              <div className="py-6 text-center space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {isFlipped ? 'REVEALED MEMORY FORMULA' : 'TEST YOUR RECALL'}
                </div>
                <div className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 whitespace-pre-line leading-relaxed">
                  {isFlipped ? activeCard.back : activeCard.front}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate max-w-xs font-mono">
                  {isFlipped ? `💡 Rule: ${activeCard.keyRule}` : activeCard.title}
                </span>
                <span className="font-semibold text-indigo-600">
                  {isFlipped ? 'Mastered!' : 'Click to Flip'}
                </span>
              </div>
            </div>

            {/* Flashcard Controls */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={handlePrevCard}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                ← Previous
              </button>

              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                Flip Card
              </button>

              <button
                onClick={handleNextCard}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Fraction-Percentage Table Matrix */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                High-Speed Conversion Table: Fractions to Percentages (Memorize for CSAT)
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 text-center text-xs">
              {[
                { f: '1/2', p: '50%' },
                { f: '1/3', p: '33.33%' },
                { f: '1/4', p: '25%' },
                { f: '1/5', p: '20%' },
                { f: '1/6', p: '16.66%' },
                { f: '1/7', p: '14.28%' },
                { f: '1/8', p: '12.5%' },
                { f: '1/9', p: '11.11%' },
                { f: '1/10', p: '10%' },
                { f: '1/11', p: '9.09%' },
                { f: '1/12', p: '8.33%' },
                { f: '1/13', p: '7.69%' },
                { f: '1/14', p: '7.14%' },
                { f: '1/16', p: '6.25%' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 font-mono"
                >
                  <div className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                    {item.f}
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                    {item.p}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CSAT MOCK TEST SIMULATOR */}
      {activeTab === 'mock-drills' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              CSAT Paper-II Mock Test Simulator Hub
            </h2>
            <p className="text-xs text-slate-500">
              Simulate standard UPSC Paper-II conditions (+2.50 for correct, -0.833 negative marking).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Mock 1 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  Full Length Mock #1
                </span>
                <span className="text-xs text-slate-500">2 Hours · 80 Questions</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  UPSC CSAT Paper-II: Zero-to-Hero Mock Test
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Full 80-question simulation across Quant, Logical Reasoning, and Reading Comprehension with live cutoff tracker.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-500">
                <span>Total: 200 Marks</span>
                <span>Qualifying: 66.67 Marks</span>
              </div>

              <button
                onClick={startCsatMock80}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Zap className="w-4 h-4" />
                <span>Start 80-Question Mock</span>
              </button>
            </div>

            {/* Mini Mock 2: Quant Sprint */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                  Sectional Sprint #1
                </span>
                <span className="text-xs text-slate-500">20 Mins · 10 Questions</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Quant Shortcuts Speed Drill
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Focused 10-question sprint testing Unit Digits, Remainder Modulo, Time & Work LCM, and Alligations.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-500">
                <span>Total: 25 Marks</span>
                <span>Speed Target: 2 min/Q</span>
              </div>

              <button
                onClick={() => startCsatMiniMock('Quant Shortcuts Speed Drill', getCsatMockQuestions().filter(q => q.section.includes('Quant')).slice(0, 10))}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Calculator className="w-4 h-4" />
                <span>Start Quant Sprint</span>
              </button>
            </div>

            {/* Mini Mock 3: Reasoning Blitz */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
                  Sectional Sprint #2
                </span>
                <span className="text-xs text-slate-500">20 Mins · 10 Questions</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Reasoning Elimination Blitz
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Syllogism polarity, Clock hand angles, Calendar odd days, and Blood relations family tree drills.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-500">
                <span>Total: 25 Marks</span>
                <span>Speed Target: 1.5 min/Q</span>
              </div>

              <button
                onClick={() => startCsatMiniMock('Reasoning Elimination Blitz', getCsatMockQuestions().filter(q => q.section.includes('Reasoning')).slice(0, 10))}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Compass className="w-4 h-4" />
                <span>Start Reasoning Blitz</span>
              </button>
            </div>

            {/* Mini Mock 4: RC Precision */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Sectional Sprint #3
                </span>
                <span className="text-xs text-slate-500">20 Mins · 10 Questions</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Reading Comprehension Extreme-Word Trap Drill
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Differentiate critical crux vs assumptions and eliminate extreme quantifier traps.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-500">
                <span>Total: 25 Marks</span>
                <span>Speed Target: 2 min/Q</span>
              </div>

              <button
                onClick={() => startCsatMiniMock('Reading Comprehension Extreme-Word Trap Drill', getCsatMockQuestions().filter(q => q.section.includes('Reading')).slice(0, 10))}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <BookOpen className="w-4 h-4" />
                <span>Start RC Precision Drill</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

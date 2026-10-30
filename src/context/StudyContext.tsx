import React, { createContext, useContext, useState, useEffect } from 'react';
import { Question, TestSession, UserStats, SubjectId } from '../types';
import { ALL_QUESTIONS, generateMockQuestions } from '../data/questionsData';
import { getCsatMockQuestions } from '../data/csatData';

import { getTranslations, UiTranslations, SCHEDULED_22_LANGUAGES } from '../data/languagesData';

export type AppView =
  | 'dashboard'
  | 'test-series'
  | 'simulator'
  | 'practice'
  | 'current-affairs'
  | 'csat-tricks'
  | 'ai-mentor'
  | 'syllabus'
  | 'saved'
  | 'account';

interface StudyContextType {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Language state (22 Scheduled Languages)
  language: string;
  setLanguage: (code: string) => void;
  showLanguageModal: boolean;
  setShowLanguageModal: (show: boolean) => void;
  t: UiTranslations;
  
  // Test Session state
  currentSession: TestSession | null;
  currentQuestions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (idx: number) => void;
  startFull100Mock: () => void;
  startCsatMock80: () => void;
  startCsatMiniMock: (title: string, questions: Question[]) => void;
  startFilteredPractice: (params: {
    subject?: string;
    section?: string;
    year?: number;
    count?: number;
    title?: string;
  }) => void;
  recordAnswer: (questionId: string, option: 'A' | 'B' | 'C' | 'D') => void;
  clearAnswer: (questionId: string) => void;
  toggleMarkForReview: (questionId: string) => void;
  submitTest: () => void;
  cancelTest: () => void;
  
  // Last completed test & results modal
  lastCompletedSession: TestSession | null;
  showResultsModal: boolean;
  closeResultsModal: () => void;
  openResultsModalForSession: (session: TestSession) => void;
  
  // Stats & Bookmarks
  stats: UserStats;
  completedSessions: TestSession[];
  toggleBookmarkQuestion: (questionId: string) => void;
  toggleSaveArticle: (articleId: string) => void;
  isQuestionBookmarked: (questionId: string) => boolean;
  isArticleSaved: (articleId: string) => boolean;
  incrementStreak: () => void;

  // Zen Ambient Timer
  showZenTimer: boolean;
  setShowZenTimer: (show: boolean) => void;
}

const defaultStats: UserStats = {
  testsCompleted: 6,
  totalQuestionsSolved: 240,
  correctCount: 178,
  incorrectCount: 46,
  streakDays: 14,
  lastActiveDate: new Date().toISOString().split('T')[0],
  subjectPerformance: {
    polity: { attempted: 65, correct: 52 },
    history: { attempted: 45, correct: 31 },
    geography: { attempted: 40, correct: 28 },
    economy: { attempted: 50, correct: 39 },
    environment: { attempted: 30, correct: 22 },
    science: { attempted: 10, correct: 6 },
    csat: { attempted: 20, correct: 16 },
  },
  bookmarkedQuestionIds: ['q-pol-001', 'q-eco-001', 'q-env-002'],
  savedArticleIds: ['ca-2026-10-28-01', 'ca-2026-10-25-02'],
};

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('zen_upsc_theme');
    return saved ? saved === 'dark' : false;
  });

  const [language, setLanguageState] = useState<string>(() => {
    return localStorage.getItem('zen_upsc_lang') || 'en';
  });
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);

  const setLanguage = (code: string) => {
    setLanguageState(code);
    localStorage.setItem('zen_upsc_lang', code);
  };

  const t = getTranslations(language);

  const [currentSession, setCurrentSession] = useState<TestSession | null>(() => {
    try {
      const saved = localStorage.getItem('zen_upsc_active_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentQuestions, setCurrentQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('zen_upsc_active_questions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [lastCompletedSession, setLastCompletedSession] = useState<TestSession | null>(null);
  const [showResultsModal, setShowResultsModal] = useState<boolean>(false);
  const [showZenTimer, setShowZenTimer] = useState<boolean>(false);

  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem('zen_upsc_stats');
      return saved ? JSON.parse(saved) : defaultStats;
    } catch {
      return defaultStats;
    }
  });

  const [completedSessions, setCompletedSessions] = useState<TestSession[]>(() => {
    try {
      const saved = localStorage.getItem('zen_upsc_completed_sessions');
      return saved ? JSON.parse(saved) : [
        {
          id: 'mock-sample-01',
          title: 'Full Prelims Mock Test 01 (General Studies)',
          mode: 'full-mock-100',
          totalQuestions: 100,
          timeLimitMinutes: 120,
          timeRemainingSeconds: 840,
          startedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          completedAt: new Date(Date.now() - 86400000 * 2 + 6360000).toISOString(),
          answers: {},
          markedForReview: {},
          visitedQuestions: {},
          score: 114.68,
          correctCount: 64,
          incorrectCount: 20,
          unattemptedCount: 16,
          accuracyPercentage: 76.2
        },
        {
          id: 'mock-sample-02',
          title: 'Sectional Test: Indian Polity & Governance',
          mode: 'subject-practice',
          filterSubject: 'polity',
          totalQuestions: 25,
          timeLimitMinutes: 30,
          timeRemainingSeconds: 240,
          startedAt: new Date(Date.now() - 86400000).toISOString(),
          completedAt: new Date(Date.now() - 86400000 + 1560000).toISOString(),
          answers: {},
          markedForReview: {},
          visitedQuestions: {},
          score: 38.68,
          correctCount: 21,
          incorrectCount: 4,
          unattemptedCount: 0,
          accuracyPercentage: 84.0
        }
      ];
    } catch {
      return [];
    }
  });

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('zen_upsc_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('zen_upsc_theme', 'light');
    }
  }, [isDarkMode]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('zen_upsc_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('zen_upsc_completed_sessions', JSON.stringify(completedSessions));
  }, [completedSessions]);

  useEffect(() => {
    if (currentSession) {
      localStorage.setItem('zen_upsc_active_session', JSON.stringify(currentSession));
      localStorage.setItem('zen_upsc_active_questions', JSON.stringify(currentQuestions));
    } else {
      localStorage.removeItem('zen_upsc_active_session');
      localStorage.removeItem('zen_upsc_active_questions');
    }
  }, [currentSession, currentQuestions]);

  // Countdown timer for active test session
  useEffect(() => {
    if (!currentSession || currentSession.timeRemainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setCurrentSession((prev) => {
        if (!prev) return null;
        if (prev.timeRemainingSeconds <= 1) {
          clearInterval(interval);
          // auto submit test
          setTimeout(() => submitTest(), 50);
          return { ...prev, timeRemainingSeconds: 0 };
        }
        return {
          ...prev,
          timeRemainingSeconds: prev.timeRemainingSeconds - 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSession?.id, currentSession?.timeRemainingSeconds]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const startFull100Mock = () => {
    const q100 = generateMockQuestions(100);
    const session: TestSession = {
      id: `mock-100-${Date.now()}`,
      title: 'UPSC CSE Prelims 100-Question All-India Simulator',
      mode: 'full-mock-100',
      totalQuestions: 100,
      timeLimitMinutes: 120,
      timeRemainingSeconds: 120 * 60, // 2 hours
      startedAt: new Date().toISOString(),
      answers: {},
      markedForReview: {},
      visitedQuestions: { [q100[0]?.id || '0']: true },
    };

    setCurrentQuestions(q100);
    setCurrentSession(session);
    setCurrentQuestionIndex(0);
    setActiveView('simulator');
  };

  const startCsatMock80 = () => {
    const q80 = getCsatMockQuestions();
    const session: TestSession = {
      id: `csat-80-${Date.now()}`,
      title: 'UPSC CSAT Paper-II: Zero-to-Hero 80-Question Mock Test',
      mode: 'csat-mock-80',
      totalQuestions: 80,
      timeLimitMinutes: 120,
      timeRemainingSeconds: 120 * 60, // 2 hours
      startedAt: new Date().toISOString(),
      answers: {},
      markedForReview: {},
      visitedQuestions: { [q80[0]?.id || '0']: true },
      marksPerCorrect: 2.5,
      negativePerIncorrect: 0.833,
    };

    setCurrentQuestions(q80);
    setCurrentSession(session);
    setCurrentQuestionIndex(0);
    setActiveView('simulator');
  };

  const startCsatMiniMock = (title: string, questions: Question[]) => {
    const timeLimit = Math.max(5, Math.round(questions.length * 2.0)); // 2 mins per question
    const session: TestSession = {
      id: `csat-mini-${Date.now()}`,
      title: title || 'CSAT Shortcut Trick Practice Drill',
      mode: 'csat-mock-80',
      totalQuestions: questions.length,
      timeLimitMinutes: timeLimit,
      timeRemainingSeconds: timeLimit * 60,
      startedAt: new Date().toISOString(),
      answers: {},
      markedForReview: {},
      visitedQuestions: { [questions[0]?.id || '0']: true },
      marksPerCorrect: 2.5,
      negativePerIncorrect: 0.833,
    };

    setCurrentQuestions(questions);
    setCurrentSession(session);
    setCurrentQuestionIndex(0);
    setActiveView('simulator');
  };

  const startFilteredPractice = (params: {
    subject?: string;
    section?: string;
    year?: number;
    count?: number;
    title?: string;
  }) => {
    let pool = [...ALL_QUESTIONS];

    if (params.subject && params.subject !== 'all') {
      pool = pool.filter((q) => q.subject === params.subject);
    }
    if (params.section && params.section !== 'all') {
      pool = pool.filter((q) => q.section.toLowerCase().includes(params.section!.toLowerCase()));
    }
    if (params.year && params.year > 0) {
      pool = pool.filter((q) => q.isPYQ && q.pyqYear === params.year);
    }

    if (pool.length === 0) {
      pool = generateMockQuestions(params.count || 25);
    }

    const count = Math.min(params.count || 25, pool.length);
    const selectedQuestions = pool.slice(0, count);

    // If needed, pad up to count with generated mock questions
    if (selectedQuestions.length < count) {
      const generated = generateMockQuestions(count);
      for (const g of generated) {
        if (selectedQuestions.length >= count) break;
        if (!selectedQuestions.some((q) => q.id === g.id)) {
          selectedQuestions.push(g);
        }
      }
    }

    const timeLimit = Math.max(10, Math.round(selectedQuestions.length * 1.2)); // 1.2 mins per question
    const session: TestSession = {
      id: `practice-${Date.now()}`,
      title: params.title || (params.year ? `PYQ Prelims ${params.year} Drill` : `${params.subject ? params.subject.toUpperCase() : 'Custom'} Practice Drill`),
      mode: params.year ? 'pyq-practice' : 'subject-practice',
      filterSubject: params.subject,
      filterSection: params.section,
      filterYear: params.year,
      totalQuestions: selectedQuestions.length,
      timeLimitMinutes: timeLimit,
      timeRemainingSeconds: timeLimit * 60,
      startedAt: new Date().toISOString(),
      answers: {},
      markedForReview: {},
      visitedQuestions: { [selectedQuestions[0]?.id || '0']: true },
    };

    setCurrentQuestions(selectedQuestions);
    setCurrentSession(session);
    setCurrentQuestionIndex(0);
    setActiveView('simulator');
  };

  const recordAnswer = (questionId: string, option: 'A' | 'B' | 'C' | 'D') => {
    if (!currentSession) return;
    setCurrentSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: option,
        },
        visitedQuestions: {
          ...prev.visitedQuestions,
          [questionId]: true,
        },
      };
    });
  };

  const clearAnswer = (questionId: string) => {
    if (!currentSession) return;
    setCurrentSession((prev) => {
      if (!prev) return null;
      const updatedAnswers = { ...prev.answers };
      delete updatedAnswers[questionId];
      return {
        ...prev,
        answers: updatedAnswers,
      };
    });
  };

  const toggleMarkForReview = (questionId: string) => {
    if (!currentSession) return;
    setCurrentSession((prev) => {
      if (!prev) return null;
      const isMarked = !!prev.markedForReview[questionId];
      return {
        ...prev,
        markedForReview: {
          ...prev.markedForReview,
          [questionId]: !isMarked,
        },
        visitedQuestions: {
          ...prev.visitedQuestions,
          [questionId]: true,
        },
      };
    });
  };

  const submitTest = () => {
    if (!currentSession) return;

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const subjectStatsUpdate = { ...stats.subjectPerformance };

    currentQuestions.forEach((q) => {
      const userAnswer = currentSession.answers[q.id];
      if (!userAnswer) {
        unattemptedCount++;
      } else if (userAnswer === q.correctOption) {
        correctCount++;
        if (q.subject && subjectStatsUpdate[q.subject]) {
          subjectStatsUpdate[q.subject].attempted += 1;
          subjectStatsUpdate[q.subject].correct += 1;
        }
      } else {
        incorrectCount++;
        if (q.subject && subjectStatsUpdate[q.subject]) {
          subjectStatsUpdate[q.subject].attempted += 1;
        }
      }
    });

    // UPSC Prelims Scoring logic: +2.00 / -0.66 for GS; +2.50 / -0.833 for CSAT
    const marksPerCorrect = currentSession.marksPerCorrect ?? (currentSession.mode === 'csat-mock-80' ? 2.5 : 2.0);
    const negativePerIncorrect = currentSession.negativePerIncorrect ?? (currentSession.mode === 'csat-mock-80' ? 0.833 : 0.66);
    const score = Number((correctCount * marksPerCorrect - incorrectCount * negativePerIncorrect).toFixed(2));
    const totalAttempted = correctCount + incorrectCount;
    const accuracy = totalAttempted > 0 ? Number(((correctCount / totalAttempted) * 100).toFixed(1)) : 0;

    const completed: TestSession = {
      ...currentSession,
      completedAt: new Date().toISOString(),
      score,
      correctCount,
      incorrectCount,
      unattemptedCount,
      accuracyPercentage: accuracy,
      marksPerCorrect,
      negativePerIncorrect,
    };

    setLastCompletedSession(completed);
    setShowResultsModal(true);
    setCompletedSessions((prev) => [completed, ...prev]);

    // Update global user stats
    setStats((prev) => ({
      ...prev,
      testsCompleted: prev.testsCompleted + 1,
      totalQuestionsSolved: prev.totalQuestionsSolved + currentQuestions.length,
      correctCount: prev.correctCount + correctCount,
      incorrectCount: prev.incorrectCount + incorrectCount,
      subjectPerformance: subjectStatsUpdate,
    }));

    setCurrentSession(null);
  };

  const cancelTest = () => {
    setCurrentSession(null);
    setCurrentQuestions([]);
  };

  const closeResultsModal = () => {
    setShowResultsModal(false);
  };

  const openResultsModalForSession = (session: TestSession) => {
    setLastCompletedSession(session);
    setShowResultsModal(true);
  };

  const toggleBookmarkQuestion = (questionId: string) => {
    setStats((prev) => {
      const exists = prev.bookmarkedQuestionIds.includes(questionId);
      return {
        ...prev,
        bookmarkedQuestionIds: exists
          ? prev.bookmarkedQuestionIds.filter((id) => id !== questionId)
          : [...prev.bookmarkedQuestionIds, questionId],
      };
    });
  };

  const toggleSaveArticle = (articleId: string) => {
    setStats((prev) => {
      const exists = prev.savedArticleIds.includes(articleId);
      return {
        ...prev,
        savedArticleIds: exists
          ? prev.savedArticleIds.filter((id) => id !== articleId)
          : [...prev.savedArticleIds, articleId],
      };
    });
  };

  const isQuestionBookmarked = (questionId: string) => stats.bookmarkedQuestionIds.includes(questionId);
  const isArticleSaved = (articleId: string) => stats.savedArticleIds.includes(articleId);

  const incrementStreak = () => {
    setStats((prev) => ({
      ...prev,
      streakDays: prev.streakDays + 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
    }));
  };

  return (
    <StudyContext.Provider
      value={{
        activeView,
        setActiveView,
        isDarkMode,
        toggleDarkMode,
        language,
        setLanguage,
        showLanguageModal,
        setShowLanguageModal,
        t,
        currentSession,
        currentQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        startFull100Mock,
        startCsatMock80,
        startCsatMiniMock,
        startFilteredPractice,
        recordAnswer,
        clearAnswer,
        toggleMarkForReview,
        submitTest,
        cancelTest,
        lastCompletedSession,
        showResultsModal,
        closeResultsModal,
        openResultsModalForSession,
        stats,
        completedSessions,
        toggleBookmarkQuestion,
        toggleSaveArticle,
        isQuestionBookmarked,
        isArticleSaved,
        incrementStreak,
        showZenTimer,
        setShowZenTimer,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};

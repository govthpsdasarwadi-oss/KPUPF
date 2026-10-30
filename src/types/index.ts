export type SubjectId =
  | 'polity'
  | 'history'
  | 'geography'
  | 'economy'
  | 'environment'
  | 'science'
  | 'csat';

export interface QuestionOption {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: string;
  subject: SubjectId;
  subjectName: string;
  section: string;
  topic: string;
  isPYQ: boolean;
  pyqYear?: number;
  questionText: string;
  statements?: string[];
  questionKicker?: string;
  options: QuestionOption[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  keyTakeaway?: string;
  source: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  kannadaText?: string;
  kannadaOptions?: QuestionOption[];
  kannadaExplanation?: string;
  hindiText?: string;
}

export type QuestionStatus = 'answered' | 'unanswered' | 'review' | 'review-answered' | 'unvisited';

export interface TestSession {
  id: string;
  title: string;
  mode: 'full-mock-100' | 'subject-practice' | 'pyq-practice' | 'csat-mock-80';
  filterSubject?: string;
  filterSection?: string;
  filterYear?: number;
  totalQuestions: number;
  timeLimitMinutes: number;
  timeRemainingSeconds: number;
  startedAt: string;
  completedAt?: string;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  markedForReview: Record<string, boolean>;
  visitedQuestions: Record<string, boolean>;
  score?: number;
  correctCount?: number;
  incorrectCount?: number;
  unattemptedCount?: number;
  accuracyPercentage?: number;
  marksPerCorrect?: number;
  negativePerIncorrect?: number;
}

export interface CsatTrick {
  id: string;
  title: string;
  category: 'quant' | 'reasoning' | 'reading-comprehension';
  difficulty: 'Zero Level' | 'Intermediate' | 'Hero Level';
  tagline: string;
  timeSaved: string;
  formulaOrRule: string;
  traditionalApproach: string;
  trickShortcutApproach: string;
  memoryMnemonic: string;
  mockQuestions: Question[];
}

export interface CsatMemoryCard {
  id: string;
  category: 'fraction-percent' | 'squares-cubes' | 'divisibility' | 'geometry-triplets' | 'clocks-calendars' | 'speed-work';
  title: string;
  front: string;
  back: string;
  keyRule: string;
  examApplication: string;
}

export type GSCategory = 'GS-1' | 'GS-2' | 'GS-3';

export interface CurrentAffairsArticle {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  displayDate: string;
  month: string; // e.g. "October 2026"
  year: number; // e.g. 2026
  gsCategory: GSCategory;
  gsTag: string; // e.g. "GS-2: Governance & Executive"
  subject: SubjectId;
  source: string;
  readTime: string;
  leadParagraph: string;
  keyPoints: string[];
  mainsPerspective: string;
  practiceMCQs: Question[];
  tags: string[];
}

export interface UserStats {
  testsCompleted: number;
  totalQuestionsSolved: number;
  correctCount: number;
  incorrectCount: number;
  streakDays: number;
  lastActiveDate: string;
  subjectPerformance: Record<SubjectId, { attempted: number; correct: number }>;
  bookmarkedQuestionIds: string[];
  savedArticleIds: string[];
}

export interface TestSeriesCard {
  id: string;
  category: 'gs-pyq' | 'csat' | 'ncert' | 'bpsc' | 'mppsc' | 'uppsc' | 'kpsc' | 'kea';
  title: string;
  subtitle?: string;
  classLevel?: string;
  subject?: string;
  bookTitle?: string;
  year?: number;
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  negativeMarking: string;
  type: 'class-wise' | 'subject-wise' | 'book-wise' | 'chapter-wise' | 'pyq' | 'topic-wise';
}

export const NCERT_TEST_CARDS: TestSeriesCard[] = [
  // Class Wise Tests
  {
    id: 'ncert-cls-6',
    category: 'ncert',
    title: 'Class VI',
    subtitle: 'History, Geography, Civics & Science Basics',
    classLevel: 'Class VI',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 100,
    negativeMarking: '-0.33 Marks',
    type: 'class-wise'
  },
  {
    id: 'ncert-cls-7',
    category: 'ncert',
    title: 'Class VII',
    subtitle: 'Medieval India, Environment & Social Systems',
    classLevel: 'Class VII',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 100,
    negativeMarking: '-0.33 Marks',
    type: 'class-wise'
  },
  {
    id: 'ncert-cls-8',
    category: 'ncert',
    title: 'Class VIII',
    subtitle: 'Modern India, Resources, Law & Social Justice',
    classLevel: 'Class VIII',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 100,
    negativeMarking: '-0.33 Marks',
    type: 'class-wise'
  },
  {
    id: 'ncert-cls-9',
    category: 'ncert',
    title: 'Class IX',
    subtitle: 'Democratic Politics I, Contemporary India I & Economics',
    classLevel: 'Class IX',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 100,
    negativeMarking: '-0.33 Marks',
    type: 'class-wise'
  },
  {
    id: 'ncert-cls-10',
    category: 'ncert',
    title: 'Class X',
    subtitle: 'Democratic Politics II, Economic Development & Resources',
    classLevel: 'Class X',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 100,
    negativeMarking: '-0.33 Marks',
    type: 'class-wise'
  },
  {
    id: 'ncert-cls-11',
    category: 'ncert',
    title: 'Class XI',
    subtitle: 'Indian Constitution at Work & Physical Geography',
    classLevel: 'Class XI',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 100,
    negativeMarking: '-0.33 Marks',
    type: 'class-wise'
  },
  {
    id: 'ncert-cls-12',
    category: 'ncert',
    title: 'Class XII',
    subtitle: 'Themes in Indian History I-III, Politics in India & Macroeconomics',
    classLevel: 'Class XII',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 100,
    negativeMarking: '-0.33 Marks',
    type: 'class-wise'
  },

  // Subject Wise Tests
  {
    id: 'ncert-subj-pol',
    category: 'ncert',
    title: 'NCERT Political Science (Class VI - XII)',
    subtitle: 'Constitutional framework, federalism, local governance & rights',
    subject: 'Polity',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 100,
    negativeMarking: '-0.33 Marks',
    type: 'subject-wise'
  },
  {
    id: 'ncert-subj-his',
    category: 'ncert',
    title: 'NCERT History (Class VI - XII)',
    subtitle: 'Ancient, Medieval and Modern Indian history themes',
    subject: 'History',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 100,
    negativeMarking: '-0.33 Marks',
    type: 'subject-wise'
  },
  {
    id: 'ncert-subj-geo',
    category: 'ncert',
    title: 'NCERT Geography (Class VI - XII)',
    subtitle: 'Physical geography, Indian physiography, climatology & resources',
    subject: 'Geography',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 100,
    negativeMarking: '-0.33 Marks',
    type: 'subject-wise'
  },
  {
    id: 'ncert-subj-eco',
    category: 'ncert',
    title: 'NCERT Economics (Class IX - XII)',
    subtitle: 'Macroeconomics, Indian economic development & national income',
    subject: 'Economics',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 100,
    negativeMarking: '-0.33 Marks',
    type: 'subject-wise'
  },

  // Book Wise Tests
  {
    id: 'ncert-book-const',
    category: 'ncert',
    title: 'Indian Constitution at Work (Class XI)',
    subtitle: 'Fundamental rights, election system, judiciary & federalism',
    bookTitle: 'Indian Constitution at Work',
    totalQuestions: 75,
    totalMarks: 75,
    durationMinutes: 75,
    negativeMarking: '-0.33 Marks',
    type: 'book-wise'
  },
  {
    id: 'ncert-book-geo-phys',
    category: 'ncert',
    title: 'Fundamentals of Physical Geography (Class XI)',
    subtitle: 'Geomorphology, climatology, ocean currents & soil',
    bookTitle: 'Fundamentals of Physical Geography',
    totalQuestions: 75,
    totalMarks: 75,
    durationMinutes: 75,
    negativeMarking: '-0.33 Marks',
    type: 'book-wise'
  },
  {
    id: 'ncert-book-his-themes',
    category: 'ncert',
    title: 'Themes in Indian History Part III (Class XII)',
    subtitle: 'Revolt of 1857, colonial cities, Mahatma Gandhi & Constitution',
    bookTitle: 'Themes in Indian History Part III',
    totalQuestions: 75,
    totalMarks: 75,
    durationMinutes: 75,
    negativeMarking: '-0.33 Marks',
    type: 'book-wise'
  }
];

export const STATE_PSC_TEST_CARDS: Record<string, TestSeriesCard[]> = {
  bpsc: [
    {
      id: 'bpsc-70',
      category: 'bpsc',
      title: '70th BPSC Combined Competitive Prelims',
      subtitle: 'Bihar History, Polity, Geography, Current Affairs & Bihar Special',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 120,
      negativeMarking: '-0.33 Marks',
      type: 'pyq'
    },
    {
      id: 'bpsc-69',
      category: 'bpsc',
      title: '69th BPSC Integrated Combined Prelims',
      subtitle: 'Official Paper with negative marking & analytical questions',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 120,
      negativeMarking: '-0.33 Marks',
      type: 'pyq'
    },
    {
      id: 'bpsc-68',
      category: 'bpsc',
      title: '68th BPSC Prelims Examination Paper',
      subtitle: 'Bihar geography, Champaran movement, economy & general science',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 120,
      negativeMarking: '-0.33 Marks',
      type: 'pyq'
    }
  ],
  mppsc: [
    {
      id: 'mppsc-2025',
      category: 'mppsc',
      title: 'MPPSC State Services Prelims Paper-I (GS)',
      subtitle: 'Madhya Pradesh History, Tribal Culture, Geography & Economy',
      totalQuestions: 100,
      totalMarks: 200,
      durationMinutes: 120,
      negativeMarking: 'No Negative Marking',
      type: 'pyq'
    },
    {
      id: 'mppsc-2024',
      category: 'mppsc',
      title: 'MPPSC State Services Prelims Paper-I',
      subtitle: 'Official question paper with detailed MP specific explanations',
      totalQuestions: 100,
      totalMarks: 200,
      durationMinutes: 120,
      negativeMarking: 'No Negative Marking',
      type: 'pyq'
    }
  ],
  uppsc: [
    {
      id: 'uppsc-2025',
      category: 'uppsc',
      title: 'UPPSC Combined State / Upper Subordinate Prelims',
      subtitle: 'General Studies Paper-I with UP Special GK & Current Events',
      totalQuestions: 150,
      totalMarks: 200,
      durationMinutes: 120,
      negativeMarking: '-0.66 Marks',
      type: 'pyq'
    },
    {
      id: 'uppsc-2024',
      category: 'uppsc',
      title: 'UPPSC PCS Prelims General Studies Paper-I',
      subtitle: 'Environment, Indian Polity, Modern History & Science',
      totalQuestions: 150,
      totalMarks: 200,
      durationMinutes: 120,
      negativeMarking: '-0.66 Marks',
      type: 'pyq'
    }
  ],
  csat: [
    {
      id: 'csat-2026',
      category: 'csat',
      title: '2026: General Studies Paper II (CSAT)',
      subtitle: 'Reading Comprehension, Quantitative Aptitude & Logical Reasoning',
      totalQuestions: 80,
      totalMarks: 200,
      durationMinutes: 120,
      negativeMarking: '-0.83 Marks',
      type: 'pyq'
    },
    {
      id: 'csat-2025',
      category: 'csat',
      title: '2025: General Studies Paper II (CSAT)',
      subtitle: 'Qualifying paper (33% required - 66.6 marks)',
      totalQuestions: 80,
      totalMarks: 200,
      durationMinutes: 120,
      negativeMarking: '-0.83 Marks',
      type: 'pyq'
    },
    {
      id: 'csat-2024',
      category: 'csat',
      title: '2024: General Studies Paper II (CSAT)',
      subtitle: 'Permutation, Number Systems & Critical Reasoning',
      totalQuestions: 80,
      totalMarks: 200,
      durationMinutes: 120,
      negativeMarking: '-0.83 Marks',
      type: 'pyq'
    }
  ],
  kpsc: [
    {
      id: 'kpsc-kas-2024-p1',
      category: 'kpsc',
      title: 'KPSC KAS Prelims Paper-I (General Studies & Humanities)',
      subtitle: 'Karnataka History, Indian Polity, Economy & International Affairs',
      totalQuestions: 100,
      totalMarks: 200,
      durationMinutes: 120,
      negativeMarking: '-0.50 Marks',
      type: 'pyq'
    },
    {
      id: 'kpsc-kas-2024-p2',
      category: 'kpsc',
      title: 'KPSC KAS Prelims Paper-II (Karnataka State GK & Science)',
      subtitle: 'Karnataka Geography, Biodiversity, Rural Development & Panchayat Raj',
      totalQuestions: 100,
      totalMarks: 200,
      durationMinutes: 120,
      negativeMarking: '-0.50 Marks',
      type: 'pyq'
    },
    {
      id: 'kpsc-kas-2020',
      category: 'kpsc',
      title: 'KPSC KAS Official Prelims Examination 2020',
      subtitle: 'Hoysala architecture, Vijayanagara Empire, Mysore state reforms',
      totalQuestions: 100,
      totalMarks: 200,
      durationMinutes: 120,
      negativeMarking: '-0.50 Marks',
      type: 'pyq'
    }
  ],
  kea: [
    {
      id: 'kea-vao-2025',
      category: 'kea',
      title: 'Karnataka KEA Village Administrative Officer (VAO)',
      subtitle: 'General Knowledge, Karnataka Land Revenue, Constitution & Computer Literacy',
      totalQuestions: 100,
      totalMarks: 100,
      durationMinutes: 120,
      negativeMarking: '-0.25 Marks',
      type: 'pyq'
    },
    {
      id: 'kea-fda-sda',
      category: 'kea',
      title: 'KEA First Division Assistant (FDA) / SDA General Studies',
      subtitle: 'General Kannada / English, Karnataka GK, Current Affairs & Quantitative Aptitude',
      totalQuestions: 100,
      totalMarks: 100,
      durationMinutes: 90,
      negativeMarking: '-0.25 Marks',
      type: 'pyq'
    },
    {
      id: 'kea-pdo-2024',
      category: 'kea',
      title: 'KEA Panchayat Development Officer (PDO) Examination',
      subtitle: 'Karnataka Panchayat Raj Act 1993, Rural Development Schemes & Gram Panchayat GK',
      totalQuestions: 100,
      totalMarks: 100,
      durationMinutes: 120,
      negativeMarking: '-0.25 Marks',
      type: 'pyq'
    },
    {
      id: 'kea-psi-2024',
      category: 'kea',
      title: 'Karnataka Police Sub-Inspector (PSI) Paper-II',
      subtitle: 'Indian Penal Code, Criminal Procedure, Karnataka Police & General Studies',
      totalQuestions: 100,
      totalMarks: 150,
      durationMinutes: 90,
      negativeMarking: '-0.375 Marks',
      type: 'pyq'
    }
  ]
};


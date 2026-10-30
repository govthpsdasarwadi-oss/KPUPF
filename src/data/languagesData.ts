export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  scheduleOrder: number;
}

export const SCHEDULED_22_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin', scheduleOrder: 0 },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', scheduleOrder: 8 },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', scheduleOrder: 7 },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', script: 'Bengali-Assamese', scheduleOrder: 1 },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', scheduleOrder: 2 },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो', script: 'Devanagari', scheduleOrder: 3 },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', script: 'Devanagari', scheduleOrder: 4 },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati', scheduleOrder: 5 },
  { code: 'ks', name: 'Kashmiri', nativeName: 'कॉशुर / کٲشُر', script: 'Perso-Arabic', scheduleOrder: 9 },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', script: 'Devanagari', scheduleOrder: 10 },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', script: 'Devanagari', scheduleOrder: 11 },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam', scheduleOrder: 12 },
  { code: 'mni', name: 'Manipuri (Meitei)', nativeName: 'মৈতৈলোন্', script: 'Meetei Mayek', scheduleOrder: 13 },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari', scheduleOrder: 14 },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', script: 'Devanagari', scheduleOrder: 15 },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia', scheduleOrder: 16 },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', scheduleOrder: 17 },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', script: 'Devanagari', scheduleOrder: 18 },
  { code: 'sat', name: 'Santali', nativeName: 'संथाली / ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki', scheduleOrder: 19 },
  { code: 'sd', name: 'Sindhi', nativeName: 'सिन्धी / سنڌي', script: 'Arabic/Devanagari', scheduleOrder: 20 },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', scheduleOrder: 21 },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', scheduleOrder: 22 },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Perso-Arabic', scheduleOrder: 23 },
];

export interface UiTranslations {
  home: string;
  testSeries: string;
  studyTools: string;
  resources: string;
  aiMentor: string;
  account: string;
  selectCategory: string;
  previousYearPapers: string;
  subjectWiseTests: string;
  topicWiseTests: string;
  classWiseTests: string;
  attemptedTests: string;
  startNow: string;
  questions: string;
  marks: string;
  mins: string;
  changeLanguage: string;
  scheduledLanguagesTitle: string;
  prelimsSimulator: string;
  currentAffairs: string;
  gkTricks: string;
  matchColumns: string;
  learnByImage: string;
  notes: string;
  myBookmarks: string;
  freePdfs: string;
  followUs: string;
  shareWithFriends: string;
}

export const TRANSLATIONS: Record<string, UiTranslations> = {
  en: {
    home: 'Home',
    testSeries: 'Test Series',
    studyTools: 'Study Tools',
    resources: 'Resources',
    aiMentor: 'AI Mentor',
    account: 'Account',
    selectCategory: 'Select a category to start the test series',
    previousYearPapers: 'Previous Year Papers',
    subjectWiseTests: 'Subject Wise Tests',
    topicWiseTests: 'Topic Wise Tests',
    classWiseTests: 'Class Wise Tests',
    attemptedTests: 'Attempted Tests',
    startNow: 'Start Now',
    questions: 'Questions',
    marks: 'Marks',
    mins: 'Mins',
    changeLanguage: 'Change Language (22 Languages)',
    scheduledLanguagesTitle: '22 Eighth Schedule Languages of India',
    prelimsSimulator: '100-Q Prelims Simulator',
    currentAffairs: 'Current Affairs',
    gkTricks: 'GK Trick / Mnemonics',
    matchColumns: 'Match The Columns',
    learnByImage: 'Learn By Image',
    notes: 'Notes',
    myBookmarks: 'My Bookmarks',
    freePdfs: 'UPSC & State PSC: Pre-Mains PDFs',
    followUs: 'FOLLOW US ON',
    shareWithFriends: 'Share this app with friends',
  },
  kn: {
    home: 'ಮುಖಪುಟ',
    testSeries: 'ಟೆಸ್ಟ್ ಸರಣಿ',
    studyTools: 'ಅಧ್ಯಯನ ಪರಿಕರಗಳು',
    resources: 'ಸಂಪನ್ಮೂಲಗಳು',
    aiMentor: 'ಎಐ ಮಾರ್ಗದರ್ಶಿ',
    account: 'ಖಾತೆ',
    selectCategory: 'ಟೆಸ್ಟ್ ಸರಣಿಯನ್ನು ಪ್ರಾರಂಭಿಸಲು ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    previousYearPapers: 'ಹಿಂದಿನ ವರ್ಷಗಳ ಪತ್ರಿಕೆಗಳು',
    subjectWiseTests: 'ವಿಷಯವಾರು ಪರೀಕ್ಷೆಗಳು',
    topicWiseTests: 'ವಿಷಯಾಧಾರಿತ ಪರೀಕ್ಷೆಗಳು',
    classWiseTests: 'ತರಗತಿವಾರು ಪರೀಕ್ಷೆಗಳು',
    attemptedTests: 'ಪ್ರಯತ್ನಿಸಿದ ಪರೀಕ್ಷೆಗಳು',
    startNow: 'ಈಗಲೇ ಪ್ರಾರಂಭಿಸಿ',
    questions: 'ಪ್ರಶ್ನೆಗಳು',
    marks: 'ಅಂಕಗಳು',
    mins: 'ನಿಮಿಷಗಳು',
    changeLanguage: 'ಭಾಷೆ ಬದಲಿಸಿ (22 ಭಾಷೆಗಳು)',
    scheduledLanguagesTitle: 'ಭಾರತೀಯ ಸಂವಿಧಾನದ 22 ಎಂಟನೇ ಪರಿಚ್ಛೇದದ ಭಾಷೆಗಳು',
    prelimsSimulator: '100-ಪ್ರಶ್ನೆಗಳ ಪ್ರಿಲಿಮ್ಸ್ ಸಿಮ್ಯುಲೇಟರ್',
    currentAffairs: 'ಪ್ರಚಲಿತ ಘಟನೆಗಳು',
    gkTricks: 'ಜಿಕೆ ಟ್ರಿಕ್ಸ್ / ನೆನಪಿನ ತಂತ್ರಗಳು',
    matchColumns: 'ಹೊಂದಿಸಿ ಬರೆಯಿರಿ',
    learnByImage: 'ಚಿತ್ರಗಳ ಮೂಲಕ ಕಲಿಯಿರಿ',
    notes: 'ಟಿಪ್ಪಣಿಗಳು',
    myBookmarks: 'ನನ್ನ ಬುಕ್‌ಮಾರ್ಕ್‌ಗಳು',
    freePdfs: 'ಯುಪಿಎಸ್‌ಸಿ ಮತ್ತು ಕೆಪಿಎಸ್‌ಸಿ ಪಿಡಿಎಫ್‌ಗಳು',
    followUs: 'ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ',
    shareWithFriends: 'ಈ ಆ್ಯಪ್ ಅನ್ನು ಸ್ನೇಹಿತರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ',
  },
  hi: {
    home: 'होम',
    testSeries: 'टेस्ट सीरीज़',
    studyTools: 'अध्ययन उपकरण',
    resources: 'संसाधन',
    aiMentor: 'एआई मेंटर',
    account: 'खाता',
    selectCategory: 'टेस्ट सीरीज़ शुरू करने के लिए श्रेणी चुनें',
    previousYearPapers: 'विगत वर्षों के प्रश्न पत्र',
    subjectWiseTests: 'विषयवार टेस्ट',
    topicWiseTests: 'टॉपिकवार टेस्ट',
    classWiseTests: 'कक्षावार टेस्ट',
    attemptedTests: 'दिए गए टेस्ट',
    startNow: 'अभी शुरू करें',
    questions: 'प्रश्न',
    marks: 'अंक',
    mins: 'मिनट',
    changeLanguage: 'भाषा बदलें (22 भाषाएं)',
    scheduledLanguagesTitle: 'भारतीय संविधान की 22 आठवीं अनुसूची भाषाएं',
    prelimsSimulator: '100-प्रश्नीय प्रीलिम्स सिम्युलेटर',
    currentAffairs: 'करेंट अफेयर्स',
    gkTricks: 'जीके ट्रिक / स्मृति सूत्र',
    matchColumns: 'सुमेलित कीजिए',
    learnByImage: 'चित्रों द्वारा सीखें',
    notes: 'नोट्स',
    myBookmarks: 'मेरे बुकमार्क',
    freePdfs: 'यूपीएससी व राज्य पीएससी पीडीएफ',
    followUs: 'हमें फॉलो करें',
    shareWithFriends: 'इस ऐप को दोस्तों के साथ साझा करें',
  },
};

export const getTranslations = (code: string): UiTranslations => {
  if (TRANSLATIONS[code]) return TRANSLATIONS[code];
  // Default to English with localized language name hint
  return TRANSLATIONS.en;
};

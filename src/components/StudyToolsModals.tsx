import React, { useState } from 'react';
import {
  Lightbulb,
  Puzzle,
  Image as ImageIcon,
  FileDown,
  X,
  Share2,
  Check,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';

// 1. GK Trick / Mnemonics Modal
export const GkTricksModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'polity' | 'geography' | 'history' | 'karnataka'>('all');

  if (!isOpen) return null;

  const tricks = [
    {
      title: 'SAARC Member Countries (8 Nations)',
      category: 'geography',
      mnemonic: 'MBBS PAIN',
      formula: 'M - Maldives, B - Bangladesh, B - Bhutan, S - Sri Lanka | P - Pakistan, A - Afghanistan, I - India, N - Nepal',
      examContext: 'Perennial favorite in UPSC & KPSC GS Paper 1',
    },
    {
      title: 'Right to Equality (Articles 14 to 18)',
      category: 'polity',
      mnemonic: 'E - D - O - U - T ("EDOU-T")',
      formula: 'Art 14: Equality before law · Art 15: Non-Discrimination · Art 16: Opportunity in public employment · Art 17: Untouchability abolition · Art 18: Titles abolition',
      examContext: 'Fundamental Rights Part III of Constitution',
    },
    {
      title: '8 Core Industries of India',
      category: 'polity',
      mnemonic: 'CCC FRENS',
      formula: 'C - Coal, C - Crude Oil, C - Cement | F - Fertilizers, R - Refinery Products (Highest Weightage ~28%), E - Electricity, N - Natural Gas, S - Steel',
      examContext: 'IIPI (Index of Industrial Production) Weightage ~40.27%',
    },
    {
      title: 'Karnataka Major West-Flowing Rivers',
      category: 'karnataka',
      mnemonic: 'K-S-V-G-A-N ("K-SV-GAN")',
      formula: 'Kali, Sharavathi (Jog Falls), Varahi (Kunchikal), Gangavali, Aghanashini, Nethravathi (Mangaluru)',
      examContext: 'KPSC KAS & KEA FDA/VAO Geography',
    },
    {
      title: 'Karnataka Royal Dynasties Chronology',
      category: 'karnataka',
      mnemonic: 'K - G - C - R - H - V ("Kadamba Ganga Chalukya Rashtrakuta Hoysala Vijayanagara")',
      formula: '1. Kadambas (Banavasi) 2. Western Gangas (Talakadu) 3. Badami Chalukyas 4. Rashtrakutas (Manyakheta) 5. Hoysalas (Dwarasamudra) 6. Vijayanagara (Hampi)',
      examContext: 'KPSC History Ancient-Medieval Karnataka',
    },
    {
      title: 'Tributaries of River Cauvery',
      category: 'geography',
      mnemonic: 'Right: L-K-S-K-A | Left: H-H-S-A',
      formula: 'Right Bank: Lakshmantirtha, Kabbani, Suvarnavathi, Bhavani, Amaravathi | Left Bank: Harangi, Hemavathi, Shimsha, Arkavathi',
      examContext: 'Cauvery River Basin inter-state dispute',
    },
  ];

  const filtered = activeCategory === 'all' ? tricks : tricks.filter(t => t.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="w-full max-w-2xl max-h-[85vh] flex flex-col p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                GK Trick / Mnemonics Vault
              </h2>
              <p className="text-xs text-slate-500">
                High-yield memory retention formulas for UPSC CSE & Karnataka KPSC/KEA
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          {['all', 'polity', 'geography', 'karnataka'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-3 py-1 rounded-lg font-medium capitalize transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {cat === 'all' ? 'All Tricks' : cat}
            </button>
          ))}
        </div>

        {/* Tricks list */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filtered.map((trick, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  {trick.title}
                </h3>
                <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  {trick.mnemonic}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-mono leading-relaxed bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                {trick.formula}
              </p>
              <div className="text-[11px] text-slate-500 italic">
                Focus: {trick.examContext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 2. Match The Columns Interactive Game
export const MatchColumnsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const pairs = [
    { left: 'Kadamba Dynasty (ಕದಂಬರು)', right: 'Banavasi (ಬನವಾಸಿ - ಹಲ್ಮಿಡಿ ಶಾಸನ)' },
    { left: 'Hoysala Dynasty (ಹೊಯ್ಸಳರು)', right: 'Belur & Halebidu (ಬೇಲೂರು - ಹಳೇಬೀಡು)' },
    { left: 'Badami Chalukyas (ಚಾಲುಕ್ಯರು)', right: 'Aihole & Pattadakal (ಐಹೊಳೆ - ಪಟ್ಟದಕಲ್ಲು)' },
    { left: 'Vijayanagara Empire (ವಿಜಯನಗರ)', right: 'Hampi Virupaksha (ಹಂಪಿ ವಿರೂಪಾಕ್ಷ)' },
    { left: 'Lothal (Indus Valley)', right: 'Tidal Dockyard on Bhogava River' },
    { left: 'Dholavira (Gujarat)', right: 'Giant Water Reservoirs & Signboard' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="w-full max-w-2xl max-h-[85vh] flex flex-col p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Puzzle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Match The Columns Drill
              </h2>
              <p className="text-xs text-slate-500">
                UPSC & Karnataka PSC match-the-pair elimination mastery
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 text-xs text-emerald-900 dark:text-emerald-300">
          UPSC 2023-2026 format strictly tests "Only one pair", "Only two pairs", "All three pairs". Study these authentic matched pairs:
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {pairs.map((p, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-3 text-xs"
            >
              <div className="font-semibold text-slate-900 dark:text-slate-100 flex-1">
                {idx + 1}. {p.left}
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0" />
              <div className="font-medium text-emerald-700 dark:text-emerald-300 text-right flex-1">
                {p.right}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. Learn By Image Visual Diagrams
export const LearnByImageModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const visuals = [
    {
      title: 'Western Ghats Biodiversity Hotspot & Karnataka Protected Areas',
      description: 'Nagarhole, Bandipur, Kudremukh, Anshi-Dandeli & BRT Tiger Reserves with evergreen shola grassland ecotones.',
      tags: ['Karnataka Geography', 'IUCN Hotspot', 'KPSC'],
    },
    {
      title: 'Indian Ocean Dipole (IOD) & El Niño Monsoon Feedback',
      description: 'Positive IOD warms western Indian Ocean, driving vigorous monsoon precipitation over the Indian subcontinent.',
      tags: ['Climatology', 'UPSC Prelims GS-1'],
    },
    {
      title: 'Constitutional Architecture: Kesavananda Bharati Basic Structure',
      description: 'Supremacy of Constitution, Rule of Law, Judicial Review, Separation of Powers, and Federalism as unalterable tenets.',
      tags: ['Polity', 'Article 368'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="w-full max-w-2xl max-h-[85vh] flex flex-col p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Learn By Image & Infographics
              </h2>
              <p className="text-xs text-slate-500">
                Visual memory aids for physical geography, maps, and constitutional tables
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {visuals.map((v, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-600">0{idx + 1}.</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {v.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {v.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {v.tags.map((t, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4. Free Pre-Mains PDFs Resources Modal
export const FreePdfsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const pdfs = [
    {
      title: 'UPSC Prelims 2026 Comprehensive 100-Question GS-1 Paper',
      pages: '32 Pages · Full Explanations & Source Citations',
      badge: 'Free Download',
    },
    {
      title: 'Karnataka PSC KAS Prelims Paper-1 & Paper-2 Compendium',
      pages: '48 Pages · Karnataka History, Geography & Administration',
      badge: 'KPSC Special',
    },
    {
      title: 'KEA VAO & PDO Karnataka Panchayat Raj Act 1993 Handbook',
      pages: '24 Pages · Gram Swaraj Act & Rural Development Schemes',
      badge: 'KEA Special',
    },
    {
      title: 'NCERT Class 6 to 12 Crucial Pointers & High-Yield Summary',
      pages: '64 Pages · History, Polity, Geography & Macroeconomics',
      badge: 'NCERT Foundation',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="w-full max-w-2xl max-h-[85vh] flex flex-col p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                UPSC & State PSC: Pre-Mains PDFs
              </h2>
              <p className="text-xs text-slate-500">
                High-yield revision dossiers, NCERT summaries, and KPSC/KEA compendiums
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {pdfs.map((pdf, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-4 shadow-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 uppercase">
                    {pdf.badge}
                  </span>
                  <span className="text-[11px] text-slate-400">{pdf.pages}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  {pdf.title}
                </h3>
              </div>

              <button
                onClick={() => alert(`Starting download for: ${pdf.title}`)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

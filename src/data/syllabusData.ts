export interface SyllabusTopic {
  id: string;
  title: string;
  paper: 'Prelims GS-1' | 'Prelims CSAT' | 'Mains GS-1' | 'Mains GS-2' | 'Mains GS-3' | 'Mains GS-4';
  subject: string;
  weightage: string;
  subtopics: string[];
  completed: boolean;
}

export const UPSC_SYLLABUS_TOPICS: SyllabusTopic[] = [
  {
    id: 'syl-01',
    paper: 'Prelims GS-1',
    subject: 'Indian Polity & Governance',
    title: 'Constitution, Political System & Panchayati Raj',
    weightage: '14-18 Questions (28-36 Marks)',
    subtopics: [
      'Preamble, Fundamental Rights (Art 12-35), DPSP (Art 36-51), Fundamental Duties',
      'Parliament: Lok Sabha, Rajya Sabha, Sessions, Committees, Speaker & Chairman',
      'Union & State Executive: President, Governor, Prime Minister, Council of Ministers',
      'Judiciary: Supreme Court, High Courts, Judicial Review, Public Interest Litigation (PIL)',
      'Local Self-Government: 73rd and 74th Constitutional Amendments, PESA Act 1996',
      'Constitutional & Statutory Bodies: EC, UPSC, CAG, Finance Commission, CBI, CVC'
    ],
    completed: true
  },
  {
    id: 'syl-02',
    paper: 'Prelims GS-1',
    subject: 'Modern History of India',
    title: 'Indian National Movement (1857-1947)',
    weightage: '12-16 Questions (24-32 Marks)',
    subtopics: [
      'Revolt of 1857: Causes, Leaders, British suppression, Government of India Act 1858',
      'Early Nationalist Phase: Moderates, Extremists, Surat Split (1907), Swadeshi Movement',
      'Gandhian Phase: Champaran, Kheda, Ahmedabad, Non-Cooperation, Civil Disobedience',
      'Revolutionary Movements: HSRA, Bhagat Singh, Surya Sen & Chittagong Armoury Raid',
      'Constitutional Developments: 1909 Minto-Morley, 1919 Montagu-Chelmsford, 1935 Act',
      'Quit India Movement (1942), INA trials, Cabinet Mission Plan, Partition & Independence'
    ],
    completed: true
  },
  {
    id: 'syl-03',
    paper: 'Prelims GS-1',
    subject: 'Indian & World Geography',
    title: 'Physical, Social & Economic Geography',
    weightage: '12-15 Questions (24-30 Marks)',
    subtopics: [
      'Geomorphology: Plate tectonics, Volcanoes, Earthquakes, Rock cycles, Weathering',
      'Climatology: Atmospheric circulation, Jet streams, Monsoons, El Niño & La Niña, IOD',
      'Oceanography: Ocean currents, Tides, Coral reefs & Coral bleaching, Salinity',
      'Indian Drainage: Himalayan rivers (Indus, Ganga, Brahmaputra) vs Peninsular rivers',
      'Soils of India, Mineral resources, Major agricultural crops & Cropping patterns'
    ],
    completed: false
  },
  {
    id: 'syl-04',
    paper: 'Prelims GS-1',
    subject: 'Indian Economy & Social Development',
    title: 'Macroeconomics, Fiscal & Monetary Policies',
    weightage: '14-18 Questions (28-36 Marks)',
    subtopics: [
      'National Income Accounting: GDP, GVA, Real vs Nominal, Base year revisions',
      'Monetary Policy: RBI tools (Repo, Reverse Repo, CRR, SLR, MSF, OMOs), MPC framework',
      'Fiscal Policy: Union Budget, Revenue vs Capital, Fiscal Deficit, FRBM Act provisions',
      'Banking Sector: Non-Performing Assets (NPAs), IBC 2016, Prompt Corrective Action (PCA)',
      'External Sector: Balance of Payments (BoP), Current Account Deficit, Forex, Trade treaties'
    ],
    completed: true
  },
  {
    id: 'syl-05',
    paper: 'Prelims GS-1',
    subject: 'Environment, Ecology & Climate Change',
    title: 'Biodiversity, National Parks & Conventions',
    weightage: '16-20 Questions (32-40 Marks)',
    subtopics: [
      'Ecology Fundamentals: Trophic levels, Ecological succession, Biomes, Food webs',
      'Biodiversity Conservation: In-situ (National Parks, Wildlife Sanctuaries, Biosphere Reserves)',
      'Threatened Species: IUCN Red List status of Indian endemic mammals, birds, reptiles',
      'Environmental Legislation: Wildlife Protection Act 1972, EPA 1986, Forest Rights Act 2006',
      'Global Climate Accords: UNFCCC Paris Agreement, COP decisions, CBD Kunming-Montreal'
    ],
    completed: false
  },
  {
    id: 'syl-06',
    paper: 'Prelims GS-1',
    subject: 'General Science & Emerging Technology',
    title: 'Biotechnology, Space & Digital Technologies',
    weightage: '8-12 Questions (16-24 Marks)',
    subtopics: [
      'Biotechnology: CRISPR-Cas9, Stem cells, Recombinant DNA, Genome sequencing, Vaccines',
      'Space Technology: ISRO launch vehicles (PSLV, GSLV, LVM3), Chandrayaan, Gaganyaan',
      'IT & Electronics: 5G/6G, Quantum computing, Artificial Intelligence, Semiconductor tech',
      'Defense Tech: Missiles (Agni, BrahMos, S-400), Indigenous defense platforms, Stealth frigates'
    ],
    completed: false
  }
];

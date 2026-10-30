import { CurrentAffairsArticle } from '../types';

export const CURRENT_AFFAIRS_ARTICLES: CurrentAffairsArticle[] = [
  {
    id: 'ca-2026-10-28-01',
    title: 'Digital Personal Data Protection (DPDP) Rules & Consent Architecture',
    date: '2026-10-28',
    displayDate: 'October 28, 2026',
    month: 'October 2026',
    year: 2026,
    gsCategory: 'GS-2',
    gsTag: 'GS-2: Governance, Transparency & Accountability',
    subject: 'polity',
    source: 'The Hindu / MeitY PIB Release',
    readTime: '4 min read',
    leadParagraph: 'The Ministry of Electronics and Information Technology has notified operational guidelines for Consent Managers under the Digital Personal Data Protection Act, laying down technical standards for data fiduciaries and verifiable consent mechanisms for children and vulnerable groups.',
    keyPoints: [
      'Introduces statutory framework for Data Protection Board of India (DPBI) as an adjudicatory mechanism.',
      'Mandates Consent Managers to be registered entities interoperable through standardized APIs.',
      'Establishes cross-border data transfer norms based on negative lists rather than whitelisting.',
      'Exemptions provided for national security and law enforcement under strict proportionality tests.'
    ],
    mainsPerspective: 'How does the DPDP Act strike a balance between individual digital privacy rights (Article 21) and the data-driven economic imperatives of India\'s trillion-dollar digital economy? Critically examine.',
    tags: ['DPDP Act', 'Data Privacy', 'Article 21', 'MeitY', 'Data Protection Board'],
    practiceMCQs: [
      {
        id: 'ca-mcq-101',
        subject: 'polity',
        subjectName: 'Indian Polity',
        section: 'Governance & Legislation',
        topic: 'Digital Personal Data Protection Act',
        isPYQ: false,
        questionText: 'With reference to the Digital Personal Data Protection (DPDP) Act, consider the following statements:',
        statements: [
          'The Data Protection Board of India operates as a digital-by-design appellate tribunal.',
          'Consent Managers must be registered with the Data Protection Board to act on behalf of Data Principals.',
          'Penalties for significant data breaches can extend up to ₹250 crore per instance.'
        ],
        questionKicker: 'Which of the statements given above are correct?',
        options: [
          { label: 'A', text: '1 and 2 only' },
          { label: 'B', text: '2 and 3 only' },
          { label: 'C', text: '1 and 3 only' },
          { label: 'D', text: '1, 2 and 3' }
        ],
        correctOption: 'D',
        explanation: 'All three statements are correct under the DPDP Act. The Board functions digitally, consent managers enable granular consent management, and the schedule specifies penalties up to ₹250 crore for failure to take reasonable security safeguards to prevent data breaches.',
        source: 'The Hindu & Gazette Notification',
        difficulty: 'Moderate'
      }
    ]
  },
  {
    id: 'ca-2026-10-25-02',
    title: 'National Green Hydrogen Mission: SIGHT Scheme Tranche-III Guidelines',
    date: '2026-10-25',
    displayDate: 'October 25, 2026',
    month: 'October 2026',
    year: 2026,
    gsCategory: 'GS-3',
    gsTag: 'GS-3: Economy, Infrastructure & Energy Transition',
    subject: 'economy',
    source: 'Press Information Bureau (PIB) / MNRE',
    readTime: '5 min read',
    leadParagraph: 'The Ministry of New and Renewable Energy (MNRE) unveiled revised criteria under the Strategic Interventions for Green Hydrogen Transition (SIGHT) programme, incentivizing indigenous manufacture of advanced alkaline and PEM electrolysers.',
    keyPoints: [
      'Aims to reach 5 Million Metric Tonnes (MMT) annual green hydrogen production capacity by 2030.',
      'SIGHT Scheme provides direct financial incentives for domestic electrolyser manufacturing (Component I) and green hydrogen production (Component II).',
      'Targeted export corridors established with Japan, South Korea, and the European Union.',
      'Expected to abate nearly 50 MMT of annual greenhouse gas emissions by replacing grey hydrogen in refineries and fertilizer plants.'
    ],
    mainsPerspective: 'Evaluate the role of the National Green Hydrogen Mission in decarbonizing hard-to-abate industrial sectors while advancing India\'s Net-Zero 2070 commitment.',
    tags: ['Green Hydrogen', 'Renewable Energy', 'SIGHT Scheme', 'Net Zero 2070', 'MNRE'],
    practiceMCQs: [
      {
        id: 'ca-mcq-102',
        subject: 'economy',
        subjectName: 'Indian Economy',
        section: 'Energy & Infrastructure',
        topic: 'Green Hydrogen vs Grey Hydrogen',
        isPYQ: false,
        questionText: 'What distinguishes "Green Hydrogen" from "Blue Hydrogen" in the energy transition discourse?',
        options: [
          { label: 'A', text: 'Green hydrogen is produced via electrolysis of water using renewable energy, while blue hydrogen is derived from natural gas with Carbon Capture and Storage (CCS).' },
          { label: 'B', text: 'Green hydrogen uses nuclear fission reactors while blue hydrogen uses tidal generators.' },
          { label: 'C', text: 'Blue hydrogen has zero greenhouse emissions whereas green hydrogen produces nitrous oxides.' },
          { label: 'D', text: 'Green hydrogen is liquid at room temperature whereas blue hydrogen is compressed gas.' }
        ],
        correctOption: 'A',
        explanation: 'Green hydrogen is generated by splitting water using renewable electricity (solar/wind). Blue hydrogen is produced from fossil methane (steam methane reforming) where carbon dioxide emissions are captured and stored underground (CCS).',
        source: 'MNRE / IEA Energy Outlook',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: 'ca-2026-10-20-03',
    title: 'Glacial Lake Outburst Floods (GLOFs) in Eastern Himalayas: NDMA Early Warning Grid',
    date: '2026-10-20',
    displayDate: 'October 20, 2026',
    month: 'October 2026',
    year: 2026,
    gsCategory: 'GS-3',
    gsTag: 'GS-3: Disaster Management & Environmental Ecology',
    subject: 'environment',
    source: 'DownToEarth / NDMA Mission Report',
    readTime: '4 min read',
    leadParagraph: 'Following recurring glacial breaches such as South Lhonak lake in Sikkim, the National Disaster Management Authority (NDMA) has operationalized automated sensor buoys and satellite synthetic aperture radar (SAR) monitoring across 56 high-risk glacial lakes.',
    keyPoints: [
      'Over 2,000 glacial lakes in the Indian Himalayas are growing rapidly due to accelerated deglaciation.',
      'GLOF occurs when water dammed by loose moraines or ice breaches catastrophic volumes down alpine river valleys.',
      'Sensor buoys transmit water level, hydrostatic pressure, and seismic vibrations via NavIC satellite constellation.',
      'Community-based siren alerting and evacuation drills integrated under Sendai Framework priorities.'
    ],
    mainsPerspective: 'Discuss the multi-hazard vulnerability of the Himalayan ecological belt. What institutional mechanisms are needed for cross-border early warning systems in the Hindu Kush Himalaya?',
    tags: ['GLOF', 'Disaster Management', 'NDMA', 'Sendai Framework', 'Himalayas'],
    practiceMCQs: [
      {
        id: 'ca-mcq-103',
        subject: 'environment',
        subjectName: 'Environment & Ecology',
        section: 'Disaster Management',
        topic: 'Glacial Lake Outburst Floods (GLOF)',
        isPYQ: false,
        questionText: 'Consider the following statements regarding Glacial Lake Outburst Floods (GLOF):',
        statements: [
          'They are caused by the failure of a moraine dam or ice dam retaining a glacial lake.',
          'Rising global temperatures and glacial retreat accelerate the formation and volume of proglacial lakes.',
          'The National Disaster Management Authority (NDMA) is headed by the Union Home Minister.'
        ],
        questionKicker: 'Which of the statements given above is/are correct?',
        options: [
          { label: 'A', text: '1 and 2 only' },
          { label: 'B', text: '2 and 3 only' },
          { label: 'C', text: '1 and 3 only' },
          { label: 'D', text: '1, 2 and 3' }
        ],
        correctOption: 'A',
        explanation: 'Statements 1 and 2 are correct. Statement 3 is incorrect because under the Disaster Management Act, 2005, the National Disaster Management Authority (NDMA) is ex-officio chaired by the Prime Minister of India, NOT the Home Minister.',
        source: 'NDMA Act 2005 / DownToEarth',
        difficulty: 'Moderate'
      }
    ]
  },
  {
    id: 'ca-2026-09-15-04',
    title: 'Great Nicobar Infrastructure Project & Protection of Shompen & Nicobarese Tribes',
    date: '2026-09-15',
    displayDate: 'September 15, 2026',
    month: 'September 2026',
    year: 2026,
    gsCategory: 'GS-1',
    gsTag: 'GS-1: Indian Society, Vulnerable Tribes & Geography',
    subject: 'geography',
    source: 'Indian Express / Anthropological Survey of India',
    readTime: '5 min read',
    leadParagraph: 'The National Commission for Scheduled Tribes (NCST) and environmental groups conducted an in-depth review of the mitigation corridors established around the Galathea Bay International Container Transshipment Port to protect the habitat of the Particularly Vulnerable Tribal Group (PVTG) Shompen.',
    keyPoints: [
      'The Shompen are one of the 75 Particularly Vulnerable Tribal Groups (PVTGs) in India, residing in the interior rainforests of Great Nicobar.',
      'Galathea National Park and Campbell Bay National Park constitute the Great Nicobar Biosphere Reserve.',
      'Galathea Bay is a premier nesting sanctuary for the giant Leatherback sea turtle (Dermochelys coriacea).',
      'The strategic location of Great Nicobar near the Malacca Strait provides maritime surveillance and choke point deterrence.'
    ],
    mainsPerspective: 'Analyze the strategic geopolitical importance of the Andaman and Nicobar Islands in India\'s Indo-Pacific strategy against the ecological imperative of preserving pristine biodiversity and indigenous tribal rights.',
    tags: ['Great Nicobar', 'Shompen', 'PVTGs', 'Galathea Bay', 'Biosphere Reserve'],
    practiceMCQs: [
      {
        id: 'ca-mcq-104',
        subject: 'geography',
        subjectName: 'Geography',
        section: 'Human Geography & Demography',
        topic: 'Particularly Vulnerable Tribal Groups (PVTGs)',
        isPYQ: true,
        pyqYear: 2024,
        questionText: 'Consider the following statements regarding Particularly Vulnerable Tribal Groups (PVTGs) in India:',
        statements: [
          'PVTGs reside in 18 States and one Union Territory.',
          'A declining or stagnant population is one of the criteria for determining PVTG status.',
          'The Shompen tribe of Great Nicobar is classified as a PVTG.'
        ],
        questionKicker: 'Which of the statements given above are correct?',
        options: [
          { label: 'A', text: '1 and 2 only' },
          { label: 'B', text: '2 and 3 only' },
          { label: 'C', text: '1 and 3 only' },
          { label: 'D', text: '1, 2 and 3' }
        ],
        correctOption: 'D',
        explanation: 'All three statements are correct. In 1973, Dhebar Commission created Primitive Tribal Groups (later renamed PVTGs). There are 75 recognized PVTGs across 18 States and the UT of Andaman & Nicobar Islands. Criteria include pre-agricultural technology, stagnant/declining population, low literacy, and economic backwardness.',
        source: 'Ministry of Tribal Affairs / NCERT',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: 'ca-2026-08-10-05',
    title: 'Appointment of Chief Election Commissioner and Election Commissioners: Statutory Framework',
    date: '2026-08-10',
    displayDate: 'August 10, 2026',
    month: 'August 2026',
    year: 2026,
    gsCategory: 'GS-2',
    gsTag: 'GS-2: Constitutional Bodies & Electoral Reforms',
    subject: 'polity',
    source: 'Supreme Court Observer / LiveLaw',
    readTime: '4 min read',
    leadParagraph: 'The Supreme Court scrutinized petitions challenging the Chief Election Commissioner and Other Election Commissioners (Appointment, Conditions of Service and Term of Office) Act, 2023, specifically focusing on the composition of the executive Selection Committee.',
    keyPoints: [
      'Under the 2023 Act, the Selection Committee consists of the Prime Minister (Chair), a Union Cabinet Minister, and the Leader of the Opposition or largest opposition party in Lok Sabha.',
      'Replaced the interim judicial mechanism laid down in Anoop Baranwal (2023) which included the Chief Justice of India.',
      'CEC and ECs enjoy protection from arbitrary removal; CEC can be removed only like a Supreme Court judge (impeachment in Parliament).',
      'ECI conducts elections to Lok Sabha, Rajya Sabha, State Assemblies/Councils, and the offices of President and Vice President.'
    ],
    mainsPerspective: '"Independent constitutional institutions are the foundational bedrocks of participatory electoral democracy." Discuss in the light of recent judicial pronouncements on the Election Commission of India.',
    tags: ['Election Commission', 'Article 324', 'Anoop Baranwal', 'Constitutional Law'],
    practiceMCQs: [
      {
        id: 'ca-mcq-105',
        subject: 'polity',
        subjectName: 'Indian Polity',
        section: 'Constitutional Bodies',
        topic: 'Election Commission of India (Article 324)',
        isPYQ: true,
        pyqYear: 2023,
        questionText: 'Under the Constitution of India, the Election Commission of India is NOT responsible for conducting elections to which of the following?',
        options: [
          { label: 'A', text: 'Municipalities and Panchayats in the States' },
          { label: 'B', text: 'State Legislative Councils' },
          { label: 'C', text: 'Office of the Vice-President of India' },
          { label: 'D', text: 'Rajya Sabha biennial elections' }
        ],
        correctOption: 'A',
        explanation: 'Elections to Municipalities and Panchayats are conducted by the respective State Election Commissions constituted under Articles 243K and 243ZA, NOT by the Election Commission of India.',
        source: 'Constitution of India, Article 324 & 243K',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: 'ca-2026-07-04-06',
    title: 'Loss and Damage Fund Operationalization at UNFCCC: Climate Justice Realities',
    date: '2026-07-04',
    displayDate: 'July 04, 2026',
    month: 'July 2026',
    year: 2026,
    gsCategory: 'GS-3',
    gsTag: 'GS-3: International Climate Accords & Geopolitics',
    subject: 'environment',
    source: 'DownToEarth / UNFCCC Press Desk',
    readTime: '4 min read',
    leadParagraph: 'The inaugural board meeting of the Fund for Responding to Loss and Damage (FRLD) finalized operational guidelines hosted temporarily under the World Bank, amidst debates over direct access modalities for developing countries and vulnerable small island developing states (SIDS).',
    keyPoints: [
      'Loss and Damage refers to unavoidable, irreversible climate impacts where adaptation is no longer possible.',
      'Originally established at COP27 (Sharm el-Sheikh) and operationalized at COP28 (Dubai).',
      'Hosted provisionally by the World Bank for an interim four-year period with independent board oversight.',
      'Principles of Common But Differentiated Responsibilities and Respective Capabilities (CBDR-RC) remain central to Indian diplomacy.'
    ],
    mainsPerspective: 'Critically assess the effectiveness of the Loss and Damage Fund in addressing historical climate debt and providing swift liquidity during extreme climate catastrophes in the Global South.',
    tags: ['Loss and Damage', 'COP28', 'UNFCCC', 'World Bank', 'Climate Justice'],
    practiceMCQs: [
      {
        id: 'ca-mcq-106',
        subject: 'environment',
        subjectName: 'Environment & Ecology',
        section: 'Climate Change & Conventions',
        topic: 'Common But Differentiated Responsibilities (CBDR)',
        isPYQ: false,
        questionText: 'The principle of "Common But Differentiated Responsibilities and Respective Capabilities" (CBDR-RC) was first formalized in international environmental law during which conference?',
        options: [
          { label: 'A', text: 'The Rio Earth Summit (UNCED) 1992' },
          { label: 'B', text: 'The Stockholm Conference on Human Environment 1972' },
          { label: 'C', text: 'The Montreal Protocol on Ozone Depleting Substances 1987' },
          { label: 'D', text: 'The Kyoto Protocol 1997' }
        ],
        correctOption: 'A',
        explanation: 'Principle 7 of the Rio Declaration adopted at the United Nations Conference on Environment and Development (UNCED) in Rio de Janeiro, 1992, formally established the CBDR principle.',
        source: 'UNEP / Shankar IAS Environment',
        difficulty: 'Moderate'
      }
    ]
  },
  {
    id: 'ca-2026-05-18-07',
    title: 'Indo-Pacific Maritime Security: Indian Ocean Rim Association (IORA) Council',
    date: '2026-05-18',
    displayDate: 'May 18, 2026',
    month: 'May 2026',
    year: 2026,
    gsCategory: 'GS-2',
    gsTag: 'GS-2: Bilateral, Regional & Global Groupings',
    subject: 'polity',
    source: 'MEA India / ORF Strategic Review',
    readTime: '4 min read',
    leadParagraph: 'At the IORA Council of Ministers, India reaffirmed its vision of SAGAR (Security and Growth for All in the Region) and the Indo-Pacific Oceans Initiative (IPOI), emphasizing maritime domain awareness, white shipping data exchange, and anti-piracy deterrence.',
    keyPoints: [
      'IORA is a dynamic intergovernmental organization of 23 coastal states bordering the Indian Ocean, founded in 1997 in Mauritius.',
      'Operates on consensus and non-interference; bilateral issues and military security pacts are excluded from deliberations.',
      'Key focus areas include Maritime Safety and Security, Trade and Investment Facilitation, Fisheries Management, and Disaster Risk Reduction.',
      'Information Fusion Centre - Indian Ocean Region (IFC-IOR) at Gurugram serves as the nerve center for regional maritime tracking.'
    ],
    mainsPerspective: 'Discuss the strategic relevance of IORA in consolidating India\'s position as the "Preferred Security Partner" and "First Responder" in the Indian Ocean littorals.',
    tags: ['IORA', 'SAGAR', 'Indo-Pacific', 'Maritime Security', 'IFC-IOR'],
    practiceMCQs: [
      {
        id: 'ca-mcq-107',
        subject: 'polity',
        subjectName: 'Indian Polity',
        section: 'International Relations',
        topic: 'Indian Ocean Rim Association (IORA)',
        isPYQ: true,
        pyqYear: 2022,
        questionText: 'Consider the following statements regarding the Indian Ocean Rim Association (IORA):',
        statements: [
          'Its Secretariat is situated in Ebene, Mauritius.',
          'Bilateral and contentious political issues are strictly excluded from its official discussions.',
          'All member states of ASEAN are members of IORA.'
        ],
        questionKicker: 'Which of the statements given above are correct?',
        options: [
          { label: 'A', text: '1 and 2 only' },
          { label: 'B', text: '2 and 3 only' },
          { label: 'C', text: '1 and 3 only' },
          { label: 'D', text: '1, 2 and 3' }
        ],
        correctOption: 'A',
        explanation: 'Statements 1 and 2 are correct. Statement 3 is incorrect because landlocked Laos, as well as Vietnam, Cambodia, and the Philippines, are NOT members of IORA (only littoral states bordering the Indian Ocean belong to IORA).',
        source: 'Ministry of External Affairs / UPSC Prelims 2022',
        difficulty: 'Moderate'
      }
    ]
  },
  {
    id: 'ca-2026-03-12-08',
    title: 'Bharat 6G Vision & India Semiconductor Mission (ISM) Phase-2',
    date: '2026-03-12',
    displayDate: 'March 12, 2026',
    month: 'March 2026',
    year: 2026,
    gsCategory: 'GS-3',
    gsTag: 'GS-3: Science & Technology, IT & Indigenization',
    subject: 'science',
    source: 'DoT / India Semiconductor Mission',
    readTime: '4 min read',
    leadParagraph: 'The Union Cabinet sanctioned expanded fiscal support under the India Semiconductor Mission Phase-2, prioritizing compound semiconductor fabrication, silicon photonics, and 6G Terahertz communication sub-systems developed by indigenous academic-industrial consortia.',
    keyPoints: [
      'ISM is a designated business division within Digital India Corporation offering up to 50% capital subsidy on pari-passu basis.',
      'Bharat 6G Alliance integrates academia, telecommunication operators, and start-ups under an Apex Council.',
      'Focuses on Terahertz spectrum utilization, ubiquitous satellite-terrestrial integration, and sub-millimeter latency.',
      'Critical for reducing dependencies on foreign chip foundries in automotive, defense, and smart grid infrastructure.'
    ],
    mainsPerspective: 'How can the India Semiconductor Mission insulate the country from global supply chain shocks and geopolitical choke points in advanced microelectronics? Discuss.',
    tags: ['Semiconductor Mission', 'Bharat 6G', 'Telecommunications', 'Make in India'],
    practiceMCQs: [
      {
        id: 'ca-mcq-108',
        subject: 'science',
        subjectName: 'Science & Technology',
        section: 'Information Technology',
        topic: 'Semiconductor Fabrication & Silicon Photonics',
        isPYQ: false,
        questionText: 'What is the primary technological advantage of "Silicon Photonics" over traditional electrical copper interconnects in high-performance computing?',
        options: [
          { label: 'A', text: 'It transmits data via optical light pulses (photons) rather than electronic charge, dramatically increasing bandwidth while slashing heat dissipation.' },
          { label: 'B', text: 'It eliminates the requirement of semiconductor substrates altogether.' },
          { label: 'C', text: 'It enables chips to operate without electrical power inputs.' },
          { label: 'D', text: 'It converts analog voice signals directly into mechanical vibrations.' }
        ],
        correctOption: 'A',
        explanation: 'Silicon photonics combines silicon integrated circuits with optical data transmission using laser light pulses (photons). Light travels much faster than electric currents through copper wires without electromagnetic interference and with minimal heat losses.',
        source: 'IEEE Spectrum / DST Tech Brief',
        difficulty: 'Moderate'
      }
    ]
  }
];

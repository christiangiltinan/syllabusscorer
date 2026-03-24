/**
 * SyllabusScorer - Core Logic & Content Engine (Irish Curriculum - Granular Levels)
 */

const STORAGE_KEY = 'syllabusscorer_v2_ireland_levels'; // Versioned for levels

const SUBJECTS = [
  { 
    id: 'gaeilge', name: 'Irish (Gaeilge)', color: '#059669', desc: 'Oral, aural, and written proficiency in Gaeilge.', 
    levels: {
        'Junior Cycle': ['HL', 'OL', 'FL'],
        'Leaving Cert': ['HL', 'OL', 'FL']
    }
  },
  { 
    id: 'english', name: 'English', color: '#1E293B', desc: 'Literary analysis, comparative studies, and functional writing.', 
    levels: {
        'Junior Cycle': ['HL', 'OL', 'FL'],
        'Leaving Cert': ['HL', 'OL']
    }
  },
  { 
    id: 'mathematics', name: 'Mathematics', color: '#F59E0B', desc: 'Calculus, algebra, and statistical modeling.', 
    levels: {
        'Junior Cycle': ['HL', 'OL', 'FL'],
        'Leaving Cert': ['HL', 'OL', 'FL']
    }
  },
  { 
    id: 'biology', name: 'Biology', color: '#10B981', desc: 'Plant physiology, genetics, and cellular biology.', 
    levels: { 'Leaving Cert': ['HL', 'OL'] }
  },
  { 
    id: 'chemistry', name: 'Chemistry', color: '#8B5CF6', desc: 'Organic mechanisms, stoichiometry, and periodicity.', 
    levels: { 'Leaving Cert': ['HL', 'OL'] }
  },
  { 
    id: 'physics', name: 'Physics', color: '#3B82F6', desc: 'Mechanics, light, sound, and particle physics.', 
    levels: { 'Leaving Cert': ['HL', 'OL'] }
  },
  { 
    id: 'history', name: 'History', color: '#78350F', desc: 'Modern Ireland and 20th C. international relations.', 
    levels: {
        'Junior Cycle': ['CL'],
        'Leaving Cert': ['HL', 'OL']
    }
  },
  { 
    id: 'geography', name: 'Geography', color: '#14B8A6', desc: 'Physical landscapes and regional demographic studies.', 
    levels: {
        'Junior Cycle': ['CL'],
        'Leaving Cert': ['HL', 'OL']
    }
  },
  { 
    id: 'business', name: 'Business', color: '#4F46E5', desc: 'Management logic, marketing, and the legal environment.', 
    levels: {
        'Junior Cycle': ['CL'],
        'Leaving Cert': ['HL', 'OL']
    }
  },
  { 
    id: 'computer_science', name: 'Computer Science', color: '#0F172A', desc: 'Python, computational thinking, and data structures.', 
    levels: {
        'Junior Cycle': ['CL'],
        'Leaving Cert': ['HL', 'OL']
    }
  },
  { 
    id: 'french', name: 'French', color: '#EF4444', desc: 'Aural comprehension and grammatical fluency.', 
    levels: {
        'Junior Cycle': ['CL'],
        'Leaving Cert': ['HL', 'OL']
    }
  },
  { 
    id: 'science', name: 'Science', color: '#06B6D4', desc: 'Comprehensive biology, chemistry, and physics foundations.', 
    levels: { 'Junior Cycle': ['CL'] }
  }
];

const SYSTEMS = ['Junior Cycle', 'Leaving Cert'];
const ALL_LEVELS = ['HL', 'OL', 'FL', 'CL'];

const generateId = () => Math.random().toString(36).substr(2, 9);

// --- Content Pool (Higher/Ordinary/Foundation/Common) ---
const CONTENT = {
    'Junior Cycle': {
        HL: {
            mathematics: [{ front: "JC Maths (HL): Derive the quadratic formula result for...", back: "Step-by-step rigorous proof." }],
            gaeilge: [{ front: "Gaeilge JC (HL): Déan anailís ar an dán...", back: "Téamaí agus mothúcháin domhain." }]
        },
        OL: {
            mathematics: [{ front: "JC Maths (OL): Calculate the area of a circle with radius 5.", back: "78.54 sq units." }]
        },
        FL: {
            mathematics: [{ front: "JC Maths (FL): 25% of 80 is...?", back: "20" }]
        },
        CL: {
            science: [{ front: "JC Science (Common): What is a 'Compound'?", back: "Substance made of two or more elements chemically combined." }],
            history: [{ front: "JC History (Common): Why did the Industrial Revolution begin in Britain?", back: "Coal, iron, empire, and capital." }]
        }
    },
    'Leaving Cert': {
        HL: {
            biology: [{ front: "LC Bio (HL): Explain the 'Fluid Mosaic Model' of cell membranes.", back: "Phospholipid bilayer with embedded proteins moving laterally." }],
            mathematics: [{ front: "LC Maths (HL): Differentiate sin²(x) from first principles.", back: "Rigorous delta-calculation." }]
        },
        OL: {
            biology: [{ front: "LC Bio (OL): Name the organelle where photosynthesis occurs.", back: "Chloroplast." }],
            business: [{ front: "LC Business (OL): Define 'Insurance'.", back: "Protection against financial loss." }]
        }
    }
};

const SEED_RESOURCES = [
  { id: 'res1', name: 'JC Maths (HL) SEC 2023 Paper 1', type: 'Past Paper', system: 'Junior Cycle', subject: 'mathematics', level: 'HL', topic: 'Algebra/Geometry', chapter: 'Algebra', url: '#' },
  { id: 'res2', name: 'LC Biology (HL) Genetics Revision Note', type: 'Revision Note', system: 'Leaving Cert', subject: 'biology', level: 'HL', topic: 'Genetics', chapter: 'Unit 2: The Cell', url: '#' },
  { id: 'res3', name: 'JC English (OL) SEC Sample Paper', type: 'Past Paper', system: 'Junior Cycle', subject: 'english', level: 'OL', topic: 'Comparative Studies', chapter: 'Drama', url: '#' },
  { id: 'res4', name: 'LC Physics (HL) Particle Physics Summary', type: 'Revision Note', system: 'Leaving Cert', subject: 'physics', level: 'HL', topic: 'Particle Physics', chapter: 'Modern Physics', url: '#' },
  { id: 'res5', name: 'JC History (CL) Modern Ireland Notes', type: 'Revision Note', system: 'Junior Cycle', subject: 'history', level: 'CL', topic: 'Plantations', chapter: 'Early Modern Ireland', url: '#' },
  { id: 'res6', name: 'LC Maths (HL) Calculus Revision Note', type: 'Revision Note', system: 'Leaving Cert', subject: 'mathematics', level: 'HL', topic: 'Differentiation', chapter: 'Calculus', url: '#' }
];

const AppData = {
  decks: [],
  resources: [],
  performance: [],
  aiUsage: { count: 0, resetDate: Date.now() + (7 * 24 * 60 * 60 * 1000) },
  isPremium: false,
  settings: { username: 'Guest', theme: 'light' },
  resourceUsage: { count: 0, date: new Date().toDateString() },

  load() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      this.decks = parsed.decks || [];
      this.performance = parsed.performance || [];
      this.aiUsage = parsed.aiUsage || { count: 0, resetDate: Date.now() + (7 * 24 * 60 * 60 * 1000) };
      this.isPremium = parsed.isPremium || false;
      this.settings = parsed.settings || this.settings;
      this.resources = parsed.resources || SEED_RESOURCES;
      this.resourceUsage = parsed.resourceUsage || { count: 0, date: new Date().toDateString() };
      
      // Reset daily usage
      if (this.resourceUsage.date !== new Date().toDateString()) {
          this.resourceUsage = { count: 0, date: new Date().toDateString() };
          this.save();
      }
      
      if (Date.now() > this.aiUsage.resetDate) {
          this.aiUsage = { count: 0, resetDate: Date.now() + (7 * 24 * 60 * 60 * 1000) };
          this.save();
      }
    } else {
      this.seedInitialData();
    }
  },

  seedInitialData() {
    this.decks = [];
    SYSTEMS.forEach(sys => {
      SUBJECTS.forEach(sub => {
        if (!sub.levels[sys]) return;

        sub.levels[sys].forEach(tier => {
          const pool = CONTENT[sys]?.[tier]?.[sub.id] || CONTENT[sys]?.['CL']?.[sub.id] || [{ front: `${sys} ${sub.name} (${tier}) Lesson 1`, back: "Mastery content." }];
          
          const cards = pool.map(c => ({
            ...c,
            id: generateId(),
            srs: { interval: 0, repetitions: 0, easeFactor: 2.5 }
          }));

          this.decks.push({
            id: generateId(),
            title: `${sub.name} Syllabus (${tier})`,
            subject: sub.id,
            system: sys,
            level: tier, // Specific HL/OL/FL/CL
            chapter: 'Exam Essentials',
            cards: cards,
            lastReview: null
          });
        });
      });
    });
    this.resources = [...SEED_RESOURCES];
    this.save();
  },

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      decks: this.decks,
      performance: this.performance,
      aiUsage: this.aiUsage,
      isPremium: this.isPremium,
      settings: this.settings,
      resources: this.resources,
      resourceUsage: this.resourceUsage
    }));
  },

  getDecks(filters) {
    let results = this.decks;
    if (filters.system && filters.system !== 'all') results = results.filter(d => d.system === filters.system);
    if (filters.subject && filters.subject !== 'all') results = results.filter(d => d.subject === filters.subject);
    if (filters.level && filters.level !== 'all') results = results.filter(d => d.level === filters.level);
    return results;
  },

  getResources(filters = {}) {
    let results = this.resources;
    if (filters.system && filters.system !== 'all') results = results.filter(r => r.system === filters.system);
    if (filters.subject && filters.subject !== 'all') results = results.filter(r => r.subject === filters.subject);
    if (filters.level && filters.level !== 'all') results = results.filter(r => r.level === filters.level);
    if (filters.type && filters.type !== 'all') results = results.filter(r => r.type === filters.type);
    if (filters.chapter && filters.chapter !== 'all') results = results.filter(r => r.chapter === filters.chapter);
    return results;
  },

  checkResourceLimit() {
    if (this.isPremium) return true;
    return this.resourceUsage.count < 5;
  },

  incrementResourceUsage() {
    if (this.isPremium) return;
    this.resourceUsage.count++;
    this.save();
  },

  recordResult(correct, timestamp = Date.now()) {
      this.performance.push({ timestamp, correct });
      this.save();
  },

  getStats(last24h = true) {
      const threshold = last24h ? Date.now() - (24 * 60 * 60 * 1000) : 0;
      const relevant = this.performance.filter(p => p.timestamp > threshold);
      return {
          correct: relevant.filter(p => p.correct).length,
          incorrect: relevant.filter(p => !p.correct).length,
          total: relevant.length
      };
  }
};

const MockAI = {
  generateCards(subject, system, level) {
    if (AppData.aiUsage.count >= 10 && !AppData.isPremium) return null;
    AppData.aiUsage.count++;
    AppData.save();
    return Array(5).fill({}).map((_, i) => ({ 
        front: `AI ${system} ${subject} (${level}) Topic ${i+1}`, 
        back: `Syllabus-aligned insight ${i+1}.`,
        id: generateId(), 
        srs: { interval: 0, repetitions: 0, easeFactor: 2.5 } 
    }));
  }
};

function updateSRS(card, quality) {
  let { interval, repetitions, easeFactor } = card.srs;
  if (quality >= 3) {
    if (repetitions === 0) interval = 1; else if (repetitions === 1) interval = 6; else interval = Math.round(interval * easeFactor);
    repetitions++;
  } else { repetitions = 0; interval = 1; }
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;
  return { ...card, srs: { interval, repetitions, easeFactor, nextReview: Date.now() + interval * 86400000 } };
}

AppData.load();

window.SyllabusScorer = {
  AppData,
  SRS: { updateSRS },
  Utils: { generateId, getSubject: (id) => SUBJECTS.find(s => s.id === id) || SUBJECTS[0] },
  SUBJECTS,
  SYSTEMS,
  ALL_LEVELS,
  MockAI
};

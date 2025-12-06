
export interface VocabularyWord {
  word: string;
  meaning: string;
  example: string;
  pronunciationGuide: string;
  level?: string; // e.g., "B2", "C1"
  synonyms?: string[];
  hindiMeaning?: string;
  extraExamples?: string[];
}

export interface QuizItem {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface DailyPracticeContent {
  motivationalMessage: string;
  vocabulary: VocabularyWord[];
  speakingTask: string;
  grammarTip: string;
  grammarChallenge: QuizItem;
  vocabQuiz: QuizItem;
}

export interface MispronouncedWord {
  word: string;
  ipa: string;
  correctiveTip: string;
  hindiTip?: string; // Explanation in Hindi
  mouthPosition?: string; // e.g., "Touch tongue to roof of mouth"
  syllables?: string; // e.g. "op-por-tu-ni-ty"
  stressPattern?: string; // e.g. "Draw attention to the 3rd syllable"
}

export interface PronunciationResult {
  score: number;
  mispronouncedWords: MispronouncedWord[];
  feedback: string;
  intonationPattern?: string; // e.g., "Rising", "Flat"
}

export interface GrammarErrorDetail {
  errorType: string; // e.g., "Tense", "Article"
  correction: string;
  reason: string;
  example: string;
}

export interface FluencyMetrics {
  score: number; // 0-10
  wpm: number; // Words per minute (estimated)
  fillersCount: number; // uh, um, like
  pausePatterns: string; // "Natural", "Choppy", "Long pauses"
}

export interface VocabularyAnalysis {
  cefrLevel: string; // A1-C2
  betterWords: string[]; // Suggestions
  varietyScore: number; // 0-10
}

export interface LearningInsight {
  type: string; // "Grammar", "Pronunciation", "Flow"
  observation: string; // Gentle observation
  softCorrection: string; // "Try saying..."
  encouragement: string; // "You're getting close!"
}

export interface AnalysisResult {
  transcript?: string;
  score: number;
  
  // Grammar Engine
  grammarCorrection: string;
  detailedGrammarErrors?: GrammarErrorDetail[];
  
  // Vocabulary Engine
  betterVocabulary: string; // General text suggestion
  vocabularyAnalysis?: VocabularyAnalysis; // Structured analysis

  // Fluency Engine
  fluencyFeedback: string;
  fluencyMetrics?: FluencyMetrics;

  // Pronunciation Engine
  pronunciation?: PronunciationResult;

  // Motivation & Insights Engine
  strengths: string[]; // List of user strengths found in this session
  learningInsights: LearningInsight[]; // Gentle corrective feedback
  
  // General
  hindiExplanation: string;
  encouragement: string;
  cefrLevel?: string; // Overall level
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// --- Language Bridge Types ---

export interface BridgeTranslation {
  originalText: string;
  translatedText: string;
  explanation: string; // Why this translation structure
  grammarNotes: string; // Articles, tense usage
  hindiExplanation?: string; // Optional Hindi explanation
}

export interface BridgeEvaluation {
  transcribedText: string;
  pronunciationScore: number; // 0-100
  fluencyScore: number; // 0-10
  mispronouncedWords: MispronouncedWord[];
  feedback: string;
}

export interface BridgeHistoryItem {
  id: string;
  timestamp: number;
  original: string;
  english: string;
  score: number;
}

// --- Learning Path Types ---

export interface PathTask {
  title: string;
  description: string;
  duration: string;
}

export interface PathLevel {
  id: string;
  name: string;
  description: string;
  status: 'locked' | 'active' | 'completed';
  tasks: PathTask[];
  progress?: number;
}

// --- Progress Tracking Types ---

export interface ProgressRecord {
  id: string;
  date: number; // Timestamp
  type: 'speaking' | 'text';
  overallScore: number;
  pronunciationScore: number; // 0-100
  grammarScore: number; // 0-100 (normalized)
  fluencyScore: number; // 0-10
  vocabScore: number; // 0-10
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  dateUnlocked?: number;
}

// --- User Profile ---

export interface UserProfile {
  name: string;
  avatar: string; // URL or emoji
  learningGoal: string; // e.g., "Job Interview", "Travel"
  englishLevel: string; // "Beginner", "Intermediate"
  dailyTarget: number; // minutes
  focusArea?: 'speaking' | 'writing' | 'both';
}

// --- Resources ---

export interface ResourceItem {
  id: string;
  title: string;
  type: 'grammar' | 'vocab' | 'speaking' | 'interview';
  description: string;
  content: string; // or URL
}

// --- Fluency Scenarios ---

export interface FluencyScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  aiRole: string;
  userRole: string;
  prompt: string;
}

export type AppTab = 
  // Main
  'practice' | 'analyze' | 'bridge' | 'chat' | 'progress' |
  // Learning Features
  'learning-path' | 'insights' | 'strengths' | 'positivity' | 'achievements' | 'resources' |
  'flashcards' | 'quizzes' | 'notes' | 'recent' | 'fluency-scenarios' |
  // User Tools
  'profile' | 'settings' | 'goals' | 'notifications' | 'saved-chats' | 'downloads' | 'subscription' | 'invite' | 'share' |
  // Support & Information
  'help' | 'faq' | 'contact' | 'feedback' | 'report' | 'safety' | 'guidelines' |
  // Legal & Info
  'privacy' | 'terms' | 'app-info' | 'about';

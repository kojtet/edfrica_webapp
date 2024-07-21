export enum ScreenTypes {
  SplashScreen,
  QuizTopicsScreen,
  QuizDetailsScreen,
  QuestionScreen,
  ResultScreen,
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  number: number;
  answer: string;
  quiz_id: string;
  ai_answer?: string;
  field?: string;
  created_at?: string;
  last_update?: string;
  publish?: boolean;
}
export interface Result extends Question {
  selectedAnswer: string[];
  isMatch: boolean;
  score?: number; // Optional score property
}

export type QuizContextTypes = {
  currentScreen: ScreenTypes;
  setCurrentScreen: React.Dispatch<React.SetStateAction<ScreenTypes>>;
  quizTopic: string;
  selectQuizTopic: (type: string) => void;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
  result: Result[];
  setResult: React.Dispatch<React.SetStateAction<any[]>>;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  endTime: number;
  setEndTime: (type: number) => void;
  quizDetails: {
    totalQuestions: number;
    totalScore: number;
    totalTime: number;
    selectedQuizTopic: string;
  };
  setQuizDetails: (details: { totalQuestions: number; totalScore: number; totalTime: number; selectedQuizTopic: string }) => void;
};

import { createContext, useContext } from 'react';
import { QuizContextTypes, ScreenTypes } from '../types';

export const initialState: QuizContextTypes = {
  currentScreen: ScreenTypes.SplashScreen,
  setCurrentScreen: () => {},
  quizTopic: '',
  selectQuizTopic: () => {},
  questions: [],
  setQuestions: () => {},
  result: [],
  setResult: () => {},
  timer: 0,
  setTimer: () => {},
  endTime: 0,
  setEndTime: () => {},
  quizDetails: {
    totalQuestions: 0,
    totalScore: 0,
    totalTime: 0,
    selectedQuizTopic: '',
  },
  setQuizDetails: () => {},
};

export const QuizContext = createContext<QuizContextTypes>(initialState);

export const useQuiz = () => useContext(QuizContext);

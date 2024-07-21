import { ReactNode, useEffect, useState } from 'react';
import { quiz } from '../data/QuizQuestions';
import { QuizContextTypes, Result, ScreenTypes } from '../types';
import { QuizContext, initialState } from './QuizContext';

type QuizProviderProps = {
  children: ReactNode;
};

const QuizProvider = ({ children }: QuizProviderProps) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenTypes>(initialState.currentScreen);
  const [quizTopic, setQuizTopic] = useState<string>(initialState.quizTopic);
  const [questions, setQuestions] = useState<any[]>(initialState.questions);
  const [result, setResult] = useState<Result[]>(initialState.result);
  const [timer, setTimer] = useState<number>(initialState.timer);
  const [endTime, setEndTime] = useState<number>(initialState.endTime);
  const [quizDetails, setQuizDetails] = useState(initialState.quizDetails);

  const selectQuizTopic = (type: string) => {
    setQuizTopic(type);
  };

  return (
    <QuizContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        quizTopic,
        selectQuizTopic,
        questions,
        setQuestions,
        result,
        setResult,
        timer,
        setTimer,
        endTime,
        setEndTime,
        quizDetails,
        setQuizDetails,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;

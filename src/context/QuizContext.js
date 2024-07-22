import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [quizTitle, setQuizTitle] = useState('');

  const startQuiz = async (quizId, title, timeLimit, token) => {
    try {
      const response = await axios.get(`https://edfrica-backend-supabase.onrender.com/api/quizzes/${quizId}/questions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions(response.data);
      setQuizTitle(title);
      setTimer(timeLimit * 60); // Convert minutes to seconds
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
    } catch (error) {
      console.error('Failed to fetch quiz questions', error);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const endQuiz = () => {
    // Logic to end the quiz and calculate score
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <QuizContext.Provider value={{
      questions,
      currentQuestionIndex,
      userAnswers,
      timer,
      quizTitle,
      startQuiz,
      nextQuestion,
      endQuiz,
      setUserAnswers,
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);

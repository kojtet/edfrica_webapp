import React from 'react';
import { useQuiz } from '../context/QuizContext';

const QuizResults = () => {
  const { questions, userAnswers } = useQuiz();

  const calculateScore = () => {
    // Implement score calculation logic here
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Quiz Results</h2>
        <p className="mb-4">You answered {userAnswers.length} out of {questions.length} questions.</p>
        <p className="text-lg font-semibold mb-4">Your score: {calculateScore()}</p>
      </div>
    </div>
  );
};

export default QuizResults;

import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate, useParams } from 'react-router-dom';

const Quiz = () => {
  const { questions, currentQuestionIndex, timer, nextQuestion, endQuiz, setUserAnswers, userAnswers, quizTitle } = useQuiz();
  const navigate = useNavigate();
  const { quizId } = useParams();
  
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (event) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setUserAnswers(newAnswers);
  };

  useEffect(() => {
    if (timer <= 0) {
      endQuiz();
      navigate('/quiz-results');
    }
  }, [timer, endQuiz, navigate]);

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="mb-4">
          <div className="text-lg font-semibold">{quizTitle}</div>
          <div className="text-md font-medium mt-2">{currentQuestion.question}</div>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="mt-2">
              <label>
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  checked={userAnswers[currentQuestionIndex] === String(index)}
                  onChange={handleAnswerChange}
                  className="mr-2"
                />
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button onClick={nextQuestion} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Next
          </button>
          <button onClick={() => { endQuiz(); navigate('/quiz-results'); }} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">
            End Quiz
          </button>
        </div>
        <div className="mt-4 text-right text-gray-600">
          Time Remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

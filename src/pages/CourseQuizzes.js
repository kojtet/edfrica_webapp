import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';

const CourseQuizzes = () => {
  const { user } = useAuth();
  const { courseId } = useParams();
  const { startQuiz } = useQuiz();
  const [quizzes, setQuizzes] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (user) {
        try {
          const response = await axios.get(`https://edfrica-backend-supabase.onrender.com/api/courses/${courseId}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setCourseName(response.data.course_name);
        } catch (error) {
          console.error('Failed to fetch course details', error);
        }
      }
    };

    const fetchQuizzes = async () => {
      if (user) {
        try {
          const response = await axios.get(`https://edfrica-backend-supabase.onrender.com/api/quizzes/course/${courseId}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setQuizzes(response.data);
        } catch (error) {
          console.error('Failed to fetch quizzes', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourseDetails();
    fetchQuizzes();
  }, [user, courseId]);

  const handleStartQuiz = (quizId, title, timeLimit) => {
    startQuiz(quizId, title, timeLimit, user.token);
    navigate(`/quiz/${quizId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-2">{courseName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-200 hover:scale-105">
            <img src={quiz.thumbnail} alt={quiz.title} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{quiz.title}</h2>
              <p className="text-gray-600 mb-2">{quiz.description}</p>
              <button
                onClick={() => handleStartQuiz(quiz.id, quiz.title, quiz.time_limit)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Start Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseQuizzes;

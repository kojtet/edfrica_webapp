import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const CourseQuizzes = () => {
  const { user } = useAuth();
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchQuizzes();
  }, [user, courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-64 p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search something"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
          />
          <FaSearch className="absolute top-2 right-4 text-gray-400" />
        </div>
        <div className="flex items-center space-x-4">
          <FaBell className="text-gray-600" />
          <FaUserCircle className="text-gray-600" />
          <span className="text-gray-600">Hello, {user.first_name}</span>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-2">Quizzes</h1>
      <p className="text-gray-700 mb-6">Here are the quizzes for the selected course:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-200 hover:scale-105">
            <div className="p-4">
              <h2 className="text-lg font-semibold">{quiz.title}</h2>
              <p className="text-gray-600 mb-2 truncate">{quiz.description}</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (user) {
        try {
          const response = await axios.get(`https://edfrica-backend-supabase.onrender.com/api/courses/student/${user.uid}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setCourses(response.data);
        } catch (error) {
          console.error('Failed to fetch courses', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourses();
  }, [user]);

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
      <h1 className="text-4xl font-bold mb-2"></h1>
      <p className="text-gray-700 mb-6"></p>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Enrolled Courses</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map(course => (
          <Link key={course.id} to={`/courses/${course.id}`} className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-200 hover:scale-105">
            <img src={course.thumbnail} alt={course.course_name} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{course.course_name}</h2>
              <p className="text-gray-600 mb-2 truncate">{12} Quizzes</p>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;

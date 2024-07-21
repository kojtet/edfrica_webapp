import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const MyCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(user)
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-2">Never stop learning</h1>
      <p className="text-gray-700 mb-6">Hey there! learner</p>
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for courses"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
        />
        <FaSearch className="absolute top-2 right-12 text-gray-400" />
        <FaFilter className="absolute top-2 right-4 text-gray-400" />
      </div>
      <h2 className="text-2xl font-semibold mb-4">Popular Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={course.thumbnail} alt={course.course_name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{course.course_name}</h2>
              <p className="text-gray-600">{course.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;

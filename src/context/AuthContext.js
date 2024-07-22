// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://edfrica-backend-supabase.onrender.com/api/users/login', {
        email,
        password,
      });
      console.log('Login response:', response.data);

      const { session, user } = response.data;
      const userData = { ...user, token: session.session.access_token };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/my-courses');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

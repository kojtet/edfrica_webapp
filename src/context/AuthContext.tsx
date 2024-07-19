import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  display_name: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  school_id: string;
  faculty_id: string;
  user_type: string;
  created_at: string;
  rankings: boolean;
  expiration_time: string | null;
  active: boolean;
  first_login: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // Optionally fetch user data with the token
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login...');
      const response = await axios.post('https://edfrica-backend-supabase.onrender.com/api/users/login', {
        email,
        password,
      });
      console.log('Login response:', response);
      const { session } = response.data;
      setToken(session.access_token);
      setUser(session.user);
      localStorage.setItem('token', session.access_token);
    } catch (error) {
      console.error('Login failed', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

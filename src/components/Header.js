// src/components/Header.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-purple-500 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-semibold">
        Welcome, {user.first_name}
      </div>
      <button
        onClick={logout}
        className="bg-white text-purple-500 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;

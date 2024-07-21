// src/components/Navbar.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/ed1.png';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-16" /> {/* Made the logo larger */}
      </div>
      <div className="flex items-center">
        <span className="text-gray-800 font-semibold">Hello, {user ? user.display_name : 'Guest'}</span>
      </div>
    </nav>
  );
};

export default Navbar;

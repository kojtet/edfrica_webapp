import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook, FaPencilAlt, FaHistory, FaUser, FaRobot, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/ed1.png'; // Import the logo

const VerticalMenu = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-gray-800 text-white h-screen w-64 flex flex-col p-4 shadow-lg fixed"> {/* Changed to gray */}
      <div className="flex items-center mb-8">
        <img src={logo} alt="Logo" className="h-36" />
      </div>
      <nav className="flex flex-col flex-grow space-y-4">
        <Link to="/my-courses" className="flex items-center p-2 hover:text-purple-500 hover:bg-gray-700 rounded-lg">
          <FaBook className="mr-3" />
          <span>My Courses</span>
        </Link>
        <Link to="/practice-tests" className="flex items-center p-2 hover:text-purple-500 hover:bg-gray-700 rounded-lg">
          <FaPencilAlt className="mr-3" />
          <span>Practice Tests</span>
        </Link>
        <Link to="/my-history" className="flex items-center p-2 hover:text-purple-500 hover:bg-gray-700 rounded-lg">
          <FaHistory className="mr-3" />
          <span>My History</span>
        </Link>
        <Link to="/my-profile" className="flex items-center p-2 hover:text-purple-500 hover:bg-gray-700 rounded-lg">
          <FaUser className="mr-3" />
          <span>My Profile</span>
        </Link>
        <Link to="/ai-chat" className="flex items-center p-2 hover:text-purple-500 hover:bg-gray-700 rounded-lg">
          <FaRobot className="mr-3" />
          <span>AI Chat</span>
        </Link>
        <Link to="/rankings" className="flex items-center p-2 hover:text-purple-500 hover:bg-gray-700 rounded-lg">
          <FaChartBar className="mr-3" />
          <span>Rankings</span>
        </Link>
      </nav>
      <div className="mt-auto flex flex-col space-y-4">
        <Link to="/settings" className="flex items-center p-2 hover:text-purple-500 hover:bg-gray-700 rounded-lg">
          <FaCog className="mr-3" />
          <span>Settings</span>
        </Link>
        <button onClick={logout} className="flex items-center p-2 hover:text-purple-500 hover:bg-gray-700 rounded-lg">
          <FaSignOutAlt className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default VerticalMenu;

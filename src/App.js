import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import PracticeTests from './pages/PracticeTests';
import MyHistory from './pages/MyHistory';
import MyProfile from './pages/MyProfile';
import AiChat from './pages/AiChat';
import Rankings from './pages/Rankings';
import Settings from './pages/Settings';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="practice-tests" element={<PracticeTests />} />
            <Route path="my-history" element={<MyHistory />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="ai-chat" element={<AiChat />} />
            <Route path="rankings" element={<Rankings />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

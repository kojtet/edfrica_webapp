import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Main from './components/Main';
import ToggleTheme from './components/ui/ToggleTheme';
import QuizProvider from './context/QuizProvider';
import { AuthProvider } from './context/AuthContext';
import { GlobalStyles } from './styles/Global';
import { themes } from './styles/Theme';
import LoginScreen from './components/LoginScreen';
import PrivateRoute from './components/PrivateRoutes';
import PublicRoute from './components/PublicRoutes';
import UserHome from './components/UserHome';

function App() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCurrentTheme(checked ? 'dark' : 'light');
    localStorage.setItem('theme', checked ? 'dark' : 'light');
  };

  const theme = currentTheme === 'light' ? themes.light : themes.dark;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <QuizProvider>
          <Router>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginScreen />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<UserHome />} />
                <Route path="/*" element={<Main />} />
              </Route>
            </Routes>
          </Router>
        </QuizProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

import { useEffect } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { useAuth } from '../../context/AuthContext';
import { ScreenTypes } from '../../types';

import QuestionScreen from '../QuestionScreen';
import QuizDetailsScreen from '../QuizDetailsScreen';
import QuizTopicsScreen from '../QuizTopicsScreen';
import ResultScreen from '../ResultScreen';
import SplashScreen from '../SplashScreen';
import LoginScreen from '../LoginScreen';
import HomePage from '../HomePage';

function Main() {
  const { currentScreen, setCurrentScreen } = useQuiz();
  const { user } = useAuth();

  useEffect(() => {
    console.log('Setting screen to QuizTopicsScreen');
    setTimeout(() => {
      setCurrentScreen(ScreenTypes.QuizTopicsScreen);
    }, 1000);
  }, [setCurrentScreen]);

  console.log('User:', user);
  console.log('Current Screen:', currentScreen);

  if (!user) {
    console.log('User not logged in, rendering LoginScreen');
    return <LoginScreen />;
  }

  const screenComponents = {
    [ScreenTypes.SplashScreen]: <SplashScreen />,
    [ScreenTypes.QuizTopicsScreen]: <QuizTopicsScreen />,
    [ScreenTypes.QuizDetailsScreen]: <QuizDetailsScreen />,
    [ScreenTypes.QuestionScreen]: <QuestionScreen />,
    [ScreenTypes.ResultScreen]: <ResultScreen />,
  };

  const ComponentToRender = screenComponents[currentScreen] || <HomePage />;

  console.log('Rendering component:', ComponentToRender);

  return <>{ComponentToRender}</>;
}

export default Main;

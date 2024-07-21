import React from 'react';
import styled from 'styled-components';
import { useQuiz } from '../../context/QuizContext';
import { PageCenter, CenterCardContainer, LogoContainer, HighlightedText } from '../../styles/Global';
import { ScreenTypes } from '../../types';
import Button from '../ui/Button';
import logo from '../../assets/ed1.png';

const ResultScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ResultTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.themeColor};
  text-align: center;
`;

const ResultOverview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const QuestionResultContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const QuestionText = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const OptionText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-left: 20px;
`;

const ResultScreen = () => {
  const { result, setCurrentScreen } = useQuiz();

  const goToHomeScreen = () => {
    setCurrentScreen(ScreenTypes.QuizTopicsScreen);
  };

  return (
    <PageCenter>
      <CenterCardContainer>
        <LogoContainer>
          <img src={logo} alt="Edfrica Logo" />
        </LogoContainer>
        <ResultScreenContainer>
          <ResultTitle>Quiz Results</ResultTitle>
          <ResultOverview>
            {result.map((questionResult, index) => (
              <QuestionResultContainer key={index}>
                <QuestionText>{questionResult.question}</QuestionText>
                {questionResult.options.map((option, idx) => (
                  <OptionText key={idx}>
                    {String.fromCharCode(65 + idx)}. {option}
                  </OptionText>
                ))}
                <OptionText>
                  <strong>Selected Answer:</strong> {questionResult.selectedAnswer.join(', ')}
                </OptionText>
                <OptionText>
                  <strong>Correct Answer:</strong> {questionResult.answer}
                </OptionText>
              </QuestionResultContainer>
            ))}
          </ResultOverview>
          <Button text="Go to Home" onClick={goToHomeScreen} />
        </ResultScreenContainer>
      </CenterCardContainer>
    </PageCenter>
  );
};

export default ResultScreen;

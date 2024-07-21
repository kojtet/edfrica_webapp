import React from 'react';
import styled from 'styled-components';
import { HighlightedText } from '../../../styles/Global';
import { convertSeconds } from '../../../utils/helpers';
import { Result } from '../../../types';

const ResultOverviewStyle = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const ResultText = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

interface ResultOverviewProps {
  result: Result[];
  endTime: number;
  quizDetails: {
    totalQuestions: number;
    totalScore: number;
    totalTime: number;
  };
}

const ResultOverview: React.FC<ResultOverviewProps> = ({ result, endTime, quizDetails }) => {
  const obtainedScore = result
    .filter((item) => item.isMatch)
    .reduce((accumulator, currentValue) => accumulator + (currentValue.score || 0), 0);

  const calculateStatus = () => {
    const percentage = (obtainedScore / quizDetails.totalScore) * 100;
    return percentage >= 60 ? 'Passed' : 'Failed';
  };

  return (
    <ResultOverviewStyle>
      <ResultText>
        Total Questions Attempted: <HighlightedText>{result.length}</HighlightedText>
      </ResultText>
      <ResultText>
        Total Score: <HighlightedText>{obtainedScore}</HighlightedText>
      </ResultText>
      <ResultText>
        Total Time Taken: <HighlightedText>{convertSeconds(endTime)}</HighlightedText>
      </ResultText>
      <ResultText>
        Status: <HighlightedText>{calculateStatus()}</HighlightedText>
      </ResultText>
    </ResultOverviewStyle>
  );
};

export default ResultOverview;

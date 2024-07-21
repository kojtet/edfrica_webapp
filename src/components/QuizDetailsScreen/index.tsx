import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AppLogo, StartIcon } from '../../config/icons'
import { useAuth } from '../../context/AuthContext';
import {
  CenterCardContainer,
  HighlightedText,
  LogoContainer,
  PageCenter,
} from '../../styles/Global';
import { convertSeconds } from '../../utils/helpers';

import Button from '../ui/Button';
import logo from '../../assets/ed1.png';

const AppTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.themeColor};
`;

const DetailTextContainer = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  margin-bottom: 40px;
  text-align: center;
  max-width: 500px;
`;

const DetailText = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  line-height: 1.3;
`;

const QuizDetailsScreen = () => {
  const { quizId } = useParams();
  const [quizDetails, setQuizDetails] = useState<any>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(`https://edfrica-backend-supabase.onrender.com/api/quizzes/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuizDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch quiz details', error);
      }
    };

    fetchQuizDetails();
  }, [quizId, token]);

  const startQuiz = () => {
    navigate(`/quiz/${quizId}`);
  };

  if (!quizDetails) {
    return <div>Loading...</div>;
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer>
          <img src={logo} alt="Edfrica Logo" style={{ width: '200px' }} />
        </LogoContainer>
        <AppTitle>{quizDetails.title}</AppTitle>
        <DetailTextContainer>
          <DetailText>
            Description: <HighlightedText>{quizDetails.description}</HighlightedText>
          </DetailText>
          <DetailText>
            Course: <HighlightedText>{quizDetails.course_name}</HighlightedText>
          </DetailText>
          <DetailText>
            Time limit: <HighlightedText>{convertSeconds(quizDetails.time_limit * 60)}</HighlightedText>
          </DetailText>
        </DetailTextContainer>
        <Button
          text="Start"
          icon={<StartIcon />}
          iconPosition="left"
          onClick={startQuiz}
          bold
        />
      </CenterCardContainer>
    </PageCenter>
  );
};

export default QuizDetailsScreen;

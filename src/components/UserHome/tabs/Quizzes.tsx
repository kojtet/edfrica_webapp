import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.themeColor};
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 300px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3`
  margin: 10px 0;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.themeColor};
`;

const CardContent = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const Quizzes: React.FC = () => {
  const { user, token } = useAuth();
  const { courseId } = useParams<{ courseId: string }>();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (token && user) {
        try {
          const response = await axios.get(`https://edfrica-backend-supabase.onrender.com/api/quizzes/course/${courseId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setQuizzes(response.data); // Assuming the API returns an array of quizzes
        } catch (error) {
          console.error('Failed to fetch quizzes', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchQuizzes();
  }, [token, user, courseId]);

  if (loading) {
    return <Loader>Loading...</Loader>;
  }

  return (
    <Container>
      {quizzes.map((quiz) => (
        <Card key={quiz.id}>
          <CardTitle>{quiz.quiz_name}</CardTitle>
          <CardContent>{quiz.description}</CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Quizzes;

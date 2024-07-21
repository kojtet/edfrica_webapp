import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  max-width: 80%;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.themeColor};
  margin-bottom: 20px;
  text-align: center;
`;

const QuizCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 10px;
  border: 2px solid ${({ theme }) => theme.colors.themeColor};
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const QuizTitle = styled.h3`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.themeColor};
`;

const QuizDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

interface Quiz {
  id: string;
  title: string;
  description: string;
}

const MyCourses: React.FC = () => {
  const { user, token } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User Info:', user);
    console.log('Token:', token);

    const fetchCourses = async () => {
      if (token && user) {
        try {
          const response = await axios.get(`https://edfrica-backend-supabase.onrender.com/api/courses/student/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCourses(response.data); // Assuming the API returns an array of courses
        } catch (error) {
          console.error('Failed to fetch courses', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourses();
  }, [token, user]);

  const fetchQuizzes = async (courseId: string) => {
    setLoadingQuizzes(true);
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
      setLoadingQuizzes(false);
    }
  };

  const handleCardClick = (course: any) => {
    setSelectedCourse(course);
    fetchQuizzes(course.id);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setQuizzes([]);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleQuizClick = (quizId: string) => {
    navigate(`/quiz/${quizId}`);
  };

  if (loading) {
    return <Loader>Loading...</Loader>;
  }

  return (
    <>
      <Container>
        {courses.map((course) => (
          <Card key={course.id} onClick={() => handleCardClick(course)}>
            <CardImage src={course.thumbnail} alt={course.course_name} />
            <CardTitle>{course.course_name}</CardTitle>
            <CardContent>{course.summary}</CardContent>
          </Card>
        ))}
      </Container>

      {selectedCourse && (
        <ModalOverlay onClick={handleOverlayClick}>
          <ModalContent>
            <ModalHeader>Quizzes for {selectedCourse.course_name}</ModalHeader>
            {loadingQuizzes ? (
              <Loader>Loading quizzes...</Loader>
            ) : (
              quizzes.map((quiz) => (
                <QuizCard key={quiz.id} onClick={() => handleQuizClick(quiz.id)}>
                  <QuizTitle>{quiz.title}</QuizTitle>
                  <QuizDescription>{quiz.description}</QuizDescription>
                </QuizCard>
              ))
            )}
            <Button onClick={handleCloseModal}>Close</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.danger};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dangerDark};
  }
`;

export default MyCourses;

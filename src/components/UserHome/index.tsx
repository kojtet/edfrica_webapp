import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/ed1.png';
import { useAuth } from '../../context/AuthContext';
import MyCourses from './tabs/MyCourses';
import PracticeTests from './tabs/PracticeTests';
import QuizHistory from './tabs/QuizHistory';
import Solve from './tabs/Solve';
import MyAccount from './tabs/MyAccount';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 150px;
`;

const Tab = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.themeColor : 'white')};
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  border: none;
  padding: 15px;
  cursor: pointer;
  font-size: 18px;
  text-align: left;
  border-radius: 5px;
  margin-bottom: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.themeColorDark};
    color: white;
  }
`;

const LogoutButton = styled.button`
  margin-top: auto;
  padding: 15px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.danger};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dangerDark};
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const Header = styled.div`
  background-color: ${({ theme }) => theme.colors.themeColor};
  padding: 20px;
  color: white;
  font-size: 24px;
  text-align: center;
`;

const Content = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
`;

const UserHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState('My Courses');
  const { logout } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'My Courses':
        return <MyCourses />;
      case 'Practice Tests':
        return <PracticeTests />;
      case 'Quiz History':
        return <QuizHistory />;
      case 'Solve':
        return <Solve />;
      case 'My Account':
        return <MyAccount />;
      default:
        return <MyCourses />;
    }
  };

  return (
    <Container>
      <Sidebar>
        <LogoContainer>
          <Logo src={logo} alt="Edfrica Logo" />
        </LogoContainer>
        {['My Courses', 'Practice Tests', 'Quiz History', 'Solve', 'My Account'].map(tab => (
          <Tab
            key={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Sidebar>
      <ContentContainer>
        <Header>Edfrica: AI Powered Learning</Header>
        <Content>
          {renderContent()}
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default UserHome;

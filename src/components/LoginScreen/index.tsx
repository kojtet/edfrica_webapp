import { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/ed1.png';
import { useAuth } from '../../context/AuthContext';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
`;

const ImageContainer = styled.div`
  flex: 1.65;
  background-image: url('https://oxfordhousebcn.com/wp-content/uploads/rendered.jpg');
  background-size: cover;
  background-position: center;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const Logo = styled.img`
  width: 200px;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  margin-bottom: 40px;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.themeColor};
`;

const Input = styled.input`
  margin: 20px 0;
  padding: 15px;
  width: 100%;
  max-width: 400px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  margin-top: 30px;
  padding: 15px 20px;
  width: 100%;
  max-width: 400px;
  background-color: ${({ theme }) => theme.colors.themeColor};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.themeColorDark};
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
`;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setError(null);
      await login(email, password);
    } catch (error) {
      setError('Login failed. Please check your email and password.');
    }
  };

  return (
    <Container>
      <ImageContainer />
      <FormContainer>
        <Logo src={logo} alt="Edfrica Logo" />
        <Title>Login</Title>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </Container>
  );
};

export default LoginScreen;

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/ed1.png'; // Adjust the path if necessary
import { PageCenter } from '../../styles/Global';

interface LogoAnimationProps {
  logoSize: string;
}

const LogoAnimation = styled.div<{ logoSize: string }>`
  img {
    width: ${(props) => props.logoSize};
    transition: width 1s;
  }
`;

const SplashScreen = () => {
  const [logoSize, setLogoSize] = useState('80px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setLogoSize('240px');
      } else {
        setLogoSize('350px');
      }
    };

    // Set initial logo size
    handleResize();

    // Update logo size on window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <PageCenter justifyCenter>
      <LogoAnimation logoSize={logoSize}>
        <img src={logo} alt="Edfrica Logo" />
      </LogoAnimation>
      <h1>Edfrica: AI Powered Learning</h1>
    </PageCenter>
  );
};

export default SplashScreen;

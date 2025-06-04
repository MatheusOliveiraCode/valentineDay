import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const AppContainer = styled.div`
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  min-height: 100vh;
  overflow-x: hidden;
`;

const Header = styled(motion.header)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 2rem;
  position: relative;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  max-width: 600px;
  line-height: 1.6;
`;

const ParallaxSection = styled(Parallax)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
`;

const PhotoCollage = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
`;

const PhotoCard = styled(motion.div)`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  aspect-ratio: 1;
  background: white;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const HeartDecoration = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.8);
  pointer-events: none;
`;

const FloatingHeart = styled(motion.div)`
  position: absolute;
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
  animation: float 6s ease-in-out infinite;
`;

const MessageSection = styled(ParallaxSection)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  color: white;
  text-align: center;
`;

const Message = styled(motion.div)`
  max-width: 800px;
  font-size: 1.8rem;
  line-height: 1.6;
  padding: 2rem;
`;

const SplitHeartContainer = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HeartWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin-bottom: 2rem;
`;

const HeartHalf = styled(motion.div)`
  position: absolute;
  width: 150px;
  height: 300px;
  overflow: hidden;
  
  &::before {
    content: '❤️';
    position: absolute;
    font-size: 300px;
    line-height: 1;
    transform: scale(1.1);
  }
`;

const LeftHeartHalf = styled(HeartHalf)`
  left: 0;
  &::before {
    left: 0;
  }
`;

const RightHeartHalf = styled(HeartHalf)`
  right: 0;
  &::before {
    right: 0;
  }
`;

const HeartMessage = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5rem;
  text-align: center;
  opacity: 0;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 15px;
`;

const RingsContainer = styled.div`
  position: relative;
  height: 300vh;
  overflow: hidden;
`;

const FixedWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const RingsWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const Ring = styled(motion.div)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 8px solid ${props => props.isGolden ? '#FFD700' : '#C0C0C0'};
  position: relative;
  box-shadow: 0 0 20px ${props => props.isGolden ? 'rgba(255, 215, 0, 0.5)' : 'rgba(192, 192, 192, 0.5)'};

  @keyframes flash {
    0% {
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    }
    50% {
      box-shadow: 0 0 100px rgba(255, 215, 0, 0.8),
                 0 0 50px rgba(255, 215, 0, 0.6),
                 0 0 25px rgba(255, 215, 0, 0.4);
    }
    100% {
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    }
  }

  ${props => props.isGolden && `
    animation: flash 1s ease-out;
  `}
`;

const RingsMessage = styled(motion.div)`
  position: fixed;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

function App() {
  const [hearts, setHearts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [ringsProgress, setRingsProgress] = useState(0);
  const [heartComplete, setHeartComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const progress = (scrollPosition / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);

      // Calculate rings progress (starts at 82% scroll and completes at 98%)
      const ringsProgress = Math.max(0, Math.min(1, (progress - 82) / 16));
      setRingsProgress(ringsProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Start heart animation after a delay
    const timer = setTimeout(() => {
      setHeartComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ParallaxProvider>
      <AppContainer>
        <Header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Title
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Feliz Dia dos Namorados
          </Title>
          <Subtitle
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Um momento especial para celebrar o amor
          </Subtitle>
          <FloatingHeart
            style={{ top: '20%', left: '10%' }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ❤️
          </FloatingHeart>
          <FloatingHeart
            style={{ top: '30%', right: '15%' }}
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          >
            ❤️
          </FloatingHeart>
        </Header>

        <ParallaxSection speed={-10}>
          <PhotoCollage>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <PhotoCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: '#ffd6d6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: '#ff6b6b'
                }}>
                  Foto {index}
                </div>
              </PhotoCard>
            ))}
          </PhotoCollage>
        </ParallaxSection>

        <MessageSection speed={5}>
          <Message
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha."
          </Message>
        </MessageSection>

        <ParallaxSection speed={-15}>
          <PhotoCollage>
            {[7, 8, 9, 10, 11, 12].map((index) => (
              <PhotoCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: '#ffd6d6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: '#ff6b6b'
                }}>
                  Foto {index}
                </div>
              </PhotoCard>
            ))}
          </PhotoCollage>
        </ParallaxSection>

        <SplitHeartContainer>
          <HeartWrapper>
            <LeftHeartHalf
              initial={{ x: -150 }}
              animate={{ 
                x: heartComplete ? 0 : -150,
                scale: heartComplete ? [1, 1.1, 1] : 1
              }}
              transition={{
                x: { duration: 1, type: "spring", stiffness: 50 },
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
            <RightHeartHalf
              initial={{ x: 150 }}
              animate={{ 
                x: heartComplete ? 0 : 150,
                scale: heartComplete ? [1, 1.1, 1] : 1
              }}
              transition={{
                x: { duration: 1, type: "spring", stiffness: 50 },
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
            <HeartMessage
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: heartComplete ? 1 : 0,
                y: heartComplete ? 0 : 50
              }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              "Nosso amor é como este coração: mesmo separado, sempre encontra seu caminho de volta para se tornar completo."
            </HeartMessage>
          </HeartWrapper>
        </SplitHeartContainer>

        <RingsContainer>
          <FixedWrapper>
            <RingsWrapper>
              <Ring
                isGolden={ringsProgress >= 0.99}
                style={{ 
                  transform: `translateX(${-800 + (ringsProgress * 800)}px) rotate(${ringsProgress * 360}deg) scale(${1 + ringsProgress * 0.2})`,
                  borderColor: `${ringsProgress >= 0.99 
                    ? `rgb(255, ${215 - (ringsProgress - 0.99) * 215}, 0)`
                    : '#C0C0C0'}`,
                }}
              />
              <Ring
                isGolden={ringsProgress >= 0.99}
                style={{ 
                  transform: `translateX(${800 - (ringsProgress * 800)}px) rotate(${-ringsProgress * 360}deg) scale(${1 + ringsProgress * 0.2})`,
                  borderColor: `${ringsProgress >= 0.99 
                    ? `rgb(255, ${215 - (ringsProgress - 0.99) * 215}, 0)`
                    : '#C0C0C0'}`,
                }}
              />
            </RingsWrapper>
          </FixedWrapper>
          <RingsMessage
            style={{
              opacity: ringsProgress >= 0.99 ? 1 : 0,
              transform: `translate(-50%, ${ringsProgress >= 0.99 ? '0' : '20px'})`
            }}
          >
            "Que vivamos este namoro perfeito felizes, até que, nossos aneis de prata tornem-se de ouro."
          </RingsMessage>
        </RingsContainer>
      </AppContainer>
    </ParallaxProvider>
  );
}

export default App; 
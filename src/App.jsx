import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Add window width hook
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

const AppContainer = styled.div`
  background: linear-gradient(270deg, #FF6B6B, #FF8E8E, #FFB6C1,rgb(250, 171, 244)); /* Balanced loving red and pink gradient */
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite; /* Smooth, continuous animation */
  min-height: 100vh;
  overflow-x: hidden;

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Header = styled(motion.header)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #3e2723; /* Very dark brown for excellent contrast */
  text-align: center;
  padding: 2rem;
  position: relative;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05); /* Even softer shadow */
  color: white;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    padding: 0 1rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  max-width: 600px;
  line-height: 1.6;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0 1rem;
  }
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
  background: rgba(255, 107, 107, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    padding: 0.5rem;
  }
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  color: rgba(255, 105, 180, 0.7); /* Consistent pink color for floating hearts */
  pointer-events: none;
  animation: float 6s ease-in-out infinite;
`;

const MessageSection = styled(ParallaxSection)`
  background: rgba(255, 107, 107, 0.8); /* Loving red with transparency */
  backdrop-filter: blur(5px);
  color: #3e2723; /* Very dark brown text */
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Slightly more prominent shadow */
`;

const Message = styled(motion.div)`
  max-width: 800px;
  font-size: 1.8rem;
  line-height: 1.6;
  padding: 2rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 1.5rem;
  }
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

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const Heart = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 300px;
  line-height: 1;
  transform: scale(1.1);

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    font-size: 200px;
  }
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

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    border-width: 6px;
  }

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
  background: rgba(255, 107, 107, 0.8);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 1.5rem;
    bottom: 10%;
  }
`;

const HeartMessage = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.8rem;
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  background: rgba(255, 107, 107, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(255, 105, 180, 0.5);
  opacity: 0;
  z-index: 5;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 1.5rem;
  }
`;

const FlowerInstruction = styled(motion.div)`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 2rem;
  text-align: center;
  padding: 1rem 2rem;
  background: rgba(255, 107, 107, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
  z-index: 5;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.8rem 1.5rem;
    top: 15%;
  }
`;

const FlowerTitle = styled(motion.div)`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 2.5rem;
  text-align: center;
  padding: 1rem 2rem;
  background: rgba(255, 107, 107, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
  z-index: 5;

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 0.8rem 1.5rem;
    top: 5%;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: -150px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1.2rem;
  text-align: center;
  opacity: 0;

  @media (max-width: 768px) {
    bottom: -100px;
    font-size: 1rem;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.98); /* Near opaque white background for modal */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

const ModalContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
`;

const ModalImage = styled(motion.img)`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 15px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: -40px;
  right: -40px;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
  color: #ff6b6b;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    top: -30px;
    right: -30px;
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
  
  &:hover {
    transform: scale(1.1);
  }
`;

const HeartTunnel = styled(motion.div)`
  position: fixed; /* Definido como fixed para cobrir toda a viewport */
  top: 0;
  left: 0;
  width: 100vw; /* 100% da largura da viewport */
  height: 100vh; /* 100% da altura da viewport */
  pointer-events: none;
  overflow: hidden;
  z-index: 9999; /* Z-index muito alto para garantir que esteja no topo */
`;

const HeartParticle = styled(motion.div)`
  position: absolute;
  font-size: 40px; /* Tamanho maior para visibilidade */
  color: #ff69b4; /* Rosa para as partículas de coração */
  opacity: 0.9; /* Opacidade maior */
  filter: drop-shadow(0 0 15px rgba(255, 105, 180, 0.9)); /* Brilho mais intenso */

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const FlowerSection = styled(ParallaxSection)`
  background: rgba(255, 182, 193, 0.9);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
`;

const FlowerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Flower = styled(motion.div)`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const Petal = styled(motion.div)`
  position: absolute;
  width: 60px;
  height: 120px;
  background: linear-gradient(45deg, #FF69B4, #FF1493, #FF69B4);
  border-radius: 60px 60px 0 0;
  transform-origin: bottom center;
  box-shadow: 0 0 20px rgba(255, 105, 180, 0.6);
  filter: drop-shadow(0 0 10px rgba(255, 105, 180, 0.8));
  pointer-events: none;

  @media (max-width: 768px) {
    width: 40px;
    height: 80px;
  }
`;

const FlowerCenter = styled(motion.div)`
  position: absolute;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, #FFD700, #FFA500);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  z-index: 10;
  top: 40%;
  left: 36%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
`;

const FlowerMessage = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.8rem;
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  background: rgba(255, 107, 107, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(255, 105, 180, 0.5);
  opacity: 0;
  z-index: 5;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 1.5rem;
    left: 65%;
  }
`;

const Sparkle = styled(motion.div)`
  position: absolute;
  font-size: 1.5rem;
  color: #FFD700;
  pointer-events: none;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.8));

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

function App() {
  const [hearts, setHearts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [ringsProgress, setRingsProgress] = useState(0);
  const [heartComplete, setHeartComplete] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [heartParticles, setHeartParticles] = useState([]);
  const [flowerOpen, setFlowerOpen] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [pulledPetals, setPulledPetals] = useState([]);
  const windowWidth = useWindowWidth();
  
  // Add photo URLs state
  const [photoUrls] = useState([
    'https://i.ibb.co/1Yq3TQgV/c1c406fb-5a2d-4566-adae-a6b59ecfa833.jpg',
    'https://i.ibb.co/WpMTWG19/3b4641c2-4fa5-49b3-ad6f-9e8f738a85bd.jpg',
    'https://i.ibb.co/8L04s53P/90dfe510-622b-474b-ae68-ec9b101f3e29.jpg',
    'https://i.ibb.co/NgRL5Lyg/15e86077-ecd1-4a4e-bd2a-d08ea7f24d50.jpg',
    'https://i.ibb.co/TMDhWHDp/e73d08e4-83e6-4bda-b3fd-d6e693c5d09a.jpg',
    'https://i.ibb.co/XZBG4gJL/4aa93e8b-0930-4c23-981a-ebacf8fd0673.jpg',
    'https://i.ibb.co/nNZm36Tt/31391126-eb05-46be-b700-d53eadc1e844.jpg',
    'https://i.ibb.co/R4Pr2xcC/IMG-2834.jpg',
    'https://i.ibb.co/v6Twkp02/6-E7-CF922-C93-E-4-B33-9-F70-2599-CB5496-F0.jpg',
    'https://i.ibb.co/WNwsBL4R/IMG-3515.jpg',
    'https://i.ibb.co/Gf01VLZk/IMG-2736.jpg',
    'https://i.ibb.co/FLZL6NvK/IMG-3750.jpg',
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const progress = (scrollPosition / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);

      // Calculate rings progress (starts at 82% scroll and completes at 98%)
      // Only show rings after the heart section (around 60% scroll)
      const ringsProgress = progress > 60 ? Math.max(0, Math.min(1, (progress - 82) / 16)) : 0;
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

  const createHeartParticles = () => {
    const particles = [];
    const numParticles = 15; // Mantido em 15 para performance
    for (let i = 0; i < numParticles; i++) {
      const startX = Math.random() * 100; // Início horizontal aleatório (0-100vw)
      const startY = Math.random() * 100; // Início vertical aleatório (0-100vh) - para diagnóstico
      const endX = Math.random() * 100; // Fim horizontal aleatório (0-100vw)
      const endY = Math.random() * 100; // Fim vertical aleatório (0-100vh)
      const initialScale = 0.1;
      const midScale = Math.random() * 1 + 1.8; // Corações crescem (1.8x a 2.8x)
      const duration = Math.random() * 5 + 5; // Duração da animação entre 5-10 segundos
      const delay = Math.random() * 5; // Atraso escalonado para cada coração

      particles.push({
        id: i,
        startX,
        startY,
        endX,
        endY,
        initialScale,
        midScale,
        duration,
        delay,
      });
    }
    setHeartParticles(particles);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    createHeartParticles();
  };

  const createSparkles = () => {
    const newSparkles = [];
    for (let i = 0; i < 20; i++) {
      newSparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
      });
    }
    setSparkles(newSparkles);
  };

  const handleFlowerClick = () => {
    setFlowerOpen(true); // Always keep flower open
    createSparkles();
    
    // Change message only on click
    setCurrentMessageIndex((prev) => (prev + 1) % gratitudeMessages.length);
    
    // Get all available petals (not currently pulled)
    const availablePetals = Array.from({ length: 12 }, (_, i) => i).filter(
      i => !pulledPetals.includes(i)
    );
    
    // If there's a currently pulled petal, return it and pull a new one
    if (pulledPetals.length > 0 && availablePetals.length > 0) {
      // Return current petal and pull new one
      const newRandomPetal = availablePetals[Math.floor(Math.random() * availablePetals.length)];
      setPulledPetals([newRandomPetal]); // Replace with new petal
    } 
    // If no petal is currently pulled, pull one
    else if (pulledPetals.length === 0 && availablePetals.length > 0) {
      const newRandomPetal = availablePetals[Math.floor(Math.random() * availablePetals.length)];
      setPulledPetals([newRandomPetal]);
    }
  };

  const gratitudeMessages = [
    "Obrigado por sempre me ajudar quando preciso.",
    "Você me apoia em todos os momentos, sou grato por isso.",
    "Sempre que preciso reunir forças, me lembro de você.",
    "És minhas inspiração diária.",
    "Com você ao meu lado, tudo fica mais bonito.",
    "Obrigado de verdade por se esforçar por mim.",
    "Você é meu maior presente e meu amior milagre, meu amor.",
    "Você é a flor mais bela do mundo <3 ."
  ];

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
            EU TE AMO 
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
          <FloatingHeart
            style={{ top: '50%', left: '30%' }}
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          >
            ❤️
          </FloatingHeart>
          <FloatingHeart
            style={{ bottom: '20%', right: '25%' }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 2 }}
          >
            ❤️
          </FloatingHeart>
        </Header>

        <ParallaxSection speed={-10}>
          <PhotoCollage>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <PhotoCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleImageClick(photoUrls[index])}
              >
                <img src={photoUrls[index]} alt={`Foto ${index + 1}`} />
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
            "Que esse romance de natal nunca acabe. Que ele seja tão infinito quanto o amor que tenho por você."
          </Message>
        </MessageSection>

        <ParallaxSection speed={-15}>
          <PhotoCollage>
            {[6, 7, 8, 9, 10, 11].map((index) => (
              <PhotoCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleImageClick(photoUrls[index])}
              >
                <img src={photoUrls[index]} alt={`Foto ${index + 1}`} />
              </PhotoCard>
            ))}
          </PhotoCollage>
        </ParallaxSection>

        <SplitHeartContainer>
          <HeartWrapper>
            <Heart
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              ❤️
            </Heart>
            <HeartMessage
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              "Meu coração pertence a ti, bate por ti, vive por ti."
            </HeartMessage>
            <ScrollIndicator
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Continue rolando para descobrir mais... ↓
            </ScrollIndicator>
          </HeartWrapper>
        </SplitHeartContainer>

        <FlowerSection speed={-5}>
          <FlowerContainer>
            <FlowerTitle
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Fiz isso como agradecimento, pelo seu esforço por mim ❤️
            </FlowerTitle>
            <FlowerInstruction
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Puxe uma pétala
            </FlowerInstruction>
            <Flower onClick={handleFlowerClick}>
              {[...Array(12)].map((_, index) => (
                <Petal
                  key={index}
                  style={{
                    transform: `rotate(${index * 30}deg) translateY(-60px)`,
                  }}
                  animate={{
                    rotate: pulledPetals.includes(index) ? 0 : (flowerOpen ? index * 30 + 10 : index * 30),
                    scale: flowerOpen ? 1.05 : 1,
                    y: pulledPetals.includes(index) ? -60 : -60,
                    x: pulledPetals.includes(index) ? 200 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                />
              ))}
              <FlowerCenter
                onClick={handleFlowerClick}
                animate={{
                  scale: flowerOpen ? [1, 1.2, 1] : 1,
                  rotate: flowerOpen ? [0, 360] : 0,
                }}
                transition={{
                  duration: 3,
                  repeat: flowerOpen ? Infinity : 0,
                  ease: "linear",
                }}
              >
                🌸
              </FlowerCenter>
            </Flower>

            <FlowerMessage
              animate={{
                opacity: flowerOpen ? 1 : 0,
                scale: flowerOpen ? 1 : 0.8,
              }}
              transition={{ duration: 0.5 }}
            >
              {gratitudeMessages[currentMessageIndex]}
            </FlowerMessage>

            {sparkles.map((sparkle) => (
              <Sparkle
                key={sparkle.id}
                style={{
                  left: `${sparkle.x}%`,
                  top: `${sparkle.y}%`,
                }}
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: sparkle.duration,
                  delay: sparkle.delay,
                  repeat: flowerOpen ? Infinity : 0,
                  repeatDelay: 1,
                }}
              >
                ✨
              </Sparkle>
            ))}
          </FlowerContainer>
        </FlowerSection>

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

        <AnimatePresence>
          {selectedImage && (
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <HeartTunnel>
                {heartParticles.map((particle) => (
                  <HeartParticle
                    key={particle.id}
                    initial={{
                      x: `${particle.startX}vw`, /* Posições relativas à largura da viewport */
                      y: `${particle.startY}vh`, /* Posições relativas à altura da viewport */
                      scale: particle.initialScale,
                      opacity: 0,
                    }}
                    animate={{
                      x: `${particle.endX}vw`, /* Fim horizontal aleatório */
                      y: `${particle.endY}vh`, /* Fim vertical aleatório */
                      scale: [particle.initialScale, particle.midScale, 0], // Aumenta o tamanho e depois para 0
                      opacity: [0, 0.8, 0], // Aparece e depois desaparece
                    }}
                    transition={{
                      duration: particle.duration,
                      delay: particle.delay,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear", // Movimento consistente para efeito de túnel
                    }}
                  >
                    ❤️
                  </HeartParticle>
                ))}
              </HeartTunnel>

              <ModalContent
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ModalImage
                  src={selectedImage}
                  alt="Selected photo"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <CloseButton
                  onClick={() => setSelectedImage(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </CloseButton>
              </ModalContent>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </AppContainer>
    </ParallaxProvider>
  );
}

export default App; 
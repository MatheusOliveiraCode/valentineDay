import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

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

// 8-month celebration section styles
const EightMonthsSection = styled(ParallaxSection)`
  background: linear-gradient(135deg, rgba(255, 105, 180, 0.8), rgba(255, 99, 132, 0.85));
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
`;

const EightTitle = styled(motion.h2)`
  color: white;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 4px 12px rgba(0,0,0,0.25);

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }
`;

const EightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MonthCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 1rem;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
`;

const MonthEmoji = styled.div`
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 0 8px rgba(255, 105, 180, 0.6));
`;

const MonthText = styled.p`
  text-align: center;
  color: #ff3b6f;
  font-weight: 600;
`;

// 9-month interactive celebration styles
const NineMonthsSection = styled(ParallaxSection)`
  background: linear-gradient(135deg, rgba(255, 153, 204, 0.9), rgba(255, 107, 153, 0.9));
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
`;

const NineTitle = styled(motion.h2)`
  color: white;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 0 4px 12px rgba(0,0,0,0.25);

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }
`;

const NineProgress = styled(motion.div)`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;
  background: rgba(255, 107, 107, 0.8);
  backdrop-filter: blur(6px);
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
`;

const NinePath = styled.div`
  position: relative;
  width: 100%;
  max-width: 1100px;
  height: 70vh;
  border-radius: 20px;
  margin: 0 auto;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1));
  box-shadow: inset 0 0 40px rgba(255, 255, 255, 0.2);
  z-index: 1;
`;

const HeartNode = styled(motion.button)`
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  color: #ff3b6f;
  z-index: 2;

  &:focus { outline: none; }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.6rem;
  }
`;

const NineTooltip = styled(motion.div)`
  position: absolute;
  min-width: 180px;
  max-width: 240px;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 14px;
  color: #ff3b6f;
  font-weight: 600;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  transform: translate(-50%, -120%);
  text-align: center;
  z-index: 3;
  pointer-events: none;

  @media (max-width: 768px) {
    min-width: 140px;
    font-size: 0.9rem;
    transform: translate(-50%, -110%);
  }
`;

// Starry love additions
const LinesOverlay = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const StarDot = styled(motion.button)`
  position: absolute;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  background: radial-gradient(circle, #fff, #ffd1f0 60%, #ff90c8 100%);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6), 0 0 8px rgba(255, 105, 180, 0.6);
  color: #ff3b6f;
  z-index: 2;

  &:focus { outline: none; }

  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
    font-size: 16px;
  }
`;

const CenterMessage = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.6rem;
  text-align: center;
  max-width: 720px;
  padding: 1.2rem 2.6rem 1.2rem 1.6rem;
  background: rgba(255, 107, 153, 0.9);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  z-index: 3;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    max-width: 90%;
  }
`;


const TenMonthsSection = styled(ParallaxSection)`
  background: linear-gradient(135deg, rgba(255, 182, 193, 0.95), rgba(255, 140, 170, 0.95));
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
`;

const TenTitle = styled(motion.h2)`
  color: white;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 0 4px 12px rgba(0,0,0,0.25);

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }
`;

const Lantern = styled(motion.button)`
  position: absolute;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  background: radial-gradient(circle, #fff, #ffe3ec 60%, #ffc1d6 100%);
  box-shadow: 0 0 18px rgba(255, 200, 200, 0.7), 0 0 6px rgba(255, 105, 180, 0.6);
  color: #ff3b6f;
  z-index: 2;

  &:focus { outline: none; }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
`;

const TenMessage = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.6rem;
  text-align: center;
  max-width: 720px;
  padding: 1.2rem 2.6rem 1.2rem 1.6rem;
  background: rgba(255, 107, 153, 0.92);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  z-index: 3;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    max-width: 90%;
  }
`;

const ConfettiHeart = styled(motion.div)`
  position: absolute;
  font-size: 1.4rem;
  color: #ff3b6f;
  pointer-events: none;
  filter: drop-shadow(0 0 10px rgba(255, 105, 180, 0.8));
`;

const MessageClose = styled(motion.button)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: white;
  color: #ff3b6f;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
  z-index: 4;
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
    "Obrigada por me fazer sorrir todos os dias.",
    "Sou grata por cada abraço seu.",
    "Você ilumina minha vida de um jeito único.",
    "Obrigada por acreditar na gente, sempre.",
  ];

  const eightMonthsMessages = [
    { emoji: "💘", text: "Mês 1: Eu descobri uma felicidade que nunca imaginei.." },
    { emoji: "💐", text: "Mês 2: Encontrei em ti minha paz." },
    { emoji: "🍰", text: "Mês 3: Fiz da minha vida você." },
    { emoji: "🏞️", text: "Mês 4: Percebi o quanto sou amado." },
    { emoji: "🎧", text: "Mês 5: Você virou minha música favorita." },
    { emoji: "🎬", text: "Mês 6: Percebi que meu amor nao tem limites." },
    { emoji: "🌙", text: "Mês 7: Vencemos obstaculos sempre juntos." },
    { emoji: "💞", text: "Mês 8: Te amo mais que ontem e menos que amanhã." },
  ];

  // Interação de 9 meses: constelação com um texto único
  const loveConstellationText = "Em nove meses percebi que meu amor não cabe no universo, mas preenche todo meu coração.";
  const [starLinks, setStarLinks] = useState([]); // {x1,y1,x2,y2}
  const [stars, setStars] = useState([]); // {x,y,emoji}
  const [showLoveText, setShowLoveText] = useState(false);
  const [messageDiscovered, setMessageDiscovered] = useState(false);
  const [constellationProgress, setConstellationProgress] = useState(0);

  // Interação de 10 meses: lanternas criativas
  const tenLanternText = "Há 10 meses, meu amor por ti já é 10 elevado à enésima potência. <3"
  const [tenLanterns, setTenLanterns] = useState([]);
  const [tenShowMessage, setTenShowMessage] = useState(false);
  const [tenConfetti, setTenConfetti] = useState([]);

  const createTenLanterns = useCallback(() => {
    const container = document.getElementById('ten-section');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const count = 10;
    const marginX = rect.width * 0.08;
    const marginY = rect.height * 0.15;
    const w = rect.width - marginX * 2;
    const h = rect.height - marginY * 2;
    const arr = Array.from({ length: count }).map((_, i) => ({
      x: Math.round(marginX + Math.random() * w),
      y: Math.round(marginY + Math.random() * h),
      emoji: i % 2 === 0 ? '🏮' : '💖',
      released: false
    }));
    setTenLanterns(arr);
    setTenShowMessage(false);
    setTenConfetti([]);
  }, []);

  useEffect(() => {
    // Inicializa as lanternas quando a seção entra no DOM e atualiza no resize
    createTenLanterns();
    const onResize = () => createTenLanterns();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [createTenLanterns]);

  const releaseLantern = (i) => {
    setTenLanterns(prev => {
      const next = [...prev];
      if (next[i] && !next[i].released) {
        next[i] = { ...next[i], released: true };
      }
      const releasedCount = next.filter(l => l.released).length;
      if (releasedCount >= 9) {
        setTenShowMessage(true);
        setTenConfetti(old => {
          if (old.length > 0) return old;
          return Array.from({ length: 24 }).map(() => ({
            x: Math.random() * 90,
            delay: Math.random() * 0.8
          }));
        });
      }
      return next;
    });
  };

  useEffect(() => {
    if (tenShowMessage) {
      setTenLanterns(prev => prev.map(l => ({ ...l, released: true })));
    }
  }, [tenShowMessage]);

  const createStars = useCallback((count = 18) => {
    const container = document.getElementById('nine-section');
    if (!container) return;
    const rect = container.getBoundingClientRect();

    // Gera pontos numa curva de coração e normaliza para o container
    const raw = Array.from({ length: count }).map((_, i) => {
      const t = (i / count) * (Math.PI * 2);
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      return { x, y };
    });
    const minX = Math.min(...raw.map(p => p.x));
    const maxX = Math.max(...raw.map(p => p.x));
    const minY = Math.min(...raw.map(p => p.y));
    const maxY = Math.max(...raw.map(p => p.y));
    const w = rect.width * 0.8;
    const h = rect.height * 0.6;
    const offsetX = rect.width * 0.1;
    const offsetY = rect.height * 0.2;

    const newStars = raw.map((p, i) => ({
      x: ((p.x - minX) / (maxX - minX)) * w + offsetX,
      // invertido no eixo Y para coordenadas de tela
      y: ((maxY - p.y) / (maxY - minY)) * h + offsetY,
      emoji: i % 3 === 0 ? '💖' : '⭐️',
    }));

    setStars(newStars);
    setStarLinks([]);
    setConstellationProgress(0);
    setShowLoveText(false);
    setMessageDiscovered(false);
  }, []);

  useEffect(() => {
    createStars();
    const onResize = () => createStars();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [createStars]);

  useEffect(() => {
    if (!messageDiscovered && constellationProgress >= 9) {
      setMessageDiscovered(true);
      setShowLoveText(true);
    }
  }, [constellationProgress, messageDiscovered]);

  // Ao revelar a mensagem, completar automaticamente todas as ligações da constelação
  useEffect(() => {
    if (!showLoveText) return;
    if (stars.length < 2) return;
    const desired = stars.length; // fechar o loop do coração
    if (starLinks.length >= desired) return;
    const full = [];
    for (let i = 0; i < stars.length; i++) {
      const a = stars[i];
      const b = stars[(i + 1) % stars.length];
      full.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
    }
    setStarLinks(full);
    setConstellationProgress(desired);
  }, [showLoveText, stars, starLinks.length]);

  const connectNextEdge = () => {
    setStarLinks(old => {
      if (stars.length < 2 || constellationProgress >= stars.length) return old;
      const a = stars[constellationProgress % stars.length];
      const b = stars[(constellationProgress + 1) % stars.length];
      const newLine = { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
      const exists = old.some(l => (
        (l.x1 === newLine.x1 && l.y1 === newLine.y1 && l.x2 === newLine.x2 && l.y2 === newLine.y2) ||
        (l.x1 === newLine.x2 && l.y1 === newLine.y2 && l.x2 === newLine.x1 && l.y2 === newLine.y1)
      ));
      // Aumenta o progresso em todo clique, contabilizando até 9 cliques
      setConstellationProgress(p => Math.min(p + 1, 9));
      if (!exists) {
        return [...old, newLine];
      } else {
        const a2 = stars[(constellationProgress + 1) % stars.length];
        const b2 = stars[(constellationProgress + 2) % stars.length];
        const altLine = { x1: a2.x, y1: a2.y, x2: b2.x, y2: b2.y };
        const altExists = old.some(l => (
          (l.x1 === altLine.x1 && l.y1 === altLine.y1 && l.x2 === altLine.x2 && l.y2 === altLine.y2) ||
          (l.x1 === altLine.x2 && l.y1 === altLine.y2 && l.x2 === altLine.x1 && l.y2 === altLine.y1)
        ));
        return altExists ? old : [...old, altLine];
      }
    });
  };


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

        <EightMonthsSection speed={-8}>
          <EightTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            8 meses contigo, meu amor
          </EightTitle>

          <EightGrid>
            {eightMonthsMessages.map((item, idx) => (
              <MonthCard
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ scale: 1.03 }}
              >
                <MonthEmoji>{item.emoji}</MonthEmoji>
                <MonthText>{item.text}</MonthText>
              </MonthCard>
            ))}
          </EightGrid>

          {/* floating decorative hearts */}
          {[...Array(12)].map((_, i) => (
            <FloatingHeart
              key={`em-${i}`}
              style={{ top: `${10 + (i * 6) % 80}%`, left: `${(i * 13) % 90}%` }}
              animate={{ y: [0, -20 - (i % 10), 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
            >
              {i % 3 === 0 ? '💗' : i % 3 === 1 ? '💞' : '💘'}
            </FloatingHeart>
          ))}
        </EightMonthsSection>

        <NineMonthsSection speed={-6} id="nine-section">
          <NineTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            9 meses — constelação de amor
          </NineTitle>

          <LinesOverlay>
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffd1f0" />
                <stop offset="100%" stopColor="#ff90c8" />
              </linearGradient>
            </defs>
            {starLinks.map((l, i) => (
              <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="url(#lineGrad)" strokeWidth="2" />
            ))}
          </LinesOverlay>

          {stars.map((s, i) => (
            <StarDot
              key={i}
              onClick={connectNextEdge}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.35 }}
              style={{ left: s.x, top: s.y }}
            >
              {s.emoji}
            </StarDot>
          ))}

          {showLoveText && (
            <CenterMessage
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
            >
              {loveConstellationText}
              <MessageClose
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLoveText(false)}
                aria-label="Fechar mensagem"
              >
                ×
              </MessageClose>
            </CenterMessage>
          )}

          {[...Array(6)].map((_, i) => (
            <HeartParticle key={i} style={{ left: `${Math.random() * 90 + 5}%`, top: `${Math.random() * 80 + 10}%` }} />
          ))}
        </NineMonthsSection>

        <TenMonthsSection speed={-5} id="ten-section">
          <TenTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            10 meses - 10 meses de puro amor
          </TenTitle>

          {tenLanterns.map((l, i) => (
            <Lantern
              key={i}
              onClick={() => releaseLantern(i)}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.08 }}
              animate={{
                y: l.released ? -220 - (i % 5) * 30 : 0,
                rotate: l.released ? (i % 2 === 0 ? 8 : -8) : 0
              }}
              transition={{ duration: 0.7 }}
              style={{ left: l.x, top: l.y }}
              aria-label={`Lanterna ${i + 1}`}
            >
              {l.emoji}
            </Lantern>
          ))}

          {tenShowMessage && (
            <TenMessage
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
            >
              {tenLanternText}
              <MessageClose
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTenShowMessage(false)}
                aria-label="Fechar mensagem de 10 meses"
              >
                ×
              </MessageClose>
            </TenMessage>
          )}

          {tenConfetti.map((c, idx) => (
            <ConfettiHeart
              key={`ten-cf-${idx}`}
              style={{ left: `${c.x}%`, top: `-5%` }}
              initial={{ y: -50, opacity: 0.9 }}
              animate={{ y: 600, opacity: 0 }}
              transition={{ duration: 4.5, delay: c.delay, repeat: Infinity, repeatType: 'loop' }}
            >
              {idx % 3 === 0 ? '💖' : idx % 3 === 1 ? '💞' : '💘'}
            </ConfettiHeart>
          ))}
        </TenMonthsSection>

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
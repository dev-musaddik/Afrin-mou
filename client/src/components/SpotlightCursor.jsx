import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SpotlightCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{
        background: 'white',
        boxShadow: '0 0 20px 5px rgba(0, 243, 255, 0.5)', // Neon cyan glow
      }}
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300,
        mass: 0.5
      }}
    />
  );
};

export default SpotlightCursor;

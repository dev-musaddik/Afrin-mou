import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const HeroGlitch = ({ src, alt }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [cycle, setCycle] = useState('clear'); // clear -> glitching -> glitched

  // 3D Mouse Movement Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  useEffect(() => {
    let timer;
    if (cycle === 'clear') {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setCycle('glitching');
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (cycle === 'glitching') {
      // Glitch animation duration
      setTimeout(() => {
        setCycle('glitched');
        setGlitchActive(true);
      }, 1000);
    } else if (cycle === 'glitched') {
      // Stay glitched for 20 seconds then reset
      setTimeout(() => {
        setCycle('clear');
        setGlitchActive(false);
        setTimeLeft(10);
      }, 20000);
    }

    return () => clearInterval(timer);
  }, [cycle]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative perspective-1000 w-full max-w-sm mx-auto aspect-square flex items-center justify-center z-10">
      {/* Time Lock Ring - Fades out on hover */}
      <motion.svg 
        animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 1.5 : 1.1 }}
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-0"
      >
        <circle
          cx="50%"
          cy="50%"
          r="48%"
          fill="none"
          stroke="#1a1a24"
          strokeWidth="2"
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="48%"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="2"
          strokeDasharray="300%"
          animate={{ strokeDashoffset: cycle === 'clear' ? ["0%", "300%"] : "300%" }}
          transition={{ duration: 10, ease: "linear" }}
          style={{ opacity: cycle === 'clear' ? 1 : 0.2 }}
        />
      </motion.svg>

      {/* Main Image Container */}
      <motion.div
        layout
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        animate={{ 
          width: isHovered ? "80vw" : "90%",
          height: isHovered ? "80vh" : "90%",
          borderRadius: isHovered ? "10px" : "9999px",
          position: isHovered ? "fixed" : "relative",
          top: isHovered ? "10vh" : "auto",
          left: isHovered ? "10vw" : "auto",
          zIndex: isHovered ? 100 : 10,
          rotateX: isHovered ? 0 : rotateX.get(), // Reset 3D on hover for clarity
          rotateY: isHovered ? 0 : rotateY.get(),
        }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        style={{ rotateX: isHovered ? 0 : rotateX, rotateY: isHovered ? 0 : rotateY }} // Conditional style binding
        className="overflow-hidden shadow-[0_0_50px_rgba(123,44,191,0.3)] border border-white/10 bg-black cursor-pointer"
      >
        <motion.img
          src={src}
          alt={alt}
          animate={
            // Disable glitch on hover to show HD quality
            !isHovered && cycle === 'glitching' ? {
              x: [-2, 2, -2, 0],
              y: [2, -2, 2, 0],
              filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"],
            } : {
              filter: isHovered ? "none" : (glitchActive ? "blur(10px) grayscale(100%)" : "none"),
              opacity: isHovered ? 1 : (glitchActive ? 0.5 : 1)
            }
          }
          transition={{ duration: 0.2, repeat: (!isHovered && cycle === 'glitching') ? 5 : 0 }}
          className={`w-full h-full object-cover transition-all duration-500`}
        />

        {/* Glitch Overlay Layers - Hidden on Hover */}
        {!isHovered && glitchActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
             <h3 className="text-red-500 font-mono text-xl tracking-widest animate-pulse text-center px-4">
               PRIVACY MODE
             </h3>
          </div>
        )}
        
        {/* Scanline Overlay - Fades on Hover */}
        <motion.div 
          animate={{ opacity: isHovered ? 0 : 1 }}
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" 
        />
      </motion.div>
      
      {/* Backdrop for Hover State */}
      {isHovered && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 pointer-events-none"
        />
      )}
    </div>
  );
};

export default HeroGlitch;

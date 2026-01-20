import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BiometricGate = ({ onAccessGranted }) => {
  const [input, setInput] = useState('');
  const [terminalLines, setTerminalLines] = useState([
    "> INITIALIZING SYSTEM...",
    "> ESTABLISHING SECURE CONNECTION...",
    "> SYSTEM LOCKED.",
    "> IDENTIFY USER..."
  ]);
  const [isLocked, setIsLocked] = useState(true);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processInput();
    }
  };

  const processInput = () => {
    const lowerInput = input.toLowerCase().trim();
    const allowedPrefixes = ['mir', 'musaddik', 'admin'];
    
    setTerminalLines(prev => [...prev, `> USER INPUT: ${input}`]);

    setTimeout(() => {
      setTerminalLines(prev => [...prev, "> VERIFYING BIOMETRICS..."]);
      
      setTimeout(() => {
        const isAllowed = allowedPrefixes.some(prefix => lowerInput.startsWith(prefix));

        if (isAllowed) {
          setTerminalLines(prev => [...prev, "> ACCESS GRANTED.", "> WELCOME, USER."]);
          setTimeout(() => {
            setIsLocked(false);
            onAccessGranted();
          }, 1000);
        } else {
          setTerminalLines(prev => [...prev, "> UNAUTHORIZED ACCESS DETECTED.", "> SYSTEM LOCKDOWN INITIATED."]);
          setError(true);
          setInput('');
          setTimeout(() => setError(false), 2000);
        }
      }, 1000);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isLocked && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.5, 
            filter: 'blur(20px)',
            transition: { duration: 1.5, ease: "easeInOut" } 
          }}
          className="fixed inset-0 z-[60] bg-void-black text-neon-cyan font-mono flex flex-col items-center justify-center p-8 overflow-hidden"
        >
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
          
          <div className={`w-full max-w-2xl border border-neon-cyan/30 p-8 rounded bg-black/80 backdrop-blur-md shadow-[0_0_50px_rgba(0,243,255,0.1)] transition-all duration-300 ${error ? 'border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.3)]' : ''}`}>
            <div className="mb-6 space-y-2 h-64 overflow-y-auto scrollbar-hide">
              {terminalLines.map((line, index) => (
                <motion.p 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-sm md:text-base tracking-wider ${line.includes('UNAUTHORIZED') ? 'text-red-500 animate-pulse' : 'text-neon-cyan'}`}
                >
                  {line}
                </motion.p>
              ))}
              <div ref={el => el?.scrollIntoView({ behavior: "smooth" })} />
            </div>

            <div className="relative flex items-center border-t border-neon-cyan/30 pt-4">
              <span className="mr-2 text-neon-cyan animate-pulse">{">"}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-white font-mono uppercase tracking-widest"
                autoFocus
                disabled={error}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BiometricGate;

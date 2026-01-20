import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEyeSlash } from 'react-icons/fa';

const PrivacyShield = () => {
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      triggerWarning();
    };

    const handleKeyDown = (e) => {
      // Detect PrintScreen, or Command+Shift+3/4 (Mac), or Windows+Shift+S
      if (
        e.key === 'PrintScreen' ||
        (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4')) ||
        (e.ctrlKey && e.shiftKey && e.key === 'S')
      ) {
        triggerWarning();
        // Clear clipboard to prevent pasting the screenshot (best effort)
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('Access Denied: Protected Content');
        }
      }
    };

    const triggerWarning = () => {
      setWarning(true);
      // Hide warning after 2 seconds
      setTimeout(() => setWarning(false), 2000);
    };

    // Aggressive Privacy Mode: Trigger on window blur (switching tabs/apps) or visibility change
    const handleBlur = () => {
      triggerWarning();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerWarning();
      }
    };

    // Mobile: Detect 3-finger touch (often used for screenshots)
    const handleTouchStart = (e) => {
      if (e.touches.length > 2) {
        triggerWarning();
      }
    };

    // Add listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('touchstart', handleTouchStart);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <AnimatePresence>
      {warning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white cursor-not-allowed"
        >
          <div className="text-center p-8 border border-red-500/50 rounded-lg bg-red-900/10 backdrop-blur-xl">
            <FaEyeSlash className="mx-auto text-8xl text-red-500 mb-6 animate-pulse" />
            <h2 className="text-4xl font-mono tracking-widest text-red-500 uppercase font-bold">
              SYSTEM ALERT
            </h2>
            <p className="mt-4 text-xl text-red-400 font-mono tracking-wider">
              SCREENSHOT ATTEMPT DETECTED
            </p>
            <p className="mt-2 text-sm text-red-500/70 uppercase tracking-widest">
              Action has been logged.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyShield;

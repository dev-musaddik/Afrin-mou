import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VanishingPhoto = ({ src, alt }) => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsBlurred(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative group w-full max-w-md mx-auto aspect-[3/4] overflow-hidden rounded-lg shadow-2xl shadow-midnight-light border border-gray-800">
      <motion.img
        src={src}
        alt={alt}
        initial={{ filter: 'blur(0px)', opacity: 0 }}
        animate={{ 
          filter: isBlurred ? 'blur(30px) grayscale(100%)' : 'blur(0px) grayscale(0%)',
          opacity: 1 
        }}
        transition={{ duration: 1.5 }}
        className="w-full h-full object-cover transition-all duration-1000"
      />
      
      {/* Overlay Timer (Optional, for dramatic effect) */}
      {!isBlurred && (
        <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-mono opacity-50">
          {timeLeft}s remaining
        </div>
      )}

      {isBlurred && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 font-serif italic tracking-widest text-sm">
            Image Expired
          </p>
        </div>
      )}
    </div>
  );
};

export default VanishingPhoto;

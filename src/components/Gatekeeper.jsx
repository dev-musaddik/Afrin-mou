import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaUnlock } from 'react-icons/fa';

const Gatekeeper = ({ onAccessGranted }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Simulate "processing" delay for cinematic effect
    setTimeout(() => {
      const lowerInput = input.toLowerCase().trim();
      const allowedPrefixes = ['mir', 'musaddik', 'admin']; // Added 'admin' for testing
      
      // Check if input starts with any allowed prefix or contains family names
      const isAllowed = allowedPrefixes.some(prefix => lowerInput.startsWith(prefix));

      if (isAllowed) {
        onAccessGranted();
      } else {
        setError(true);
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
    >
      <div className="w-full max-w-md p-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <FaLock className="mx-auto text-4xl text-gray-500 mb-4" />
          <h1 className="text-3xl font-serif tracking-widest uppercase text-gray-300">
            Restricted Access
          </h1>
          <p className="text-gray-600 mt-2 text-sm tracking-widest">
            SYSTEM LOCKED
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Identify Yourself"
            className="w-full bg-transparent border-b border-gray-700 py-3 text-center text-xl font-serif text-white focus:outline-none focus:border-accent transition-colors placeholder-gray-800"
            autoFocus
          />
          
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-full left-0 w-full mt-4 text-red-500 text-sm tracking-widest uppercase"
              >
                Access Denied
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className={`mt-12 px-8 py-2 border border-gray-800 rounded-full text-sm uppercase tracking-widest transition-all duration-500 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(74,144,226,0.3)]'}`}
          >
            {loading ? 'Verifying...' : 'Enter'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Gatekeeper;

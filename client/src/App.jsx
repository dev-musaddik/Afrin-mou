import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarfieldBackground from './components/StarfieldBackground';
import SpotlightCursor from './components/SpotlightCursor';
import BiometricGate from './components/BiometricGate';
import PrivacyShield from './components/PrivacyShield';
import HeroGlitch from './components/HeroGlitch';
import BentoGrid from './components/BentoGrid';
import DeveloperHighlight from './components/DeveloperHighlight';
import fariyaMain from './assets/fariya_main.png';
import fariyaGreen from './assets/fariya_green.png';

function App() {
  const [accessGranted, setAccessGranted] = useState(false);

  return (
    <div className="min-h-screen bg-void-black text-gray-200 selection:bg-neon-cyan selection:text-black overflow-x-hidden">
      <StarfieldBackground />
      <SpotlightCursor />
      <PrivacyShield />

      <AnimatePresence>
        {!accessGranted && (
          <BiometricGate onAccessGranted={() => setAccessGranted(true)} />
        )}
      </AnimatePresence>

      {accessGranted && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="container mx-auto px-4 py-12 max-w-6xl relative z-10"
        >
          {/* Header Section */}
          <header className="text-center mb-20">
            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl md:text-8xl font-mono font-bold text-white mb-4 tracking-tighter"
            >
              FARIYA AFRIN MOU
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1, delay: 1 }}
              className="h-1 bg-neon-cyan mx-auto mb-6 shadow-[0_0_20px_rgba(0,243,255,0.8)]"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-gray-500 font-mono uppercase tracking-[0.5em] text-xs md:text-sm"
            >
              The Universe Within
            </motion.p>
          </header>

          {/* Hero Section */}
          <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <HeroGlitch src={fariyaMain} alt="Fariya Afrin Mou - Main" />
            <HeroGlitch src={fariyaGreen} alt="Fariya Afrin Mou - Portrait" />
          </section>

          {/* Bento Grid Section */}
          <section className="mb-32">
            <BentoGrid />
          </section>

          {/* Developer Highlight Section */}
          <DeveloperHighlight />

          {/* Footer */}
          <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-center border-t border-white/10 pt-8 mt-12 pb-8"
          >
            <p className="text-gray-600 text-xs font-mono tracking-widest uppercase">
              System Architecture by <span className="text-neon-cyan">Musaddik</span>
            </p>
          </motion.footer>

        </motion.main>
      )}
    </div>
  );
}

export default App;

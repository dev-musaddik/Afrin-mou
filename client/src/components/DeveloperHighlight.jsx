import { motion } from 'framer-motion';
import musaddikPortrait from '../assets/musaddik_portrait.jpg';
import musaddikSetup from '../assets/musaddik_setup.jpg';

const FireText = ({ text }) => {
  return (
    <span className="relative inline-block font-bold text-transparent bg-clip-text bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 animate-pulse-slow">
      {text}
      <span className="absolute inset-0 blur-sm bg-clip-text bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 opacity-70 animate-pulse">
        {text}
      </span>
    </span>
  );
};

const DeveloperHighlight = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative mt-20 mb-12 p-6 rounded-xl bg-gradient-to-r from-midnight-light to-black border border-gray-800 overflow-hidden max-w-3xl mx-auto"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-orange-900/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        
        {/* Image - Compact & Circular */}
        <div className="relative group shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-orange-500/30 shadow-[0_0_20px_rgba(234,88,12,0.3)]">
            <img 
              src={musaddikPortrait} 
              alt="Musaddik" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {/* Decorative Fire Ring */}
          <motion.div 
            animate={{ 
              boxShadow: ['0 0 0px #ef4444', '0 0 15px #f97316', '0 0 0px #ef4444'] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full pointer-events-none" 
          />
        </div>

        {/* Content - Simple & Direct */}
        <div className="text-center md:text-left space-y-2">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-mono text-white">
              <FireText text="Musaddik" />
            </h2>
            <p className="text-orange-400/80 text-xs tracking-[0.2em] uppercase font-semibold">
              The Architect
            </p>
          </motion.div>

          <div className="text-gray-400 font-light text-sm space-y-1">
            <p>
              Full Stack Developer <span className="text-orange-500 px-1">✕</span> Digital Marketer
            </p>
            <p className="text-xs text-gray-500">
              Axelman Digital UK • Project Manager • Developer
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default DeveloperHighlight;

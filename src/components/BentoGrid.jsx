import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const BentoCard = ({ className, title, children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={twMerge(
        "relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:bg-white/10 hover:border-neon-cyan/30 group",
        className
      )}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-deep-violet/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <h3 className="mb-2 font-mono text-sm uppercase tracking-widest text-gray-400 group-hover:text-neon-cyan transition-colors">
        {title}
      </h3>
      <div className="text-gray-200 font-light">
        {children}
      </div>
    </motion.div>
  );
};

const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 w-full max-w-5xl mx-auto h-auto md:h-[600px]">
      {/* Card 1: Identity (Large) */}
      <BentoCard 
        title="Identity" 
        className="md:col-span-2 md:row-span-1 flex flex-col justify-center"
        delay={0.1}
      >
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-1">Fariya Afrin Mou</h2>
        <p className="text-neon-cyan font-mono text-sm">DOB: 21/06/2005</p>
      </BentoCard>

      {/* Card 2: Roots (Tall) */}
      <BentoCard 
        title="Roots" 
        className="md:col-span-1 md:row-span-2"
        delay={0.2}
      >
        <div className="space-y-4 h-full flex flex-col justify-between">
          <div>
            <p className="font-bold text-white">Location</p>
            <p className="text-sm text-gray-400">Modhupur, Jhenaidah</p>
          </div>
          <div>
            <p className="font-bold text-white">Grandmother's House</p>
            <p className="text-sm text-gray-400">Modhupur</p>
          </div>
          <div className="w-full h-24 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center">
            <span className="text-xs text-gray-600">MAP DATA ENCRYPTED</span>
          </div>
        </div>
      </BentoCard>

      {/* Card 3: Education (Square) */}
      <BentoCard 
        title="Education" 
        className="md:col-span-1 md:row-span-1"
        delay={0.3}
      >
        <p className="font-medium text-white">Jhenaidah Polytechnic</p>
        <p className="text-sm text-gray-400 mt-1">Computer Science & Technology</p>
        <div className="mt-2 inline-block px-2 py-1 bg-deep-violet/30 rounded text-xs text-neon-cyan border border-deep-violet/50">
          6th Semester
        </div>
      </BentoCard>

      {/* Card 4: Lineage (Wide) */}
      <BentoCard 
        title="Lineage" 
        className="md:col-span-1 md:row-span-1"
        delay={0.4}
      >
        <p><strong className="text-white">Father:</strong> Mir Ashraf</p>
        <p className="text-xs text-gray-500 mb-2">(Radiant Representative)</p>
        <div className="flex gap-2 text-xs text-gray-400">
          <span className="bg-white/5 px-2 py-1 rounded">3 Mama</span>
          <span className="bg-white/5 px-2 py-1 rounded">1 Khala</span>
          <span className="bg-white/5 px-2 py-1 rounded">2 Chacha</span>
        </div>
      </BentoCard>

      {/* Card 5: The Next Gen (Wide Bottom) */}
      <BentoCard 
        title="The Next Gen" 
        className="md:col-span-3 md:row-span-1 flex items-center justify-between px-8"
        delay={0.5}
      >
        <div className="flex flex-col md:flex-row gap-8 w-full justify-around">
          <div className="text-center md:text-left">
            <p className="text-xl text-white font-serif">Mir Yousuf Raiyan</p>
            <p className="text-sm text-gray-500">Brother • 7 Years Old</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10" />
          <div className="text-center md:text-right">
            <p className="text-xl text-white font-serif">Emrin Ayesha Lefa</p>
            <p className="text-sm text-gray-500">Sister • 13 Years Old</p>
          </div>
        </div>
      </BentoCard>
    </div>
  );
};

export default BentoGrid;

import { motion } from 'framer-motion';

const InfoCard = ({ title, children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="bg-midnight-light/50 border border-gray-800 p-6 rounded-lg backdrop-blur-sm hover:border-accent/30 transition-colors"
    >
      <h3 className="text-xl font-serif text-gray-300 mb-4 border-b border-gray-800 pb-2 inline-block">
        {title}
      </h3>
      <div className="text-gray-400 space-y-2 font-light">
        {children}
      </div>
    </motion.div>
  );
};

export default InfoCard;

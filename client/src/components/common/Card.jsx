import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, glass = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -5 } : {}}
      className={`
        ${glass ? 'glass-card' : 'card'}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;
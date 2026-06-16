import { motion } from 'framer-motion';

const EmptyState = ({ icon, title, description, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      {icon && (
        <div className="text-6xl mb-4">{icon}</div>
      )}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action}
    </motion.div>
  );
};

export default EmptyState;
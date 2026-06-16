import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center section-padding bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900/20">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>
          <Link to="/">
            <Button size="lg">Go Back Home</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
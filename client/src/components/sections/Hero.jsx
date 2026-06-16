import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { HiArrowRight } from 'react-icons/hi';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container-custom section-padding relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-6 inline-block">
                🚀 Full Stack Developer Internship Programme
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              MatruCare AI
              <span className="block gradient-text">Hackathon Portal</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
            >
              Design and develop a fully functional{' '}
              <strong>Hackathon Registration Portal</strong> using the{' '}
              <strong>MERN Stack</strong> with complete CRUD operations. Register,
              verify via OTP, log in to your dashboard, and register for the
              hackathon event with full team management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/signup">
                <Button size="lg" icon={<HiArrowRight />}>
                  Register Now
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  Login
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12"
            >
              {[
                { label: 'Stack', value: 'MERN' },
                { label: 'Team Size', value: '1–5' },
                { label: 'Domains', value: '5' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://illustrations.popsy.co/purple/web-design.svg"
                alt="Hackathon Registration Portal Illustration"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
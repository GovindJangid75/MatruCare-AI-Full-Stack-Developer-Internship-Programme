import { motion } from 'framer-motion';
import { PRIZES } from '../../utils/constants';
import Card from '../common/Card';

const Prizes = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-purple-900/20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Win Exciting Prizes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Total prize pool of ₹1,00,000+ for the top performers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRIZES.map((prize, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`text-center ${
                  index === 0
                    ? 'transform md:-translate-y-4 border-4 border-yellow-400'
                    : ''
                }`}
              >
                <div className="text-6xl mb-4">{prize.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {prize.position}
                </h3>
                <div className="text-4xl font-bold gradient-text mb-4">
                  {prize.amount}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Cash Prize + Certificates
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400">
            🎁 Plus exclusive swags, mentorship opportunities, and internship offers
            for all participants!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Prizes;
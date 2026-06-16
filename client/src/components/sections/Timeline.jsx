import { motion } from 'framer-motion';
import { TIMELINE_DATA } from '../../utils/constants';
import Card from '../common/Card';

const Timeline = () => {
  return (
    <section className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Event Timeline
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay on track with our comprehensive hackathon schedule
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {TIMELINE_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pb-12 last:pb-0"
            >
              {/* Timeline Line */}
              {index !== TIMELINE_DATA.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-indigo-600" />
              )}

              <div className="flex items-start gap-6">
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Content Card */}
                <Card className="flex-1" hover={false}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.phase}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 font-semibold mb-2">
                    {item.date}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
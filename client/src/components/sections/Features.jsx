import { motion } from 'framer-motion';
import { HiLightningBolt, HiUsers, HiAcademicCap, HiSparkles } from 'react-icons/hi';
import Card from '../common/Card';

const Features = () => {
  const features = [
    {
      icon: HiLightningBolt,
      title: 'Cutting-Edge Technology',
      description: 'Work with the latest AI and ML frameworks to build innovative solutions.',
    },
    {
      icon: HiUsers,
      title: 'Collaborative Environment',
      description: 'Team up with talented individuals and learn from each other.',
    },
    {
      icon: HiSparkles, // Changed from HiTrophy
      title: 'Amazing Prizes',
      description: 'Win cash prizes, internships, and exclusive mentorship opportunities.',
    },
    {
      icon: HiAcademicCap,
      title: 'Learn & Grow',
      description: 'Gain hands-on experience and enhance your technical skills.',
    },
  ];

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-800/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Participate?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join hundreds of innovators in this exciting journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
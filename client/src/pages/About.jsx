import { motion } from 'framer-motion';
import Card from '../components/common/Card';

const About = () => {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About MatruCare AI Hackathon
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Empowering the next generation of innovators
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                MatruCare AI Hackathon {new Date().getFullYear()} is a premier technology event focused on
                fostering innovation in artificial intelligence and healthcare. Our
                mission is to bring together brilliant minds from across the country
                to build solutions that can make a real difference in people's lives.
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                What We Offer
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  '💡 Real-world problem statements',
                  '🏆 ₹1L+ in prizes',
                  '👥 Networking opportunities',
                  '📚 Learning resources',
                  '🎓 Mentorship from experts',
                  '💼 Internship opportunities',
                  '🎁 Exclusive swags',
                  '📜 Certificates for all',
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Who Should Participate?
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Students pursuing undergraduate or postgraduate degrees</li>
                <li>• Technology enthusiasts passionate about AI and healthcare</li>
                <li>• Developers, designers, and innovators</li>
                <li>• Teams of 1–5 members or solo participants</li>
              </ul>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Evaluation Criteria
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Innovation',
                    description: 'Uniqueness and creativity of the solution',
                  },
                  {
                    title: 'Technical Implementation',
                    description: 'Code quality and technical excellence',
                  },
                  {
                    title: 'Impact',
                    description: 'Potential to solve real-world problems',
                  },
                  {
                    title: 'Presentation',
                    description: 'Quality of demo and documentation',
                  },
                ].map((criteria, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {criteria.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {criteria.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
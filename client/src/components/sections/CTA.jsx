import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { HiArrowRight } from 'react-icons/hi';

const CTA = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Join MatruCare AI Hackathon {new Date().getFullYear()} and turn your innovative ideas into reality.
            Register now and be part of this amazing journey!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="secondary" size="lg" icon={<HiArrowRight />}>
                Register Now
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Button from '../components/common/Button';
import { contactService } from '../services/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactService.submit({ ...formData, subject: 'Contact Form Submission' });
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(error.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: HiMail,
      title: 'Company Email',
      value: 'matrucareai@gmail.com',
      href: 'mailto:matrucareai@gmail.com',
    },
    {
      icon: HiLocationMarker,
      title: 'Programme',
      value: 'Full Stack Developer Internship',
      href: null,
    },
  ];

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Have questions? We'd love to hear from you.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Company Email:{' '}
              <a
                href="mailto:matrucareai@gmail.com"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                matrucareai@gmail.com
              </a>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-2xl mx-auto">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {info.title}
                  </h3>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form — Name, Email, Message per spec */}
          <Card className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
              <Textarea
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more..."
                rows={6}
                required
              />
              <Button type="submit" loading={loading} className="w-full">
                Send Message
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold text-white">MatruCare AI</span>
            </div>
            <p className="text-gray-400 mb-4">
              Full Stack Developer Internship Programme — Hackathon Registration Portal.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                Email:{' '}
                <a
                  href="mailto:matrucareai@gmail.com"
                  className="hover:text-purple-400 transition-colors"
                >
                  matrucareai@gmail.com
                </a>
              </li>
              <li>Programme: Full Stack Developer Internship</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar — matches assignment spec exactly */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            MatruCare AI | matrucareai@gmail.com | Full Stack Developer Internship Programme
          </p>
          <p className="mt-2">
            &copy; {currentYear} MatruCare AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
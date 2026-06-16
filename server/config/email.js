import nodemailer from 'nodemailer';

/**
 * Create and configure email transporter
 * Uses Gmail SMTP for sending emails
 */
const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Verify transporter configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ Email configuration error:', error);
    } else {
      console.log('✅ Email service is ready to send messages');
    }
  });

  return transporter;
};

export default createTransporter;
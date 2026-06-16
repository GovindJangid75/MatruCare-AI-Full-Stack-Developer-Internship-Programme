import createTransporter from '../config/email.js';
import { otpEmailTemplate } from '../templates/otpEmail.js';
import { registrationEmailTemplate } from '../templates/registrationEmail.js';

/**
 * Send OTP verification email
 */
export const sendOTPEmail = async (email, name, otp) => {
  try {
    const transporter = createTransporter();

    console.log('========== OTP EMAIL DEBUG ==========');
    console.log('Sending OTP to:', email);
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS EXISTS:', !!process.env.EMAIL_PASS);

    // Verify transporter connection
    await transporter.verify();

    console.log('✅ SMTP Server Connected');

    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: email,
      subject: 'Verify Your Email - MatruCare AI Hackathon Portal',
      html: otpEmailTemplate(name, otp),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ OTP Email sent:', info.messageId);

    return info;

  } catch (error) {
    console.error('❌ FULL EMAIL ERROR:', error);

    // IMPORTANT: throw original error
    throw error;
  }
};

/**
 * Send hackathon registration confirmation email
 */
export const sendRegistrationEmail = async (registrationData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: registrationData.email,
      subject: 'Registration Successful - MatruCare AI Hackathon',
      html: registrationEmailTemplate(registrationData),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Registration Email sent:', info.messageId);

    return info;

  } catch (error) {
    console.error('❌ FULL EMAIL ERROR:', error);
    throw error;
  }
};

/**
 * Send contact form email
 */
export const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: process.env.EMAIL_USER,
      replyTo: contactData.email,
      subject: `Contact Form: ${contactData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Subject:</strong> ${contactData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Contact Email sent:', info.messageId);

    return info;

  } catch (error) {
    console.error('❌ FULL EMAIL ERROR:', error);
    throw error;
  }
};
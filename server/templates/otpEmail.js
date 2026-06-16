/**
 * OTP Email Template
 * Sender Name: MatruCare AI (never include candidate name in sender)
 * Trigger: User Signup
 * Content: 6-digit OTP with 10-minute expiry
 */
export const otpEmailTemplate = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification — MatruCare AI</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
          text-align: center;
          color: white;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .content {
          padding: 40px 30px;
          text-align: center;
        }
        .content h2 {
          color: #333;
          margin-bottom: 20px;
        }
        .content p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .otp-box {
          background-color: #f8f9fa;
          border: 2px dashed #667eea;
          border-radius: 8px;
          padding: 20px;
          margin: 30px 0;
        }
        .otp-code {
          font-size: 36px;
          font-weight: bold;
          color: #667eea;
          letter-spacing: 8px;
          font-family: 'Courier New', monospace;
        }
        .expiry-text {
          color: #dc3545;
          font-size: 14px;
          margin-top: 10px;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 MatruCare AI</h1>
          <p style="margin: 10px 0 0 0;">Hackathon Portal — Email Verification</p>
        </div>
        <div class="content">
          <h2>Hello! 👋</h2>
          <p>Thank you for registering with the <strong>MatruCare AI Hackathon Portal</strong>.</p>
          <p>Please use the following OTP to verify your email address:</p>
          
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
            <p class="expiry-text">⏰ This OTP will expire in <strong>10 minutes</strong></p>
          </div>
          
          <p>If you didn't request this verification, please ignore this email.</p>
          <p style="margin-top: 30px; color: #999; font-size: 14px;">
            For security reasons, never share this OTP with anyone.
          </p>
        </div>
        <div class="footer">
          <p><strong>MatruCare AI</strong> | matrucareai@gmail.com | Full Stack Developer Internship Programme</p>
          <p>&copy; ${new Date().getFullYear()} MatruCare AI. All rights reserved.</p>
          <p>This is an automated email, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
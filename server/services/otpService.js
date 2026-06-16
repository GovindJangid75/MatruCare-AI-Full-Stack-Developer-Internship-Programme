/**
 * Generate 6-digit OTP
 */
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Check if OTP is expired
 */
export const isOTPExpired = (otpExpiry) => {
  return Date.now() > new Date(otpExpiry).getTime();
};

/**
 * Get OTP expiry time
 */
export const getOTPExpiry = () => {
  const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES) || 10;
  return new Date(Date.now() + expiryMinutes * 60 * 1000);
};
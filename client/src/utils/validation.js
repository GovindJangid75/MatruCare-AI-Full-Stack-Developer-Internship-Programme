export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateMobile = (mobile) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(mobile);
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateOTP = (otp) => {
  const re = /^\d{6}$/;
  return re.test(otp);
};
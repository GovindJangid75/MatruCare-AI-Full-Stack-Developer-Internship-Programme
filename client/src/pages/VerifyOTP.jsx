import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { authService } from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const email = location.state?.email;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate('/signup');
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('');
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.verifyOTP({ email, otp: otpValue });
      toast.success('Email verified successfully!');
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Invalid OTP');
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0').focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);

    try {
      await authService.resendOTP({ email });
      toast.success('New OTP sent to your email!');
      setTimer(600);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0').focus();
    } catch (error) {
      toast.error(error.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center section-padding bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900/20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📧</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              We've sent a 6-digit OTP to
              <br />
              <span className="font-semibold">{email}</span>
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 text-center">
                  Enter OTP
                </label>
                <div className="flex justify-center gap-2" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center">
                {timer > 0 ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    OTP expires in{' '}
                    <span className="font-semibold text-purple-600">
                      {formatTime(timer)}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-red-600">OTP expired</p>
                )}
              </div>

              <Button type="submit" loading={loading} className="w-full">
                Verify OTP
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Didn't receive the code?{' '}
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendLoading}
                      className="text-purple-600 hover:text-purple-700 font-semibold"
                    >
                      {resendLoading ? 'Sending...' : 'Resend OTP'}
                    </button>
                  ) : (
                    <span className="text-gray-400">Wait {formatTime(timer)}</span>
                  )}
                </p>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/signup"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600"
              >
                ← Back to Signup
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyOTP;
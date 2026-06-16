import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Don't return password by default
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      select: false,
    },
    otpExpiry: {
      type: Date,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate and hash OTP
userSchema.methods.generateOTP = function () {
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Set OTP expiry (10 minutes from now)
  const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES) || 10;
  this.otpExpiry = new Date(Date.now() + expiryMinutes * 60 * 1000);
  
  // Hash OTP before saving
  this.otp = bcrypt.hashSync(otp, 10);
  
  return otp; // Return plain OTP for sending via email
};

// Method to verify OTP
userSchema.methods.verifyOTP = async function (candidateOTP) {
  // Check if OTP exists and hasn't expired
  if (!this.otp || !this.otpExpiry) {
    return false;
  }

  if (Date.now() > this.otpExpiry) {
    return false;
  }

  return await bcrypt.compare(candidateOTP, this.otp);
};

const User = mongoose.model('User', userSchema);

export default User;
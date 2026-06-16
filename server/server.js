

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { generalLimiter } from './middleware/rateLimiter.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import hackathonRoutes from './routes/hackathonRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Security Middleware
app.use(helmet()); // Set security headers
app.use(mongoSanitize()); // Prevent MongoDB injection
app.use(xss()); // Prevent XSS attacks

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api/', generalLimiter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/hackathon', hackathonRoutes);
app.use('/api/contact', contactRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'MatruCare AI Hackathon Portal API',
    version: '1.0.0',
    status: 'active',
  });
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
    ╔══════════════════════════════════════════════╗
    ║  MatruCare AI Hackathon Portal Server       ║
    ║  Environment: ${process.env.NODE_ENV?.padEnd(29) || 'development'.padEnd(29)}║
    ║  Port: ${PORT.toString().padEnd(37)}║
    ║  Status: Running ✓                          ║
    ╚══════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

export default app;
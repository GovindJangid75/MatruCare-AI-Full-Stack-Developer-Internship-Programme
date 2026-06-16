import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/me', protect, getProfile);
router.put('/update', protect, updateProfile);

export default router;
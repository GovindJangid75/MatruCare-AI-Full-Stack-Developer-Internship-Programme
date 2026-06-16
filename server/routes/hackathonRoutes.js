import express from 'express';
import {
  registerHackathon,
  getMyEntry,
  updateEntry,
  deleteEntry,
  getAllRegistrations,
} from '../controllers/hackathonController.js';
import { protect, admin } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';
import { hackathonSchema } from '../validators/hackathonValidator.js';

const router = express.Router();

// Protected routes
router.post('/register', protect, validate(hackathonSchema), registerHackathon);
router.get('/my-entry', protect, getMyEntry);
router.put('/update/:id', protect, validate(hackathonSchema), updateEntry);
router.delete('/:id', protect, deleteEntry);

// Admin only routes
router.get('/all', protect, admin, getAllRegistrations);

export default router;
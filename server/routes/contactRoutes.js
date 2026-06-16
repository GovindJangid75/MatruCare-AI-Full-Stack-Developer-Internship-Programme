import express from 'express';
import { submitContact, getAllContacts } from '../controllers/contactController.js';
import { protect, admin } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';
import { contactSchema } from '../validators/hackathonValidator.js';

const router = express.Router();

// Public routes
router.post('/', validate(contactSchema), submitContact);

// Admin only routes
router.get('/all', protect, admin, getAllContacts);

export default router;
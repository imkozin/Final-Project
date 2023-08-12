import express from 'express';
import { register, login } from '../controllers/user-contollers.js';
import { addReview } from '../controllers/review-controllers.js';
import checkAuth from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login);
router.post('/api/reviews', checkAuth, addReview);

export default router;
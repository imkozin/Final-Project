import express from 'express';
import { register, login } from '../controllers/user-contollers.js';
import { addReview, getReviews, getReview } from '../controllers/review-controllers.js';
import checkAuth from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login);
router.post('/api/reviews', checkAuth, addReview);
router.get('/api/reviews', getReviews);
router.get('/api/reviews/:id', getReview);


export default router;
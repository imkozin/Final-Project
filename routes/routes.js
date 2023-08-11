import express from 'express';
import { register, login } from '../controllers/user-contollers.js';
import { createReview } from '../controllers/review-controllers.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login);
router.post('/book/:id', createReview);

export default router;
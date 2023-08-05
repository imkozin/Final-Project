import express from 'express';
import { register, login } from '../controllers/user-contollers.js';

const urouter = express.Router();

urouter.post('/register', register)
urouter.post('/login', login);
// urouter.delete('/logout', _logout);
// urouter.get('/users', _users);


export default urouter;
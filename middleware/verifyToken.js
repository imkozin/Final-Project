import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.ACCESS_TOKEN;

// Example of the checkAuth middleware
const checkAuth = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        console.log('No token, authorization denied');
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.log('Token verification failed:', err.message);
                return res.status(401).json({ msg: 'Token verification failed' });
            }
            // console.log('decoded',decoded);
            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        console.log('An error occurred during token verification:', error.message);
        res.status(500).json({ msg: 'An error occurred during token verification' });
    }
};

export default checkAuth;
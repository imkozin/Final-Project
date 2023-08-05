import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.ACCESS_TOKEN;

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email
        }, secret, {
            expiresIn: "15m"
        });
} 

export default generateToken;
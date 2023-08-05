import User from "../models/user-models.js";
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const {name, email, password} = req.body;
    const lower_email = email.toLowerCase();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email : lower_email,
            password: hash 
        }).save();
        return newUser;
    } catch (error) {
        res.status(409).json({ msg: "User already exists" });
    }
};
import User from "../models/user-models.js";
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
        const {name, email, password} = req.body;
        const lower_email = email.toLowerCase();
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    try {
        const newUser = new User({
            name,
            email : lower_email,
            password: hash 
        });
        const savedUser = await newUser.save();
        res.status(200).json({user: savedUser, msg: "Registered successfully"})
    } catch (error) {
        res.status(409).json({ msg: "User already exists" });
    }
};
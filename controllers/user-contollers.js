import User from "../models/user-models.js";
import bcrypt from 'bcrypt';
import generateToken from "../utils.js";

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email.toLowerCase()})
        if (!user) {
            return res.status(404).json({msg:'User not found'});
        }
        
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({msg:'Invalid password'});
        }

        generateToken(user);

        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg : 'Something went wrong!'})
    }
};


export const register = async (req, res) => {
        const {name, email, password} = req.body;
        const username = name.toLowerCase();
        const lower_email = email.toLowerCase();
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    try {
        const newUser = new User({
            name: username,
            email : lower_email,
            password: hash 
        });
        const savedUser = await newUser.save();
        res.status(200).json({user: savedUser, msg: "Registered successfully"})
    } catch (error) {
        res.status(409).json({ msg: "User already exists" });
    }
};
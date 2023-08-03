import User from "../models/users";

export const register = async (username, email, password) => {
    try {
        const newUser = new User({ username, email, password });
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
};

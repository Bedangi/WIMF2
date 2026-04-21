import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const saveUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData,
        password: hashedPassword,
        createdAt: new Date() });
    delete user._doc.confirmPassword;
    await user.save();
};

export const validateUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) return false;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
};

export const emailExists = async (email) => {
    const user = await User.findOne({ email });
    console.log("Checking if email exists:", email, "Found user:", user);
    return !!user;
};
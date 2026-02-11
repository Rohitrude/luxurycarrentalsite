import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Car from "../models/Car.js";

// Generate JWT Token
const generateToken = (userId) =>{
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET)
}

// Register User
export const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password || password.length < 8){
            return res.json({success: false, message: "fill all the fields"})
        }

        const userExists = await User.findOne({email})
        if(userExists){
            return res.json({success: false, message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({name, email, password: hashedPassword})
        const token = generateToken(user._id.toString())
        res.json({success: true, token})

    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Login User
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        
        if(!user){
            return res.json({success: false, message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: " Invalid credentials"})
        }

        const token = generateToken(user._id.toString())
        // Mark user as active
        try {
            user.isActive = true;
            await user.save();
        } catch (e) {
            console.log('Failed to set isActive on login:', e.message);
        }

        res.json({success: true, token})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Logout User (mark inactive)
export const logoutUser = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { isActive: false });
        res.json({ success: true, message: 'Logged out' });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get User Profile using JWT Token
export const getUaserData = async (req, res) => {
    try {
        const {user} = req;
        res.json({success: true, user})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Get all cars for Frontend
export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({isAvaliable: true});
        res.json({success: true, cars});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}
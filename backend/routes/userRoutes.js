import express from 'express';
import { getAllCars, getUaserData, loginUser, registerUser, logoutUser } from '../controller/userController.js';
import { protect } from '../middleware/auth.js';

const userRouter =  express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protect, getUaserData)
userRouter.post('/logout', protect, logoutUser)
userRouter.get('/cars', getAllCars);

export default userRouter;
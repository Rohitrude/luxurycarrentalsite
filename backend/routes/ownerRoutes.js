import express from 'express';
import { protect } from '../middleware/auth.js';
import { addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars,
toggleCarAvailability, updateUserImage } from '../controller/ownerController.js';
import upload from '../middleware/multer.js';
import { isAdmin } from '../middleware/admin.js';

const ownerRouter =  express.Router();

ownerRouter.post('/change-role', protect, isAdmin, changeRoleToOwner)
ownerRouter.post('/add-car', upload.single("image"), protect, addCar)
ownerRouter.get('/cars', protect, getOwnerCars)
ownerRouter.post('/toggle-car', protect, toggleCarAvailability)
ownerRouter.post('/delete-car', protect, deleteCar)

ownerRouter.get('/dashboard', protect, getDashboardData)
ownerRouter.post('/update-image', upload.single("image"), protect, updateUserImage)

export default ownerRouter;
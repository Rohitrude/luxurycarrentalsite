import imageKit from "../configs/imageKit.js";
import { Booking } from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";


export const changeRoleToOwner = async (req, res) => {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"});
        res.json({success: true, message: "Now you can list cars"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }

}

// Api to list car
export const addCar = async (req, res) => {
    try {
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData)
        const imageFile = req.file;
 
        // Uploading image to imageKit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imageKit.upload({
            file : fileBuffer,
            fileName : imageFile.originalname,
            folder : '/cars'
        })

        // optimization through imageKit URL transformation
        var optimizedImageUrl = imageKit.url({
            path : response.filePath,
            transformation :[
                {width: '1280'},  // with resizing
                {quality: 'auto'}, // Auto Compression
                {format: 'webp'}  // Convert to modern format
            ]
        });

        const image = optimizedImageUrl;
        await Car.create({...car, owner: _id, image});
        res.json({success: true, message: "Car Added successfully"})
        

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Api to get all cars of logged in owner
export const getOwnerCars = async (req, res) => {
    try {
        const {_id} = req.user;
        const cars = await Car.find({owner: _id});
        res.json({success: true, cars});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Api to Toggle car availability
export const toggleCarAvailability = async (req, res) => {
    try{
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        // Checking is car belongs to the user or not
        if(car.owner.toString() !== _id.toString()){
            return res.json({success: false, message: "Unauthorized Access"});
        }
        car.isAvaliable = !car.isAvaliable;
        await car.save();

        res.json({success: true, message: "Availability Toggled Successfullyy"});

    }catch(error){
        res.json({success: false, message: error.message});
    }
}

// Api to delete a car 
export const deleteCar = async (req, res) => {
    try{
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        // Checking is car belongs to the user or not
        if(car.owner.toString() !== _id.toString()){
            return res.json({success: false, message: "Unauthorized Access"});
        }
        car.owner = null; // Setting owner to null instead of deleting the car
        car.isAvaliable = false; // Making the car unavailable

        await car.save();

        res.json({success: true, message: "Car Removed Successfullyy"});

    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// API to get Dashboard Data for Owner
export const getDashboardData = async (req, res) =>{
    try{
        const {_id, role} = req.user;

        if(role !== 'owner'){
            return res.json({success: false, message: "Unauthorized Access"});
        }

        const cars = await Car.find({owner: _id});
        const bookings = await Booking.find({owner: _id}).populate('car').sort({createdAt: -1});

        const pendingBookings = await Booking.find({owner: _id, status: "pending"});
        const confirmedBookings = await Booking.find({owner: _id, status: "confirmed"});

        //Calculate monthlyRevenue from Bookings where status is confirmed
        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed' )
        .reduce((acc, booking) => acc + booking.price, 0);

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            confirmedBookings: confirmedBookings.length,
            recentBookings: bookings.slice(0,3),
            monthlyRevenue
        }

        res.json({success: true, dashboardData});

    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}


// API to update user image
export const updateUserImage = async(req, res) =>{
    try {
        const {_id} = req.user;

         const imageFile = req.file;
 
        // Uploading image to imageKit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imageKit.upload({
            file : fileBuffer,
            fileName : imageFile.originalname,
            folder : '/users'
        })

        // optimization through imageKit URL transformation
        var optimizedImageUrl = imageKit.url({
            path : response.filePath,
            transformation :[
                {width: '400'},  // with resizing
                {quality: 'auto'}, // Auto Compression
                {format: 'webp'}  // Convert to modern format
            ]
        });

        const image = optimizedImageUrl;

        await User.findByIdAndUpdate(_id, {image});
        res.json({success: true, message: "Profile Image Updated Successfully"});


    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// API to get all registered users
export const getAllUsers = async (req, res) => {
    try {
        const { _id, role } = req.user;

        // Check if user is owner/admin
        if (role !== 'owner' && role !== 'admin') {
            return res.json({ success: false, message: "Unauthorized Access" });
        }

        // Fetch all users except owner/admin passwords
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });

        res.json({ success: true, users });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
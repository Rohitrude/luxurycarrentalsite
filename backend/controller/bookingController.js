import transporter from "../configs/sendMail.js";
import { Booking } from "../models/Booking.js"
import Car from "../models/Car.js";


// Function to check Availability of Cars for  a given date
const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        pickupDate: {$lt: returnDate},
        returnDate: {$gt: pickupDate},
    })
    return bookings.length === 0;
}


// APT To check car availability for given dates and location
export const checkAvailabilityOfCar = async (req, res) =>{
    try {
        const {location, pickupDate, returnDate} = req.body;

        // Finding cars based on location
        const cars = await Car.find({location, isAvaliable: true});

        // Check car availability for given date range using promise
        const availableCarsPromises = cars.map(async (car) =>{
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)
            return {...car._doc, isAvailable: isAvailable};
        })

        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvailable === true);

        res.json({success: true, availableCars});
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// API to create a booking
export const createBooking = async (req, res) => {
    try {
        const {_id} = req.user;
        const {name, email} = req.user;
        const {car, pickupDate, returnDate} = req.body;

        const isAvailable = await checkAvailability(car, pickupDate, returnDate);
        if(!isAvailable){
            return res.json({success: false, message: "Car is not available for the selected dates"});
        }

        const carData = await Car.findById(car);

        // Calulating price based on pickupdate and returnDate
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
        const price = noOfDays * carData.pricePerDay;   

        await Booking.create({car, owner: carData.owner, user: _id, pickupDate, returnDate, price});
        res.json({success: true, message: "Booking created"});

        //  2️⃣ Send email
        const sendEmail = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Car Booking Confirmed 🚗",
            html: `
                <h2>Booking Successful!</h2>
                <p>Hi ${name},</p>
                <p>Your car has been booked successfully.</p>
                <p><b>Start:</b> ${pickupDate}</p>
                <p><b>End:</b> ${returnDate}</p>
        `
        }

        await transporter.sendMail(sendEmail);
        // console.log("Email sent successfully");

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// API to list user bookings
export const getUserBookings = async (req, res) => {
    try {
        const {_id} = req.user;
        const bookings = await Booking.find({user: _id}).populate('car').sort({createdAt: -1});

        res.json({success: true, bookings});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// API to get Owner bookings
export const getOwnerBookings = async (req, res) => {
    try {
        if(req.user.role !== 'owner'){
            return res.json({success: false, message: "Unauthorized Access"});
        }
        const bookings = await Booking.find({owner: req.user._id}).populate('car user')
        .select("-user.password").sort({createdAt: -1});
        res.json({success: true, bookings});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// API to change booking status 
export const changeBookingStatus = async (req, res) => {
    try {
        const {_id} = req.user;
        const {bookingId, status} = req.body;

        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()){
            return res.json({success: false, message: "Unauthorized Access"});
        }

        booking.status = status;
        await booking.save();
        res.json({success: true, message: "Booking Status Updated Successfully"});
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}
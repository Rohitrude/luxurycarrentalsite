import { instance } from "../configs/payment.js"
import crypto from "crypto"


export const processPayment = async (req, res) =>{
    const options = {
        amount: Number(req.body.amount*100),
        currency: "INR"
    }

    const order = await instance.orders.create(options)

    res.json({success: true, order})
}

export const getKey = async (req, res)=>{
    res.json({
        key: process.env.REZORPAY_KEY_ID 
    })
}

export const verifyPayment = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.REZORPAY_KEY_ID)
        .update(body)
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        res.json({ success: true, message: "Payment verified" });
    } else {
        res.status(400).json({ success: false, message: "Payment verification failed" });
    }
}
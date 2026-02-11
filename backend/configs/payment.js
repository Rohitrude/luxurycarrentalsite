import Razorpay from 'razorpay'

export const instance = new Razorpay({
    key_id: process.env.REZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})
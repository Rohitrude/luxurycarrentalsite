import express from 'express'
import { getKey, processPayment, verifyPayment } from '../controller/paymentController.js';
const paymentRouter = express.Router()

paymentRouter.post('/payment-process',processPayment)
paymentRouter.get('/getkey', getKey)
paymentRouter.post('/verify', verifyPayment)

export default paymentRouter;



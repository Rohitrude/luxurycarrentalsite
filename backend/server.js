import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import aiRouter from './routes/aiRoutes.js';

// Initialize Express App
const app = express();

// connect db
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=> res.send("server is running"));
app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/bookings',bookingRouter)
app.use('/api/ai', aiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));
// routes/aiRoutes.js
import express from 'express';
import { chatWithAI } from '../controller/aiController.js';


const aiRouter = express.Router();

aiRouter.post('/chat', chatWithAI);

export default aiRouter;
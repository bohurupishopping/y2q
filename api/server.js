import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import commentsRouter from './comments.js';
import videosRouter from './videos.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use('/api/comments', commentsRouter);
app.use('/api/videos', videosRouter);

// Export the app for Vercel serverless function
export default app;

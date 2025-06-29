
import express from "express";
import cors from "cors";
import 'dotenv/config';
import helmet from 'helmet';
import mongoose from "./config/db.js";
import quizRoute from './Routes/quizRoute.js';
import authRoute from './Routes/authRoute.js';
import cookieParser from 'cookie-parser';


// Initialize the Express app
const app = express();
const port = 3000;

// Middleware
// This is the CORS middleware, which helps manage Cross-Origin Resource Sharing — a security feature enforced by browsers that blocks requests from different origins unless explicitly allowed.

app.use(express.json());
app.use(cors({
  origin: 'https://jovial-axolotl-4615e1.netlify.app',
  credentials: true,
}));

// This allows the frontend to send cookies or authorization headers with cross-origin requests.
app.use(helmet());
app.use(cookieParser());

mongoose.connection.on('open', () => {
  console.log('Database Connected')
});

mongoose.connection.on('error', (err) => {
  console.log('Connection Failed', err);
})

app.use('/api', quizRoute);
app.use('/api', authRoute);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


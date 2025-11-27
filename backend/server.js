import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';

import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import budgetRouter from './routes/budgetRoute.js';
import expenseRouter from './routes/expenseRoute.js';
import incomeRouter from './routes/incomeRoute.js';
import summaryRouter from './routes/summaryRoute.js';
import financialRouter from './routes/financialRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

connectDB();

// Production ready CORS
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:5173'];

app.use(cors({ 
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }, 
    credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

// API Endpoints
app.get('/', (req, res) => res.send('API is working'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/budget', budgetRouter);
app.use('/api/expense', expenseRouter);
app.use('/api/income', incomeRouter);
app.use('/api/summary', summaryRouter);
app.use("/api/financial", financialRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
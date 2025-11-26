import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { connect } from 'mongoose';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
// import budgetRouter from './routes/budgetRoute.js';
// import expenseRouter from './routes/expenseRoute.js';
// import incomeRouter from './routes/incomeRoute.js';
// import summaryRouter from './routes/summaryRoute.js';

const app = express();
const port = process.env.PORT || 5000;
connectDB(); 

const allowedOrigins = ['http://localhost:5173']

app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(express.json());
app.use(cookieParser());

//API Endpoints
app.get('/', (req, res)=> res.send('API is working'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
// app.use('/api/budget', budgetRouter);
// app.use('/api/expense', expenseRouter);
// app.use('/api/income', incomeRouter);
// app.use('/api/summary', summaryRouter);

app.listen(port, ()=> console.log(`server started on port ${port}`));



// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import 'dotenv/config';
// import cookieParser from 'cookie-parser';

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors({credentials: true}))
// app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.send('Hello from the backend!');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
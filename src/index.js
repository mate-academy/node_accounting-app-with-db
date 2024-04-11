
import express from 'express';
import cors from 'cors';
import { router as expensesRouter } from './routes/expenses.js';
import { router as statisticsRouter } from './routes/statistics.js';

const app = express();

app.use(cors());
app.use('/expenses', expensesRouter);
app.use('/statistics', statisticsRouter);

app.listen(5000);

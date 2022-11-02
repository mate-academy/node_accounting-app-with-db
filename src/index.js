/* eslint-disable no-console */
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { router as usersRouter } from './routes/usersRoutes.js';
import { router as expencesRouter } from './routes/expensesRoutes.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use('/users', express.json(), usersRouter);
app.use('/expenses', express.json(), expencesRouter);

app.get('/', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});

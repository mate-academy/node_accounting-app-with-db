'use strict';

const express = require('express');
const { Router } = require('./routes/user.routes');
const { expenseRouter } = require('./routes/expenses.routes');

const userRouter = Router;

const app = express();

app.use('/users', express.json(), userRouter);

app.use('/expenses', express.json(), expenseRouter);

app.listen(3000);

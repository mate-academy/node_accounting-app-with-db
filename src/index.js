'use strict';

const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/users.js');
const expenseRouter = require('./routes/expenses.js');

const app = express().use(cors());

app.use('/users', express.json(), userRouter);
app.use('/expenses', express.json(), expenseRouter);

app.listen(3000, () => {
  process.stdout.write('Server created\n');
});

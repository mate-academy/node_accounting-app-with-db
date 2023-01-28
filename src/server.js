/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

const app = express();

app.use(cors());

app.use('/users', express.json(), usersRouter);
app.use('/expenses', express.json(), expensesRouter);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

'use strict';

const express = require('express');
const cors = require('cors');

const { usersRouter } = require('./routes/users');
const { expensesRouter } = require('./routes/expenses');

const app = express();

app.use(cors());

app.use('/users', express.json(), usersRouter);
app.use('/expenses', express.json(), expensesRouter);

app.listen(5000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running');
});

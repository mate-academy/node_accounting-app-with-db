'use strict';

const express = require('express');

require('dotenv').config();

const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');

const PORT = process.env.API_PORT || 3001;

const app = express();

app.use(express.json());

app.use('/users', usersRouter);
app.use('/expenses', expensesRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});

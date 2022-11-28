'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routers/users');
const { expensesRouter } = require('./routers/expenses');

const app = express();

app.use(cors());
app.use('/users', express.json(), usersRouter);
app.use('/expenses', express.json(), expensesRouter);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:3000`);
});

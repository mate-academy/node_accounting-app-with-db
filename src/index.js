'use strict';

const express = require('express');
const expensesRouter = require('./routers/expenses');
const usersRouter = require('./routers/users');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/expenses', expensesRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on http://localhost:${PORT}`);
});

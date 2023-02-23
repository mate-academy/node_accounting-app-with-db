'use strict';

const express = require('express');

const userRouter = require('./routes/usersRouter').userRouter;
const expenseRouter = require('./routes/expensesRouter').expenseRouter;

const app = express();

app.use('/users', userRouter);
app.use('/expenses', expenseRouter);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on http://localhost:3000');
});

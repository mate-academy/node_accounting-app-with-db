'use strict';

const express = require('express');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');
const PORT = process.env.PORT || 5000;

const app = express();

app.use('/users', usersRouter);
app.use('/expenses', expensesRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is runing on http://localhost:${PORT}🚀🚀🚀`);
});

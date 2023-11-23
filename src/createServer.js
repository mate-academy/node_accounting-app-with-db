/* eslint-disable no-console */
'use strict';

const express = require('express');
const { usersRouter } = require('./routes/usersRoute');
const { expensesRouter } = require('./routes/expensesRoute');
const usersService = require('./services/usersService');
const expensesService = require('./services/expensesService');

const app = express();

usersService.clearUsers();
expensesService.clearExpenses();

app.use('/users', express.json(), usersRouter);
app.use('/expenses', express.json(), expensesRouter);

app.listen(3005, () => {
  console.log(`Example app listening on port 3005`);
});

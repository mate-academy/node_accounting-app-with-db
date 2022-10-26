'use strict';

const express = require('express');
const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses.js');

const app = express();

app.use('/users', express.json(), usersRouter);
app.use('/expenses', express.json(), expensesRouter);

app.listen(3333);

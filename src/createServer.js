/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');
const { expensesRouter } = require('./routes/expenses.js');
const { usersRouter } = require('./routes/users.js');
const { categoriesRouter } = require('./routes/categories.js');
const { Expense } = require('./services/expenses.js');
const { User } = require('./services/users.js');
const { Category } = require('./services/categories.js');

const app = express();

User.sync({ force: true });
Expense.sync({ force: true });
Category.sync({ force: true });

app.use(cors());
app.use(express.json());

app.use('/expenses', expensesRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

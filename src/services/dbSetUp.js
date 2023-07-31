'use strict';

const { User, Expense } = require('./db');

User.sync({ force: true });
Expense.sync({ force: true });

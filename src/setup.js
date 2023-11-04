'use strict';

const { User, Expense } = require('./db.js');

User.sync({ force: true });
Expense.sync({ force: true });

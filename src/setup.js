/* eslint-disable no-console */
'use strict';

const { User } = require('./models/user.model');
const { Expense } = require('./models/expense.model');

User.sync({ force: true });
Expense.sync({ force: true });

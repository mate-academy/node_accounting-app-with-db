'use strict';

const { Expense } = require('./models/Expense');
const { User } = require('./models/User');

User.sync({ forse: true });
Expense.sync({ forse: true });

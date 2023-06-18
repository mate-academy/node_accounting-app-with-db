'use strict';

const { User } = require('./models/User');
const { Expenses } = require('./models/Expenses');

User.sync({ force: true });
Expenses.sync({ force: true });

'use strict';

require('dotenv/config');

const Expenses = require('./models/expenses');
const Users = require('./models/users');

Users.sync({ force: true });
Expenses.sync({ force: true });

'use strict';

const { Users } = require('./utils/modules/users');
const { Expenses } = require('./utils/modules/expenses');

Users.sync({ force: true });
Expenses.sync({ force: true });

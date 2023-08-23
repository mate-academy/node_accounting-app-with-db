'use strict';

const { Expense } = require('../models/Expense');
const { User } = require('../models/User');

User.sync({ force: true });
Expense.sync({ force: true });

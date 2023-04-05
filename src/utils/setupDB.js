'use strict';

const { User } = require('../models/User');
const { Expense } = require('../models/Expense');

User.sync();
Expense.sync();
